"use client";

import { useEffect, useState } from "react";
import { NavigationBarQuery } from "../../tina/__generated__/types";
import Image from "next/image";
import { BookingButton } from "./Blocks/BookingButton";
import Link from "next/link";

interface NavBarClientProps {
  results: NavigationBarQuery | null;
}

export default function NavBarClient({ results }: NavBarClientProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { navigationBar } = results || {};
  const leftNavItems = navigationBar?.leftNavItem;
  const rightNavItems = navigationBar?.rightNavItem;
  const logo = navigationBar?.Logo;

  const renderNavItem = (item: any, index: number) => {
    switch (item?.__typename) {
      case "NavigationBarLeftNavItemStringItem":
      case "NavigationBarRightNavItemStringItem":
        return (
          <li key={index} className="flex items-center lg:px-3 xl:px-0 md:px-3 px-2">
            <Link
              href={item.href}
              className="hover:underline md:text-xl"
            >
              {item.label}
            </Link>
          </li>
        );

      case "NavigationBarLeftNavItemGroupOfStringItems":
      case "NavigationBarRightNavItemGroupOfStringItems":
        return (
          <li key={index} className="flex items-center group relative">
            <span className="cursor-pointer">{item.label}</span>
            <ul className="absolute top-full left-0 bg-white text-black hidden group-hover:block mt-2 space-y-1 p-2 rounded shadow-lg">
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {item.items?.map((subItem: any, subIndex: number) => (
                <li key={subIndex}>
                  <Link href={subItem.href} className="hover:underline">
                    {subItem.label}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        );

      case "NavigationBarLeftNavItemModalButton":
      case "NavigationBarRightNavItemModalButton":
        return (
          <li key={index} className="flex items-center">
            <button
              className={`px-4 py-2 rounded ${
                item.variant === "primary"
                  ? "bg-blue-500 text-white"
                  : item.variant === "secondary"
                  ? "bg-gray-500 text-white"
                  : "bg-white text-black"
              }`}
            >
              {item.label}
            </button>
          </li>
        );

      case "NavigationBarRightNavItemBookingButton":
        return (
          <li key={index} className="flex items-center">
            <BookingButton title={item.Title} jotFormId={item.JotFormId} />
          </li>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <nav
        className={`${
          scrolled
            ? 'bg-stone-700 bg-opacity-90 backdrop-blur-md'
            : 'bg-transparent'
        } text-gray-300 fixed top-0 left-0 w-full z-50 transition-colors duration-300 flex justify-between items-center h-[70px]`}
      >
        <ul className="md:pl-20 pl-10 flex items-center justify-start h-full space-x-15 xl:space-x-10">
          {logo && (
            <li className="flex items-center">
              <Link href="/" className="pb-1 lg:px-3 xl:px-0 md:px-3 px-2">
                <Image src={logo} alt="Logo" width={200} height={200} />
              </Link>
            </li>
          )}
          {leftNavItems?.map((item, index) => renderNavItem(item, index))}
        </ul>
  
        <ul className="md:pr-20 pr-5 flex items-center justify-end h-full space-x-15 xl:space-x-20">
          {rightNavItems?.map((item, index) => renderNavItem(item, index))}
        </ul>
      </nav>
    </div>
  );
  
}
