import React, { useState } from "react";
import { Group, Input } from "@mantine/core";
import styles from "../../styles/Home.module.css";

interface CashInputProps {
  amount: number,
  setAmount: Function,
}

const CashInput = ({ amount, setAmount }: CashInputProps) => {
  return (
    <input
      className={styles.cashInput}
      name="amount"
      type="number"
      pattern="[0-9]*"
      min={0}
      max={10000}
      placeholder="0"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
    />
  );
};

export default CashInput;
