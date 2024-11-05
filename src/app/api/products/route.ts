import { db } from "@/app/_lib/prisma-client";

export async function GET() {
  const products = await db.product.findMany();

  return Response.json(products, {
    status: 200,
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  const slug = body.name.toLowerCase().replace(/ /g, "-");

  const data = {
    name: body.name,
    price: body.price,
    stock: body.stock,
    slug,
  };

  const product = await db.product.create({
    data,
  });

  return Response.json(product, {
    status: 204,
  });
}
