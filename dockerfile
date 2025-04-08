FROM node:18-alpine

# Установка шрифтов и зависимостей
RUN apk add --no-cache fontconfig freetype ttf-dejavu
RUN mkdir -p /usr/share/fonts /etc/fonts/conf.d

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY .sequelizerc ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
