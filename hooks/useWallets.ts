'use client';

import { useAccount } from 'wagmi';
import { useState, useCallback } from 'react';
import { EVMWalletAdapter } from '@/lib/wallet/evm-adapter';
import { StarkNetWalletAdapter } from '@/lib/wallet/starknet-adapter';

export function useWallets() {
  const { address: evmAddress, isConnected: evmConnected } = useAccount();
  const [starknetWallet, setStarknetWallet] = useState<StarkNetWalletAdapter | null>(null);

  const connectStarkNet = useCallback(async () => {
    // Mock connection for demo - in production would use @starknet-io/get-starknet
    const mockAddress = '0x' + Math.random().toString(16).slice(2, 10);
    const wallet = new StarkNetWalletAdapter(mockAddress, '0x534e5f5345504f4c4941');
    setStarknetWallet(wallet);
  }, []);

  return {
    evmWallet: evmAddress ? new EVMWalletAdapter(evmAddress, 11155111, 'Sepolia') : null,
    starknetWallet,
    connectStarkNet,
    evmConnected,
  };
}
