import '@/styles/globals.css'
import { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import { FirebaseProvider } from '@/context/FirebaseProvider';
import { StockpileProvider } from '@/context/StockpileProvider';
import { SolanaProviders } from '@/context/SolanaProvider';
import { Toaster } from 'react-hot-toast';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <SolanaProviders>
        <FirebaseProvider>
          <StockpileProvider>
            <MantineProvider
              withGlobalStyles
              withNormalizeCSS
              theme={{
                primaryColor: "orange",
                colorScheme: 'light',
              }}
            >
              <Toaster position="bottom-center" />
              <Component {...pageProps} />
            </MantineProvider>
          </StockpileProvider>
        </FirebaseProvider>
      </SolanaProviders>
    </>
  );
}