import {
    createStyles,
    Container,
    Title,
    Text,
    Button,
    Group,
} from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "@/components/Layout/Layout";

const useStyles = createStyles((theme) => ({
    root: {
        paddingBottom: 80,
    },

    inner: {
        position: "relative",
    },

    image: {
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        zIndex: 0,
        opacity: 0.75,
    },

    content: {
        paddingTop: 220,
        position: "relative",
        zIndex: 1,

        [theme.fn.smallerThan("sm")]: {
            paddingTop: 120,
        },
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        textAlign: "center",
        fontWeight: 900,
        fontSize: 38,

        [theme.fn.smallerThan("sm")]: {
            fontSize: 32,
        },
    },

    description: {
        maxWidth: 540,
        margin: "auto",
        marginTop: theme.spacing.xl,
        //@ts-ignore
        marginBottom: 1.5 * theme.spacing.xl,
    },
}));

export function NothingFoundBackground() {
    const { classes } = useStyles();
    const router = useRouter();

    return (
        <>
            <Head>
                <title>404 | Stockpile</title>
                <meta name="description" content="Page not found." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <Container className={classes.root} mt={80}>
                    <div className={classes.inner}>
                        <div className={classes.content}>
                            <Title className={classes.title}>
                                Whoops! There's nothing here!
                            </Title>
                            <Text
                                color="dimmed"
                                size="lg"
                                align="center"
                                className={classes.description}
                            >
                                Page you are trying to open does not exist. You may have mistyped
                                the address, or the page has been moved to another URL. If you
                                think this is an error contact support.
                            </Text>
                            <Group position="center" mt="md">
                                <Button size="lg" radius="lg" onClick={() => router.push(`/`)}>
                                    Take me back to home page
                                </Button>
                            </Group>
                        </div>
                    </div>
                </Container>
            </Layout>
        </>
    );
}

export default NothingFoundBackground;