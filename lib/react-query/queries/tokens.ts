import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TokenData } from "@/hooks/useWebSocketMock";
import { dummyTokens } from "@/lib/dummyTokens";

// Fetch tokens query
export function useTokens() {
  return useQuery({
    queryKey: ["tokens"],
    queryFn: async (): Promise<TokenData[]> => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 100));
      return dummyTokens;
    },
    staleTime: 30 * 1000, // 30 seconds
  });
}

// Fetch token by ID
export function useToken(tokenId: string) {
  return useQuery({
    queryKey: ["tokens", tokenId],
    queryFn: async (): Promise<TokenData | undefined> => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      return dummyTokens.find((token) => token.id === tokenId);
    },
    enabled: !!tokenId,
  });
}

// Fetch tokens by image (for reused image tokens)
export function useTokensByImage(imageUrl: string) {
  return useQuery({
    queryKey: ["tokens", "by-image", imageUrl],
    queryFn: async (): Promise<TokenData[]> => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      return dummyTokens.filter((token) => token.tokenImage === imageUrl);
    },
    enabled: !!imageUrl,
  });
}

// Mutation example (for future use)
export function useUpdateToken() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedToken: Partial<TokenData> & { id: string }) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      return updatedToken;
    },
    onSuccess: () => {
      // Invalidate and refetch tokens
      queryClient.invalidateQueries({ queryKey: ["tokens"] });
    },
  });
}
