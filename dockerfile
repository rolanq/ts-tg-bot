FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY .sequelizerc ./

RUN npm install

COPY . .

RUN npm run build
RUN npm run migrate
RUN npm run seed

EXPOSE 3000

CMD ["npm", "start"]
