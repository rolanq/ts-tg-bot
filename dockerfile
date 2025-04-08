FROM node:18-alpine

# Установка шрифтов
RUN apk add --no-cache fontconfig msttcorefonts-installer
RUN update-ms-fonts && fc-cache -f

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY .sequelizerc ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
