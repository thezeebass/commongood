import { useEffect, useRef, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import type { Project } from '@/types';

const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:3000';

export function useWebSocket() {
  const queryClient = useQueryClient();
  const wsRef = useRef<WebSocket | null>(null);

  const connect = useCallback(() => {
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === 'vote_update') {
          // Invalidate and refetch project data
          queryClient.invalidateQueries({ queryKey: ['projects', data.projectId] });
          queryClient.invalidateQueries({ queryKey: ['projects'] });

          // Optimistically update the project in cache
          queryClient.setQueryData(['projects', data.projectId], (old: Project | undefined) => {
            if (!old) return old;
            return {
              ...old,
              currentFunding: data.currentFunding,
              currentParticipants: data.participants,
            };
          });
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected, reconnecting...');
      setTimeout(connect, 3000);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }, [queryClient]);

  const subscribeToProject = useCallback((projectId: number) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'subscribe_project',
        projectId,
      }));
    }
  }, []);

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
  }, [connect]);

  return { subscribeToProject };
}
