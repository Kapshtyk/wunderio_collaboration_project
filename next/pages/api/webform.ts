import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'

import { drupal } from '@/lib/drupal/drupal-client'

import { authOptions } from './auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const languagePrefix = req.headers['accept-language']
  const session = await getServerSession(req, res, authOptions)
  try {
    if (req.method === 'POST') {
      const url = drupal.buildUrl(`/${languagePrefix}/webform_rest/submit`)
      const body = JSON.parse(req.body)
      const headers = {
        'Content-Type': 'application/json'
      }
      if ('onlyForAuth' in body && body.onlyForAuth && session) {
        headers['Authorization'] = `Bearer ${session.accessToken}`
        delete body.onlyForAuth
      }
      const result = await drupal.fetch(url.toString(), {
        method: 'POST',
        body: JSON.stringify({ ...body }),
        headers
      })
      if (result.ok) {
        res.status(200).end()
      } else {
        res.status(result.status).end()
        throw new Error()
      }
    }
  } catch (error) {
    return res.status(400).json(error.message)
  }
}
