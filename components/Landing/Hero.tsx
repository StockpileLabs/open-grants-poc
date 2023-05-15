import {
    createStyles,
    Image,
    Container,
    Title,
    Button,
    Group,
    Text,
    List,
    ThemeIcon,
    rem,
} from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import image from './image.svg';

const useStyles = createStyles((theme) => ({
    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: `calc(${theme.spacing.xl} * 4)`,
        paddingBottom: `calc(${theme.spacing.xl} * 4)`,
    },

    content: {
        maxWidth: rem(480),
        marginRight: `calc(${theme.spacing.xl} * 3)`,

        [theme.fn.smallerThan('md')]: {
            maxWidth: '100%',
            marginRight: 0,
        },
    },

    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: rem(44),
        lineHeight: 1.2,
        fontWeight: 900,

        [theme.fn.smallerThan('xs')]: {
            fontSize: rem(28),
        },
    },

    control: {
        [theme.fn.smallerThan('xs')]: {
            flex: 1,
        },
    },

    image: {
        flex: 1,

        [theme.fn.smallerThan('md')]: {
            display: 'none',
        },
    },

    highlight: {
        position: 'relative',
        backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
        borderRadius: theme.radius.sm,
        padding: `${rem(4)} ${rem(12)}`,
    },
}));

export function HeroBullets() {
    const { classes } = useStyles();
    return (
        <div>
            <Container>
                <div className={classes.inner}>
                    <div className={classes.content}>
                        <Title className={classes.title}>
                            Community <span className={classes.highlight}>Grants</span> <br /> By{" "}
                            <Text
                                component="span"
                                variant="gradient"
                                gradient={{ from: "orange", to: "red" }}
                                inherit
                            >
                                Stockpile
                            </Text>
                        </Title>
                        <Text color="dimmed" mt="md">
                            Create and contribute to open grant applications for developer tooling, powered by
                            a modified version of quadratic funding.
                        </Text>

                        <List
                            mt={30}
                            spacing="sm"
                            size="sm"
                            icon={
                                <ThemeIcon size={20} radius="xl">
                                    <IconCheck size={rem(12)} stroke={1.5} />
                                </ThemeIcon>
                            }
                        >
                            <List.Item>
                                <b>Fully Verifiable</b> – all contributions and applications are posted on-chain
                                using public Solana programs
                            </List.Item>
                            <List.Item>
                                <b>Developer Oriented</b> – funding rounds tailored for open-source public goods aimed
                                at improving Solana.
                            </List.Item>
                            <List.Item>
                                <b>Fairly Distributed</b> – funds are distributed equitably and fairly using a modified
                                implementation of quadratic funding.
                            </List.Item>
                        </List>

                        <Group mt={30}>
                            <Button
                                component="a"
                                href="/explore"
                                variant="gradient"
                                gradient={{ from: "orange", to: "red" }}
                                radius="xl"
                                size="md"
                                className={classes.control}
                            >
                                Get Started
                            </Button>
                            <Button variant="default" radius="xl" size="md" className={classes.control}>
                                Learn More
                            </Button>
                        </Group>
                    </div>
                    <Image src={image.src} className={classes.image} alt="Stockpile Rocket Graphic" />
                </div>
            </Container>
        </div>
    );
}