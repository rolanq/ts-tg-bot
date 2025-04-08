FROM node:18-alpine

# Установка минимально необходимых пакетов
RUN apk add --no-cache fontconfig ttf-dejavu

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY .sequelizerc ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
