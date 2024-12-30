import { Supplier } from "@/types/supplier";

export interface SupplierGetResponse {
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  items: Supplier[];
}
