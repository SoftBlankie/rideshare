FROM node:12.8.3

LABEL version="1.0"
LABEL description="This is the base docker image for the Trippoint frontend"

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm i --production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
