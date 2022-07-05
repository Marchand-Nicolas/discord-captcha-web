import styles from '../styles/Dashboard.module.css'
import Footer from '../components/Footer'
import config from '../utils/config'
import { useState, useEffect } from 'react'
import { getCookie, setCookie } from '../utils/cookies'
import Link from 'next/link'
import PaypalButton from "../components/PaypalButton" 

export default function Dashboard() {
    const serverIp = config.serverIp
    const [user, setUser] = useState(undefined)
    const [guilds, setGuilds] = useState([])
    useEffect(() => {
        let token = getCookie('token')
        if (!token || token === 'undefined') {
            const code = new URLSearchParams(window.location.search).get("code")
            if (code) {
                fetch(`${serverIp}login`, { method: 'POST', body : `{ "token": "${code}" }` }).then(res => res.json()).then(res => {
                    if (!res.access_token || res.access_token === 'undefined') {
                        window.location.href = '/dashboard'
                    }
                    else {
                        setCookie('token', res.access_token, res.expires_in - 1000)
                        token = res.access_token
                        loadPage()
                    }
                })
            }
            else {
                window.location.href = `https://discord.com/api/oauth2/authorize?client_id=991022601574973501&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdashboard&response_type=code&scope=identify%20guilds`
            }
        }
        else {
            loadPage()
        }
        async function loadPage() {
            const userDatas = await (await fetch('https://discordapp.com/api/users/@me', {
                method: 'GET',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json', 'Authorization': 'Bearer ' + token },
            })).json()
            if (userDatas.message === '401: Unauthorized') {
                setCookie('token', '', 0)
                window.location.href = '/dashboard'
            }
            else {
                setUser(userDatas)
                const guilds = await (await fetch('https://discordapp.com/api/v6/users/@me/guilds', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json', 'Authorization': 'Bearer ' + token },
                })).json()
                if (guilds.retry_after) {
                    setTimeout(() => {
                        window.location.reload();
                    }, guilds.retry_after)
                }
                setGuilds(guilds)
            }
        }
    }, []);

    function imgError(guildId) {
        const guildElement = document.getElementById("guild_" + guildId)
        const img = guildElement.querySelector('img')
        img.src = "/assets/default_guild_icon.jpg"
    }
    function endImgLoading(guildId) {
        const guildElement = document.getElementById("guild_" + guildId)
        guildElement.classList.remove(styles.loading)
    }

    const currentGuildId = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get("guild") : ""
    let guild = guilds.find(guild => guild.id === currentGuildId)
    
    function checkAdminPerms(guild) {
        // Check if user has admin permission on this guild (https://discord.com/developers/docs/topics/permissions)
        return guild.permissions_new.toString(16) & 0x0000000000000008
    }

    if (!guild) {
        if (guilds.length > 0) {
            guild = guilds.find(guild => checkAdminPerms(guild))
        }
        if (!guild) guild = {
            "id": "",
            "name": "",
            "icon": "",
            "owner": false,
            "permissions": 2147483647,
            "permissions_new": "4398046511103"
        }
    }
    
    return <>
        <div style={{backgroundImage: guild.icon ? `url('https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp?size=96')` : null}} className={styles.background} />
        <nav className={styles.navbar}>
            {
                guilds.length > 0 ? guilds.map(g =>
                    checkAdminPerms(g) ?
                    <Link key={"nav_guild_" + g.id} href={"?guild=" + g.id}>
                        <div id={"guild_" + g.id} className={[styles.navGuild, !document.getElementById("guild_" + g.id) && styles.loading, guild.id === g.id ? styles.selected : null].join(" ")}>
                            <img className={styles.guildIcon} onLoad={() => endImgLoading(g.id)} onError={() => imgError(g.id)} src={`https://cdn.discordapp.com/icons/${g.id}/${g.icon}.webp?size=96`} alt={g.name + " (guild icon)"} />
                        </div>
                    </Link> : null
                ) : [...Array(3)].map((o, index) => <div key={"nav_guild_" + index} className={styles.navGuild} >
                <div className={[styles.guildIcon, styles.placeHolder].join(" ")} />
            </div>)
            }
        </nav>
        <div className={styles.page}>
            <h1 className={styles.title}>{guild.name}</h1>
            <button className={styles.buyButton}>
                Add bot <strong>10$</strong>
            </button>
            {
                /*
<PaypalButton />
                */
            }
        </div>
    </>
}
