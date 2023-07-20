import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('meals', (table) => {
    table.uuid('id').notNullable().primary()
    table.text('name').notNullable()
    table.text('description').notNullable()
    table.date('date').notNullable().defaultTo(knex.fn.now())
    table.uuid('session_id').notNullable()
    table.boolean('isOnTheDiet').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('meals')
}
