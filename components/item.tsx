"use client";
import { LIST_ITEM } from "@/types";
import React, { useContext } from "react";
import { CardContext } from "./card-context/card-conext";
import { usePathname } from "next/navigation";

function Item({ item }: { item: LIST_ITEM }) {
  const { addItemToCard } = useContext(CardContext);
  const urlPath = usePathname();
  return (
    <div className="max-w-md p-6 block bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {item.name}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {item.description}
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        ${item.price}
      </p>

      {!urlPath.startsWith("/shopping-cart") ? (
        <div className="flex justify-end">
          <button
            className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => addItemToCard(item)}
          >
            Add Item
          </button>
        </div>
      ) : (
        <p className="text-white">Count: {item?.count}</p>
      )}
    </div>
  );
}

export default Item;
