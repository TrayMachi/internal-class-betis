import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "./form";
import { Input } from "./input";
import { AlertCircle } from "lucide-react";
import React from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { LucideProps } from "lucide-react";

interface InputFormProps<
  T extends FieldValues,
  U = any,
  V extends FieldValues | undefined = undefined
> {
  label: string;
  placeholder: string;
  disabled?: boolean;
  description?: string;
  name: Path<T>;
  form: UseFormReturn<T, U, V>;
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  type?: string;
}

const InputForm = <
  T extends FieldValues,
  U = any,
  V extends FieldValues | undefined = undefined
>({
  label,
  placeholder,
  description,
  disabled = false,
  name,
  form,
  icon,
  type = "text",
}: InputFormProps<T, U, V>) => {
  return (
    <FormField
      disabled={disabled}
      control={form.control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className="flex flex-col gap-1 text-xs md:text-base">
            <FormControl>
              <div className="flex flex-col gap-2">
                <label className="text-xs md:text-base">{label}</label>
                <Input
                  type={type}
                  className="text-xs md:text-base"
                  placeholder={placeholder}
                  {...field}
                />
              </div>
            </FormControl>
            {description && (
              <FormDescription className="flex gap-2 items-center">
                <AlertCircle
                  width={14}
                  height={14}
                  className="md:w-[24px] md:h-[24px] opacity-90 dark:opacity-100"
                />
                <span className="text-xs md:text-[16px] opacity-60 dark:opacity-100">
                  {description}
                </span>
              </FormDescription>
            )}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default InputForm;
