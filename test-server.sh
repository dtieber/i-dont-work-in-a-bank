#!/bin/bash

echo "Creating transfer..."
grpcurl -import-path src/proto -proto transfer.proto -d '{
  "sender":"person-1",
  "receiver":"person-2",
  "amount":10.20,
  "text":"chargeback"
}' -plaintext localhost:3001 transfer.TransferService.CreateTransfer

echo "Reading transfer..."
grpcurl -import-path src/proto -proto transfer.proto -d '{
  "id":"1"
}' -plaintext localhost:3001 transfer.TransferService.GetTransfer
