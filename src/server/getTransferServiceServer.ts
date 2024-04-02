import {
  type handleUnaryCall,
  type sendUnaryData,
  type ServerUnaryCall,
} from '@grpc/grpc-js'

import {
  type CreateTransferRequest,
  type CreateTransferResponse,
  type GetTransferRequest,
  type GetTransferResponse,
  type TransferServiceServer,
} from '../generated/transfer'
import { InMemoryDb } from './inMemoryDb'

export function getTransferServiceServer (): TransferServiceServer {
  const db = new InMemoryDb()

  const createTransfer: handleUnaryCall<CreateTransferRequest, CreateTransferResponse> = (
    call: ServerUnaryCall<CreateTransferRequest, CreateTransferResponse>,
    callback: sendUnaryData<CreateTransferResponse>,
  ): void => {
    const transferRequest: CreateTransferRequest = call.request
    const insertedTransfer = db.insertTransfer(transferRequest)
    callback(null, { transfer: insertedTransfer })
  }

  const getTransfer: handleUnaryCall<GetTransferRequest, GetTransferResponse> = (
    call: ServerUnaryCall<GetTransferRequest, GetTransferResponse>,
    callback: sendUnaryData<GetTransferResponse>,
  ): void => {
    const transferRequest: GetTransferRequest = call.request
    const transfer = db.readTransfer(transferRequest.id)
    callback(null, { transfer })
  }

  return {
    createTransfer,
    getTransfer,
  }
}
