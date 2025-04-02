FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY .sequelizerc ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

COPY start.sh /start.sh
RUN chmod +x /start.sh
CMD ["/start.sh"]
