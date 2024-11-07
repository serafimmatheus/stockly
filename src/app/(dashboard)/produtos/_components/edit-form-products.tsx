"use client";

import { Button } from "@/app/_components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { NumericFormat } from "react-number-format";
import {
  FormCreateProducts,
  formSchemaCreateProducts,
} from "@/app/_actions/products/products.DTO";
import { toast } from "sonner";
import { updateProduct } from "@/app/_actions/products/update-product";

interface UpdateFormProductsIProps {
  dataProduct: FormCreateProducts;
  onClose: () => void;
}

const UpdateFormProducts = ({
  dataProduct,
  onClose,
}: UpdateFormProductsIProps) => {
  console.log(dataProduct);

  const form = useForm<FormCreateProducts>({
    shouldUnregister: true,
    resolver: zodResolver(formSchemaCreateProducts),
    defaultValues: {
      name: dataProduct?.name || "",
      slug: dataProduct?.slug || "",
      price: dataProduct?.price || 1,
      stock: dataProduct?.stock || 1,
    },
  });

  const onSubmitData = async (data: FormCreateProducts) => {
    try {
      await updateProduct({ id: dataProduct?.id ?? "", data });

      form.reset({
        name: "",
        slug: "",
        price: 1,
        stock: 1,
      });

      onClose();

      toast.success("Produto atualizado com sucesso");
    } catch (error) {
      toast.error("Erro ao atualizar produto");
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Editar produto</DialogTitle>
        <DialogDescription>Insira as informações abaixo</DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitData)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do produto</FormLabel>
                <FormControl>
                  <Input
                    defaultValue={dataProduct?.name}
                    placeholder="Nome do produto"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug do produto</FormLabel>
                <FormControl>
                  <Input
                    defaultValue={dataProduct?.slug}
                    placeholder="Slug do produto"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor unitário</FormLabel>
                <FormControl>
                  <NumericFormat
                    defaultValue={dataProduct?.price}
                    thousandSeparator="."
                    decimalSeparator=","
                    fixedDecimalScale
                    decimalScale={2}
                    prefix="R$ "
                    allowNegative={false}
                    customInput={Input}
                    onValueChange={(values) => {
                      field.onChange(values.floatValue);
                    }}
                    {...field}
                    onChange={() => {}}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estoque</FormLabel>
                <FormControl>
                  <Input
                    defaultValue={dataProduct?.stock}
                    type="number"
                    placeholder="Estoque"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button
                disabled={form.formState.isSubmitting}
                variant="secondary"
                type="reset"
              >
                Cancelar
              </Button>
            </DialogClose>
            <Button
              className="gap-1.5"
              disabled={form.formState.isSubmitting}
              type="submit"
            >
              {form.formState.isSubmitting && (
                <Loader2 size={18} className="animate-spin" />
              )}
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default UpdateFormProducts;
