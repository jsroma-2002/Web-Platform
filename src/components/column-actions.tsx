import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteSupplier } from "@/services/suppliers";
import { useSuppliersStore } from "@/stores/suppliers-store";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router";
import { toast } from "sonner";
import SupplierScreeningDialog from "./supplier-screening-dialog";

interface ColumnActionsProps {
  id: number;
}

export default function ColumnActions(props: ColumnActionsProps) {
  const removeSupplier = useSuppliersStore((state) => state.removeSupplier);

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Opciones</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link to={`/${props.id}`}>Ver</Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link to={`/${props.id}/update`}>Editar</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              deleteSupplier(props.id)
                .then(() => {
                  removeSupplier(props.id);
                  toast.success("Proveedor eliminado exitosamente");
                })
                .catch(() => {
                  toast.error("Ocurrió un error al eliminar el proveedor");
                });
            }}
          >
            Eliminar
          </DropdownMenuItem>
          <DialogTrigger asChild>
            <DropdownMenuItem>Cruce con listas</DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <SupplierScreeningDialog
        name={useSuppliersStore(
          (state) =>
            state.suppliers!.find((s) => s.id === props.id)?.businessName || ""
        )}
      />
    </Dialog>
  );
}
