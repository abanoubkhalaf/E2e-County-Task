"use client";
import { Suspense, useContext, useEffect, useState } from "react";
import { CardContext } from "./card-context/card-conext";
import ItemsList from "./items-list";
import { LIST_ITEM } from "@/types";

function ShoppingCartList() {
  const { getData } = useContext(CardContext);
  const [shoppingCardData, setShoppingCardData] = useState<LIST_ITEM[]>([]);
  useEffect(() => {
    const data = getData();
    setShoppingCardData(data);
  }, []);

  return (
    <div>
      <Suspense fallback={<div>Loading ....</div>}>
        <ItemsList items={shoppingCardData} />
      </Suspense>
      <div className="text-center mb-1">
        <button className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Check Out
        </button>
      </div>
    </div>
  );
}

export default ShoppingCartList;
