import styles from '../styles/Home.module.css'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Header />
      <section className={styles.gradient}>
        <div>
          <h1 className={styles.title}>
            get rid of <strong>bot attack</strong>
          </h1>
          <p className={styles.description}>
              in <code className={styles.code}>only one slash command</code>
          </p>
          <a href='#description'>
            <svg className={styles.bottomArrow} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </section>
      <section id="description">
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className={styles.exampleContainer}>
        <img src="/assets/strip1.svg" className={[styles.strip, styles.v1].join(" ")} />
          <div className={styles.glassCard}>
            <Image src="/illustrations/example1.png" alt="Example" layout='fill'  />
          </div>
          <p>
            <code className={styles.code}>Say goodbye to robots</code>
            <br></br>
            <br></br>
            Captcha bot automatically generates an image
            containing text,
            which is very difficult for a robot to understand.
            It therefore prevents waves of automated
            users destroying your server.
          </p>
        </div>
        <div className={[styles.exampleContainer, styles.reverse].join(" ")}>
          <div className={styles.glassCard}>
            <Image src="/illustrations/example2.png" alt="Slash command example" layout='fill'  />
          </div>
          <p>
            <code className={styles.code}>One command, 100% customizable</code>
            <br></br>
            <br></br>
            In a single command, change the avatar and name of the bot, as well as the title and description of the embed.
          </p>
        </div>
        <div className={styles.exampleContainer}>
          <div className={[styles.glassCard, styles.v2].join(" ")}>
            <Image src="/illustrations/server.svg" alt="Server illustration" layout='fill'  />
            <img src="/assets/shape1.svg" className={[styles.shape, styles.v1].join(" ")} />
          </div>
          <p>
            <code className={styles.code}>Secure and redundant</code>
            <br></br>
            <br></br>
            To reduce the risk of damage in case of hacking, the bot only asks you for the permissions it needs. Moreover, the bot is hosted on several servers simultaneously, so even if one of them has a problem, the rest of the infrastructure continues to work, thus protecting your server 24/7.
          </p>
        </div>
      </section>
      <a className={styles.inviteBot} href="https://discord.com/api/oauth2/authorize?client_id=991022601574973501&permissions=268823632&scope=applications.commands%20bot" target="_blank">
        Invite the bot
      </a>
      <section id="informations" className={styles.main}>
        <div className={styles.grid}>
          <Link href="/docs">
            <div className={styles.card}>
              <h2>Documentation &rarr;</h2>
              <p>Find in-depth information about Next.js features and API.</p>
            </div>
          </Link>
          <Link href="/docs">
            <div className={styles.card}>
              <h2> &rarr;</h2>
              <p>Learn about Next.js in an interactive course with quizzes!</p>
            </div>
          </Link>
          <Link href="/docs">
            <div className={styles.card}>
              <h2>Privacy &rarr;</h2>
              <p>Discover and deploy boilerplate example Next.js projects.</p>
            </div>
          </Link>
          <Link href="/docs">
            <div className={styles.card}>
              <h2>TOS &rarr;</h2>
              <p>
                Instantly deploy your Next.js site to a public URL with Vercel.
              </p>
            </div>
          </Link>
        </div>
      </section>
      <Footer />
    </>
  )
}
