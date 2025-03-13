FROM node:20-alpine
WORKDIR /app
COPY package.json ./package.json
RUN npm install --only=production && npm cache clean --force
COPY index.js .
EXPOSE 3000
ENTRYPOINT [ "npm", "start" ]