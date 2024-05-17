FROM node:18-alpine

WORKDIR /web

COPY package.json ./

#RUN rm -rf node_modules

#RUN npm install

COPY . .

RUN npm run build

COPY .next ./.next

EXPOSE 3000

CMD ["npm","start"]