import { Field } from "formik";
import React from "react";
import { PropsWithChildren } from "react";

interface FormFieldProps {
  type?: string;
  id: string;
  name: string;
  placeholder?: string;
  rows?: number;
  as?: string;
  label?: string;
  required?: boolean;
  FormChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
function FormField({
  type,
  id,
  name,
  placeholder,
  rows,
  as,
  label,
  FormChange,
  required,
  children,
}: PropsWithChildren<FormFieldProps>) {
  return (
    <>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <Field
        type={type}
        name={name}
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        placeholder={placeholder}
        rows={rows}
        as={as}
        required={required}
        {...(FormChange ? { onChange: FormChange } : {})}
      >
        {children}
      </Field>
    </>
  );
}

export default FormField;
