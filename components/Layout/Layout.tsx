import { FooterLinks } from "./Footer";
import { HeaderMiddle } from "./Navbar";


export default function Layout({ children }: any) {
    return (
        <>
            <HeaderMiddle />
            {children}
            <FooterLinks data={
                [
                    {
                        title: "General",
                        links: [
                            {
                                label: "Explore",
                                link: "/explore",
                            },
                            {
                                label: "Create",
                                link: "/create",
                            },
                            {
                                label: "About",
                                link: "/about",
                            },
                            {
                                label: "Docs",
                                link: "https://docs.stockpile.pro/",
                            },
                        ]
                    },
                    {
                        title: "Organization",
                        links: [
                            {
                                label: "Website",
                                link: "https://stockpile.pro/",
                            },
                            {
                                label: "Blog",
                                link: "https://stockpile.pro/blog",
                            },
                            {
                                label: "Solarplex",
                                link: "https://www.solarplex.xyz/topic/HCzUVVhIv0pV-pfv/Stockpile",
                            },
                        ]
                    }
                ]
            } />
        </>
    )
}