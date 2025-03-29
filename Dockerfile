# このファイルは不完全かつ未使用です。

FROM node:23-slim

RUN npx -y playwright@latest install --with-deps chromium