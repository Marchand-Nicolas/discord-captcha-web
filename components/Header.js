import Image from 'next/image'
import styles from '../styles/components/Header.module.css'

export default function Footer() {
    return (
        <nav className={styles.nav}>
            <Image src="/logo.png" alt="Captcha logo" width={50} height={50} />
            <strong className={styles.title}>Captcha bot</strong>
        </nav>
    )
}