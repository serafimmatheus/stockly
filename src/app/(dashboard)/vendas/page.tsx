import { DataTableSales } from "./_components/table-sales";
import { getProducts } from "@/app/_data-access/product/get-products";
import CreateSaleButton from "./_components/create-sale-button";

const ProductsPage = async () => {
  const products = await getProducts();
  return (
    <div className="w-full px-8">
      <header className="flex w-full items-center justify-between space-y-8 py-8">
        <div>
          <span className="font-bold text-[#00A180]">Vendas</span>
          <h2 className="text-xl font-bold text-[#0F172A]">Gestão de vendas</h2>
        </div>

        <CreateSaleButton products={products} />
      </header>
      <main className="rounded-xl bg-white px-8 py-2">
        <DataTableSales data={[]} />
      </main>
    </div>
  );
};

export default ProductsPage;
