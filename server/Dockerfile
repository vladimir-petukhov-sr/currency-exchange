# The instructions for the first stage
FROM node:10-alpine as builder

RUN apk --no-cache add python make g++

COPY package*.json ./
RUN npm install --production


FROM node:10-alpine as dist
RUN apk --no-cache add python make g++
WORKDIR /tmp/
COPY package.json package-lock.json tsconfig.json tsconfig.build.json ./
COPY src/ src/
RUN npm install
RUN npm run prestart:prod

# The instructions for second stage
FROM node:10-alpine
RUN apk add --no-cache curl
WORKDIR /usr/src/app
COPY --from=builder node_modules ./node_modules
COPY --from=dist /tmp/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main.js"]
