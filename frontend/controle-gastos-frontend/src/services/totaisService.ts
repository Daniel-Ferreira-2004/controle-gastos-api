import api from "./api";
import type { TotaisResponse } from "../types";

export async function buscarTotais(): Promise<TotaisResponse> {
  const response = await api.get<TotaisResponse>("/totais");
  return response.data;
}