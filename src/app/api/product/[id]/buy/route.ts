import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const paramsId = (await params).id;
  if (!paramsId)
    return new Response(JSON.stringify("Invalid id"), { status: 400 });

  try {
    const { id, quantity }: { id: number; quantity: number } =
      await request.json();

    if (quantity <= 0)
      return new Response(JSON.stringify("Invalid quantity"), {
        status: 400,
      });

    if (Number(paramsId) !== id)
      return new Response(JSON.stringify("Mismatched id"), { status: 400 });

    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });
    if (!product)
      return new Response(JSON.stringify("Product not found"), {
        status: 404,
      });

    if (product.quantity === 0)
      return new Response(JSON.stringify("Product out of stock"), {
        status: 400,
      });

    if (product.quantity < quantity)
      return new Response(JSON.stringify("Not enough stock"), {
        status: 400,
      });

    const decrementedProduct = await prisma.product.update({
      where: {
        id,
      },
      data: {
        quantity: {
          decrement: 1,
        },
      },
    });
    return new Response(JSON.stringify(decrementedProduct), { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error)
      return new Response(JSON.stringify(error?.message), { status: 500 });
    else return new Response(JSON.stringify(error), { status: 500 });
  }
}
