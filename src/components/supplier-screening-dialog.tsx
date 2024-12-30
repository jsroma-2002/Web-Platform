import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getHitsInOffShore } from "@/services/hits";
import { HitsOffShore } from "@/types/hits-offshore";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface SupplierScreeningDialogProps {
  name: string;
}

export default function SupplierScreeningDialog(
  props: SupplierScreeningDialogProps
) {
  const [hits, setHits] = useState<HitsOffShore[] | null>(null);

  const [source, setSource] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (source) {
      setLoading(true);

      getHitsInOffShore(props.name)
        .then((response) => {
          setHits(response.sources.offshoreLeaks.results);
          setLoading(false);
        })
        .catch(() => {
          toast.error("Ocurrió un error al obtener los datos");
        });
    }
  }, [source, props.name]);

  return (
    <DialogContent className="w-10/12 h-4/5 overflow-auto">
      <DialogHeader>
        <DialogTitle>Datos del Proveedor {props.name}</DialogTitle>
        <DialogDescription>
          Realiza un cruce de información con listas de proveedores y listas de
          riesgo.
        </DialogDescription>
        <section className="flex flex-col space-y-4">
          <header>
            <Select
              defaultValue={source ?? undefined}
              onValueChange={setSource}
            >
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Selecciona la fuente" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="offshoreLeaks">
                  Offshore Leaks Database
                </SelectItem>
              </SelectContent>
            </Select>
          </header>
          <main>
            {loading && <p className="text-center">Cargando...</p>}
            {hits && (
              <Table className="border">
                <TableCaption>Listado de resultado obtenidos.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Entidad</TableHead>
                    <TableHead>Jurisdicción</TableHead>
                    <TableHead>Asociado a</TableHead>
                    <TableHead>Fuente</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hits.map((hit) => (
                    <TableRow>
                      <TableCell>{hit.entity}</TableCell>
                      <TableCell>{hit.jurisdiction}</TableCell>
                      <TableCell>{hit.linkedTo}</TableCell>
                      <TableCell className="text-right">
                        {hit.dataFrom}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </main>
        </section>
      </DialogHeader>
    </DialogContent>
  );
}
