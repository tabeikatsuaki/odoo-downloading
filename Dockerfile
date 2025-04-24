FROM mcr.microsoft.com/playwright:v1.52.0-noble

RUN apt update && \
    apt install -y --no-install-recommends \
    tzdata

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY tests ./tests
COPY .env .
COPY playwright.config.ts .

RUN mkdir /app/test-results /app/downloads
VOLUME /app/downloads

CMD ["npx", "playwright", "test"]