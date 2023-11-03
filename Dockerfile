FROM node:20.9.0-alpine

COPY src /emusk/src
COPY node_modules /emusk/node_modules
COPY package.json ./emusk/package.json

WORKDIR /emusk

CMD ["node", "./src/index.js", "-f" ,"/config/emusk.json"]
