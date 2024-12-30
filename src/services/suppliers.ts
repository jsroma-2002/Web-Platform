import { SupplierGetResponse } from "@/interfaces/supplier-get-response";
import { Supplier } from "@/types/supplier";
import axios from "axios";

export const SUPPLIERS_URL = "https://localhost:44312/api/Suppliers";

export async function getSuppliers(): Promise<Supplier[]> {
  const response = await axios.get<SupplierGetResponse>(SUPPLIERS_URL, {
    params: {
      page: 1,
      perPage: 500,
    },
  });

  return response.data.items;
}

export async function getSupplier(id: number): Promise<Supplier> {
  const response = await axios.get<Supplier>(`${SUPPLIERS_URL}/${id}`);
  return response.data;
}

export async function createSupplier(
  supplier: Omit<Supplier, "id" | "lastEdited">
): Promise<Supplier> {
  const response = await axios.post<Supplier>(SUPPLIERS_URL, supplier);
  return response.data;
}

export async function updateSupplier(
  id: number,
  supplier: Partial<Supplier>
): Promise<Supplier> {
  const response = await axios.put<Supplier>(
    `${SUPPLIERS_URL}/${id}`,
    supplier
  );
  return response.data;
}

export async function deleteSupplier(id: number): Promise<void> {
  await axios.delete(`${SUPPLIERS_URL}/${id}`);
}
