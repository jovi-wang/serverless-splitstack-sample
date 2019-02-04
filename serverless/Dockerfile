FROM node:8-alpine

RUN mkdir /app
WORKDIR /app

RUN npm install -g nodemon serverless
ADD package.json package.json
RUN npm config set registry http://registry.npmjs.org
RUN npm install

COPY serverless-offline.yml serverless.yml 

COPY entrypoint.sh /tmp/entrypoint.sh
RUN chmod +x /tmp/entrypoint.sh
ENTRYPOINT ["/tmp/entrypoint.sh"]