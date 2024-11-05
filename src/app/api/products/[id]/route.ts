import { db } from "@/app/_lib/prisma-client";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const query = request.url.search;

  console.log(query);

  const product = await db.product.findUnique({
    where: { id },
  });

  if (!product) {
    return {
      status: 404,
      body: { message: "Product not found" },
    };
  }

  return Response.json(product, {
    status: 200,
  });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  const product = await db.product.delete({
    where: { id },
  });

  return Response.json(product, {
    status: 200,
  });
}
