"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { Menu } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import ThemeToggle from "./ThemeToggle";
import LocaleSwitcher from "./LocaleSwitcher";

export default function NavigationBar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const { user } = useUser();
  const role = user?.publicMetadata?.role;
  const isAdmin = role === "Admin";

  return (
    <div>
      {/* Desktop Navigation Bar */}
      <header className="hidden md:flex justify-between items-center my-3 mx-4 px-6 py-3 rounded-xl bg-card/80 backdrop-blur-sm border shadow-sm transition-all duration-200">
        {/* Left: Logo and Title */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <Image
            alt="Whitworth Logo"
            src="/whitworth.png"
            width="32"
            height="32"
            className="transition-transform duration-200 hover:scale-110"
          />
          <Link href={`/${locale}`} className="transition-opacity duration-200 hover:opacity-80">
            <h1 className="font-semibold text-2xl whitespace-nowrap bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              PirateHub
            </h1>
          </Link>
        </div>
        {/* Middle: Navigation Buttons */}
        <div className="flex justify-center gap-2 flex-none">
          <Link href={`/${locale}/map`}>
            <Button className="w-20 h-9" variant="ghost">
              {t("map")}
            </Button>
          </Link>
          <Link href={`/${locale}/events`}>
            <Button className="w-20 h-9" variant="ghost">
              {t("events")}
            </Button>
          </Link>
          <Link href={`/${locale}/campus-guide`}>
            <Button className="w-28 h-9" variant="ghost">
              {t("guide")}
            </Button>
          </Link>
          <Link href={`/${locale}/social`}>
            <Button className="w-20 h-9" variant="ghost">
              {t("social")}
            </Button>
          </Link>
        </div>
        {/* Right: Auth Buttons */}
        <div className="flex gap-3 flex-1 min-w-0 justify-end">
          <LocaleSwitcher />
          <ThemeToggle />
          <SignedOut>
            <SignUpButton>
              <Button>{t("signUp")}</Button>
            </SignUpButton>
            <SignInButton>
              <Button>{t("login")}</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            {isAdmin && (
              <Link href={`/${locale}/admin`}>
                <Button>{t("adminPanel")}</Button>
              </Link>
            )}
            <UserButton />
          </SignedIn>
        </div>
      </header>
      {/* Mobile Navigation Bar */}
      <header className="flex md:hidden my-3 justify-between mx-4 px-4 py-3 rounded-xl bg-card/80 backdrop-blur-sm border shadow-sm">
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger className="h-9 w-9 flex items-center justify-center transition-transform duration-200 hover:scale-110">
              <Menu className="h-5 w-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-card border shadow-lg rounded-lg">
              <DropdownMenuLabel>
                <p className="font-bold">{t("user")}</p>
              </DropdownMenuLabel>
              <SignedOut>
                <DropdownMenuItem asChild>
                  <SignUpButton>{t("signUp")}</SignUpButton>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <SignInButton>{t("login")}</SignInButton>
                </DropdownMenuItem>
              </SignedOut>
              <SignedIn>
                <DropdownMenuItem asChild>
                  <Link href={`/${locale}/user-profile`}>{t("profile")}</Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link href={`/${locale}/admin`}>{t("adminPanel")}</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <SignOutButton />
                </DropdownMenuItem>
              </SignedIn>
              <DropdownMenuLabel>
                <p className="font-bold">{t("menu")}</p>
              </DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link href={`/${locale}/map`}>{t("map")}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/${locale}/events`}>{t("events")}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/${locale}/campus-guide`}>{t("campusGuide")}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/${locale}/social`}>{t("social")}</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
        <div className="flex gap-2 items-center">
          <Link href={`/${locale}`} className="transition-opacity duration-200 hover:opacity-80">
            <h1 className="font-semibold text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">PirateHub</h1>
          </Link>
          <Image
            alt="Whitworth Logo"
            src="/whitworth.png"
            width="32"
            height="32"
            className="transition-transform duration-200 hover:scale-110"
          />
        </div>
      </header>
    </div>
  );
}
