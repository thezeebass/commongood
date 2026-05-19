import { useQuery, useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/authStore';
import { register, verifyOtp, logout } from '@/api/auth';
import type { RegisterData, VerifyData } from '@/api/auth';

export function useAuth() {
  const { user, isAuthenticated, isLoading, login: storeLogin, logout: storeLogout } = useAuthStore();

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      storeLogin(data.user, data.token);
    },
  });

  const verifyMutation = useMutation({
    mutationFn: verifyOtp,
    onSuccess: (data) => {
      storeLogin(data.user, data.token);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      storeLogout();
    },
  });

  return {
    user,
    isAuthenticated,
    isLoading,
    register: registerMutation.mutate,
    verify: verifyMutation.mutate,
    logout: logoutMutation.mutate,
    isRegistering: registerMutation.isPending,
    isVerifying: verifyMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    registerError: registerMutation.error,
    verifyError: verifyMutation.error,
  };
}
