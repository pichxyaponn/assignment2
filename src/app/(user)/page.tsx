"use client";

import { Product } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Failed to fetch products");

      const data: Product[] = await res.json();
      setProducts(data);
      console.log(data);
    } catch (error: unknown) {
      if (error instanceof Error) console.log(error?.message);
      else console.log(error);
    }
  }

  async function deleteProduct(id: number) {
    try {
      await fetch(`/api/product/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      fetchProducts();
      alert("Product deleted successfully");
    } catch (error: unknown) {
      if (error instanceof Error) console.log(error?.message);
      else console.log(error);
    }
  }

  return (
    <section className="space-y-0">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-6">All Products</h1>
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr className="divide-x divide-gray-200">
                <th className="myth">ID</th>
                <th scope="col" className="myth">
                  Name
                </th>
                <th scope="col" className="myth">
                  Description
                </th>
                <th scope="col" className="myth">
                  Price
                </th>
                <th scope="col" className="myth">
                  Quantity
                </th>
                <th scope="col" className="myth">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.length ? (
                products.map((product: Product) => (
                  <tr key={product.id}>
                    <td className="mytd">
                      <div className="text-sm font-medium text-gray-900">
                        {product.id}
                      </div>
                    </td>
                    <td className="mytd">
                      <div className="text-sm font-medium text-gray-900">
                        {product.name}
                      </div>
                    </td>
                    <td className="mytd">
                      <div className="text-sm font-medium text-gray-900">
                        {product.description}
                      </div>
                    </td>
                    <td className="mytd">
                      <div className="text-sm font-medium text-gray-900">
                        ฿{product.price}
                      </div>
                    </td>
                    <td className="mytd">
                      <div className="text-sm font-medium text-gray-900">
                        {product.quantity} EA
                      </div>
                    </td>
                    <td className="mytd text-sm font-medium">
                      <Link
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                        href={`/edit/${product.id}`}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Link
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          href="/create"
        >
          Create a Product
        </Link>
      </div>
    </section>
  );
}
