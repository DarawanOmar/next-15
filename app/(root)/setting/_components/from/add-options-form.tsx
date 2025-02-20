"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { TextField } from "@/components/reusable/input-form-reusable";
import { LucideLoader2, Plus, X } from "lucide-react";
import {
  addQuestion,
  addQuestionType,
  addOptions,
  addOptionsType,
} from "../../_type";
import { useQuery } from "@tanstack/react-query";
import { getAllOption, getAllQuestion } from "../../_lib";
import React from "react";
import {
  addOptionsAction,
  addQuestionAction,
  deleteOptionsAction,
  deleteQuestionItem,
} from "../../_actions";
import { toast } from "sonner";
import { LuLoaderCircle } from "react-icons/lu";

function AddOptions() {
  const {
    data: question,
    isLoading: isQuestionLoading,
    refetch: questinRefech,
  } = useQuery({
    queryKey: ["getQuestions"],
    queryFn: getAllQuestion,
  });

  const {
    data: option,
    isLoading: isOptionLoading,
    refetch: optionsRefetch,
  } = useQuery({
    queryKey: ["getOptions"],
    queryFn: getAllOption,
  });

  // ------------------------------ Question --------------------------------
  const [pendingQuestion, setPendingQuestion] = React.useTransition();
  const [deletingQuestionId, setDeletingQuestionId] = React.useState<number>(0);
  const formQuestion = useForm<addQuestionType>({
    resolver: zodResolver(addQuestion),
    defaultValues: {
      question_text: "",
    },
  });

  function onSubmitQuestion(values: addQuestionType) {
    setPendingQuestion(async () => {
      const result = await addQuestionAction(values);
      if (result.success) {
        toast.success(result.message);
        questinRefech();
        formQuestion.reset();
      } else {
        toast.error(result.message);
      }
    });
  }

  // ------------------------------  Options --------------------------------
  const [pendingOptions, setPendingOptions] = React.useTransition();
  const [deletingOptionId, setDeletingOptionId] = React.useState<number>(0);
  const formOptions = useForm<addOptionsType>({
    resolver: zodResolver(addOptions),
    defaultValues: {
      option_text: "",
    },
  });

  function onSubmitOptions(values: addOptionsType) {
    setPendingOptions(async () => {
      const result = await addOptionsAction(values);
      if (result.success) {
        toast.success(result.message);
        optionsRefetch();
        formOptions.reset();
      } else {
        toast.error(result.message);
      }
    });
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 ">
      <div>
        <Form {...formQuestion}>
          <form
            onSubmit={formQuestion.handleSubmit(onSubmitQuestion)}
            className="flex items-end gap-5 px-5"
          >
            <TextField
              control={formQuestion.control}
              name="question_text"
              label="زیادکردنی پرسیارەکان"
              classFormItem="w-full"
            />
            <Button type="submit" className=" max-w-full  rounded-full ">
              {pendingQuestion ? (
                <LuLoaderCircle className="animate-spin transition-all duration-500" />
              ) : (
                <Plus size={25} strokeWidth={3} />
              )}
            </Button>
          </form>
        </Form>
        {isQuestionLoading ? (
          <LucideLoader2 className="size-5 animate-spin flex justify-center items-center" />
        ) : (
          <div className="my-10 grid grid-cols-1 gap-5">
            {question?.data?.map((question, index) => (
              <div
                className="bg-table dark:bg-black/10 dark:border rounded-full p-4 max-w-max relative"
                key={question.question_id}
              >
                {question.question_text}
                <button
                  type="button"
                  onClick={() => {
                    setDeletingQuestionId(question.question_id);
                    setPendingQuestion(async () => {
                      await deleteQuestionItem(question.question_id);
                      setDeletingQuestionId(0);
                      questinRefech();
                    });
                  }}
                  className="absolute top-0 right-0 bg-black text-white p-0.5 rounded-full"
                >
                  {deletingQuestionId === question.question_id ? (
                    <LuLoaderCircle className="animate-spin transition-all duration-500" />
                  ) : (
                    <X size={15} />
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        <Form {...formOptions}>
          <form
            onSubmit={formOptions.handleSubmit(onSubmitOptions)}
            className="flex items-end gap-5 px-5"
          >
            <TextField
              control={formOptions.control}
              name="option_text"
              label="زیادکردنی هەڵبژاردنەکان"
              classFormItem="w-full"
            />
            <Button type="submit" className=" max-w-full  rounded-full ">
              {pendingOptions ? (
                <LuLoaderCircle className="animate-spin transition-all duration-500" />
              ) : (
                <Plus size={25} strokeWidth={3} />
              )}
            </Button>
          </form>
        </Form>
        {isOptionLoading ? (
          <LucideLoader2 className="size-5 animate-spin flex justify-center items-center" />
        ) : (
          <div className="my-10 grid grid-cols-1 gap-5">
            {option?.data?.map((option, index) => (
              <div
                className="bg-table dark:bg-black/10 dark:border rounded-full p-4 max-w-max relative"
                key={option.option_id}
              >
                {option.option_text}
                <button
                  type="button"
                  onClick={() => {
                    setDeletingOptionId(option.option_id);
                    setPendingOptions(async () => {
                      await deleteOptionsAction(option.option_id);
                      setDeletingOptionId(0);
                      optionsRefetch();
                    });
                  }}
                  className="absolute top-0 right-0 bg-black text-white p-0.5 rounded-full"
                >
                  {deletingOptionId === option.option_id ? (
                    <LuLoaderCircle className="animate-spin transition-all duration-500" />
                  ) : (
                    <X size={15} />
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AddOptions;
