FROM node:14.11.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3333

CMD [ "node", "dist/shared/infra/http/server.js" ]
