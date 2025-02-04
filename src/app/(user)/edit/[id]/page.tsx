"use client";

import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Edit({ params }: { params: Promise<{ id: string }> }) {
  const [name, setName] = useState<string>("Loading...");
  const [description, setDescription] = useState<string>("Loading...");
  const [price, setPrice] = useState<number>(10.29);
  const [quantity, setQuantity] = useState<number>(1);
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("/placeholder.png");
  const router = useRouter();
  const id = use(params).id;

  useEffect(() => {
    if (id) fetchProduct(parseInt(id));
  }, [id]);

  const fetchProduct = async (id: number) => {
    try {
      const res = await fetch(`/api/product/${id}`);
      if (!res.ok) throw new Error("Failed to fetch product");

      const product = await res.json();
      console.log(product);
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setQuantity(product.quantity);
      setThumbnailUrl(product.thumbnailUrl);
    } catch (error: unknown) {
      if (error instanceof Error) console.log(error?.message);
      else console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.put(`/api/product/${id}`, {
        id: parseInt(id),
        name,
        description,
        thumbnailUrl,
        price,
        quantity,
      });
      router.push("/");
      alert("Product updated successfully");
    } catch (error: unknown) {
      if (error instanceof Error) console.log(error?.message);
      else console.log(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Edit Product ID: {id}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="number"
            name="price"
            id="price"
            required
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-700"
          >
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            required
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="thumbnailUrl"
            className="block text-sm font-medium text-gray-700"
          >
            Thumbnail Url
          </label>
          <input
            type="text"
            name="thumbnailUrl"
            id="thumbnailUrl"
            required
            value={thumbnailUrl}
            onChange={(e) => setThumbnailUrl(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <Image src={thumbnailUrl} alt={name} width={100} height={100} />
        </div>
        <div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
