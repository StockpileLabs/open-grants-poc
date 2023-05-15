import { db } from "@/context/firebase";
import { DocumentData, addDoc, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";

interface GrantApplication {
  name: string;
  oneLiner: string;
  firstName: string;
  lastName: string;
  website: string;
  twitter: string;
  email: string;
  country: string;
  proposal: string;
  repo: string;
  image: string;
  pool: string;
  fundingAmount: number;
  approved: boolean;
}

export async function deployGrant(grant: GrantApplication) {
  const grantPoolQuery = await query(collection(db, `pools`), where(`name`, `==`, grant.pool));

  const getPool = getDocs(grantPoolQuery);

  let grantPools: Array<DocumentData> = [];

  (await getPool).forEach((doc: any) => {
    console.log(doc.id + "=>" + doc.data());
    /* {
      id: doc.id,
      data: {
        ...doc.data(),
      },
    }*/
  });

  await addDoc(collection(db, `grants`), {
    name: grant.name,
    tagline: grant.oneLiner,
    firstName: grant.firstName,
    lastName: grant.lastName,
    website: grant.website,
    twitter: grant.twitter,
    email: grant.email,
    country: grant.country,
    proposal: grant.proposal,
    goal: grant.fundingAmount,
    image: grant.image,
    repo: grant.repo,
    tag: "Dev-Tools",
    pool: "Solana Foundation Dev-Tools Round",
    raised: 0,

    approved: false,
  });
}
