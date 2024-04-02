import { Server, ServerCredentials } from '@grpc/grpc-js'
import { pino } from 'pino'

import { TransferServiceService } from '../generated/transfer'
import { getTransferServiceServer } from './getTransferServiceServer'

const server = new Server()

const HOST = process.env.HOST ?? '0.0.0.0'
const PORT = process.env.PORT ?? '3001'
const address = `${HOST}:${PORT}`

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

server.addService(TransferServiceService, getTransferServiceServer(logger))

server.bindAsync(
  address,
  ServerCredentials.createInsecure(),
  (error, port) => {
    if (error !== null) {
      logger.error('Cannot start server')
      throw error
    }
    logger.info(`Server is running on port ${port}`)
  },
)
