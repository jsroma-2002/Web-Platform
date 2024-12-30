import { Supplier } from "@/types/supplier";
import { ColumnDef } from "@tanstack/react-table";

import { format } from "date-fns";
import ColumnActions from "./column-actions";
import { DataTableColumnHeader } from "./column-header";

export const columns: ColumnDef<Supplier>[] = [
  {
    accessorKey: "businessName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "tradeName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre comercial" />
    ),
  },
  {
    accessorKey: "taxId",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Identificación tributaria"
      />
    ),
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Número telefónico" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Correo electrónico" />
    ),
  },
  {
    accessorKey: "website",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sitio web" />
    ),
    cell: ({ row }) => {
      const website = row.getValue("website") as string;
      return (
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold hover:underline"
        >
          {website}
        </a>
      );
    },
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Dirección física" />
    ),
  },
  {
    accessorKey: "country",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="País" />
    ),
  },
  {
    accessorKey: "annualRevenue",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Facturación A." />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("annualRevenue"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "lastEdited",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Última edición" />
    ),
    cell: ({ row }) => {
      return (
        <div className="text-center">
          {format(row.getValue("lastEdited"), "MM/dd/yyyy HH:mm:ss")}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <ColumnActions id={row.original.id as number} />;
    },
  },
];
