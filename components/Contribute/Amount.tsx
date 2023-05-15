//@ts-nocheck
import { Stack, Button, Group, Text, Center } from "@mantine/core";
import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaMoneyCheckAlt } from "react-icons/fa";
import CashInput from "./CashAppInput";

const Amount = ({ prevStep, formProps }) => {
  const { handleSubmit, setFieldValue } = formProps;
  const [amount, setAmount] = useState();

  useEffect(() => {
    setFieldValue("amount", amount);
  }, [amount]);

  return (
    <Stack p="lg">
      <Group position="center" mt="md" mb="lg">
        <CashInput amount={amount} setAmount={setAmount} />
      </Group>
      <Group position="center">
        <Button
          leftIcon={<FaArrowLeft />}
          size="lg"
          radius="lg"
          variant="gradient"
          gradient={{ from: "orange", to: "red" }}
          onClick={prevStep}
        >
          Previous
        </Button>
        <Button
          rightIcon={<FaMoneyCheckAlt />}
          variant="gradient"
          radius="lg"
          size="lg"
          gradient={{ from: "orange", to: "red" }}
          onClick={handleSubmit}
        >
          Send
        </Button>
      </Group>
      <Center>
        <Text color="dimmed" size="xs">
          *Amounts are denominated in SOL. Minimum 0.1 SOL.
        </Text>
      </Center>
    </Stack>
  );
};

export default Amount;
