import React from "react";
import { FoodQuestion } from "../../_type";
import { getAllOption, getAllQuestion } from "@/app/(root)/setting/_lib";
import { useQuery } from "@tanstack/react-query";
import { LuLoaderCircle } from "react-icons/lu";
import { SimpleSelect } from "@/components/reusable/select-naitve";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";
import {
  addOptionsToFood,
  addQuestionToFood,
  deleteOptionsToFood,
  deleteQuestionToFood,
} from "../../_actions";

type Props = {
  properties: FoodQuestion[];
  food_id: number;
};

function EditOptionQuestion({ properties, food_id }: Props) {
  const { data: questions, isLoading: isQuestionLoading } = useQuery({
    queryKey: ["getQuestions"],
    queryFn: getAllQuestion,
  });

  const { data: options, isLoading: isOptionLoading } = useQuery({
    queryKey: ["getOptions"],
    queryFn: getAllOption,
  });
  const [pendding, setPendding] = React.useTransition();
  const [penddingDelete, setPenddingDelete] = React.useTransition();
  const [penddingIdDelete, setPenddingIdDelete] = React.useState(0);
  const [selectedQuestionId, setSelectedQuestionId] = React.useState("");
  const [selectedOptionId, setSelectedOptionId] = React.useState(0);
  const handleAddQuestion = () => {
    if (!selectedQuestionId) return toast.error("پرسیار هەڵبژێرە");

    setPendding(async () => {
      const result = await addQuestionToFood({
        food_id: food_id,
        question_id: +selectedQuestionId,
      });
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };
  const handleDeleteQuestion = (question_id: number) => {
    setPenddingIdDelete(+question_id);
    setPenddingDelete(async () => {
      const result = await deleteQuestionToFood(question_id);
      if (result.success) {
        toast.success(result.message);
        setPenddingIdDelete(0);
      } else {
        toast.error(result.message);
        setPenddingIdDelete(0);
      }
    });
  };

  const handleAddOption = (question_id: number) => {
    if (!selectedOptionId) return toast.error("هەڵبژاردن هەڵبژێرە");
    setPenddingIdDelete(+question_id);
    setPendding(async () => {
      const result = await addOptionsToFood({
        food_question_id: question_id,
        option_id: selectedOptionId,
      });
      if (result.success) {
        toast.success(result.message);
        setPenddingIdDelete(0);
      } else {
        toast.error(result.message);
        setPenddingIdDelete(0);
      }
    });
  };

  const handleDeleteOption = (option_id: number) => {
    setPenddingIdDelete(+option_id);
    setPenddingDelete(async () => {
      const result = await deleteOptionsToFood(option_id);
      if (result.success) {
        toast.success(result.message);
        setPenddingIdDelete(0);
      } else {
        toast.error(result.message);
        setPenddingIdDelete(0);
      }
    });
  };
  return (
    <div className="mt-10 max-w-xs">
      {/* Select Question */}
      <div className="flex items-end gap-5">
        {isQuestionLoading ? (
          <LuLoaderCircle className="animate-spin transition-all duration-500" />
        ) : (
          <SimpleSelect
            label="پرسیار هەڵبژێرە"
            onChange={(value) => setSelectedQuestionId(value)}
            options={
              questions?.data?.map((q) => ({
                value: q.question_id.toString(),
                label: q.question_text,
              })) || []
            }
            isLabel
            placeholder="پرسیار هەڵبژێرە"
          />
        )}
        <Button
          type="button"
          onClick={handleAddQuestion}
          className="rounded-full"
        >
          {pendding ? (
            <LuLoaderCircle className="animate-spin duration-300 transition-all" />
          ) : (
            <Plus size={25} strokeWidth={3} />
          )}
        </Button>
      </div>
      <div className="mt-3">
        {properties?.map((question, i) => (
          <div key={i}>
            <div className="flex items-center gap-2 p-2 relative max-w-max">
              <div className="flex">
                <p className="text-lg">{question.question.question_text}</p>
                <button
                  type="button"
                  onClick={() =>
                    handleDeleteQuestion(question.food_question_id)
                  }
                  className="absolute top-0 -end-2.5 max-w-max max-h-max rounded-full bg-black text-white p-1"
                >
                  {penddingIdDelete === question.food_question_id ? (
                    <LuLoaderCircle
                      size={10}
                      className="animate-spin duration-300 transition-all"
                    />
                  ) : (
                    <X size={10} strokeWidth={2} />
                  )}
                </button>
              </div>
            </div>

            {/* Select Option for this Question */}
            <div className="flex items-end gap-5">
              {isOptionLoading ? (
                <LuLoaderCircle className="animate-spin transition-all duration-500" />
              ) : (
                <SimpleSelect
                  label="هەڵبژاردنی هەڵبژار"
                  onChange={(value) => setSelectedOptionId(Number(value))}
                  options={
                    options?.data?.map((opt) => ({
                      value: opt.option_id.toString(),
                      label: opt.option_text,
                    })) || []
                  }
                  isLabel={false}
                  placeholder="هەڵبژاردن دیاری بکە"
                />
              )}
              <Button
                type="button"
                onClick={() => handleAddOption(question.food_question_id)}
                className="rounded-full"
              >
                {penddingIdDelete === question.food_question_id ? (
                  <LuLoaderCircle className="animate-spin duration-300 transition-all" />
                ) : (
                  <Plus size={25} strokeWidth={3} />
                )}
              </Button>
            </div>

            <div className="my-5 grid gap-2">
              {question?.food_option?.map((opt, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1 p-2 relative max-w-max "
                >
                  <span className="">{i + 1} - </span>
                  <div className="flex bg-table px-6 py-2 rounded-xl">
                    <p className="text-sm font-medium">
                      {opt.option.option_text}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleDeleteOption(opt.food_option_id)}
                      className="absolute top-0 end-0 max-w-max max-h-max rounded-full bg-black text-white p-1"
                    >
                      {penddingIdDelete === opt.food_option_id ? (
                        <LuLoaderCircle className="animate-spin duration-300 transition-all" />
                      ) : (
                        <X size={10} strokeWidth={2} />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EditOptionQuestion;
