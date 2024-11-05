import { DataTableProducts } from "./_components/tableProducts";
import { getProducts } from "@/app/_data-access/product/get-products";

import CreateFormProducts from "./_components/create-form-product";

const ProductsPage = async () => {
  const products = await getProducts();

  return (
    <div className="w-full px-8">
      <header className="flex w-full items-center justify-between space-y-8 py-8">
        <div>
          <span className="font-bold text-[#00A180]">Produtos</span>
          <h2 className="text-xl font-bold text-[#0F172A]">
            Gestão de produtos
          </h2>
        </div>

        <CreateFormProducts />
      </header>
      <main className="rounded-xl bg-white px-8 py-2">
        <DataTableProducts data={JSON.parse(JSON.stringify(products))} />
      </main>
    </div>
  );
};

export default ProductsPage;
