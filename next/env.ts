import { createEnv } from "@t3-oss/env-nextjs";
import zod from "zod";

/* eslint-disable n/no-process-env */
const isStorybook = process.env.STORYBOOK === "true";
/* eslint-enable n/no-process-env */

export const env = isStorybook
  ? {}
  : createEnv({
    server: {
      NODE_ENV: zod.enum(["development", "production", "test"]),
      DRUPAL_SITE_ID: zod.string().optional(),
      DRUPAL_CLIENT_ID: zod.string(),
      DRUPAL_CLIENT_SECRET: zod.string(),
      DRUPAL_REVALIDATE_SECRET: zod.string(),
      NEXT_IMAGE_DOMAIN: zod.string(),
    },
    client: {
      NEXT_PUBLIC_DRUPAL_BASE_URL: zod.string().url(),
      NEXT_PUBLIC_FRONTEND_URL: zod.string().url(),
      NEXT_PUBLIC_MATOMO_URL: zod.string(),
      NEXT_PUBLIC_MATOMO_CONTAINER_ID: zod.string(),
      NEXT_PUBLIC_GOOGLE_MAPS_KEY: zod.string().optional(),
    },
    runtimeEnv: {
      /* eslint-disable n/no-process-env */
      NODE_ENV: process.env.NODE_ENV,
      DRUPAL_SITE_ID: process.env.DRUPAL_SITE_ID,
      DRUPAL_CLIENT_ID: process.env.DRUPAL_CLIENT_ID,
      DRUPAL_CLIENT_SECRET: process.env.DRUPAL_CLIENT_SECRET,
      DRUPAL_REVALIDATE_SECRET: process.env.DRUPAL_REVALIDATE_SECRET,
      NEXT_IMAGE_DOMAIN: process.env.NEXT_IMAGE_DOMAIN,
      NEXT_PUBLIC_DRUPAL_BASE_URL: process.env.NEXT_PUBLIC_DRUPAL_BASE_URL,
      NEXT_PUBLIC_FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL,
      NEXT_PUBLIC_MATOMO_URL: "frontendlndosite.matomo.cloud",
      NEXT_PUBLIC_MATOMO_CONTAINER_ID: "YijLmEPP",
      NEXT_PUBLIC_GOOGLE_MAPS_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY
      /* eslint-enable n/no-process-env */
    },
  });
