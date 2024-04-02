import { credentials } from '@grpc/grpc-js'
import { pino } from 'pino'

import type { CreateTransferRequest } from '../generated/transfer'
import { TransferServiceClient } from '../generated/transfer'

const SERVER_URL = process.env.SERVER || '0.0.0.0:3001'

const logger = pino({
  level: 'info',
  messageKey: 'message',
  transport: {
    target: 'pino-pretty',
    options: {
      messageKey: 'message',
      colorize: true,
    },
  },
})

function requestTransfer(): void {
  const client = new TransferServiceClient(
    SERVER_URL,
    credentials.createInsecure(),
  )

  const request: CreateTransferRequest = {
    sender: 'person-1',
    receiver: 'person-2',
    amount: 10.20,
    text: 'chargeback',
  }

  client.createTransfer(request, (error, response) => {
    if (error) {
      logger.error({
        message: `Failed to create transfer: ${error.message}`,
        error,
      })
    } else {
      logger.info({
        message: 'Successfully created transfer',
        response,
      })
    }
  })
}

requestTransfer()
