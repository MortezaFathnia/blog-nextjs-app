import React from "react"
import { useFormContext } from "react-hook-form"

type FormInputProps = {
  label: string
  name: string
  type?: string
  value?:string
  multiline?: number
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = "text",
  value,
  multiline
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  return (
    <div className="">
      <label htmlFor={name} className="block text-ct-blue-600 mb-3">
        {label}
      </label>
      {multiline ? (
        <textarea
          rows={multiline}
          defaultValue={value ? value : ''}
          className="block w-full rounded-2xl appearance-none focus:outline-none py-2 px-4"
          {...register(name)}
        />
      ) : (
        <input
          type={type}
          placeholder=" "
          defaultValue={value ? value : ''}
          className="block w-full rounded-2xl appearance-none focus:outline-none py-2 px-4"
          {...register(name)}
        />
      )}

      {errors[name] && (
        <span className="text-red-500 text-xs pt-1 block">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  )
}

export default FormInput
