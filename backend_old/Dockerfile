FROM node:20
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 3004
ARG DEBUG=*
CMD ["npm", "run", "start"]