#Development deployment begins here 
FROM node:12-alpine AS development-env
ENV NODE_ENV=development

WORKDIR /app

COPY package*.json ./
RUN yarn install
COPY . .

CMD ["npm", "test"]

#Production deployment begins here 
FROM development-env AS production-env
ENV NODE_ENV=production

WORKDIR /app

COPY package*.json ./
RUN yarn install

COPY . .

CMD ["npm", "test"]