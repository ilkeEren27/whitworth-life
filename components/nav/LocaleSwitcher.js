"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

export default function LocaleSwitcher() {
  const t = useTranslations("language");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale) => {
    // Replace the locale in the current path
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');
    router.push(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-10 w-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-md hover:shadow-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/30">
          <Globe className="h-5 w-5 text-primary" />
          <span className="sr-only">Switch language</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-40 p-1 bg-card/95 backdrop-blur-md border border-primary/20 shadow-xl shadow-primary/5 rounded-xl overflow-hidden"
      >
        <DropdownMenuItem
          onClick={() => switchLocale('en')}
          className={`cursor-pointer rounded-lg px-3 py-2 transition-all duration-200 hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 ${locale === 'en' ? 'bg-primary/10 font-medium' : ''}`}
        >
          🇺🇸 English
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => switchLocale('es')}
          className={`cursor-pointer rounded-lg px-3 py-2 transition-all duration-200 hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 ${locale === 'es' ? 'bg-primary/10 font-medium' : ''}`}
        >
          🇪🇸 Español
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
