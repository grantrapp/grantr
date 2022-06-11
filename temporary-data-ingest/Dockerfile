FROM node:latest
COPY ../backend/src/grant.type.ts /srv/backend/src/grant.type.tsc
WORKDIR /srv/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

CMD ["node", "build/index.js"]