import { useEffect, useState } from 'react'

export const useStellarWallet = () => {
  const [publicKey, setPublicKey] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const connectWallet = async () => {
      try {
        // @ts-ignore
        if (window?.freighter) {
          // @ts-ignore
          const key = await window.freighter.getPublicKey()
          setPublicKey(key)
          setIsConnected(true)
        }
      } catch (error) {
        console.error('Failed to connect wallet:', error)
      }
    }

    connectWallet()
  }, [])

  return { publicKey, isConnected }
}
