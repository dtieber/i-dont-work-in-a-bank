import {
  type handleUnaryCall,
  type sendUnaryData,
  type ServerUnaryCall,
} from '@grpc/grpc-js'
import pino from 'pino'

import {
  type CreateTransferRequest,
  type CreateTransferResponse,
  type GetTransferRequest,
  type GetTransferResponse,
  type TransferServiceServer,
} from '../generated/transfer'
import { InMemoryDb } from './inMemoryDb'
import Logger = pino.Logger

export function getTransferServiceServer (logger: Logger): TransferServiceServer {
  const db = new InMemoryDb()

  const createTransfer: handleUnaryCall<CreateTransferRequest, CreateTransferResponse> = (
    call: ServerUnaryCall<CreateTransferRequest, CreateTransferResponse>,
    callback: sendUnaryData<CreateTransferResponse>,
  ): void => {
    const transferRequest: CreateTransferRequest = call.request
    logger.info({
      message: 'Received transfer request',
      request: transferRequest,
    })
    const insertedTransfer = db.insertTransfer(transferRequest)
    logger.info(`Successfully inserted transfer with id ${insertedTransfer.id}`)
    callback(null, { transfer: insertedTransfer })
  }

  const getTransfer: handleUnaryCall<GetTransferRequest, GetTransferResponse> = (
    call: ServerUnaryCall<GetTransferRequest, GetTransferResponse>,
    callback: sendUnaryData<GetTransferResponse>,
  ): void => {
    const transferRequest: GetTransferRequest = call.request
    logger.info(`Trying to find transfer with id ${transferRequest.id}`)
    const transfer = db.readTransfer(transferRequest.id)
    logger.info({
      message: 'Returning transfer',
      transfer,
    })
    callback(null, { transfer })
  }

  return {
    createTransfer,
    getTransfer,
  }
}
