import { StaticImageData } from "next/image";
import { proxy } from "valtio";

export type SuggestItemList = {
  item_id: string;
  barcode: string;
  image?: string | StaticImageData;
  name: string;
  price?: number;
  cost?: number;
  color?: string;
  category?: string;
  quantity?: number;
  is_gift?: boolean;
};

export interface purchaseStoreType {
  presentProducts: "card" | "table";
  currentWarehouseId: string;
  chooseItemFastSale: SuggestItemList | null;
}

const purchaseStore = proxy<purchaseStoreType>({
  currentWarehouseId: "1",
  chooseItemFastSale: null,
  presentProducts: "table",
});

function chooseItemFastSale(item: SuggestItemList) {
  purchaseStore.chooseItemFastSale = item;
}

function setPresentProducts(presentProducts: "card" | "table") {
  purchaseStore.presentProducts = presentProducts;
}

function setWarehouseId(warehouseId: string) {
  purchaseStore.currentWarehouseId = warehouseId;
}

export { chooseItemFastSale, setPresentProducts, setWarehouseId };
export default purchaseStore;
