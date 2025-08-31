import { type UnifiedWallet, type UnifiedTransaction } from '@/lib/types/wallet';

export class EVMWalletAdapter implements UnifiedWallet {
  type: 'EVM' = 'EVM' as const;
  address: string;
  chainId: number;
  chainName: string;
  isConnected: boolean;

  constructor(address: string, chainId: number, chainName: string) {
    this.address = address;
    this.chainId = chainId;
    this.chainName = chainName;
    this.isConnected = true;
  }

  async connect(): Promise<void> {
    this.isConnected = true;
  }

  async disconnect(): Promise<void> {
    this.isConnected = false;
  }

  async signTransaction(tx: UnifiedTransaction): Promise<string> {
    // Simplified for demo
    return `0x${Date.now().toString(16)}`;
  }
}
