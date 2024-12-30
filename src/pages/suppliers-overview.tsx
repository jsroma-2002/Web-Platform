import { columns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { getSuppliers } from "@/services/suppliers";
import { useSuppliersStore } from "@/stores/suppliers-store";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function SuppliersOverviewPage() {
  const [error, setError] = useState<string | null>(null);

  const suppliers = useSuppliersStore((state) => state.suppliers);

  useEffect(() => {
    getSuppliers()
      .then((data) => useSuppliersStore.setState(() => ({ suppliers: data })))
      .catch(() => setError("Ocurrió un error al cargar los proveedores"));
  }, []);

  if (!suppliers) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <div>Ups! {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={suppliers} />
    </div>
  );
}
