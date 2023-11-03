FROM node:20.9.0-alpine

COPY ./src /app
COPY node_modules ./app/node_modules
COPY package.json ./app

CMD ["node", "/app/index.js -f /config/emusk.json"]
