FROM node:lts

RUN mkdir -p /home/src/app
WORKDIR /home/src/app

COPY package.json /home/src/app

RUN npm install
RUN npm install -g sequelize-cli
COPY . /home/src/app

EXPOSE 5000

# CMD ["npm", "start"]