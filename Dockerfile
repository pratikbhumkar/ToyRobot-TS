#Development deployment begins here 
FROM node:22-alpine AS development-env

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm ci
COPY . .

CMD ["npm", "test"]