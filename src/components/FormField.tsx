import { FormFieldProps } from "@/interfaces";
import { Field } from "formik";
import React from "react";
import { PropsWithChildren } from "react";

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
        className="block mb-2 text-sm font-medium text-white"
      >
        {label}
      </label>
      <Field
        type={type}
        name={name}
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
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
