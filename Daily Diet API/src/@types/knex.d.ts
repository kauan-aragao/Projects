// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    meals: {
      id: string
      name: string
      date: string
      description: string
      session_id?: string
      isOnTheDiet: boolean
    }
    users: {
      email: string
      password: string
      userId: string
    }
  }
}
