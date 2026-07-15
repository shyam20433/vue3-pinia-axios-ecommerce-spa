import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddPhoneAddressToUsers extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('phone', 20).nullable()
      table.text('address').nullable()
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('phone')
      table.dropColumn('address')
    })
  }
}
