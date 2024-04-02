import { type Transfer } from '../generated/transfer'

export class InMemoryDb {
  private db: Transfer[] = [
  ]

  private readonly getNextId = (): number => {
    return this.db.length + 1
  }

  insertTransfer = (transfer: Omit<Transfer, 'id' | 'createdAt'>): Transfer => {
    const transferWithId = { ...transfer,
      id: this.getNextId(),
      createdAt: new Date(Date.now()) }
    this.db.push(transferWithId)
    return transferWithId
  }

  readTransfer = (id: number): Transfer | undefined => {
    return this.db.find((t) => t.id === id)
  }

  reset = (): void => {
    this.db = [
    ]
  }
}
