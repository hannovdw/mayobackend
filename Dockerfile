FROM node

RUN mkdir -p /srv/app/backend
WORKDIR /srv/app/backend

COPY package.json /srv/app/backend
COPY package-lock.json /srv/app/backend

RUN npm install

COPY . /srv/app/backend

EXPOSE 9090

CMD ["node", "index.js"]