'use client';

import { FC, HtmlHTMLAttributes } from "react";

interface MenuItemProps extends HtmlHTMLAttributes<HTMLDivElement> {
  label: string;
}

const MenuItem: FC<MenuItemProps> = ({ onClick, label }) => {
  return (
    <div
      onClick={onClick}
      className="
        px-4
        py-3
        hover:bg-neutral-100
        transition
        font-semibold
      "
    >
      {label}
    </div>
  )
}

export default MenuItem;