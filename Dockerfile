# FROM node:23-slim
FROM mcr.microsoft.com/playwright:v1.52.0-noble

RUN apt update && \
    apt install -y --no-install-recommends \
    dos2unix \
    tzdata

WORKDIR /app

COPY package.json package-lock.json ./

# RUN npm install && npx playwright install chrome
RUN npm install

# RUN mkdir /downloads
# COPY src ./src
COPY tests ./tests
COPY .env .
COPY playwright.config.ts .
# COPY start.sh .
# COPY tsconfig.json .

RUN mkdir /app/test-results /app/downloads
VOLUME /app/downloads
# VOLUME /app/downloads

# RUN dos2unix start.sh && \
#     chmod +x start.sh

# CMD ["./start.sh"]
CMD ["npx", "playwright", "test"]