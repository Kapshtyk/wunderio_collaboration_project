import { NextApiRequest, NextApiResponse } from "next";

import { drupal } from "@/lib/drupal/drupal-client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === "POST") {
      const url = drupal.buildUrl(`/en/cookies_consent/add-consent`);
      const result = await drupal.fetch(url.toString(), {
        method: "POST",
        body: req.body,
        withAuth: true,
      });
      if (result.ok) {
        const data = await result.json();
        res.status(result.status).json(data);
      } else {
        res.status(result.status).end();
        throw new Error();
      }
    }
  } catch (error) {
    return res.status(400).json(error.message);
  }
}
