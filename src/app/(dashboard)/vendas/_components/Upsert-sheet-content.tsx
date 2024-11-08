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
  FormDescription,
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
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  productId: z.string(),
  quantity: z.coerce.number().int().positive(),
});

type FormValues = z.infer<typeof formSchema>;

interface UpsertSheetContentIProps {
  dataProducts: Product[];
}

export function UpsertSheetContent({ dataProducts }: UpsertSheetContentIProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(data: FormValues) {
    toast.success(
      `Venda criada com sucesso! Produto: ${data.productId}, Quantidade: ${data.quantity}`,
    );
  }

  return (
    <SheetContent>
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
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
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
              <FormItem className="flex flex-col">
                <FormLabel>Quantidade</FormLabel>
                <Input type="number" {...field} />

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </SheetContent>
  );
}
