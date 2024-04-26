FROM node:20.12.2

WORKDIR /app

COPY package.json .

RUN npm i -g pnpm
RUN pnpm i

COPY . .

RUN pnpm run build

EXPOSE 8080

CMD [ "pnpm", "run", "preview" ]