FROM node:8-alpine

RUN mkdir /app
WORKDIR /app

RUN npm install -g nodemon serverless serverless-offline
COPY package.json package.json
RUN npm config set registry http://registry.npmjs.org
RUN npm install

COPY entrypoint.sh /tmp/entrypoint.sh
RUN chmod +x /tmp/entrypoint.sh
ENTRYPOINT ["/tmp/entrypoint.sh"]