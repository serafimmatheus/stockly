import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/app/_components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";

import { Clipboard, MoreHorizontal, Trash } from "lucide-react";
import { useMemo } from "react";

interface OrderSales {
  name: string;
  id: string;
  slug: string;
  price: number;
  quantity: number;
}

interface TableSalesOrderIProps {
  onDelete: (productId: string) => void;
  products: OrderSales[];
}

export function TableSalesOrder({ products, onDelete }: TableSalesOrderIProps) {
  const total = useMemo(() => {
    return products.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0,
    );
  }, [products]);

  return (
    <Table>
      <TableCaption>Lista dos produtos adicionado à venda!</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Preço</TableHead>
          <TableHead>Quantidade</TableHead>
          <TableHead>Total</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell>
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(product.price)}
            </TableCell>
            <TableCell>{product.quantity}</TableCell>
            <TableCell>
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(product.price * product.quantity)}
            </TableCell>
            <TableCell className="flex justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <MoreHorizontal size={18} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Açoes</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    className="gap-1.5"
                    onClick={() => navigator.clipboard.writeText(product.id)}
                  >
                    <Clipboard size={18} />
                    Copiar ID
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="gap-1.5"
                    onClick={() => onDelete(product.id)}
                  >
                    <Trash size={18} />
                    Deletar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(total)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
