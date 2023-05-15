import React from "react";
import { createContext, useContext, useMemo, useEffect, useState } from "react";
import * as anchor from "@coral-xyz/anchor";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import {
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { IDL } from "@/lib/stockpile";
import { useFirebase } from "./FirebaseProvider";

const utf8 = require("utf8");

const StockpileContext = createContext<any>(null);

//DB needs to be switched for new pubkeys to work correctly
//or else transactions will return 0xbbf error
const PROGRAM_ID = new PublicKey(
  "7XajpmvbZwBkGg9Rrz9fb8iHdy1uWhiSVwVsdrGUSk7P"
);

export const useStockpile = () => {
  const context = useContext(StockpileContext);
  if (!context) {
    throw new Error("Parent must be wrapped inside StockpileProvider");
  }
  return context;
};

export const StockpileProvider = ({ children }: any) => {
  const [initialized, setInitialized] = useState<boolean>();
  const [loadingUser, setLoadingUser] = useState<boolean>();
  const [user, setUser] = useState<any>();
  const [balance, setBalance] = useState<number>();
  const { getUser } = useFirebase();
  const anchorWallet = useAnchorWallet();
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();

  const program = useMemo(() => {
    if (anchorWallet) {
      const provider = new anchor.AnchorProvider(
        connection,
        anchorWallet,
        //@ts-ignore
        anchor.AnchorProvider.defaultOptions
      );
      return new anchor.Program(IDL, PROGRAM_ID, provider);
    }
  }, [connection, anchorWallet]);

  useEffect(() => {
    const start = async () => {
      if (program && publicKey) {
        try {
          setLoadingUser(true);
          let fetchBalance = await connection.getBalance(publicKey);
          const userBalance = fetchBalance / LAMPORTS_PER_SOL;
          setBalance(userBalance);

          const [userPDA, bump] = await PublicKey.findProgramAddressSync(
            [utf8.encode("fuckItWeBall!"), publicKey.toBuffer()],
            program.programId
          );
          const userAcc = await program.account.User.fetch(userPDA.toString());
          getUser(userPDA.toString());
          setUser(userAcc);

          if (userAcc) {
            //console.log(`Found User Address: bump: ${bump}, pubkey: ${userPDA.toBase58()}`);
            setInitialized(true);
          }
        } catch (err) {
          console.log(err);
        } finally {
          setLoadingUser(false);
        }
      }
    };
    start();
  }, [program, publicKey]);

  /*
  NAME: FIND_FUNDRAISER_PDA

  PURPOSE: Find fundraiser vault address based on required seeds.

  EXPECTED BEHAVIOR: <RECIEVE FUNDRAISER NAME AND USERPDA> ---> <FIND PROGRAM ADDRESS BASED ON SEEDS IN IDL>
    ---> <CONSOLE LOG ADDRESS & BUMP> ---> <RETURN OBJECT CONTAINING VAULT ADDRESS & BUMP>
  */

  const getProgramDerivedFundraiserAddress = async (name: String, userPDA: PublicKey) => {
    const [fundraiserPDA, bump] = await PublicKey.findProgramAddressSync(
      [utf8.encode(name), userPDA.toBuffer(), publicKey?.toBuffer()],
      //@ts-ignore
      program.programId
    );

    console.log(
      `Got ProgramDerivedAddress: bump: ${bump}, pubkey: ${fundraiserPDA.toBase58()}`
    );
    return { fundraiserPDA, bump };
  };

  /*
  NAME: FIND_USER_PDA

  PURPOSE: Find a user's user address based on connected pubkey

  EXPECTED BEHAVIOR: <FIND PROGRAM ADDRESS BASED ON SEEDS> ---> <CONSOLE LOG BUMP & USER PDA KEY>
    ---> <RETURN USER PDA & BUMP OBJECT>
  */

  const getProgramDerivedUserAddress = async () => {
    const [userPDA, bump] = await PublicKey.findProgramAddressSync(
      [utf8.encode("fuckItWeBall!"), publicKey?.toBuffer()],
      //@ts-ignore
      program.programId
    );

    console.log(
      `Got ProgramDerivedAddress: bump: ${bump}, pubkey: ${userPDA.toBase58()}`
    );
    return { userPDA, bump };
  };

  return (
    <StockpileContext.Provider
      value={{
        publicKey,
        connected,
        anchorWallet,
        program,
        loadingUser,
        initialized,
        setInitialized,
        user,
        balance,
        getProgramDerivedFundraiserAddress,
        getProgramDerivedUserAddress,
      }}
    >
      {children}
    </StockpileContext.Provider>
  );
};