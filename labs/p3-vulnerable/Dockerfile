FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY src ./src

ENV P3_CYBER_RANGE=1
ENV PORT=31337

EXPOSE 31337

CMD ["npm", "start"]
