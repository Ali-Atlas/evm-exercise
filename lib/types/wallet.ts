// Unified wallet types for cross-chain abstraction

export type ChainType = 'EVM' | 'STARKNET';

export interface UnifiedWallet {
  type: ChainType;
  address: string;
  chainId: string | number;
  chainName: string;
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  signTransaction: (tx: UnifiedTransaction) => Promise<string>;
}

export interface UnifiedTransaction {
  from: string;
  to: string;
  data?: string;
  value?: string;
  chainType: ChainType;
  // Chain-specific fields
  nonce?: number | string;
  gasLimit?: string;
  maxFee?: string;
}

export interface WalletState {
  evmWallet?: UnifiedWallet;
  starknetWallet?: UnifiedWallet;
  connecting: boolean;
  error?: Error;
}
