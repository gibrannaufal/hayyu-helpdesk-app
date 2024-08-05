import { QueryClientConfig } from "@tanstack/react-query";

export const queryClientConfig: QueryClientConfig = {
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: 2,
			staleTime: 5 * 60 * 1000, // 5 menit
		},
	},
};
