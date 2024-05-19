FROM node:18-alpine
WORKDIR /frontend
COPY package.json package-lock.json ./
RUN npm install -g npm@10.2.5
RUN npm install
ADD . .
CMD ["npm", "run", "dev"]