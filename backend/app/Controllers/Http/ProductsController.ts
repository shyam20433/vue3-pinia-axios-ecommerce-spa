import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import ProductValidator from 'App/Validators/ProductValidator'
import UpdateProductValidator from 'App/Validators/UpdateProductValidator'

import Redis from '@ioc:Adonis/Addons/Redis'
export default class ProductsController {
  public async index({ request, response }: HttpContextContract) {
    try {
      /* console.log('Products API called')

      return response.internalServerError({
        message: 'Testing retry',
      }) */
  //note this is just for learning how the retry works so to test this just uncomment the above and comment the below and after the console info undo to see
  //and boom its working firely
      const search = request.input('search')

      const query = Product.query()

      if (search) {
        query.whereILike('name', `%${search}%`)
        return await query.orderBy('id','asc')
      }
      const cacheProducts=await Redis.get('all_products')
      if(cacheProducts){
        console.log(`serving from Redis cache !!`)
        return JSON.parse(cacheProducts)
      }

      console.log(`Serving from Database & Saving to cache !!`)
      const products=await Product.query().orderBy('id','asc')
      await Redis.setex('all_products',1800,JSON.stringify(products))
      return products
    } catch (error) {
      console.error('index error:', error)
      return response.internalServerError({
        message: 'An error occurred while fetching products.',
      })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const product = await Product.find(params.id)

      if (!product) {
        return response.notFound({
          message: 'Product not found',
        })
      }

      return product
    } catch (error) {
      console.error('show product error:', error)
      return response.internalServerError({
        message: 'An error occurred while retrieving the product.',
      })
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const data = await request.validate(ProductValidator)
      const product = await Product.create(data)

      await Redis.del('all_products')

      return response.created(product)
    } catch (error) {
      console.error('store product error:', error)
      return response.badRequest({
        message: 'An error occurred while creating the product.',
      })
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      const product = await Product.find(params.id)

      if (!product) {
        return response.notFound({
          message: 'Product not found',
        })
      }

      const data = await request.validate(UpdateProductValidator)
      const requestVersion = data.version

      if (product.version !== requestVersion) {
        return response.conflict({
          message: 'Product was modified by another admin!',
          currentVersion: product.version,
        })
      }

      product.merge({
        name: data.name,
        price: data.price,
        image: data.image,
        description: data.description,
        category: data.category,
        brand: data.brand,
        version: product.version + 1,
      })

      await product.save()
      await Redis.del('all_products')

      return product
    } catch (error) {
      console.error('update product error:', error)
      return response.internalServerError({
        message: 'An error occurred while updating the product.',
      })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const product = await Product.find(params.id)

      if (!product) {
        return response.notFound({
          message: 'Product not found',
        })
      }

      await product.delete()
      await Redis.del('all_products')

      return response.ok({
        message: 'Product deleted successfully',
      })
    } catch (error) {
      console.error('delete product error:', error)
      return response.internalServerError({
        message: 'An error occurred while deleting the product.',
      })
    }
  }
}
