import React, { useState } from "react";
import {
  Badge,
  Container,
  Text,
  Title,
  Group,
  Button,
  Image,
  Avatar,
  Anchor,
  Modal,
} from "@mantine/core";
import {
  FaCoins,
  FaRegStar,
} from "react-icons/fa";
import ProgressCard from "./ProgressCard";
import { getRandomAvatar } from "@/lib/getAvatar";
import { useRouter } from "next/router";
import ContributeSteps from "../Contribute/Steps";
import { useStockpile } from "@/context/StockpileProvider";
import styles from "../../styles/Home.module.css";
import moment from "moment";

export const FundraiserHead = (props: any) => {
  const {
    id,
    beneficiary,
    pubkey,
    tag,
    image,
    name,
    tagline,
    firstName,
    lastName,
    author,
    authorImage,
    authorId,
    raised,
    goal,
    contributions,
    time,
    exception,
  } = props;

  const { publicKey } = useStockpile();

  const router = useRouter();
  const [opened, setOpened] = useState(false);

  const fullName = firstName + " " + lastName;

  return (
    <>
      <Modal
        title={
          <Text color="dimmed" weight="bold" tt="uppercase">
            Contribute
          </Text>
        }
        opened={opened}
        closeOnEscape={true}
        centered={true}
        onClose={() => setOpened(false)}
      >
        <ContributeSteps
          tag={tag}
          pubkey={pubkey}
          setOpened={setOpened}
          name={name}
          image={image}
          exception={exception}
        />
      </Modal>
      <Container fluid>
        <Group grow>
          <Container
            sx={{
              maxWidth: "65%",
              "@media (max-width: 1040px)": {
                maxWidth: "100%",
              },
              "@media (max-width: 640px)": {
                maxWidth: "100%",
              },
            }}
          >
            <Image
              src={image}
              alt={`${name}'s Preview Image`}
              height={575}
              width={"100%"}
              radius="md"
              p="md"
              className={styles.image}
            />
          </Container>
          <Container
            sx={{
              maxWidth: "33%",
              "@media (max-width: 1040px)": {
                maxWidth: "100%",
              },
              "@media (max-width: 640px)": {
                maxWidth: "100%",
              },
            }}
          >
            <Container
              fluid
              sx={{
                "@media (max-width: 1040px)": {
                  width: "100%",
                },
                "@media (max-width: 640px)": {
                  width: "100%",
                },
              }}
            >

              <Badge size="lg" mt="xl" radius="md" color="orange">
                {tag}
              </Badge>

              <Title size={48} weight="bold" mt={5}>
                {name}
              </Title>

              <Text
                color="dimmed"
                mt={6}
                size={20}
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
                {tagline}
              </Text>
              <ProgressCard
                raised={raised}
                goal={goal}
                contributions={contributions}
              />
              <Container fluid mt={30}>
                <Text
                  tt="uppercase"
                  color="dimmed"
                  size="md"
                  mb="sm"
                  weight={700}
                >
                  Deployer
                </Text>
                <Group grow>
                  <Group>
                    {authorImage ? (
                      <Avatar
                        src={authorImage}
                        alt="Creator Avatar"
                        radius="lg"
                      />
                    ) : (
                      <Avatar
                        src={getRandomAvatar(fullName)}
                        alt="Creator Avatar"
                        radius="lg"
                      />
                    )}
                    <Anchor href={`/user/${authorId}`}>
                      <Text size="lg" weight="bold">
                        {fullName}
                      </Text>
                    </Anchor>
                  </Group>
                </Group>
              </Container>
              {beneficiary == publicKey ? (
                <Button
                  size="lg"
                  radius="lg"
                  fullWidth
                  variant="gradient"
                  gradient={{ from: "orange", to: "red" }}
                  leftIcon={<FaRegStar />}
                  mt={30}
                  onClick={() => router.push(`/manage/${tag}/${id}`)}
                >
                  Manage
                </Button>
              ) : (
                <Button
                  size="lg"
                  radius="lg"
                  fullWidth
                  variant="gradient"
                  gradient={{ from: "orange", to: "red" }}
                  leftIcon={<FaCoins />}
                  mt={30}
                  onClick={() => setOpened(true)}
                >
                  Contribute
                </Button>
              )}
              <Group w={"100%"} position="apart">
                <Text
                  color="dimmed"
                  size="sm"
                  fw={600}
                  sx={{
                    "@media (max-width: 640px)": {
                      fontSize: 8,
                    },
                  }}
                >
                  Created: {moment.unix(time).format("MM/DD/YYYY")}
                </Text>
                <Text
                  color="dimmed"
                  size="sm"
                  fw={600}
                  sx={{
                    "@media (max-width: 640px)": {
                      fontSize: 8,
                    },
                  }}
                >
                  Updated: {moment.unix(time).format("MM/DD/YYYY")}
                </Text>
              </Group>
            </Container>
          </Container>
        </Group>
      </Container>
    </>
  );
};

export default FundraiserHead;
