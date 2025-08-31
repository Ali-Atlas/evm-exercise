import type { Metadata } from 'next';
import { Web3Provider } from '@/providers/Web3Provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cross-Chain DeFi Portfolio | Re7 Capital',
  description: 'Unified interface for EVM and StarkNet DeFi positions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Web3Provider>
          {children}
        </Web3Provider>
      </body>
    </html>
  );
}
