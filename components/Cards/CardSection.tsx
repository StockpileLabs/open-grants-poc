import React from "react";
import { Container, SimpleGrid, Title, Space } from "@mantine/core";
import FundraiserCard from "./Card";
import { useFirebase } from "@/context/FirebaseProvider";
import styles from "@/styles/Transitions.module.css";

interface Grant {
  id: string,
  data: {
    name: string,
    description: string,
    tag: string,
    tagline: string,
    image: string,
    raised: number,
    goal: number,
  }
}

const GrantsSection = ({ grants }: any) => {
  return (
    <Container fluid>
      <SimpleGrid
        spacing="md"
        breakpoints={[
          { maxWidth: 640, cols: 1, spacing: "md" },
          { maxWidth: 960, cols: 2, spacing: "md" },
        ]}
        cols={3}
      >
        {grants.map((grant: Grant, i: number) => (
          <div key={i} className={styles.fadeInUp}>
            <FundraiserCard
              id={grant.id}
              name={grant.data.name}
              description={grant.data.description}
              imageLink={grant.data.image}
              goal={grant.data.goal}
              raised={grant.data.raised}
              tag={grant.data.tag}
              tagline={grant.data.tagline}
            />
          </div>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default GrantsSection;
