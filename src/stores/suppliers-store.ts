import { Supplier } from "@/types/supplier";
import { create } from "zustand";

interface SupplierStoreState {
  suppliers: Supplier[] | null;
  addSupplier: (supplier: Supplier) => void;
  removeSupplier: (id: number) => void;
}

export const useSuppliersStore = create<SupplierStoreState>((set) => ({
  suppliers: null,
  addSupplier: (supplier) =>
    set((state) => ({ suppliers: [...state.suppliers!, supplier] })),
  removeSupplier: (supplier) =>
    set((state) => ({
      suppliers: state.suppliers!.filter((s) => s.id !== supplier),
    })),
}));
