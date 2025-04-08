FROM node:18-alpine

# Установка шрифтов и зависимостей
RUN apk add --no-cache \
    fontconfig \
    freetype \
    freetype-dev \
    font-liberation \
    ttf-liberation \
    && mkdir -p /usr/share/fonts \
    && fc-cache -fv

# Создаем базовую конфигурацию fontconfig
RUN mkdir -p /etc/fonts && echo '<?xml version="1.0"?>\
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">\
<fontconfig>\
  <dir>/usr/share/fonts</dir>\
</fontconfig>' > /etc/fonts/fonts.conf

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
