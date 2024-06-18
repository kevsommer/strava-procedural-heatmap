FROM node:18-alpine

WORKDIR ./

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn run build

RUN yarn global add serve

EXPOSE 3001

CMD ["serve", "-s", "dist", "-l", "3001"]
