import { useState, useCallback, useEffect } from 'react';
import { useWalletStore } from '@/stores/walletStore';

export function useFreighter() {
  const { connect, disconnect, setConnecting, setError } = useWalletStore();
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    // Check if Freighter is installed
    const checkFreighter = () => {
      if (window.freighter) {
        setIsAvailable(true);
      }
    };

    checkFreighter();
    // Freighter might load after our app
    window.addEventListener('freighterLoaded', checkFreighter);
    return () => window.removeEventListener('freighterLoaded', checkFreighter);
  }, []);

  const connectWallet = useCallback(async () => {
    if (!window.freighter) {
      setError('Freighter wallet not installed. Please install the extension.');
      return;
    }

    setConnecting(true);
    try {
      // Request public key from Freighter
      const publicKey = await window.freighter.getPublicKey();

      if (publicKey) {
        connect(publicKey);
      } else {
        setError('Failed to get public key from Freighter');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect wallet');
    }
  }, [connect, setConnecting, setError]);

  const disconnectWallet = useCallback(() => {
    disconnect();
  }, [disconnect]);

  return {
    isAvailable,
    connectWallet,
    disconnectWallet,
  };
}

// Type declaration for Freighter API
declare global {
  interface Window {
    freighter?: {
      getPublicKey: () => Promise<string>;
      signTransaction: (xdr: string, opts?: { network?: string; accountToSign?: string }) => Promise<string>;
      getNetwork: () => Promise<string>;
    };
  }
}
