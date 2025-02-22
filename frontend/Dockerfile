FROM oven/bun:latest

WORKDIR ./

COPY package.json ./
COPY bun.lockb ./
COPY src  ./

RUN bun install

COPY . .

RUN bun run build

RUN bun add -g serve

EXPOSE 3001

CMD ["serve", "-s", "dist", "-l", "3001"]
