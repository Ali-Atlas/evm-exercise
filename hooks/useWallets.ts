'use client';

import { useAccount } from 'wagmi';
import { useState, useCallback } from 'react';
import { EVMWalletAdapter } from '@/lib/wallet/evm-adapter';
import { StarkNetWalletAdapter } from '@/lib/wallet/starknet-adapter';

export function useWallets() {
  const { address: evmAddress, isConnected: evmConnected } = useAccount();
  const [starknetWallet, setStarknetWallet] = useState<StarkNetWalletAdapter | null>(null);

  const connectStarkNet = useCallback(async () => {
    // Mock StarkNet connection for demo
    const mockAddress = '0x04' + Math.random().toString(16).slice(2, 42).padEnd(40, '0');
    const wallet = new StarkNetWalletAdapter(mockAddress, '0x534e5f5345504f4c4941');
    setStarknetWallet(wallet);
  }, []);

  const disconnectStarkNet = useCallback(() => {
    setStarknetWallet(null);
  }, []);

  return {
    evmWallet: evmAddress ? new EVMWalletAdapter(evmAddress, 11155111, 'Sepolia') : null,
    starknetWallet,
    connectStarkNet,
    disconnectStarkNet,
    evmConnected,
  };
}
