import { HTMLInputTypeAttribute } from "react";
import Link from "next/link";

interface ICustomInputProps {
  identifier: string;
  type: HTMLInputTypeAttribute;
  isRequired?: boolean;
  helpLink?: {
    text: string;
    redirect: string;
  };
  handleChange: (e: string) => void;
}

export const CustomInput = ({
  identifier,
  type,
  isRequired = true,
  helpLink,
  handleChange,
}: ICustomInputProps) => (
  <div>
    <div className="flex items-center justify-between">
      <label
        htmlFor={identifier}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {identifier}
      </label>
      {helpLink && (
        <div className="text-sm">
          <Link
            href={helpLink?.redirect}
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            {helpLink?.text}
          </Link>
        </div>
      )}
    </div>
    <div className="mt-2">
      <input
        id={identifier}
        name={identifier}
        type={type}
        autoComplete={type}
        required={isRequired}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  </div>
);
