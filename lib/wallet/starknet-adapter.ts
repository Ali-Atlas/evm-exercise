import { type UnifiedWallet, type UnifiedTransaction } from '@/lib/types/wallet';

export class StarkNetWalletAdapter implements UnifiedWallet {
  type: 'STARKNET' = 'STARKNET' as const;
  address: string;
  chainId: string;
  chainName: string;
  isConnected: boolean;

  constructor(address: string, chainId: string) {
    this.address = address;
    this.chainId = chainId;
    this.chainName = 'StarkNet Sepolia';
    this.isConnected = true;
  }

  async connect(): Promise<void> {
    this.isConnected = true;
  }

  async disconnect(): Promise<void> {
    this.isConnected = false;
  }

  async signTransaction(tx: UnifiedTransaction): Promise<string> {
    // Cairo transaction format differs from EVM
    return `0xsn_${Date.now().toString(16)}`;
  }
}
