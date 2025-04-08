FROM node:18-alpine

# Установка шрифтов
RUN apk add --no-cache fontconfig font-liberation

WORKDIR /app

# Копируем шрифты
COPY fonts /usr/share/fonts/
RUN fc-cache -f -v

COPY package*.json ./
COPY tsconfig*.json ./
COPY .sequelizerc ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
