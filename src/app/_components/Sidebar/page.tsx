import Link from "next/link";

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-white">
      <div className="px-8 py-6">
        <h1 className="text-2xl font-bold">Stockly</h1>
      </div>

      <nav>
        <ul className="flex flex-col gap-2 p-2">
          <li className="px-6 py-3">
            <Link href="/">Dashboard</Link>
          </li>
          <li className="px-6 py-3">
            <Link href="/produtos">Produtos</Link>
          </li>
          <li className="px-6 py-3">
            <Link href="/vendas">Vendas</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
