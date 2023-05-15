import React from "react";
import { Text, Progress, Card, Space } from "@mantine/core";

export function ProgressCard(props: any) {
  const { raised, goal, contributions } = props;

  return (
    <Card
      withBorder
      radius="md"
      p="xl"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        "@media (max-width: 640px)": {
          width: "100%",
        },
      })}
    >
      <Text size="sm" transform="uppercase" weight={700} color="dimmed">
        Total Raised
      </Text>
      <Text size="xl" weight={500}>
        $ {String(raised)} / $ {String(goal)}
      </Text>
      <Progress
        value={(raised / goal) * 100}
        mt="md"
        size="lg"
        radius="xl"
        striped
        animate
      />
      <Space h="sm" />
      <Text size="xs" weight={600} color="dimmed">
        Total Contributions: {contributions}
      </Text>
    </Card>
  );
}

export default ProgressCard;
