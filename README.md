# 选举系统

## 介绍

语言：NodeJS（版本 >= 8.0.0）  
框架： Egg.js  
数据库：MySQL（版本 >= 5.5.53）、Redis （版本 >= 3.2） 

## 项目结构说明

### 管理端

#### controller目录

> /app/controller/admin  

#### 路由文件

> /app/router/admin.js

### 用户端

#### controller目录

> /app/controller/home  

#### 路由文件

> /app/router/home.js

### 配置目录

> /config

需要配置mysql、redis、email等信息。

### 路由鉴权

管理端和用户端的路由鉴权是采用系统生成32位随机字符串做为token，有效时间是30天。

## 数据库结构说明

管理员表（ID，登陆名，密码）  
用户表（ID，邮箱，密码）  
选举表（ID，名称，开始时间，结束时间，状态，创建时间）  
候选人表（ID，名称，创建时间）  
选举&候选人表（ID，选举ID，候选人ID）  
投票表（ID，用户ID，选举&候选人ID，投票时间）  

> ID均为主键自增，[详情请看](https://github.com/Coder1906/node_election/blob/master/sql/election.sql)

## API 文档

- [管理端API文档](https://github.com/Coder1906/node_election/blob/master/docs/admin_api.md)  
- [客户端API文档](https://github.com/Coder1906/node_election/blob/master/docs/home_api.md)  
- [Postman的API测试文件](https://github.com/Coder1906/node_election/blob/master/docs/election.postman_collection.json)，可以直接导入Postman进行测试接口
- 管理端的初始账号和密码是：admin 123456

## 下载

```bash
$ git clone https://github.com/Coder1906/node_election.git
$ cd ./node_election
```

## 普通安装

```bash
$ npm i
```

然后需要在MySQL导入数据库文件， [election.sql](https://github.com/Coder1906/node_election/blob/master/sql/election.sql)  

#### 开发环境

```bash
$ npm run dev
$ open http://localhost:7001/
```

#### 生产环境

```bash
$ npm start
$ npm stop
```

## Docker & Docker Compose 安装

[Docker安装教程](https://github.com/Coder1906/node_election/blob/master/docs/docker.md)  

端口：8081、6379、3306

```bash
$ docker-compose build
$ docker-compose up -d
```
