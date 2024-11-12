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
import { useMemo } from "react";

interface OrderSales {
  name: string;
  id: string;
  slug: string;
  price: number;
  quantity: number;
}

interface TableSalesOrderIProps {
  products: OrderSales[];
}

export function TableSalesOrder({ products }: TableSalesOrderIProps) {
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
          <TableHead className="text-right">Total</TableHead>
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
            <TableCell className="text-right">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(product.price * product.quantity)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
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
