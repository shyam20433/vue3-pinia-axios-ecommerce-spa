import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
export default class UsersController {

  public async index({ request, response }: HttpContextContract) {
    try {
      const username = request.input('username')

      if (username) {
        const user = await User
          .query()
          .where('username', username)
          .first()

        return user
      }

      return await User.all()
    } catch (error) {
      console.error('index user error:', error)
      return response.internalServerError({
        message: 'An error occurred while fetching users.',
      })
    }
  }
  public async update({ params, request, response }: HttpContextContract) {
    try {
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
    } catch (error) {
      console.error('update user error:', error)
      return response.internalServerError({
        message: 'An error occurred while updating the user.',
      })
    }
  }
  public async adminLogin({
    request,
    response,
    auth,
  }: HttpContextContract) {
    try {

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
    } catch (error) {
      console.error('Admin Login error:', error)
      return response.internalServerError({
        message: 'An error occurred during authentication.',
      })
    }
  }


  public async show({ params, response }: HttpContextContract) {
    try {
      const user = await User.find(params.id)

      if (!user) {
        return response.notFound({
          message: 'User not found',
        })
      }

      return user
    } catch (error) {
      console.error('display user error:', error)
      return response.internalServerError({
        message: 'An error occurred while retrieving the user.',
      })
    }
  }


  public async store({ request, response }: HttpContextContract) {
    try {
      const user = await User.create(
        request.only(['username', 'role', 'password'])
      )

      return response.created(user)
    } catch (error) {
      console.error('STORE USER ERROR:', error)
      return response.badRequest({
        message: 'An error occurred while creating the user.',
      })
    }
  }


    public async delete({ params, response }: HttpContextContract) {
      try {
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
      } catch (error) {
        console.error('delete user error:', error)
        return response.internalServerError({
          message: 'An error occurred while deleting the user.',
        })
      }
    }
}
