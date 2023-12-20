"use client";

import clsx from "clsx";
import Link from "next/link";
import { FC } from "react";

interface MobileItemsProps {
  href: string;
  active?: boolean;
  icon: any;
  onClick?: () => void;
}
const MobileItem: FC<MobileItemsProps> = ({
  icon: Icon,
  active,
  onClick,
  href,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <Link
      onClick={onClick}
      href={href}
      className={clsx(
        `group
         flex
          gap-x-3
           text-sm
            leading-6
             font-semibold
              w-full
               justify-center
                p-4
                 text-gray-500
                 hover:text-black
                  hover:bg-gray-100 `,
        active && "bg-black"
      )}
    >
      <Icon className=" h-6 w-6 " />
    </Link>
  );
};

export default MobileItem;
