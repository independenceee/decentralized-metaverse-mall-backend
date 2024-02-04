FROM node:20
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
COPY prisma prisma
RUN npx prisma generate
EXPOSE 5000
CMD ["npm", "start"]