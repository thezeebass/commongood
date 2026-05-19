import { create } from 'zustand';
import type { WalletState } from '@/types';

interface WalletStore extends WalletState {
  connect: (address: string) => void;
  disconnect: () => void;
  setConnecting: (connecting: boolean) => void;
  setError: (error: string | null) => void;
}

export const useWalletStore = create<WalletStore>((set) => ({
  address: null,
  isConnected: false,
  isConnecting: false,
  error: null,

  connect: (address) => set({ address, isConnected: true, isConnecting: false, error: null }),
  disconnect: () => set({ address: null, isConnected: false, isConnecting: false, error: null }),
  setConnecting: (connecting) => set({ isConnecting: connecting }),
  setError: (error) => set({ error, isConnecting: false }),
}));
