"use client";
import { Minus, Plus, Close } from "@/components/icons/index";
import ItemSummary from "./ItemSummary";
import { useEffect, useState } from "react";
import axios from "axios";

interface ItemsTypes {
  id: number;
  image: string;
  price: number;
  quantity: number;
  title: string;
  __v: number;
  _id: number;
}

interface CartData {
  items: ItemsTypes[];
}

export default function RenderCartItems() {
  const [cartData, setCartData] = useState<CartData | null>(null);

  async function deleteItem(id: number) {
    const data = [...(cartData?.items ?? [])];
    setCartData((prev) => ({
      ...prev!,
      items: prev!.items.filter((item) => item._id !== id),
    }));
    try {
      await axios.delete(`/api/cart/delete?id=${id}`);
    } catch (error) {
      console.error(`error in deleting item: ${error}`);
      //  revert the UI if the DELETE request fails
      setCartData((prev) => ({
        ...prev!,
        items: data,
      }));
    }
  }
  async function increaseQuantity(id: number) {
    try {
      // Update cartData locally , UI
      setCartData((prev) => ({
        ...prev,
        items: prev!.items.map((value) =>
          value._id === id ? { ...value, quantity: value.quantity + 1 } : value
        ),
      }));

      // Find the updated item for the PATCH request
      const item = cartData?.items.find((value) => value._id === id);

      if (!item) {
        console.error(`Item with ID ${id} not found`);
        return;
      }

      await axios.patch(`/api/cart/update/${id}`, {
        quantity: item.quantity + 1, // Update quantity here to match the frontend
      });

      console.log("Quantity updated successfully!");
    } catch (error) {
      console.error(`Error in increasing quantity: ${error}`);
    }
  }

  const items = cartData?.items || [];
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/cart/receive");
        setCartData(response.data);
      } catch (error) {
        console.log(`error in cart RenderCartItems:${error} `);
      }
    })();
  }, []);

  return items ? (
    items.map((item: ItemsTypes) => (
      <section key={item.id} className="flex gap-4 justify-around items-center">
        <ItemSummary title={item.title} imageUrl={item.image} id={item._id} />
        <section className="flex flex-col gap-2">
          <div className="flex gap-2 justify-around items-center">
            <div className="flex justify-around items-center w-full">
              <Minus itemId={item.id} />

              <div className="border-solid h-6 w-6 text-center border-gray-400 border-2">
                <p className="font-semibold">{item.quantity}</p>
              </div>
              <div onClick={() => increaseQuantity(item._id)}>
                <Plus itemId={item.id} />
              </div>
            </div>
            <div className="flex gap-2 justify-around items-center w-full">
              <p className="text-[1.5rem]">${item.price}</p>
              <button type="button" onClick={() => deleteItem(item._id)}>
                <Close />
              </button>
            </div>
          </div>
        </section>
      </section>
    ))
  ) : (
    <p className="text-gray-500 text-lg text-center my-4">
      🛒 Your cart is currently empty. Start shopping to find items you love! 🌟
    </p>
  );
}
