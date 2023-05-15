import {
    collection,
    getDocs,
    setDoc,
    doc,
    getDoc,
    where,
    query,
  } from "firebase/firestore";
  import React, { createContext, useContext, useEffect, useState } from "react";
  import { db } from "./firebase";

  const firebase = createContext<any>(null);
  
  export const useFirebase = () => {
    const context = useContext(firebase);
    if (!context) {
      throw new Error("Parent must be wrapped inside StateProvider");
    }
  
    return context;
  };
  
  export const FirebaseProvider = ({ children }: any) => {
    const [grants, setGrants] = useState<any>();
    const [contributors, setContributors] = useState<any>([]);
    const [userDoc, setUserDoc] = useState<Array<{}>>();
  
    useEffect(() => {
      const getGrants = async () => {
        const querySnapshot = await getDocs(collection(db, "grants"));
  
        setGrants(
          querySnapshot.docs.map((doc) => {
            return {
              id: doc.id,
              data: {
                ...doc.data(),
              },
            };
          })
        );
      };
      getGrants();
    }, []);
  
    async function getContributors(id: string, category: {category: string}) {
      const querySnapshot = await getDocs(
        collection(db, `${String(category.category)}/${String(id)}/contributors`)
      );
  
      setContributors(
        querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            data: {
              ...doc.data(),
            },
          };
        })
      );
  
      return contributors;
    }
  
    async function getUser(pubkey: string) {
      const q = await query(
        collection(db, `users`),
        where("pubkey", "==", pubkey)
      );
  
      const querySnapshot = await getDocs(q);
  
      setUserDoc(
        querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            data: {
              ...doc.data(),
            },
          };
        })
      );
    }
  
    return (
      <firebase.Provider
        value={{
          grants,
          contributors,
          userDoc,
          getContributors,
          getUser,
        }}
      >
        {children}
      </firebase.Provider>
    );
  };
  