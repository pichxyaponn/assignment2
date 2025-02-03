import { PrismaClient, Product } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error)
      return new Response(JSON.stringify(error?.message), { status: 500 });
    else return new Response(JSON.stringify(error), { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, description, thumbnailUrl, price, quantity }: Product =
      await request.json();

    const createdProduct = await prisma.product.create({
      data: {
        name,
        description,
        thumbnailUrl,
        price,
        quantity,
      },
    });
    return new Response(JSON.stringify(createdProduct), { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error)
      return new Response(JSON.stringify(error?.message), { status: 500 });
    else return new Response(JSON.stringify(error), { status: 500 });
  }
}
