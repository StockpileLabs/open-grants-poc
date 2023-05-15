import Head from 'next/head'
import styles from "../styles/Transitions.module.css";
import AboutHead from '@/components/About/AboutHead';
import AboutFAQ from '@/components/About/AboutFAQ';
import Layout from '@/components/Layout/Layout';

export default function About() {
    return (
        <>
            <Head>
                <title>About | Stockpile Grants</title>
                <meta name="description" content="More about the Stockpile Grants Proof of Concept." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <main>
                    <section>
                        <div className={styles.fadeInUp}>
                            <AboutHead />
                        </div>
                    </section>
                    <section>
                        <div className={styles.fadeInUp}>
                            <AboutFAQ />
                        </div>
                    </section>
                </main>
            </Layout>
        </>
    )
}
