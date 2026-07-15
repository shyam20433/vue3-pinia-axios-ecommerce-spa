import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'

export default class Jwt {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    const authHeader = request.header('authorization')

    // 1. Check if the token was sent by the Vue frontend
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return response.unauthorized({ message: 'Missing or invalid token format' })
    }

    const token = authHeader.split(' ')[1]

    try {
      // 2. Verify the token using your backend's secret key
      const decoded = jwt.verify(token, Env.get('APP_KEY'))

      // 3. Attach user data (ignoring TS warning for custom property)
      // @ts-ignore
      request.jwtData = decoded

      // 4. Token is valid, allow them to view/edit the data!
      await next()
    } catch (error) {
      return response.unauthorized({ message: 'Invalid or expired JWT token' })
    }
  }
}
