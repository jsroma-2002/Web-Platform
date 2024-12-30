import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSupplier } from "@/services/suppliers";
import { Supplier } from "@/types/supplier";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

export default function SupplierOverview() {
  // Obtener el Id de la URL
  const supplierId = useParams().supplier;

  const [supplier, setSupplier] = useState<Supplier | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Llamar a la API para obtener los datos del proveedor
    getSupplier(Number(supplierId))
      .then((data) => setSupplier(data))
      .catch(() => {
        setError("Ocurrió un error al cargar el proveedor");
      });
  }, [supplierId]);

  if (!supplier) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div>Ups! {error}</div>;
  }

  return (
    <div className="p-4 flex flex-col space-y-4 items-center">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Información del Proveedor
      </h1>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {supplier.businessName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Nombre comercial:</span>{" "}
              {supplier.tradeName}
            </p>
            <p>
              <span className="font-semibold">Identificación tributaria:</span>{" "}
              {supplier.taxId}
            </p>
            <p>
              <span className="font-semibold">Dirección:</span>{" "}
              {supplier.address}
            </p>
            <p>
              <span className="font-semibold">Teléfono:</span>{" "}
              {supplier.phoneNumber}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {supplier.email}
            </p>
            <p>
              <span className="font-semibold">Sitio Web:</span>{" "}
              {supplier.website}
            </p>
            <p>
              <span className="font-semibold">País:</span> {supplier.country}
            </p>
            <p>
              <span className="font-semibold">
                Facturación anual en dólares:
              </span>{" "}
              {supplier.annualRevenue}
            </p>
          </div>
        </CardContent>
      </Card>
      <Link to="/">
        <Button className="max-w-24">Retroceder</Button>
      </Link>
    </div>
  );
}
