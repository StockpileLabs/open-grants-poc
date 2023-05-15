import { Card, Avatar, Text, Progress, Badge, Group, ActionIcon } from '@mantine/core';
import Image from 'next/image';

const avatars = [
    'https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4',
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80',
    'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80',
];

const SOLANA_FNDN_LOGO = "https://solana.org/_next/static/media/solana_foundation_colored_logo_only.124d9acc.svg";

export function TaskCard() {
    return (
        <Card component='a' href={`/round/9yYILUkXiN4JoNl9DtqR`} withBorder padding="lg" radius="md">
            <Group position="apart">
                <Image src={SOLANA_FNDN_LOGO} height="32" width="32" alt="Grant logo" />
                <Badge>12 days left</Badge>
            </Group>

            <Text fz="lg" fw={900} mt="md">
                Solana Foundation Dev-Tools Support
            </Text>
            <Text fz="sm" c="dimmed" mt={5}>
                Support projects building developer tools on Solana as public goods. Contribute to cast your vote for funds to be distributed.
            </Text>

            <Group position="apart">
                <Text c="dimmed" fz="sm" mt="md">
                    Funds Available:{' '}
                    <Text
                        span
                        fw={700}
                        sx={(theme) => ({ color: theme.colorScheme === 'dark' ? theme.white : theme.black })}
                    >
                        $1m
                    </Text>
                </Text>
                <Text c="dimmed" fz="sm" mt="md">
                    Fundraisers Participating:{' '}
                    <Text
                        span
                        fw={700}
                        sx={(theme) => ({ color: theme.colorScheme === 'dark' ? theme.white : theme.black })}
                    >
                        23
                    </Text>
                </Text>
            </Group>

            <Progress value={(23 / 36) * 100} mt={5} />

            <Group position="apart" mt="md">
                <Avatar.Group spacing="sm">
                    <Avatar src={avatars[0]} radius="xl" />
                    <Avatar src={avatars[1]} radius="xl" />
                    <Avatar src={avatars[2]} radius="xl" />
                    <Avatar radius="xl">+5</Avatar>
                </Avatar.Group>
            </Group>
        </Card>
    );
}

