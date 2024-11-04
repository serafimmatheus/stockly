"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { LayoutGrid, Package, ShoppingBasket } from "lucide-react";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white">
      <div className="px-8 py-6">
        <h1 className="text-2xl font-bold">Stockly</h1>
      </div>

      <nav>
        <ul className="flex flex-col gap-2 p-2">
          <li>
            <Button
              variant={pathname === "/" ? "secondary" : "ghost"}
              asChild
              className="w-full justify-start gap-2 px-6 py-3"
            >
              <Link href="/">
                <LayoutGrid size={20} />
                Dashboard
              </Link>
            </Button>
          </li>
          <li>
            <Button
              variant={pathname === "/produtos" ? "secondary" : "ghost"}
              asChild
              className="w-full justify-start gap-2 px-6 py-3"
            >
              <Link href="/produtos">
                <Package size={20} />
                Produtos
              </Link>
            </Button>
          </li>
          <li>
            <Button
              variant={pathname === "/vendas" ? "secondary" : "ghost"}
              asChild
              className="w-full justify-start gap-2 px-6 py-3"
            >
              <Link href="/vendas">
                <ShoppingBasket size={20} />
                Vendas
              </Link>
            </Button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
