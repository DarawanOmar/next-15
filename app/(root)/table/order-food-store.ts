import { proxy } from "valtio";

type options_food_order = {
  option: string;
};

export type food = {
  food_id: number;
  order_item_id?: number;
  name: string;
  image: string;
  price: number;
  addQuantity: number;
  qunaity?: number;
  properties: string[];
};

export type SelectedFood = {
  readonly food_id: number;
  readonly name: string;
  readonly image: string;
  readonly price: number;
  readonly addQuantity: number;
  readonly qunaity?: number;
  readonly order_item_id?: number;
  readonly properties: readonly string[];
};

export interface foodStore {
  discount: number;
  selectedFood: food[];
  listOrderFood: food[];
  totalPrice: number;
  totalPriceListOrder: number;
}

export interface optionFoodOrder {
  options: options_food_order[];
}

const foodStore = proxy<foodStore>({
  discount: 0,
  selectedFood: [] as food[],
  listOrderFood: [] as food[],
  totalPrice: 0,
  totalPriceListOrder: 0,
});
const optionsOrderStore = proxy<optionFoodOrder>({
  options: [] as options_food_order[],
});

// ----------------------------Order Food----------------------------
function addFood(food: food) {
  const existingFood = foodStore.selectedFood.find(
    (p) => p.food_id === food.food_id
  );
  if (existingFood) {
    existingFood.addQuantity += 1;
  } else {
    foodStore.selectedFood.push({
      ...food,
      addQuantity: 1,
    });
  }
  calculateTotalPrice();
}

function increaseQty(food_id: number) {
  const food = foodStore.selectedFood.find((p) => p.food_id === food_id);
  if (food) {
    food.addQuantity += 1;
  }
  calculateTotalPrice();
}

function decreaseQty(food_id: number) {
  const food = foodStore.selectedFood.find((p) => p.food_id === food_id);

  if (food) {
    food.addQuantity -= 1;
    if (food.addQuantity < 1) {
      removeFood(food_id);
    }
  }
  calculateTotalPrice();
}

function removeFood(food_id: number) {
  foodStore.selectedFood = foodStore.selectedFood.filter(
    (p) => p.food_id !== food_id
  );
  calculateTotalPrice();
}

// ----------------------------List Order Food------------------------

function increaseListOrderQty(food_id: number) {
  const index = foodStore.listOrderFood.findIndex((p) => p.food_id === food_id);
  if (index !== -1) {
    foodStore.listOrderFood[index].addQuantity += 1;
    foodStore.listOrderFood = [...foodStore.listOrderFood]; // 🔥 Ensure reactivity
  }
  calculateTotalPriceListOrder();
}

function decreaseListOrderQty(food_id: number) {
  const index = foodStore.listOrderFood.findIndex((p) => p.food_id === food_id);
  if (index !== -1) {
    foodStore.listOrderFood[index].addQuantity -= 1;
    if (foodStore.listOrderFood[index].addQuantity < 1) {
      foodStore.listOrderFood.splice(index, 1);
    }
    foodStore.listOrderFood = [...foodStore.listOrderFood]; // 🔥 Ensure reactivity
  }
  calculateTotalPriceListOrder();
}

function removeListOrderFood(food_id: number) {
  foodStore.listOrderFood = foodStore.listOrderFood.filter(
    (p) => p.food_id !== food_id
  );
  calculateTotalPriceListOrder();
}

function resetAll() {
  foodStore.selectedFood = [];
  // foodStore.listOrderFood = [];
  foodStore.discount = 0;
  calculateTotalPrice();
  calculateTotalPriceListOrder();
}

function calculateTotalPrice() {
  let total = 0;
  foodStore?.selectedFood?.forEach((food) => {
    return (total += food.price * food.addQuantity);
  });

  foodStore.totalPrice = total;
}
function calculateTotalPriceListOrder() {
  let total = 0;
  foodStore?.listOrderFood?.forEach((food) => {
    return (total += food.price * food.addQuantity);
  });

  foodStore.totalPriceListOrder = (total as number) || 0;
}

//---------------------------OptionOrder Function-------------------------

function handleOptionChange(optionId: string, optionText: string) {
  const existingOption = optionsOrderStore.options.find(
    (opt) => opt.option === optionText
  );

  if (existingOption) {
    // Remove from state if unchecked
    optionsOrderStore.options = optionsOrderStore.options.filter(
      (opt) => opt.option !== optionText
    );
  } else {
    // Add to state if checked
    optionsOrderStore.options.push({ option: optionText });
  }
}

export {
  addFood,
  removeFood,
  decreaseQty,
  increaseQty,
  calculateTotalPrice,
  resetAll,
  decreaseListOrderQty,
  increaseListOrderQty,
  removeListOrderFood,
  calculateTotalPriceListOrder,
  handleOptionChange,
  optionsOrderStore,
};
export default foodStore;
