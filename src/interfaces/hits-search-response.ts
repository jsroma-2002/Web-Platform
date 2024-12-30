import { HitsOffShore } from "@/types/hits-offshore";

export interface HitsSearchResponse {
  query: string;
  sources: {
    offshoreLeaks: {
      count: number;
      results: HitsOffShore[];
    };
  };
}
