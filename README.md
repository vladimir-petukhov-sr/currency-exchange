# Currency Exchange application

Built with such technologies:
- Frontend: Vue JS SPA Application.
- Backend: Node JS application, using Nest JS framework. Written with typescript

## How to start application
Simply run `docker-compose up` at root app folder. That will start all necessaries containers, such 
frontend, backend and redis. After that you can access to applications via your browser, just open `http://localhost:8080`

## Simple e2e tests for backend
Run `docker-compose up -d redis && cd server && npm run test:e2e` at root app folder 


## Swagger UI
`http://localhost:3000/swagger`

## Run development version
- Start backend `npm run start:debug`  (need redis, node js and typescript to be installed). 
Also you pass some env variables, such as: `NODE_ENV`,`API_URL`, `REDIS_HOST`, `REDIS_PORT`, `REDIS_PASSWORD`, `REDIS_PREFIX`
- Start frontend `npm run serve`

Backend will be available as `http://localhost:3000`. Frontend at `http://localhost:8080`


