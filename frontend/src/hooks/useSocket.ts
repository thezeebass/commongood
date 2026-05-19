import { useEffect, useState } from 'react'
import io from 'socket.io-client'

const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:3000'

let socket: any = null

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [lastMessage, setLastMessage] = useState<any>(null)

  useEffect(() => {
    if (!socket) {
      socket = io(WS_URL, {
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 5,
      })

      socket.on('connect', () => setIsConnected(true))
      socket.on('disconnect', () => setIsConnected(false))
      socket.on('vote_update', (data) => setLastMessage(data))
    }

    return () => {
      // Keep connection alive
    }
  }, [])

  return {
    socket,
    isConnected,
    lastMessage,
    subscribe: (channel: string) => socket?.emit('subscribe_project', channel),
  }
}
