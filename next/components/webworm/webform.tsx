import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";

import { Webform } from "@/lib/zod/webform";
import { validateAndCleanupWebformSubmissionList } from "@/lib/zod/webform-submission-list";

import { AuthGate } from "../auth-gate";

import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import OfficeLocationsMap from "../office-map";
import { OfficeLocations } from "@/lib/zod/office-locations";
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
  maps?: OfficeLocations[]
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
  maps = []
}: WebformProps) {
  const fieldInputs = Object.keys(webform.field_webform_fields).map(
    (key) => key,
  );
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isSubmissionsFetched, setIsSubmissionsFetched] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const { t } = useTranslation();
  const { register, handleSubmit, reset, formState } = useForm<FieldInputs>();

  useEffect(() => {
    if (onlyForAuthenticated == false) {
      setIsSubmissionsFetched(true);
      setIsFormSubmitted(false);
    }
  }, [onlyForAuthenticated]);

  useEffect(() => {
    if (onlyForAuthenticated && session && session.accessToken) {
      checkSubmissions().then((response) => {
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
      });
      setIsSubmissionsFetched(true);
    }
  }, [session]);

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

  const onSubmit = async (data: FieldInputs) => {
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
      <section className="relative bg-background w-full grid grid-cols-2 min-h-[400px] overflow-hidden" aria-description={`Form ${webform.resourceIdObjMeta.drupal_internal__target_id}`}>
        {variant === "default" && (<div className='bg-[url("/731a8bd43838e3dd428b38ad8bdce08a.jpeg")] bg-center bg-no-repeat bg-cover'></div>)}
        {variant === "contact" && (
          <OfficeLocationsMap maps={maps} />
        )}
        <div className="relative">
          {(formState.isSubmitSuccessful || isFormSubmitted && !onlyForAuthenticated) && (
            <div className="absolute bg-foreground/60 right-0 top-0 w-full h-full backdrop-blur-sm">
              <div className="flex flex-col items-center justify-center h-full p-8">
                <p className="text-heading-sm font-bold text-center my-2">{'Thank you for submitting the form.'}</p>
                <Button variant="secondary" type="button" onClick={() => {
                  setIsFormSubmitted(false)
                  reset()
                }} >{t("form-send-another-message")}</Button>
              </div>
            </div>
          )}
          {(isFormSubmitted && onlyForAuthenticated) && (
            <div className="absolute bg-foreground/60 right-0 top-0 w-full h-full backdrop-blur-sm">
              <div className="flex flex-col items-center justify-center h-full p-8">
                <p className="text-heading-sm font-bold text-center my-2">{'You have been already submitted this form.'}</p>
                <Button variant="secondary" type="button" >Unregister?</Button>
              </div>
            </div>
          )}
          <form
            onSubmit={handleSubmit(onSubmit, onErrors)}
            className="mx-auto mb-4 flex max-w-md flex-col gap-5 bg-background p-4 font-inter items-start"
          >
            <h2 className="text-heading-xs font-bold">
              {formTitle}
            </h2>
            {fieldInputs.map((key) => {
              return (
                <div key={key} className="w-full">
                  <Label className="text-sm font-medium font-overpass text-scapaflow" htmlFor={webform.field_webform_fields[key]["#title"]}>
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
                        required: webform.field_webform_fields[key]["#required"],
                        min: webform.field_webform_fields[key]["#min"],
                        max: webform.field_webform_fields[key]["#max"],
                      })}
                    />
                  ) : (
                    <Input
                      type={webform.field_webform_fields[key]["#type"]}
                      id={webform.field_webform_fields[key]["#title"]}
                      {...register(key as keyof FieldInputs, {
                        required: webform.field_webform_fields[key]["#required"],
                        min: webform.field_webform_fields[key]["#min"],
                        max: webform.field_webform_fields[key]["#max"],
                      })}
                    />
                  )}
                  {formState.errors[key] && <p>{formState.errors[key].message}</p>}
                </div>
              );
            })}
            <Button disabled={!formState.isValid} type="submit">
              {t("form-submit")}
            </Button>
          </form>
        </div>
        {variant === "events" && (<div className='bg-[url("/finavia-arrivals-1340x760.jpg")] bg-center bg-no-repeat bg-cover'></div>)}
      </section>
    </AuthWrapper >
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
