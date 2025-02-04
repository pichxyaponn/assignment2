import { PrismaClient, Product } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const paramsId = (await params).id;
  if (!paramsId)
    return new Response(JSON.stringify("Invalid id"), { status: 400 });

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: Number(paramsId),
      },
    });

    if (!product)
      return new Response(JSON.stringify("Product not found"), {
        status: 404,
      });

    return new Response(JSON.stringify(product), {
      status: 200,
    });
  } catch (error: unknown) {
    if (error instanceof Error)
      return new Response(JSON.stringify(error?.message), { status: 500 });
    else return new Response(JSON.stringify(error), { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const paramsId = (await params).id;
  if (!paramsId)
    return new Response(JSON.stringify("Invalid id"), { status: 400 });

  try {
    const { id }: { id: number } = await request.json();

    if (Number(paramsId) !== id)
      return new Response(JSON.stringify("Mismatched id"), { status: 400 });

    const deletedProduct = await prisma.product.delete({
      where: {
        id,
      },
    });
    return new Response(JSON.stringify(deletedProduct), { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error)
      return new Response(JSON.stringify(error?.message), { status: 500 });
    else return new Response(JSON.stringify(error), { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const paramsId = (await params).id;
  if (!paramsId)
    return new Response(JSON.stringify("Invalid id"), { status: 400 });

  try {
    const { id, name, description, thumbnailUrl, price, quantity }: Product =
      await request.json();

    if (Number(paramsId) !== id)
      return new Response(JSON.stringify("Mismatched id " + paramsId + id), {
        status: 400,
      });

    const updatedProduct = await prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        thumbnailUrl,
        price,
        quantity,
      },
    });
    return new Response(JSON.stringify(updatedProduct), { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error)
      return new Response(JSON.stringify(error?.message), { status: 500 });
    else return new Response(JSON.stringify(error), { status: 500 });
  }
}
