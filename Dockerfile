FROM daocloud.io/library/node:8.7-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install --registry=https://registry.npm.taobao.org
EXPOSE 8081
