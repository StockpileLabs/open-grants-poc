import {
    createStyles,
    Badge,
    Group,
    Title,
    Text,
    Card,
    SimpleGrid,
    Container,
    rem,
} from '@mantine/core';
import { IconGauge, IconUser, IconCookie, IconCoins, IconChecks, IconBolt } from '@tabler/icons-react';

const mockdata = [
    {
        title: 'Quick and Easy',
        description:
            'Build an awesome public good for developers, fill out a form, draft a proposal, and you are off to the races.',
        icon: IconBolt,
    },
    {
        title: 'Fully Verifiable',
        description:
            "All actions are posted on-chain, so you can be sure funds are being distributed correctly.",
        icon: IconChecks,
    },
    {
        title: 'Fair Distribution',
        description:
            'With quadratic funding, grant capital distribution is resistant to whales attempting to skew the vote.',
        icon: IconCoins,
    },
];

const useStyles = createStyles((theme) => ({
    title: {
        fontSize: rem(34),
        fontWeight: 900,

        [theme.fn.smallerThan('sm')]: {
            fontSize: rem(24),
        },
    },

    description: {
        maxWidth: 600,
        margin: 'auto',

        '&::after': {
            content: '""',
            display: 'block',
            backgroundColor: theme.fn.primaryColor(),
            width: rem(45),
            height: rem(2),
            marginTop: theme.spacing.sm,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },

    card: {
        border: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
            }`,
    },

    cardTitle: {
        '&::after': {
            content: '""',
            display: 'block',
            backgroundColor: theme.fn.primaryColor(),
            width: rem(45),
            height: rem(2),
            marginTop: theme.spacing.sm,
        },
    },
}));

export function AboutHead() {
    const { classes, theme } = useStyles();
    const features = mockdata.map((feature) => (
        <Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl">
            <feature.icon size={rem(50)} stroke={2} color={theme.fn.primaryColor()} />
            <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
                {feature.title}
            </Text>
            <Text fz="sm" c="dimmed" mt="sm">
                {feature.description}
            </Text>
        </Card>
    ));

    return (
        <Container mt={85} size="lg" py="xl">
            <Group position="center">
                <Badge variant="filled" size="lg">
                    Stockpile
                </Badge>
            </Group>

            <Title order={1} className={classes.title} ta="center" mt="sm">
                Distributing community grants fairly and equitably
            </Title>

            <Text c="dimmed" className={classes.description} ta="center" mt="md">
                Get access to fairly distributed developer tools grants powered by
                a modified implementation of quadratic funding.
            </Text>

            <SimpleGrid cols={3} spacing="xl" mt={50} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
                {features}
            </SimpleGrid>
        </Container>
    );
}

export default AboutHead;