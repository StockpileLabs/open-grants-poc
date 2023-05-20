import React, { useState } from 'react';
import { createStyles, Header, Group, Container, Burger, rem, Button, ActionIcon, Menu } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconBolt, IconMoneybag, IconPlugConnected, IconPlugX, IconSettings, IconStar, IconTrash } from '@tabler/icons-react';
import Image from 'next/image';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from "../../styles/Home.module.css";

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: rem(56),

    [theme.fn.smallerThan('sm')]: {
      justifyContent: 'flex-start',
    },
  },

  links: {
    width: rem(260),

    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  social: {
    width: rem(260),

    [theme.fn.smallerThan('sm')]: {
      width: 'auto',
      marginLeft: 'auto',
    },
  },

  burger: {
    marginRight: theme.spacing.md,

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },

  /*
  header: {
    maxWidth: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 15,
    marginBottom: 80,
    position: "sticky",
    border: "0.5px solid",
    borderRadius: 25,
    borderColor: "orange",
    backdropFilter: "blur"
  },
  */

  wrapper: {
    position: "sticky",
  }
}));

interface HeaderMiddleProps {
  links: { link: string; label: string }[];
}

const links = [
  {
    link: "/explore",
    label: "Explore",
  },
  {
    link: "/create",
    label: "Create",
  },
  {
    link: "/about",
    label: "How It Works",
  },
];

export function HeaderMiddle() {
  const router = useRouter();
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(router.pathname);
  const { classes, cx } = useStyles();
  const { setVisible } = useWalletModal();
  const { connected, disconnect } = useWallet();

  const connectWallet = () => {
    setVisible(true);
  };

  const disconnectWallet = () => {
    disconnect();
  };

  const items = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={cx(classes.link, { [classes.linkActive]: active === link.link })}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
        router.push(link.link)
      }}>
      {link.label}
    </Link>
  ));

  return (
    <Header height={56} withBorder={false} className={styles.header}>
      <Container className={classes.inner}>
        <Burger opened={opened} onClick={toggle} size="sm" className={classes.burger} />
        <Group className={classes.links} spacing={5}>
          {items}
        </Group>

        <Link href="/">
          <Image
            priority
            src="/logo.svg"
            alt="Stockpile"
            width={40}
            height={40}
          />
        </Link>

        <Group spacing={0} className={classes.social} position="right" noWrap>
          {connected ? (
            <Menu>
              <Menu.Target>
                <Button
                  leftIcon={<IconStar size={14} />}
                  variant="gradient"
                  gradient={{ from: "orange", to: "red" }}
                  radius="lg"
                  pl="md"
                >
                  Manage
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>General</Menu.Label>
                <Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>
                <Link href="/Dashboard" passHref>
      <Menu.Item icon={<IconMoneybag size={14} />}>
        <a>My Fundraisers</a>
      </Menu.Item>
    </Link>

                <Menu.Divider />

                <Menu.Label>Account</Menu.Label>
                <Menu.Item icon={<IconPlugX size={14} />} onClick={() => disconnectWallet()}>Sign Out</Menu.Item>
                <Menu.Item color="red" icon={<IconTrash size={14} />}>Delete</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          ) : (
            <Button
              leftIcon={<IconPlugConnected size={14} />}
              variant="gradient"
              gradient={{ from: "orange", to: "red" }}
              radius="lg"
              pl="md"
              onClick={() => connectWallet()}
            >
              Sign-In with Solana
            </Button>
          )}
        </Group>
      </Container>
    </Header>
  );
}