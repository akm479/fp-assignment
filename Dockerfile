FROM node:14.11.0-stretch

WORKDIR /var/app/current


COPY package.json .

RUN npm install
COPY . .


CMD ["node","app"]

EXPOSE 3000
