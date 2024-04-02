import { beforeEach, describe, expect, test } from '@jest/globals'

import { InMemoryDb } from '../inMemoryDb'

describe('InMemoryDb', () => {
  const db = new InMemoryDb()

  beforeEach(() => {
    db.reset()
  })

  test('stores transfers', () => {
    const transfer = {
      sender: 'person-1',
      receiver: 'person-2',
      amount: 10.20,
      text: 'chargeback',
    }

    const inserted = db.insertTransfer(transfer)

    expect(inserted).toEqual({
      ...transfer,
      id: 1,
      createdAt: expect.any(Date),
    })
  })

  test('reads from db', () => {
    const transfer = {
      sender: 'person-1',
      receiver: 'person-2',
      amount: 10.20,
      text: 'chargeback',
    }
    const inserted = db.insertTransfer(transfer)

    const read = db.readTransfer(inserted.id)

    expect(read).toEqual(inserted)
  })

  test('resets db', () => {
    const transfer = {
      sender: 'person-1',
      receiver: 'person-2',
      amount: 10.20,
      text: 'chargeback',
    }
    const inserted = db.insertTransfer(transfer)

    db.reset()

    const read = db.readTransfer(inserted.id)
    expect(read).toBeUndefined()
  })
})
