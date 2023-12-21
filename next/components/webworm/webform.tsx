import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";

import { AuthGate } from "@/components/auth-gate";
import OfficeLocationsMap from "@/components/office-map";
import { OfficeLocations } from "@/lib/zod/office-locations";
import { Webform } from "@/lib/zod/webform";
import { validateAndCleanupWebformSubmissionList } from "@/lib/zod/webform-submission-list";

import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Textarea } from "@/ui/textarea";

type FieldInputs = {
  first_name?: string;
  last_name?: string;
  username?: string;
  name?: string;
  email?: string;
  phone?: string;
  age?: number;
  message?: string;
  participant?: boolean;
  subject?: string;
};

interface WebformProps {
  webform: Webform;
  onlyForAuthenticated?: boolean;
  formTitle: string;
  formMessageIfUnauthenticated?: string;
  variant?: "contact" | "default" | "events";
  maps?: OfficeLocations[];
}

/**
 * Renders a web form component.
 *
 * @component
 * @param {Object} webform - The webform object.
 * @param {boolean} [onlyForAuthenticated=false] - Indicates if the form is only for authenticated users.
 * @param {string} [formTitle='events-form-title'] - The title of the form.
 * @param #TODO
 * @returns {JSX.Element} The rendered web form component.
 */
export function Webform({
  webform,
  onlyForAuthenticated = false,
  formTitle = "Form",
  formMessageIfUnauthenticated = "Sign in to submit the form",
  variant = "default",
  maps = [],
}: WebformProps) {
  const fieldInputs = Object.keys(webform.field_webform_fields).map(
    (key) => key,
  );
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const { t } = useTranslation();
  const { register, handleSubmit, reset, formState } = useForm<FieldInputs>();

  useEffect(() => {
    if (onlyForAuthenticated == false) {
      setIsFormSubmitted(false);
    }
  }, [onlyForAuthenticated]);

  useEffect(() => {
    const checkSubmissions = async () => {
      const response = await fetch(`/api/webform_submissions`, {
        method: "POST",
        headers: {
          "accept-language": router.locale,
        },
      }).then((response) => response.json());
      const validated = validateAndCleanupWebformSubmissionList(response);
      return validated;
    };
    if (onlyForAuthenticated && session && session.accessToken) {
      checkSubmissions()
        .then((response) => {
          if (response && response.length > 0) {
            response.map((submission) => {
              if (
                submission.webform_id[0].target_id ===
                webform.resourceIdObjMeta.drupal_internal__target_id
              ) {
                setIsFormSubmitted(true);
              }
            });
          }
        })
        .catch((error) => console.log(error));
    }
  }, [session, onlyForAuthenticated, webform, router.locale]);

  const onSubmit = async (data: FieldInputs) => {
    if (onlyForAuthenticated && isFormSubmitted) {
      return;
    }
    alert("response");
    const response = await fetch(`/api/webform`, {
      method: "POST",
      body: JSON.stringify({
        ...data,
        webform_id: webform.resourceIdObjMeta.drupal_internal__target_id,
        onlyForAuth: onlyForAuthenticated,
      }),
      headers: {
        "accept-language": router.locale,
      },
    });

    if (!response.ok) {
      alert("Error!");
    } else {
      setIsFormSubmitted(true);
    }
  };

  const onErrors = (errors) => console.error(errors);

  if (status === "loading") {
    return null;
  }

  return (
    <AuthWrapper
      text={formMessageIfUnauthenticated}
      onlyForAuthenticated={onlyForAuthenticated}
    >
      <section
        className="relative bg-background w-full grid grid-rows-1 md:grid-rows-1 md:grid-cols-2 min-h-[400px] overflow-hidden"
        aria-describedby="form-description"
      >
        <h2
          id="form-description"
          className="sr-only"
        >{`Form ${webform.resourceIdObjMeta.drupal_internal__target_id
          .split("_")
          .join(" ")}`}</h2>
        {variant === "default" && (
          <div className='hidden md:block bg-[url("/731a8bd43838e3dd428b38ad8bdce08a.jpeg")] bg-center bg-no-repeat bg-cover'></div>
        )}
        {variant === "contact" && <OfficeLocationsMap maps={maps} />}
        <div className="relative">
          {(formState.isSubmitSuccessful ||
            (isFormSubmitted && !onlyForAuthenticated)) && (
            <div className="absolute bg-white/60 right-0 top-0 w-full h-full backdrop-blur-sm">
              <div className="flex flex-col items-center justify-center h-full p-8">
                <p className="text-heading-sm text-primary-600 font-bold text-center my-6">
                  {t("thank-you-message")}
                </p>
                <Button
                  variant="primary"
                  type="button"
                  onClick={() => {
                    setIsFormSubmitted(false);
                    reset();
                  }}
                >
                  {t("form-send-another-message")}
                </Button>
              </div>
            </div>
          )}
          {isFormSubmitted && onlyForAuthenticated && (
            <div className="absolute bg-white/60 right-0 top-0 w-full h-full backdrop-blur-sm">
              <div className="flex flex-col items-center justify-center h-full p-8">
                <p className="text-heading-sm text-primary-600 font-bold text-center my-6">
                  {t("already-submitted-message")}
                </p>
                <Button variant="primary" type="button">
                  {t("cancel-registration")}
                </Button>
              </div>
            </div>
          )}
          <form
            onSubmit={handleSubmit(onSubmit, onErrors)}
            className="md:mx-auto mb-4 flex md:max-w-md flex-col gap-5 bg-background md:p-4 font-inter items-start"
          >
            <h3>{formTitle}</h3>
            {fieldInputs.map((key) => {
              return (
                <div key={key} className="w-full max-w-md">
                  <Label
                    className="text-sm font-medium font-overpass text-foreground/80"
                    htmlFor={webform.field_webform_fields[key]["#title"]}
                  >
                    {t(
                      `form-label-${webform.field_webform_fields[key]["#title"]
                        .toLowerCase()
                        .replace(" ", "")}`,
                    )}
                  </Label>
                  {webform.field_webform_fields[key]["#type"] === "textarea" ? (
                    <Textarea
                      id={webform.field_webform_fields[key]["#title"]}
                      {...register(key as keyof FieldInputs, {
                        required:
                          webform.field_webform_fields[key]["#required"],
                        min: webform.field_webform_fields[key]["#min"],
                        max: webform.field_webform_fields[key]["#max"],
                      })}
                    />
                  ) : (
                    <Input
                      type={webform.field_webform_fields[key]["#type"]}
                      id={webform.field_webform_fields[key]["#title"]}
                      {...register(key as keyof FieldInputs, {
                        required:
                          webform.field_webform_fields[key]["#required"],
                        min: webform.field_webform_fields[key]["#min"],
                        max: webform.field_webform_fields[key]["#max"],
                      })}
                    />
                  )}
                  {formState.errors[key] && (
                    <p>{formState.errors[key].message}</p>
                  )}
                </div>
              );
            })}
            <Button disabled={!formState.isValid} type="submit">
              {t("form-submit")}
            </Button>
          </form>
        </div>
        {variant === "events" && (
          <div className='hidden md:block bg-[url("/finavia-arrivals-1340x760.jpg")] bg-center bg-no-repeat bg-cover'></div>
        )}
      </section>
    </AuthWrapper>
  );
}

type AuthWrapperProps = {
  text: string;
  children: React.ReactNode;
  onlyForAuthenticated?: boolean;
};

const AuthWrapper = ({
  text,
  children,
  onlyForAuthenticated,
}: AuthWrapperProps) => {
  if (onlyForAuthenticated) {
    return <AuthGate text={text}>{children}</AuthGate>;
  }
  return <Fragment>{children}</Fragment>;
};
