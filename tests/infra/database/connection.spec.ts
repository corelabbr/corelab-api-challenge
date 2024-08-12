import PgPromiseConnectionAdapter from "@/infra/database/pg-connection-adapter";

const query = jest.fn().mockResolvedValue({ data: 'any_data' })

jest.mock('pg-promise',
  () => jest.fn()
    .mockReturnValue(() => ({ query }))
)

describe('PgPromiseConnectionAdapter', () => {
  let db: PgPromiseConnectionAdapter
  beforeAll(() => {
    db = PgPromiseConnectionAdapter.getInstance()
  })
  it('should call query with correct params', async () => {
    await db.query('any_query', ['any_args'])
    expect(query).toHaveBeenCalledWith('any_query', ['any_args'])
    expect(query).toHaveBeenCalledTimes(1)
  })
  it('should return correct data', async () => {
    const data = await db.query('any_query', ['any_args'])
    expect(data).toEqual({ data: 'any_data' })
  })
})
