import React from "react";
import {
  Container,
  Paper,
  Group,
  Text,
  Anchor,
  ActionIcon,
  Tooltip,
  Button,
} from "@mantine/core";
import {
  FaTwitter,
  FaRegWindowMaximize,
  FaGithub,
} from "react-icons/fa";
import { useRouter } from "next/router";
import { CardWithStats } from "../Round/PoolInfoMini";
import { IconBook2 } from "@tabler/icons-react";

export const FundraiserInfo = (props: any) => {
  const { proposal, socials, pool } = props;
  const router = useRouter();

  return (
    <>
      <Container mt="sm" fluid>
        <Text
          size={28}
          weight="bold"
          mb="md"
          sx={(theme) => ({
            "&::after": {
              content: '""',
              display: "block",
              backgroundColor: theme.fn.primaryColor(),
              width: 45,
              height: 2,
              marginTop: theme.spacing.md,
              marginBottom: 30,
              marginRight: "auto",
            },
          })}
        >
          💸 Current Round
        </Text>
        <CardWithStats title={pool} image="https://i.imgur.com/ol6yLZY.jpg" description="Support projects building developer tools on Solana as public goods. Contribute to cast your vote for funds to be distributed." stats={[{ title: "Total Amount", value: "$1m" }, { title: "Fundraisers Participating", value: "23" }]} />
      </Container>
      <Container mt="xl" fluid>
        <Text
          size={28}
          weight="bold"
          mb="md"
          sx={(theme) => ({
            "&::after": {
              content: '""',
              display: "block",
              backgroundColor: theme.fn.primaryColor(),
              width: 45,
              height: 2,
              marginTop: theme.spacing.md,
              marginBottom: 30,
              marginRight: "auto",
            },
          })}
        >
          📚 Application
        </Text>
        <Button
          component="a"
          href={proposal}
          target="_blank"
          variant="gradient"
          gradient={{ from: "orange", to: "red" }}
          leftIcon={<IconBook2 />}
          size="lg"
          radius="lg"
          fullWidth
        >
          View Proposal
        </Button>
      </Container>
      {socials ? (
        <Container mt="xl" fluid>
          <Text
            size={28}
            weight="bold"
            mb="md"
            sx={(theme) => ({
              "&::after": {
                content: '""',
                display: "block",
                backgroundColor: theme.fn.primaryColor(),
                width: 45,
                height: 2,
                marginTop: theme.spacing.md,
                marginBottom: 30,
                marginRight: "auto",
              },
            })}
          >
            🔗 Official Links
          </Text>
          <Paper shadow="md" radius="md" p="md">
            <Group spacing="md">
              {socials.website ? (
                <Tooltip label="Website">
                  <Anchor href={socials.website} target="_blank">
                    <ActionIcon size="lg" radius="xl" variant="outline">
                      <FaRegWindowMaximize color="gray" size={16} />
                    </ActionIcon>
                  </Anchor>
                </Tooltip>
              ) : null}
              {socials.repo ? (
                <Tooltip label="GitHub Repo">
                  <Anchor href={socials.repo} target="_blank">
                    <ActionIcon size="lg" radius="xl" variant="outline">
                      <FaGithub color="gray" size={16} />
                    </ActionIcon>
                  </Anchor>
                </Tooltip>
              ) : null}
              {socials.twitter ? (
                <Tooltip label="Twitter">
                  <Anchor href={`${socials.twitter}`} target="_blank">
                    <ActionIcon size="lg" radius="xl" variant="outline">
                      <FaTwitter
                        color="gray"
                        size={16}
                        onClick={() => {
                          router.push(socials.twitter);
                        }}
                      />
                    </ActionIcon>
                  </Anchor>
                </Tooltip>
              ) : null}
            </Group>
          </Paper>
        </Container>
      ) : null}
    </>
  );
};

export default FundraiserInfo;
