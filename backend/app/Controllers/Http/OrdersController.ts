import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Order from 'App/Models/Order'
import { DateTime } from 'luxon'

export default class OrdersController {
  public async index() {
    return await Order
      .query()
      .preload('user')
      .orderBy('id', 'desc')
  }
  public async updateStatus({ params, request, response }: HttpContextContract) {
  const order = await Order.find(params.id)

  if (!order) {
    return response.notFound({
      message: 'Order not found',
    })
  }

  const status = request.input('status')

  order.status = status

  await order.save()

  return {
    message: 'Order status updated successfully',
    order,
  }
}

  public async store({ request, response }: HttpContextContract) {
    const order = await Order.create({
      userId: request.input('userId'),
      items: request.input('items'),
      totalItems: request.input('totalItems'),
      totalPrice: request.input('totalPrice'),
      orderDate: DateTime.now(),
    })

    return response.created(order)
  }
  public async destroy({ params, response }: HttpContextContract) {
  console.log('DELETE ORDER ID:', params.id)

  const order = await Order.find(params.id)

  if (!order) {
    return response.notFound({
      message: 'Order not found',
    })
  }

  await order.delete()

  return response.ok({
    message: 'Order deleted successfully',
  })
}
  public async myOrders({ params }: HttpContextContract) {
    return await Order
      .query()
      .where('user_id', params.userId)
      .orderBy('id', 'desc')
  }
}
