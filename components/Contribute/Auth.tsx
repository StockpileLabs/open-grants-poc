import { useStockpile } from "@/context/StockpileProvider";
import {
  Anchor,
  Stack,
  Button,
  Text,
  Group,
  Container,
  Title,
  Center,
} from "@mantine/core";
//@ts-ignore
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useRouter } from "next/router";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

const Auth = ({ nextStep }: any) => {
  const router = useRouter();
  const { setVisible } = useWalletModal();
  const { initialized, connected, user } = useStockpile();

  return (
    <Stack p="lg">
      {!connected ? (
        <Container p="lg">
          <Button
            size="xl"
            radius="lg"
            variant="gradient"
            gradient={{ from: "orange", to: "red" }}
            onClick={() => setVisible(true)}
          >
            Please Connect a Wallet
          </Button>
        </Container>
      ) : (
        <>
          {!initialized ? (
            <Container p="lg">
              <Button
                size="xl"
                radius="lg"
                variant="gradient"
                gradient={{ from: "orange", to: "red" }}
                onClick={() => router.push(`/createuser`)}
              >
                Create a User
              </Button>
              <Group position="center" mt="sm">
                <Anchor onClick={nextStep}>
                  <Text color="orange">or continue as a guest.</Text>
                </Anchor>
              </Group>
            </Container>
          ) : (
            <Group position="center">
              <Stack align="center" spacing="lg">
                <Center>
                  <Title size={36} weight="bold">
                    Hello!
                  </Title>
                </Center>
                <Center mt="lg">
                  <Button
                    size="lg"
                    radius="lg"
                    variant="gradient"
                    gradient={{ from: "orange", to: "red" }}
                    onClick={nextStep}
                    rightIcon={<FaArrowRight />}
                  >
                    Continue
                  </Button>
                </Center>
              </Stack>
            </Group>
          )}
        </>
      )}
    </Stack>
  );
};

export default Auth;
