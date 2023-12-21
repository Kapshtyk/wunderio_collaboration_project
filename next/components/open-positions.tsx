import Link from "next/link";
import { useTranslation } from "next-i18next";
import React, { useMemo, useState } from "react";

import { OpenPositions } from "@/lib/zod/open-positions";

import { MediaImage } from "./media--image";
import { RandomIcon } from "./random-icon";

interface OpenPositionsProps {
  openPositions: OpenPositions[];
}
const OpenPositions = ({ openPositions }: OpenPositionsProps) => {
  const [offices, setOffices] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [choosenOffice, setChoosenOffice] = useState<string>("all");
  const [choosenCountry, setChoosenCountry] = useState<string>("all");
  const { t } = useTranslation();

  useMemo(() => {
    const offices = openPositions.map(
      (openPosition) => openPosition.field_office.name,
    );
    setOffices(offices);
  }, [openPositions]);

  useMemo(() => {
    const countries = openPositions.map(
      (openPosition) => openPosition.field_country.name,
    );
    setCountries(countries);
  }, [openPositions]);

  if (!openPositions) return null;

  const filteredPositions = openPositions.filter((openPosition) => {
    if (choosenOffice === "all" && choosenCountry === "all")
      return openPosition;
    if (choosenOffice === "all" && choosenCountry !== "all")
      return openPosition.field_country.name === choosenCountry;
    if (choosenOffice !== "all" && choosenCountry === "all")
      return openPosition.field_office.name === choosenOffice;
    return (
      openPosition.field_office.name === choosenOffice &&
      openPosition.field_country.name === choosenCountry
    );
  });

  return (
    <section className="section-margin">
      <h2>{t("open-positions")}</h2>
      <div className="flex gap-4 mb-4">
        <select
          onChange={(e) => {
            setChoosenOffice(e.target.value);
          }}
        >
          <option value="all">All</option>
          {offices.map((office) => (
            <option key={office} value={office}>
              {office}
            </option>
          ))}
        </select>
        <select
          onChange={(e) => {
            setChoosenCountry(e.target.value);
          }}
        >
          <option value="all">All</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 ">
        {filteredPositions.map((openPosition) => (
          <article key={openPosition.id} className="@container">
            <div className="grid @md:grid-cols-2 gap-4 items-center">
              <div className="relative rounded-xl overflow-hidden">
                {openPosition.field_position_image ? (
                  <MediaImage
                    className="rounded-xl"
                    media={openPosition.field_position_image}
                  />
                ) : (
                  <RandomIcon />
                )}
              </div>
              <div className="flex flex-col py-2">
                <Link href={openPosition.path.alias}>
                  <div>
                    {openPosition.field_country && (
                      <span
                        key={openPosition.field_country.name}
                        className="text-xs @sm:text-sm @lg:text-md font-bold text-accent-color mt-1 pr-1 inline-block uppercase"
                      >
                        {openPosition.field_country.name}
                      </span>
                    )}
                    {openPosition.field_office && (
                      <span
                        key={openPosition.field_office.name}
                        className="text-xs @sm:text-sm @lg:text-md font-bold text-accent-color mt-1 pr-1 inline-block uppercase"
                      >
                        {openPosition.field_office.name}
                      </span>
                    )}
                  </div>
                  <h3 className="text-heading-xs sm:text-heading-sm">
                    {openPosition.title}
                  </h3>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default OpenPositions;
