import { db } from "@/context/firebase";
import { useStockpile } from "@/context/StockpileProvider";
import { Stepper } from "@mantine/core";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  increment,
  updateDoc,
} from "firebase/firestore";
import { Form, Formik } from "formik";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaWpforms, FaRegEnvelope } from "react-icons/fa";
import Amount from "./Amount";
import Auth from "./Auth";
import { useFirebase } from "@/context/FirebaseProvider";
import { StepFragmentComponent } from "@mantine/core/lib/Stepper/Step/Step";

interface StepProps {
    tag: string,
    pubkey: string,
    setOpened: Function,
    name: string,
    image: string,
    exception: boolean,
}

const ContributeSteps = ({
  tag,
  pubkey,
  setOpened,
  name,
  image,
  exception,
}: StepProps) => {
  const {
    query: { id },
  } = useRouter();
  const {
    connected,
    publicKey,
    user,
    contributeFundraiser,
    contributeExceptionFundraiser,
  } = useStockpile();
  const { userDoc } = useFirebase();
  const [active, setActive] = useState(0);

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  async function handleSubmit(amount: number, pubkey: string, tag: string) {
    if (connected) {
      try {
        if (amount >= 0.01) {
          var tx = await contributeFundraiser(pubkey, amount, tag);

            const docRef = doc(db, `grants/${id}`);
            await updateDoc(docRef, {
              raised: increment(amount * LAMPORTS_PER_SOL),
              balance: increment(amount * LAMPORTS_PER_SOL),
              contributions: increment(1),
            });

            await addDoc(collection(db, `grants/${id}/contributors`), {
              contributor: String(publicKey),
              amount: amount,
              time: moment().unix(),
            });

        } else {
          toast.error("Please enter an amount above 0.1 SOL.");
        }

        return tx;
      } catch (err) {
        throw new Error("Contribution failed.");
      }
    }
  }

  async function handleException(amount: number, pubkey: string, tag: string) {
    if (connected) {
      console.log("Making exception...");
      var tx = await contributeExceptionFundraiser(pubkey, amount);
      const docRef = doc(db, `charities/${id}`);
      await updateDoc(docRef, {
        raised: increment(amount * LAMPORTS_PER_SOL),
        balance: increment(amount * LAMPORTS_PER_SOL),
        contributions: increment(1),
      });

      return tx;
    } else {
      throw new Error("Wallet not connected.");
    }
  }

  return (
    <>
      <Formik
        initialValues={{
          amount: "",
        }}
        onSubmit={async (values) => {
          if (exception == false || exception == undefined) {
            await toast.promise(
              handleSubmit(
                Number(values.amount),
                String(pubkey),
                String(tag)
              ),
              {
                loading: "Loading...",
                success: (tx) => (
                  <span>
                    Wahooo! Contributed {values.amount} SOL!{" "}
                    <a
                      href={`https://solana.fm/tx/${tx.txhash}?cluster=mainnet-solanafmbeta`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </span>
                ),
                error: (err) => `${err}`,
              },
              {
                style: {
                  minWidth: "250px",
                },
                success: {
                  duration: 5000,
                  icon: "🔥",
                },
              }
            );
            setOpened(false);

            await updateDoc(doc(db, `/users/${userDoc[0].id}`), {
              contributions: increment(1),
            });
          } else {
            await toast.promise(
              handleException(
                Number(values.amount),
                String(pubkey),
                String(tag)
              ),
              {
                loading: "Loading...",
                success: (tx) => (
                  <span>
                    Wahooo! Contributed {values.amount} SOL!{" "}
                    <a
                      href={`https://solana.fm/tx/${tx.txhash}?cluster=mainnet-solanafmbeta`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </span>
                ),
                error: (err) => `${err}`,
              },
              {
                style: {
                  minWidth: "250px",
                },
                success: {
                  duration: 5000,
                  icon: "🔥",
                },
              }
            );
            setOpened(false);

            await updateDoc(doc(db, `/users/${userDoc[0].id}`), {
              contributions: increment(1),
            });

          }
        }}
      >
        {(formikProps) => (
          <Form>
            <Stepper active={active} onStepClick={setActive}>
              <Stepper.Step icon={FaWpforms as StepFragmentComponent} allowStepSelect={active > 0}>
                <Auth nextStep={nextStep} />
              </Stepper.Step>
              <Stepper.Step icon={FaRegEnvelope as StepFragmentComponent}>
                <Amount prevStep={prevStep} formProps={formikProps} />
              </Stepper.Step>
            </Stepper>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ContributeSteps;
