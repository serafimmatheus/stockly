"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/app/_components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import { cn } from "@/app/_lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@prisma/client";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TableSalesOrder } from "./table-sales-order";

const formSchema = z.object({
  productId: z.string(),
  quantity: z.coerce.number().int().positive(),
});

type FormValues = z.infer<typeof formSchema>;

interface UpsertSheetContentIProps {
  dataProducts: Product[];
}

interface OrderSales {
  name: string;
  id: string;
  slug: string;
  price: number;
  quantity: number;
}

export function UpsertSheetContent({ dataProducts }: UpsertSheetContentIProps) {
  const [orderSales, setOrderSales] = useState<OrderSales[]>([]);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(data: FormValues) {
    setOrderSales((prev) => {
      const product = dataProducts.find(
        (product) => product.id === data.productId,
      );

      if (!product) {
        return prev;
      }

      if (product.stock < data.quantity) {
        form.setError("quantity", {
          message: `Quantidade indisponível em estoque!`,
        });
        return prev;
      }

      if (prev.some((order) => order.id === product.id)) {
        return prev.map((order) => {
          if (data.quantity + order.quantity > product.stock) {
            // toast.error(
            //   `Produto: ${data.productId}, Quantidade: ${data.quantity} excede o estoque!`,
            // );
            form.setError("quantity", {
              message: `Quantidade indisponível em estoque!`,
            });

            return order;
          }

          if (order.id === product.id) {
            return {
              ...order,
              quantity:
                data.quantity + order.quantity <= product.stock
                  ? data.quantity + order.quantity
                  : order.quantity,
            };
          }

          return order;
        });
      }

      return [
        ...prev,
        {
          name: product.name,
          id: product.id,
          slug: product.slug,
          price: Number(product.price),
          quantity: data.quantity,
        },
      ];
    });

    form.reset({
      productId: "",
      quantity: 0,
    });
  }

  const handleDelete = (productId: string) => {
    setOrderSales((prev) => prev.filter((order) => order.id !== productId));
  };

  return (
    <SheetContent className="!w-full md:!max-w-2xl">
      <SheetHeader>
        <SheetTitle>Nova venda</SheetTitle>
        <SheetDescription>
          Preencha os campos abaixo para criar uma nova venda.
        </SheetDescription>
      </SheetHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6 py-6"
        >
          <div className="flex flex-col gap-3 md:flex-row">
            <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                <FormItem className="flex flex-1 flex-col">
                  <FormLabel>Produtos</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value
                            ? dataProducts.find(
                                (product) => product.id === field.value,
                              )?.name
                            : "Selecione o produto"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="pesquise o produto..." />
                        <CommandList>
                          <CommandEmpty>Nenhum produto encontrado</CommandEmpty>
                          <CommandGroup>
                            {dataProducts?.map((language) => (
                              <CommandItem
                                value={language.id}
                                key={language.id}
                                onSelect={() => {
                                  form.setValue("productId", language.id);
                                }}
                              >
                                {language.name}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    language.name === field.value
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem className="flex flex-col md:w-32">
                  <FormLabel>Quantidade</FormLabel>
                  <Input type="number" {...field} />
                </FormItem>
              )}
            />
          </div>

          {form.formState.errors.quantity && (
            <FormMessage>{form.formState.errors.quantity.message}</FormMessage>
          )}

          <Button type="submit" className="w-full gap-2">
            <Plus size={18} />
            Adicionar produto à venda
          </Button>
        </form>
      </Form>

      <TableSalesOrder onDelete={handleDelete} products={orderSales} />
    </SheetContent>
  );
}
