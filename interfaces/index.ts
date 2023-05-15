export interface FundingRound {
  id: string;
  keyItems: {
    name: string;
    description: string;
    image: string;
    tag: string;
    totalAmount: number;
    totalFundraisers: number;
    fundraisers: string[];
    startDate: number;
    endDate: number;
  };
}

export interface Grant {
  id: string;
  keyItems: {
    name: string;
    description: string;
    tagline: string;
    tag: string;
    image: string;
    firstName: string;
    lastName: string;
    beneficiary: string;
    pubkey: string;
    twitter: string;
    repo: string;
    website: string;
    proposal: string;
    pool: string;
    raised: number;
    goal: number;
    time: number;
    contributions: number;
  };
  contributorItems: [
    {
      id: string;
      data: {};
    }
  ];
  commentItems: [
    {
      id: string;
      data: {};
    }
  ];
}
