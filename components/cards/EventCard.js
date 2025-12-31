"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

// Get event details and render them in a card component
export default function EventCard({
  title,
  description,
  image,
  location,
  locationId,
  date,
  organizer,
  organizerRole,
  locale = "en",
}) {
  const t = useTranslations("events");
  
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>
          <p className="font-bold text-xl">{title}</p>
        </CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
        <CardAction>
          <Link href={`/${locale}/map?id=${locationId}`}>
            <Button>{t("showLocation")}</Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-4">
        {image ? (
          <div className="flex justify-center">
            <Image
              alt="Event Photo"
              src={image}
              className="self-center rounded-lg shadow-md transition-transform duration-200 hover:scale-105"
              width="100"
              height="100"
            />
          </div>
        ) : null}
        <p className="text-muted-foreground">{t("hostedIn")} <span className="font-medium text-foreground">{location}</span></p>
        {organizer && (
          <p className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
            {t("postedBy")} <span className="font-medium text-foreground">{organizer}</span> <Badge variant="secondary">{organizerRole}</Badge>
          </p>
        )}
      </CardContent>
      <CardFooter>
        <p className="font-semibold text-primary">{date}</p>
      </CardFooter>
    </Card>
  );
}
