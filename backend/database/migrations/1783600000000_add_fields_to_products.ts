import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddFieldsToProducts extends BaseSchema {
  protected tableName = 'products'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.text('description').nullable()
      table.string('category', 255).nullable()
      table.string('brand', 255).nullable()
      table.integer('version').defaultTo(0).notNullable()
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('description')
      table.dropColumn('category')
      table.dropColumn('brand')
      table.dropColumn('version')
    })
  }
}
