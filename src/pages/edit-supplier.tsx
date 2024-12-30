import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { editSupplierSchema } from "@/schemas/edit-supplier";
import { getSupplier, updateSupplier } from "@/services/suppliers";
import { Supplier } from "@/types/supplier";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

export default function EditSupplier() {
  // Obtener el Id de la URL
  const supplierId = useParams().supplier;

  const [supplier, setSupplier] = useState<Supplier | null>(null);

  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Llamar a la API para obtener los datos del proveedor
    getSupplier(Number(supplierId))
      .then((data) => {
        setSupplier(data);
        form.reset({
          businessName: data.businessName,
          tradeName: data.tradeName,
          taxId: data.taxId,
          phoneNumber: data.phoneNumber,
          email: data.email,
          website: data.website,
          address: data.address,
          country: data.country,
          annualRevenue: data.annualRevenue,
        });
      })
      .catch(() => {
        setError("Ocurrió un error al cargar el proveedor");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supplierId]);

  const form = useForm<z.infer<typeof editSupplierSchema>>({
    resolver: zodResolver(editSupplierSchema),
    defaultValues: {
      businessName: "",
      tradeName: "",
      taxId: "",
      phoneNumber: "",
      email: "",
      website: "",
      address: "",
      country: "",
      annualRevenue: 0,
    },
  });

  function onSubmit(values: z.infer<typeof editSupplierSchema>) {
    const supplier = {
      ...values,
    };

    updateSupplier(Number(supplierId), supplier)
      .then(() => {
        // Redirigir a la lista de proveedores
        navigate("/");
        toast.success("Proveedor actualizado correctamente");
      })
      .catch(() => {
        toast.error("Ocurrió un error al actualizar el proveedor");
      });
  }

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
    <div className="p-8">
      <header className="flex gap-4">
        <Link to="/">
          <Button variant="default" size={"icon"}>
            <ArrowLeft />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold mb-6">Editar Proveedor</h1>
      </header>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Razón social</FormLabel>
                <FormControl>
                  <Input placeholder="Razón Social del proveedor" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tradeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre comercial</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nombre comercial del proveedor"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="taxId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Identificación tributaria</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Identificación tributaria del proveedor"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número telefónico</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Número telefónico del proveedor"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Correo electrónico del proveedor"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sitio web</FormLabel>
                <FormControl>
                  <Input placeholder="Sitio web del proveedor" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dirección física</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Dirección física del proveedor"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>País</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un país de origen" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Peru">Perú</SelectItem>
                    <SelectItem value="USA">USA</SelectItem>
                    <SelectItem value="Chile">Chile</SelectItem>
                    <SelectItem value="Other">Otro</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="annualRevenue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Facturación anual en dólares</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Facturación anual en dólares"
                    type="number"
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Editar</Button>
        </form>
      </Form>
    </div>
  );
}
