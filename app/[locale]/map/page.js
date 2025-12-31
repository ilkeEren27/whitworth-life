"use client";

import CampusMap from "@/components/map/CampusMap";
import { useJsApiLoader } from "@react-google-maps/api";
import { useTranslations } from "next-intl";

export default function MapPage() {
  const t = useTranslations("map");
  
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: [],
  });

  if (loadError) return <div className="p-6">{t("loadError")}</div>;
  if (!isLoaded) return <div className="p-6">{t("loading")}</div>;

  return (
    <main className="animate-fade-in">
      <CampusMap />
    </main>
  );
}
