import { QueryClient } from "@tanstack/react-query";
import { queryClientConfig } from "./config/reactQuery";

export const queryClient = new QueryClient(queryClientConfig);
