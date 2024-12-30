import { HitsSearchResponse } from "@/interfaces/hits-search-response";
import axios from "axios";

// Al implementar Login, se debe cambiar la solicitud de la API a un endpoint que requiera autenticación en el backend.
export const SEARCH_HITS_URL = "http://localhost:3000/api/search";

// Al implementar Login, remover la API_KEY y almacenarla en el backend
export const API_KEY = "your_secure_api_key";

export async function getHitsInOffShore(
  entity: string
): Promise<HitsSearchResponse> {
  const response = await axios.get<HitsSearchResponse>(SEARCH_HITS_URL, {
    params: {
      entity,
    },
    headers: {
      "x-api-key": API_KEY,
    },
  });

  return response.data;
}
