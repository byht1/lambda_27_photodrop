import { AnyColumn, SQL, sql } from 'drizzle-orm'

// any функція унікальна щоб могла працювати не тільки з рядками
type TArrayCatFn = <T extends any[]>(column: AnyColumn, array: T) => SQL<T>

export const arrayCat: TArrayCatFn = (column, array) => {
  const maxIndex = array.length - 1
  const chunks: SQL[] = []
  array.forEach((el, i) => {
    const comma = maxIndex !== i ? ',' : ''
    const sqlRow = sql.raw(`'${el}'${comma}`)
    chunks.push(sqlRow)
  })

  return sql`array_cat(${column}, ARRAY[${sql.fromList(chunks)}])`
}
