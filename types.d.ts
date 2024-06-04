export type LIST_ITEM = {
  id: string;
  name: string;
  description: string;
  price: number;
  count?: number;
};

export type LIST = {
  items: ITEMS_LIST[];
};

export type CardContextType = {
  cardData: ITEMS_LIST[];
  setCardData: React.Dispatch<React.SetStateAction<LIST_ITEM[]>>;
  addItemToCard: (newItem: LIST_ITEM) => void;
  getData: () => ITEMS_LIST[];
};
