import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
export default class UsersController {

  public async index({ request }: HttpContextContract) {
    const username = request.input('username')

    if (username) {
      const user = await User
        .query()
        .where('username', username)
        .first()

      return user
    }

    return await User.all()
  }
  public async update({ params, request, response }: HttpContextContract) {
    const user = await User.find(params.id)

    if (!user) {
      return response.notFound({
        message: 'User not found',
      })
    }

    user.merge(
      request.only([
        'username',
        'phone',
        'address',
      ])
    )

    await user.save()

    return user
  }
  public async adminLogin({
    request,
    response,
    auth,
  }: HttpContextContract) {

    const { username, password } = request.only([
      'username',
      'password',
    ])

    const user = await User.findBy('username', username)

    if (!user) {
      return response.unauthorized({
        message: 'Invalid username or password',
      })
    }

    const passwordValid = await Hash.verify(
      user.password,
      password
    )

    if (!passwordValid) {
      return response.unauthorized({
        message: 'Invalid username or password',
      })
    }

    if (user.role !== 'admin') {
      return response.forbidden({
        message: 'Admin access required',
      })
    }

    const token = await auth.use('api').generate(user)

    return {
      user,
      token,
    }
  }


  public async show({ params, response }: HttpContextContract) {
    const user = await User.find(params.id)

    if (!user) {
      return response.notFound({
        message: 'User not found',
      })
    }

    return user
  }


  public async store({ request, response }: HttpContextContract) {
    const user = await User.create(
      request.only(['username', 'role', 'password'])
    )

    return response.created(user)
  }


    public async delete({ params, response }: HttpContextContract) {
      const user = await User.find(params.id)

      if (!user) {
        return response.notFound({
          message: 'User not found',
        })
      }

      await user.delete()

      return response.ok({
        message: 'user removed successfully',
      })
    }
}
