// Chain configurations following DeFi standards
export const SUPPORTED_CHAINS = {
  EVM: {
    ETHEREUM_SEPOLIA: {
      id: 11155111,
      name: 'Sepolia',
      nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
      rpcUrl: process.env.NEXT_PUBLIC_ETH_RPC_URL || 'https://ethereum-sepolia-rpc.publicnode.com',
      blockExplorer: 'https://sepolia.etherscan.io',
    },
  },
  STARKNET: {
    SEPOLIA: {
      id: '0x534e5f5345504f4c4941',
      name: 'StarkNet Sepolia',
      nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
      rpcUrl: process.env.NEXT_PUBLIC_STARKNET_RPC_URL || 'https://starknet-sepolia.public.blastapi.io',
      blockExplorer: 'https://sepolia.starkscan.co',
    },
  },
} as const;

// Protocol addresses - checksummed
export const PROTOCOL_ADDRESSES = {
  UNISWAP_V3: {
    FACTORY: '0x0227628f3F023bb0B980b67D528571c95c6DaC1c',
    NONFUNGIBLE_POSITION_MANAGER: '0x1238536071E1c677A632429e3655c799b22cDA52',
    SWAP_ROUTER: '0x3bFA4769FB09eefC5a80d6E87c3B9C650f7Ae48E',
  },
} as const;

// Safety constants
export const MAX_UINT256 = 2n ** 256n - 1n;
export const SLIPPAGE_TOLERANCE = 50n; // 0.5% in basis points
