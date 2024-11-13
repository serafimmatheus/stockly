"use client";

import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import { Plus } from "lucide-react";

import { UpsertSheetContent } from "./Upsert-sheet-content";
import { Button } from "@/app/_components/ui/button";
import { Product } from "@prisma/client";
import { useState } from "react";

interface CreateSaleButtonProps {
  products: Product[];
}

const CreateSaleButton = ({ products }: CreateSaleButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="gap-2 bg-[#00A180] text-white hover:bg-[#00A180] hover:opacity-90">
          <Plus size={18} />
          Nova venda
        </Button>
      </SheetTrigger>
      <UpsertSheetContent
        onSubmitSuccess={() => setIsOpen(false)}
        dataProducts={JSON.parse(JSON.stringify(products))}
      />
    </Sheet>
  );
};

export default CreateSaleButton;
