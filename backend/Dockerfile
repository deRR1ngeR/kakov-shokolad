FROM node:18-alpine
WORKDIR /backend
COPY package.json package-lock.json ./
RUN npm install -g npm@10.2.5
RUN npm install
ADD . .
COPY ./prisma/schema.prisma prisma/schema.prisma

# Generate prisma types
RUN npm run prisma:generate

CMD ["npm", "run", "start:dev"]