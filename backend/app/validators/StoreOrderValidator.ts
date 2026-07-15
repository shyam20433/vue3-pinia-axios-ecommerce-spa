import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreOrderValidator {
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
    userId:schema.number([

      rules.unsigned()
    ]),
    items: schema.array().anyMembers(),
    totalItems:schema.number([
      rules.unsigned()
    ]),
    totalPrice:schema.number([
      rules.unsigned()
    ])
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
    'userId.required': 'User ID is required to place an order.',
    'userId.exists': 'The specified user does not exist in our system.',
    'items.required': 'You must include items to place an order.',
    'items.array': 'Items must be formatted as an array.',
    'totalItems.required': 'The total number of items is required.',
    'totalItems.unsigned': 'Total items cannot be negative.',
    'totalPrice.required': 'The total price is required.',
    'totalPrice.unsigned': 'Total price cannot be negative.'
  }
}

