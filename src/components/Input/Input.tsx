import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = (props: InputProps) => {
  return (
    <div>
      <input
        {...props}
        className="border-0 h-9 rounded-md outline-none w-full px-2 mb-3"
      />
    </div>
  );
};
