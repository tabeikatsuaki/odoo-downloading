# このファイルは不完全かつ未使用です。

FROM node:23-slim

# RUN npx -y playwright@latest install --with-deps chromium

WORKDIR /app

COPY package.json ./

RUN npm install

RUN npx playwrite install chrome