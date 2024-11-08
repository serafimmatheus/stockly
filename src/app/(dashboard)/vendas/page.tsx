import { Button } from "@/app/_components/ui/button";
import { UpsertSheetContent } from "./_components/Upsert-sheet-content";

import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import { Plus } from "lucide-react";
import { DataTableSales } from "./_components/table-sales";
import { getProducts } from "@/app/_data-access/product/get-products";

const ProductsPage = async () => {
  const products = await getProducts();
  return (
    <div className="w-full px-8">
      <header className="flex w-full items-center justify-between space-y-8 py-8">
        <div>
          <span className="font-bold text-[#00A180]">Vendas</span>
          <h2 className="text-xl font-bold text-[#0F172A]">Gestão de vendas</h2>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button className="gap-2 bg-[#00A180] text-white hover:bg-[#00A180] hover:opacity-90">
              <Plus size={18} />
              Nova venda
            </Button>
          </SheetTrigger>
          <UpsertSheetContent
            dataProducts={JSON.parse(JSON.stringify(products))}
          />
        </Sheet>
      </header>
      <main className="rounded-xl bg-white px-8 py-2">
        <DataTableSales data={[]} />
      </main>
    </div>
  );
};

export default ProductsPage;
