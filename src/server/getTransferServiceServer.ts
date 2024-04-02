import {
  type handleUnaryCall,
  type sendUnaryData,
  type ServerUnaryCall,
  status,
} from '@grpc/grpc-js'

import {
  type CreateTransferRequest,
  type CreateTransferResponse,
  type GetTransferRequest,
  type GetTransferResponse,
  type TransferServiceServer,
} from '../generated/transfer'

export function getTransferServiceServer (): TransferServiceServer {
  const createTransfer: handleUnaryCall<CreateTransferRequest, CreateTransferResponse> = (
    call: ServerUnaryCall<CreateTransferRequest, CreateTransferResponse>,
    callback: sendUnaryData<CreateTransferResponse>,
  ): void => {
    callback({ code: status.UNIMPLEMENTED }, null)
  }

  const getTransfer: handleUnaryCall<GetTransferRequest, GetTransferResponse> = (
    call: ServerUnaryCall<GetTransferRequest, GetTransferResponse>,
    callback: sendUnaryData<GetTransferResponse>,
  ): void => {
    callback({ code: status.UNIMPLEMENTED }, null)
  }

  return {
    createTransfer,
    getTransfer,
  }
}
