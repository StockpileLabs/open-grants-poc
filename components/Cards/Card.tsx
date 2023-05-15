import React from "react";
import {
    Card,
    Image,
    Text,
    Group,
    Badge,
    createStyles,
    Progress,
} from "@mantine/core";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        "&:hover": {
            transform: "scale(1.03)",
        },
    },

    section: {
        borderBottom: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
            }`,
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        paddingBottom: theme.spacing.md,
    },

    label: {
        textTransform: "uppercase",
        fontSize: theme.fontSizes.xs,
        fontWeight: 700,
    },
}));

interface GrantCardProps {
    id: string,
    name: string,
    description: string,
    imageLink: string,
    raised: number,
    goal: number,
    tagline: string,
    tag: string,
}

export function FundraiserCard(props: GrantCardProps) {
    const { classes } = useStyles();
    let {
        id,
        name,
        description,
        imageLink,
        raised,
        goal,
        tagline,
        tag,
    } = props;

    return (
        <>
            <Card
                withBorder
                component="a"
                href={`/grant/${String(id)}`}
                radius="md"
                p="md"
                shadow="md"
                h={"100%"}
                className={classes.card}
            >
                <Card.Section>
                    <Image src={String(imageLink)} alt="fundraiser image" height={200} />
                </Card.Section>

                <Card.Section className={classes.section} mt="md">
                    <Group position="apart">
                        <Text size="lg" weight={700}>
                            {name}
                        </Text>
                        <Badge variant="outline" color="orange" size="sm" radius="md">
                            {tag}
                        </Badge>
                    </Group>
                    <Group>
                        <Text size="sm" weight={500} mt={5} color="dimmed">
                            {tagline}
                        </Text>
                    </Group>
                </Card.Section>

                <Card.Section className={classes.section}>
                    <Group mt="md" mb="sm" spacing={5} sx={{ alignItems: "center" }}>
                        <Text size="lg" color="black" weight="bold">
                            ${(raised).toFixed(2)}
                        </Text>
                        <Text
                            className={classes.label}
                            pt={2}
                            color="dimmed"
                            align="justify"
                            inline
                        >
                            raised
                        </Text>
                    </Group>
                    <Progress value={(raised / goal) * 100} striped animate />
                </Card.Section>
            </Card>
        </>
    );
}

export default FundraiserCard;