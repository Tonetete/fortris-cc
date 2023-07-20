# FortrisCc

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **This workspace has been generated by [Nx, a Smart, fast and extensible build system.](https://nx.dev)** ✨

## Requirements
- Docker installed.
- Node 18.16.1 or above.

## Start the mongo instance

Open a terminal and from the root folder and execute the following command:

`docker-compose up`

## Start angular app and nestjs server

- `npm install`

- `npx nx run server:serve` or `nx run server:serve` for nestjs server

- `npx nx run client:serve` or `nx run client:serve` for angular client


## Unit testing

- `npx nx run server:test` or `nx run server:test` for nestjs server

- `npx nx run client:test` or `nx run client:test` for angular client

### Coverage

- `./node_modules/.bin/jest --coverage` from root folder

