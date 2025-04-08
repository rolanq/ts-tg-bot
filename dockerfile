FROM node:18-alpine

# Настройка зеркал и установка шрифтов
RUN echo "https://mirror.yandex.ru/mirrors/alpine/v3.21/main" > /etc/apk/repositories && \
    echo "https://mirror.yandex.ru/mirrors/alpine/v3.21/community" >> /etc/apk/repositories && \
    apk update && \
    apk add --no-cache fontconfig ttf-liberation && \
    fc-cache -f

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY .sequelizerc ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
