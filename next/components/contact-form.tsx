import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import React from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";

type FieldInputs = {
  first_name?: string;
  last_name?: string;
  email?: string;
};

export function ContactForm() {
  const router = useRouter();
  const { t } = useTranslation();
  const { register, handleSubmit, formState } = useForm<FieldInputs>();

  const onSubmit = async (data: FieldInputs) => {
    const response = await fetch(`/api/webform`, {
      method: "POST",
      body: JSON.stringify({
        ...data,
        webform_id: "careers_newsletter",
      }),
      headers: {
        "accept-language": router.locale,
      },
    });

    if (!response.ok) {
      alert("Error!");
    }
  };

  const onErrors = (errors) => console.error(errors);

  return (
    <section className="relative" aria-describedby="form-description">
      <h2 id="form-description" className="sr-only">{`Contact us form`}</h2>
      <div className="relative">
        <form
          onSubmit={handleSubmit(onSubmit, onErrors)}
          className="flex flex-col gap-2 items-start"
        >
          <div className="w-full max-w-xs">
            <Label className="sr-only" htmlFor="first_name">
              {t("form-label-firstname")}
            </Label>
            <Input
              placeholder={t("form-label-firstname")}
              className="bg-primary-300/50 placeholder:text-white text-white h-10 w-60 lg:w-80"
              type="text"
              id="first_name"
              {...register("first_name", {
                required: true,
                minLength: 2,
                maxLength: 50,
              })}
            />
            {formState.errors["first_name"] && (
              <p>{formState.errors["first_name"].message}</p>
            )}
          </div>
          <div className="w-full max-w-xs">
            <Label className="sr-only" htmlFor="last_name">
              {t("form-label-lastname")}
            </Label>
            <Input
              placeholder={t("form-label-lastname")}
              className="bg-primary-300/50 placeholder:text-white text-white h-10 w-60 lg:w-80"
              type="text"
              id="last_name"
              {...register("last_name", {
                required: true,
                minLength: 2,
                maxLength: 50,
              })}
            />
            {formState.errors["last_name"] && (
              <p>{formState.errors["last_name"].message}</p>
            )}
          </div>
          <div className="w-full max-w-xs">
            <Label className="sr-only" htmlFor="email">
              {t("form-label-email")}
            </Label>
            <Input
              placeholder={t("form-label-email")}
              className="bg-primary-300/50 placeholder:text-white text-white h-10 w-60 lg:w-80"
              type="text"
              id="email"
              {...register("email", {
                required: true,
                minLength: 2,
                maxLength: 50,
              })}
            />
            {formState.errors["email"] && (
              <p>{formState.errors["email"].message}</p>
            )}
          </div>

          <Button
            variant="secondary"
            size="sm"
            disabled={!formState.isValid}
            type="submit"
          >
            {t("form-submit")}
          </Button>
        </form>
      </div>
    </section>
  );
}
