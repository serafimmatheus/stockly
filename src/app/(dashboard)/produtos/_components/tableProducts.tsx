"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Input } from "@/app/_components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { Product } from "@prisma/client";
import { deleteProduct } from "@/app/_actions/products/delete-product";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { toast } from "sonner";

const onDeleteProduct = async (id: string) => {
  try {
    await deleteProduct(id);
    toast.success("Produto deletado com sucesso");
  } catch (error) {
    toast.error("Erro ao deletar produto");
  }
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Produto",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "price",
    header: "Preço",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));

      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount);

      return <p>{formatted}</p>;
    },
  },
  {
    accessorKey: "stock",
    header: "Estoque",
    cell: ({ row }) => {
      return <div>{row.getValue("stock")}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      if (row.getValue("status") === "In stock") {
        return (
          <div className="flex w-full items-center gap-2 self-start rounded-full bg-green-200 px-2 py-1">
            <div className="h-2 w-2 rounded-full bg-green-600" />
            <p className="text-xs font-bold text-green-600">Em estoque</p>
          </div>
        );
      }
      return (
        <div className="flex w-full items-center gap-2 self-start rounded-full bg-gray-200 px-2 py-1">
          <div className="h-2 w-2 rounded-full bg-gray-600" />
          <p className="text-xs font-bold text-gray-600">Esgotado</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const { id, slug } = row.original;

      return (
        <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigator.clipboard.writeText(slug)}
              >
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem className="cursor-pointer">
                <Edit size={18} />
                Editar
              </DropdownMenuItem>

              <AlertDialogTrigger asChild>
                <DropdownMenuItem className="cursor-pointer bg-red-500 text-white focus:bg-red-600 focus:text-white">
                  <Trash size={18} />
                  Deletar
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Deletar produto: {row.getValue("name")}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Você tem certeza que deseja deletar este produto?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Não</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDeleteProduct(id)}>
                  Sim
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </DropdownMenu>
        </AlertDialog>
      );
    },
  },
];

export function DataTableProducts({ data }: { data: Product[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar por nome..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 animate-pulse text-center"
                >
                  Nenhum produto encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        {!table.getCanPreviousPage() && !table.getCanNextPage() ? null : (
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Proximo
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
