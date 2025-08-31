# Cross-Chain DeFi Portfolio Tracker

Quick implementation of a unified interface for EVM and StarkNet wallets with transaction abstraction.

## What This Solves

Built a wallet abstraction layer that handles both MetaMask (EVM) and Braavos/ArgentX (StarkNet) with a single interface. The main challenge was abstracting the different transaction formats - EVM uses RLP encoding while StarkNet uses Cairo.

## Architecture

Created a `UnifiedWallet` interface that both wallet types implement:
- EVMWalletAdapter wraps wagmi/viem
- StarkNetWalletAdapter wraps starknet.js
- TransactionBuilder handles the different transaction formats

This way the UI doesn't need to know which chain it's dealing with.

## Tech Stack

- Next.js 15 with TypeScript
- Viem/Wagmi for EVM 
- Starknet.js for StarkNet
- RainbowKit for wallet UI
- CoinGecko for price feeds

## Key Implementation Details

**Wallet Detection**: RainbowKit handles EVM wallets automatically. StarkNet is simulated since the actual integration is complex and time-constrained.

**Transaction Building**: Different formats per chain but same interface - `TransactionBuilder.buildSwapTransaction()` handles both EVM (RLP-encoded) and StarkNet (Cairo calldata).

**Hydration Fix**: Dynamic content (wallets, prices) only renders client-side with loading skeletons to prevent SSR mismatches.

## Running It

```bash
npm install
npm run dev
```

## What's Production vs Demo

**Working:**
- MetaMask connection
- Transaction building for both chains
- Real ETH prices
- Proper loading states

**Simulated:**
- StarkNet wallet connection (would use get-starknet in production)
- Actual transaction execution
- Position fetching (mocked data)

## Notes

- Used BigInt for token amounts to avoid precision issues
- Address checksumming for security

The abstraction pattern makes it easy to add more chains - just implement the adapter interface.