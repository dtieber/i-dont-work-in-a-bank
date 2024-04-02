### I don't work in a bank :bank:

This repository contains an example of a gRPC application that demonstrates the interaction between a bank and a customer's wallet. The application is designed with two main components: a sender and a receiver. This example serves as a practical guide for understanding the implementation of gRPC communication in a real-world scenario.

##### Prerequisites

* Node 20
* Protoc


##### Getting started

* Install prerequisites
* Run `./build.sh` to start the protobuf compiler to generate the Typescript code
* Start the server: `npm run run:server`
* Start the client to request a transfer: `npm run run:client`


##### Testing

You can use [gRPCurl](https://github.com/fullstorydev/grpcurl) for testing. I added a simple example in the root folder of this project.

* [test server](./test-server.sh)
