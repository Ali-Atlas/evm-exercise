'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useWallets } from '@/hooks/useWallets';
import { usePrices } from '@/hooks/usePrices';
import { truncateAddress } from '@/lib/utils/format';
import { useState, useEffect } from 'react';
import { TransactionBuilder } from '@/lib/wallet/transaction-builder';
import { PriceSkeleton, PositionSkeleton } from '@/components/ui/Skeleton';

export default function Home() {
  const { evmWallet, starknetWallet, connectStarkNet, disconnectStarkNet, evmConnected } = useWallets();
  const { prices, loading: pricesLoading } = usePrices();
  const [isClient, setIsClient] = useState(false);
  const [showSwap, setShowSwap] = useState(false);
  const [swapAmount, setSwapAmount] = useState('');
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const hasAnyWallet = evmConnected || starknetWallet !== null;
  
  // Calculate values only when prices are loaded
  const uniswapValue = prices ? (0.85 * prices.ETH).toFixed(0) : '0';
  const jediswapValue = prices ? (0.4 * prices.ETH).toFixed(0) : '0';

  const handleSwap = () => {
    if (!swapAmount) {
      alert('Please enter an amount');
      return;
    }
    
    const activeWallet = evmConnected ? evmWallet : starknetWallet;
    const chainType = evmConnected ? 'EVM' : 'STARKNET';
    
    if (!activeWallet) {
      alert('Please connect a wallet first');
      return;
    }

    const tx = TransactionBuilder.buildSwapTransaction(
      chainType,
      'ETH',
      'USDC', 
      swapAmount,
      activeWallet.address
    );

    console.log('Transaction built for', chainType, ':', tx);
    console.log('Gas estimate:', TransactionBuilder.estimateGas(chainType));
    alert(`Swap transaction prepared for ${chainType} chain. Check console for details.`);
  };

  return (
    <main className="container">
      <h1>Cross-Chain DeFi Portfolio</h1>
      <p>Unified interface for EVM and StarkNet</p>
      
      <div className="wallet-section">
        <div className="wallet-card">
          <h3>EVM Wallet</h3>
          {isClient ? (
            <ConnectButton />
          ) : (
            <button className="btn">Connect Wallet</button>
          )}
          {isClient && evmWallet && (
            <div className="wallet-info">
              <small>Connected: {truncateAddress(evmWallet.address)}</small>
            </div>
          )}
        </div>
        
        <div className="wallet-card">
          <h3>StarkNet Wallet</h3>
          {isClient ? (
            !starknetWallet ? (
              <button className="btn" onClick={connectStarkNet}>
                Connect Braavos (Simulated)
              </button>
            ) : (
              <div>
                <div className="wallet-info">
                  <small>Connected: {truncateAddress(starknetWallet.address)}</small>
                </div>
                <button className="btn-disconnect" onClick={disconnectStarkNet}>
                  Disconnect
                </button>
              </div>
            )
          ) : (
            <button className="btn">Connect Braavos (Simulated)</button>
          )}
        </div>
      </div>

      {isClient && hasAnyWallet && (
        <>
          <div className="positions-section">
            <h2>DeFi Positions</h2>
            
            {/* Price ticker with loading state */}
            {pricesLoading ? (
              <PriceSkeleton />
            ) : prices ? (
              <div className="price-ticker">
                ETH: ${prices.ETH.toLocaleString()} | USDC: ${prices.USDC}
              </div>
            ) : null}
            
            {/* Positions with loading states */}
            {evmConnected && (
              pricesLoading ? (
                <PositionSkeleton />
              ) : (
                <div className="position-card">
                  <div className="position-header">
                    <span className="protocol">Uniswap V3</span>
                    <span className="value">${uniswapValue}</span>
                  </div>
                  <div className="position-details">
                    <p>WETH/USDC • 0.3% fee tier</p>
                    <p>Liquidity: 0.85 WETH</p>
                    <p>Chain: Ethereum Sepolia</p>
                  </div>
                </div>
              )
            )}
            
            {starknetWallet && (
              pricesLoading ? (
                <PositionSkeleton />
              ) : (
                <div className="position-card">
                  <div className="position-header">
                    <span className="protocol">JediSwap</span>
                    <span className="value">${jediswapValue}</span>
                  </div>
                  <div className="position-details">
                    <p>ETH/USDC • 0.3% fee tier</p>
                    <p>Liquidity: 0.4 ETH</p>
                    <p>Chain: StarkNet Sepolia</p>
                  </div>
                </div>
              )
            )}
          </div>

          <div className="swap-section">
            <h2>Cross-Chain Swap</h2>
            <div className="swap-card">
              {!showSwap ? (
                <>
                  <p>Execute swaps across connected chains</p>
                  <button className="btn" onClick={() => setShowSwap(true)}>
                    Open Swap Interface
                  </button>
                </>
              ) : (
                <div className="swap-interface">
                  <div style={{ marginBottom: '1rem', color: '#a0a0a0' }}>
                    Active Chain: {evmConnected ? 'Ethereum' : 'StarkNet'}
                  </div>
                  <div className="swap-input">
                    <label>From</label>
                    <input 
                      type="number" 
                      placeholder="0.0" 
                      value={swapAmount}
                      onChange={(e) => setSwapAmount(e.target.value)}
                    />
                    <select>
                      <option>ETH</option>
                    </select>
                  </div>
                  <div className="swap-arrow">↓</div>
                  <div className="swap-input">
                    <label>To</label>
                    <input 
                      type="number" 
                      placeholder="0.0" 
                      value={swapAmount && prices ? (parseFloat(swapAmount) * prices.ETH).toFixed(2) : ''}
                      disabled 
                    />
                    <select>
                      <option>USDC</option>
                    </select>
                  </div>
                  <button className="btn-swap" onClick={handleSwap}>Execute Swap</button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </main>
  );
}
