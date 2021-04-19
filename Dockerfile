#Development deployment begins here 
FROM node:12-alpine AS development-env
ENV NODE_ENV=development

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

CMD ["npm", "test"]