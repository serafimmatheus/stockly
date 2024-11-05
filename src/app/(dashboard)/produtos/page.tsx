import { Button } from "@/app/_components/ui/button";
import { Plus } from "lucide-react";
import { DataTableProducts } from "./_components/tableProducts";
import { getProducts } from "@/app/_data-access/product/get-products";

const ProductsPage = async () => {
  const products = await getProducts();

  console.log(products);

  return (
    <div className="w-full px-8">
      <header className="flex w-full items-center justify-between space-y-8 py-8">
        <div>
          <span className="font-bold text-[#00A180]">Produtos</span>
          <h2 className="text-xl font-bold text-[#0F172A]">
            Gestão de produtos
          </h2>
        </div>

        <div>
          <Button className="gap-2 bg-[#00A180] text-white hover:bg-[#00A180] hover:opacity-90">
            <Plus size={18} />
            Novo produto
          </Button>
        </div>
      </header>
      <main className="rounded-xl bg-white px-8 py-2">
        <DataTableProducts data={products} />
      </main>
    </div>
  );
};

export default ProductsPage;
