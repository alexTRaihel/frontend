FROM node:12
WORKDIR /client
COPY ./package.json ./
RUN npm install
RUN npm install -g http-server
COPY ./ .
EXPOSE 8091
CMD ["npm", "run", "test:dev"]