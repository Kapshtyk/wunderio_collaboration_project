import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'

import { drupal } from '@/lib/drupal/drupal-client'

import { authOptions } from './auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    res.status(401).end()
  }

  const languagePrefix = req.headers['accept-language']
  try {
    if (req.method === 'POST') {
      const url = drupal.buildUrl(
        `/${languagePrefix}/rest/my-webform-submissions?_format=json`
      )
      const result = await drupal.fetch(url.toString(), {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${session.accessToken}`
        }
      })
      if (result.ok) {
        const data = await result.json()
        res.status(200).json(data)
      } else {
        res.status(result.status).end()
        throw new Error()
      }
    }
  } catch (error) {
    return res.status(400).json(error.message)
  }
}
