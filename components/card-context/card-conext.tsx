"use client";
import { CardContextType, LIST, LIST_ITEM } from "@/types"; // Assuming types are defined elsewhere
import { createContext, useState, useCallback, useEffect } from "react";

export const CardContext = createContext<CardContextType>({
  cardData: [],
  setCardData: () => {},
  addItemToCard: () => {},
  getData: () => [],
});

function CardContextProvider({ children }: { children: React.ReactNode }) {
  const [cardData, setCardData] = useState<LIST_ITEM[]>([]);

  const addItemToCard = useCallback((newItem: LIST_ITEM) => {
    setCardData((prevData) => {
      const existingItem = prevData.find((item) => item.id === newItem.id);

      let updatedItems;
      if (existingItem) {
        updatedItems = [...prevData];
        const index = updatedItems.indexOf(existingItem);
        updatedItems[index] = {
          ...existingItem,
          count: (existingItem?.count ?? 0) + 1,
        };
      } else {
        updatedItems = [...prevData, { ...newItem, count: 1 }];
      }
      setCardData(updatedItems);
      localStorage.setItem("cardData", JSON.stringify(updatedItems));
      return updatedItems;
    });
  }, []);
  useEffect(() => {
    localStorage.setItem("cardData", JSON.stringify([]));
  }, []);
  function getData() {
    const localStorageData = localStorage.getItem("cardData");

    if (localStorageData) {
      const data = JSON.parse(localStorageData);
      setCardData(data);
      return data;
    } else {
      return cardData;
    }
  }

  return (
    <CardContext.Provider
      value={{ cardData, setCardData, addItemToCard, getData }}
    >
      {children}
    </CardContext.Provider>
  );
}

export default CardContextProvider;
