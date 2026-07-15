import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Admin {
  public async handle(
    { request, response }: HttpContextContract,
    next: () => Promise<void>
  ) {
    // 1. Grab the decoded token data from the request
    // @ts-ignore
    const user = request.jwtData

    // 2. Make sure the user exists and actually has the admin role
    if (!user || user.role !== 'admin') {
      return response.forbidden({
        message: 'Admin access required',
      })
    }

    // 3. They are an admin! Let the request proceed to the controller.
    await next()
  }
}
