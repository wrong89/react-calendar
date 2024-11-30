FROM node:alpine AS development

ENV NODE_ENV development

WORKDIR /react-calendar

COPY ./package*.json /react-calendar

RUN npm install

COPY . .

CMD [ "npm", "start" ]