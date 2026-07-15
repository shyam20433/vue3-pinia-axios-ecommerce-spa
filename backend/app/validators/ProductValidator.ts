import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProductValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    name: schema.string([
      rules.trim(),
      rules.maxLength(255)
    ]),
    price: schema.number([
      rules.unsigned()
    ]),
    image: schema.string([
      rules.trim(),
    ]),
    description: schema.string.optional([
      rules.trim(),
    ]),
    category: schema.string.optional([
      rules.trim(),
    ]),
    brand: schema.string.optional([
      rules.trim(),
    ]),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
public messages: CustomMessages = {
    'name.required': 'Product name is required.',
    'price.required': 'Product price is required.',
    'price.number': 'Price must be a valid number.',
    'price.unsigned': 'Price cannot be negative.',
    'image.required': 'Product image URL is required.',
    'image.url': 'Please provide a valid image URL link.'
  }
}
