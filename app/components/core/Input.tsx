import type { InputHTMLAttributes } from "react";
import { useField } from "remix-validated-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

export function Input({ name, label, ...rest }: InputProps) {
  const { error, getInputProps } = useField(name);

  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">{label}</span>
        <span className="label-text-alt">Top Right label</span>
      </div>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-full max-w-xs"
        {...getInputProps({ id: name })}
        {...rest}
      />
      <div className="label">
        {error && (
          <span className="label-text-alt text-sm text-red-600 dark:text-red-500">
            {error}
          </span>
        )}
      </div>
    </label>
  );
}
