import React from "react";
import {
  Container,
  Paper,
  Tabs,
  Badge,
  Text,
  Divider,
  Group,
  SimpleGrid,
  Center,
  Anchor,
} from "@mantine/core";
import moment from "moment/moment";

export const FundraiserTabs = (props: any) => {
  const { contributors, description, comments } = props;

  return (
    <Container fluid>
      <Tabs defaultValue="description">
        <Tabs.List>
          <Tabs.Tab
            value="description"
          >
            Description
          </Tabs.Tab>
          <Tabs.Tab
            value="contributors"
            rightSection={
              <Badge
                sx={{ width: 16, height: 16, pointerEvents: "none" }}
                variant="filled"
                size="xs"
                p={0}
              >
                {contributors.length}
              </Badge>
            }
          >
            Contributors
          </Tabs.Tab>
          <Tabs.Tab
            value="comments"
            rightSection={
              <Badge
                sx={{ width: 16, height: 16, pointerEvents: "none" }}
                variant="filled"
                size="xs"
                p={0}
              >
                0
              </Badge>
            }
          >
            Comments
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="description">
          <Container fluid mt="xl">
            <Text color="dimmed">
              {description}
            </Text>
          </Container>
        </Tabs.Panel>
        <Tabs.Panel value="contributors">
          <Container fluid mt="xl">
            {contributors.length > 0 ? (
              <SimpleGrid cols={3}>
                {contributors
                  .reverse()
                  .map((contributor: any, i: number) => (
                    <Paper key={i} shadow="md" p="lg">
                      <Text size="xl" mb="sm" weight={700}>
                        {contributor.data.amount} SOL
                      </Text>
                      <Divider py="sm" />
                      <Group position="apart" spacing="xl">
                        <Anchor
                          href={`https://solana.fm/address/${contributor.data.contributor}?cluster=devnet-solana`}
                        >
                          <Text size="lg" color="dimmed">
                            {String(contributor.data.contributor).slice(0, 4) +
                              "..." +
                              String(contributor.data.contributor).slice(
                                40,
                                45
                              )}
                          </Text>
                        </Anchor>

                        <Text color="dimmed" size="sm">
                          {moment
                            .unix(contributor.data.time)
                            .format("MM/DD/YYYY")}
                        </Text>
                      </Group>
                    </Paper>
                  ))}
              </SimpleGrid>
            ) : (
              <Center>
                <Text color="dimmed" weight="bold">
                  No contributors yet. Be the first!
                </Text>
              </Center>
            )}
          </Container>
        </Tabs.Panel>
        <Tabs.Panel value="comments">
          {comments.length > 0 ? null : (
            <Container fluid mt="xl">
              <Center>
                <Text color="dimmed" weight="bold">
                  No comments yet. Be the first!
                </Text>
              </Center>
            </Container>
          )}
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
};

export default FundraiserTabs;
