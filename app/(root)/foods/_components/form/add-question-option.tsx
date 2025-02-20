"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LuLoaderCircle } from "react-icons/lu";
import { Plus, X } from "lucide-react";
import { getAllOption, getAllQuestion } from "@/app/(root)/setting/_lib";
import { SimpleSelect } from "@/components/reusable/select-naitve";

export type SchemaType = {
  question_id: number;
  options: number[];
};

type Props = {
  schema: SchemaType[];
  setSchema: React.Dispatch<React.SetStateAction<SchemaType[]>>;
};

function AddQuestionOptions({ schema, setSchema }: Props) {
  const { data: questions, isLoading: isQuestionLoading } = useQuery({
    queryKey: ["getQuestions"],
    queryFn: getAllQuestion,
  });

  const { data: options, isLoading: isOptionLoading } = useQuery({
    queryKey: ["getOptions"],
    queryFn: getAllOption,
  });

  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(
    null
  );
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);

  // ✅ Add Question (Prevents duplicate entries)
  const handleAddQuestion = () => {
    if (!selectedQuestionId) return;

    if (!schema.some((q) => q.question_id === selectedQuestionId)) {
      setSchema([...schema, { question_id: selectedQuestionId, options: [] }]);
    }
  };

  // ✅ Add Option to a Specific Question
  const handleAddOption = (questionId: number) => {
    if (!selectedOptionId) return;

    setSchema((prevSchema) =>
      prevSchema.map((q) =>
        q.question_id === questionId
          ? q.options.includes(selectedOptionId)
            ? q // Don't add duplicate options
            : { ...q, options: [...q.options, selectedOptionId] }
          : q
      )
    );
  };

  // ✅ Remove Option from a Question
  const handleRemoveOption = (questionId: number, optionId: number) => {
    setSchema((prevSchema) =>
      prevSchema.map((q) =>
        q.question_id === questionId
          ? { ...q, options: q.options.filter((opt) => opt !== optionId) }
          : q
      )
    );
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
            onChange={(value) => setSelectedQuestionId(Number(value))}
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
          <Plus size={25} strokeWidth={3} />
        </Button>
      </div>

      {/* Render Added Questions and Options */}
      <div className="mt-5">
        {schema.map((q, index) => (
          <div key={index} className="mb-6 p-3  rounded-xl ">
            <div className="flex gap-2 items-start">
              <p className=" text-lg">
                {
                  questions?.data?.find(
                    (ques) => ques.question_id === q.question_id
                  )?.question_text
                }
              </p>
              <button
                type="button"
                onClick={() => {
                  setSchema((prevSchema) =>
                    prevSchema.filter(
                      (ques) => ques.question_id !== q.question_id
                    )
                  );
                }}
                className=" max-w-max max-h-max rounded-full bg-black text-white p-[2px]"
              >
                <X size={10} strokeWidth={2} />
              </button>
            </div>
            {/* Select Option for this Question */}
            <div className="flex items-end gap-5 mt-3">
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
                  placeholder="هەڵبژاردنی هەڵبژار"
                />
              )}
              <Button
                type="button"
                onClick={() => handleAddOption(q.question_id)}
                className="rounded-full"
              >
                <Plus size={25} strokeWidth={3} />
              </Button>
            </div>

            {/* Display Added Options */}
            <div className="mt-3">
              {q.options.map((opt, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-2 relative max-w-max"
                >
                  <span className="">{i + 1} - </span>
                  <div className="flex bg-table px-6 py-2 rounded-xl">
                    <p className="text-sm font-medium">
                      {
                        options?.data?.find((o) => o.option_id === opt)
                          ?.option_text
                      }
                    </p>
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(q.question_id, opt)}
                      className="absolute top-0 end-0 max-w-max max-h-max rounded-full bg-black text-white p-1"
                    >
                      <X size={10} strokeWidth={2} />
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

export default AddQuestionOptions;
