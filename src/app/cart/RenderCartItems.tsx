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
  const items = cartData?.items || [];
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
              <Plus itemId={item.id} />
            </div>
            <div className="flex gap-2 justify-around items-center w-full">
              <p className="text-[1.5rem]">${item.price}</p>
              <Close />
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
