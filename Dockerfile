FROM node:16.18.0 as builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i
RUN npm i react-scripts
COPY . .
# Build the app
WORKDIR /app
RUN npm run build
CMD ["npm", "run","start"]