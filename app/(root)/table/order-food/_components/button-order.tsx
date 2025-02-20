"use client";
import { Food } from "@/app/(root)/foods/_type";
import CustomDialog from "@/components/reusable/resusable-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Purchase } from "@/public/icons";
import React from "react";
import { useSnapshot } from "valtio";
import { addFood, optionsOrderStore } from "../../order-food-store";

type Props = {
  food: Food;
};

function OrderButton({ food }: Props) {
  const [open, setOpen] = React.useState(false);
  function handleOptionChange(optionId: string, optionText: string) {
    const existingOption = optionsOrderStore.options.find(
      (opt) => opt.option === optionText
    );
    if (existingOption) {
      optionsOrderStore.options = optionsOrderStore.options.filter(
        (opt) => opt.option !== optionText
      );
    } else {
      optionsOrderStore.options.push({ option: optionText });
    }
  }
  const snap = useSnapshot(optionsOrderStore);
  return (
    <div>
      {food?.food_question?.length > 0 ? (
        <CustomDialog
          open={open}
          onOpenChange={setOpen}
          text_button="داواکردن"
          icon={Purchase}
          iconPlacement="left"
          className="mt-3"
          classContent="max-w-sm"
          title="داواکردن"
        >
          <div className="grid gap-5 my-5">
            {food?.food_question?.map((question) => (
              <div className="grid gap-3" key={question.food_question_id}>
                <h1 className="text-center font-sirwan_meduim text-lg">
                  {question.question.question_text}
                </h1>
                <div className="mt-2 grid gap-3">
                  {question?.food_option?.map((option) => (
                    <div
                      className="flex items-center gap-2"
                      key={option.option_id}
                    >
                      <Checkbox
                        id={option.option_id.toString()}
                        className="rounded-full"
                        checked={snap.options.some(
                          (opt) => opt.option === option.option.option_text
                        )}
                        onCheckedChange={() =>
                          handleOptionChange(
                            option.option_id.toString(),
                            option.option.option_text
                          )
                        }
                      />
                      <label
                        htmlFor={option.option_id.toString()}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {option.option.option_text}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <Button
              onClick={() => {
                addFood({
                  addQuantity: 1,
                  food_id: food.food_id,
                  image: food.image,
                  name: food.name_ku,
                  price: food.price,
                  properties: snap.options.map((opt) => opt.option), // Get options from Valtio store
                });
                setOpen(false);
              }}
              className="mt-5"
              iconPlacement="left"
              icon={Purchase}
            >
              داواکردن
            </Button>
          </div>
        </CustomDialog>
      ) : (
        <Button
          onClick={() => {
            addFood({
              addQuantity: 1,
              food_id: food.food_id,
              image: food.image,
              name: food.name_ku,
              price: food.price,
              properties: [], // No options selected
            });
          }}
          className="mt-3"
          iconPlacement="left"
          icon={Purchase}
        >
          داواکردن
        </Button>
      )}
    </div>
  );
}
export default OrderButton;
