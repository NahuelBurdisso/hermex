import { PaperPlaneTilt, Pencil } from "@phosphor-icons/react";
import { Link } from "@remix-run/react";
import type { ButtonHTMLAttributes } from "react";

const iconMapper = {
  edit: <Pencil size={16} />,
  send: <PaperPlaneTilt size={16} />,
};

const modifierMapper = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  accent: "btn-accent",
  neutral: "btn-neutral",
  success: "btn-success",
  warning: "btn-warning",
  info: "btn-info",
  error: "btn-error",
  link: "btn-link",
  outline: "btn-outline",
  ghost: "btn-ghost",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  glass?: boolean;
  modifier?: keyof typeof modifierMapper;
  icon?: keyof typeof iconMapper;
  linkTo?: string;
}

export function Button({
  label,
  glass = false,
  modifier = "primary",
  icon,
  linkTo,
  ...rest
}: ButtonProps) {
  const modifierClassName = modifierMapper[modifier];
  const glassClassName = glass ? "btn-glass" : "";
  const iconElement = icon ? iconMapper[icon] : null;

  if (linkTo) {
    return (
      <Link
        to={linkTo}
        className={`btn btn-xs sm:btn-sm md:btn-md lg:btn-lg ${modifierClassName} ${glassClassName}`}
      >
        {iconElement}
        {label}
      </Link>
    );
  }

  return (
    <button
      className={`btn btn-xs sm:btn-sm md:btn-md lg:btn-lg ${modifierClassName} ${glassClassName}`}
      {...rest}
    >
      {iconElement}
      {label}
    </button>
  );
}
