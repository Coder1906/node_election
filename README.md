# 选举系统

## 介绍

语言：NodeJS  
框架： Egg.js  
数据库：MySQL、Redis  

## 项目结构说明

### 管理端
#### controller目录

/app/controller/admin  

#### 路由文件

/app/router/admin.js

### 用户端
#### controller目录

/app/controller/home  

#### 路由文件

/app/router/home.js

### 路由鉴权

管理端和用户端的路由鉴权是采用系统生成32位随机字符串做为token，有效时间是30天。

### 配置

> /config/config.default.js  //配置文件

需要配置mysql、redis、email等信息。

## 数据库结构说明

管理员表（ID，登陆名，密码）  
用户表（ID，邮箱，密码）  
选举表（ID，名称，开始时间，结束时间，状态，创建时间）  
候选人表（ID，名称，创建时间）  
选举&候选人表（ID，选举ID，候选人ID）  
投票表（ID，用户ID，选举&候选人ID，投票时间）  

> ID均为主键自增，详情请看 /sql/election.sql

## API 文档

- [管理端API文档](https://github.com/Coder1906/node_election/blob/master/docs/admin_api.md)  
- [客户端API文档](https://github.com/Coder1906/node_election/blob/master/docs/home_api.md)

## 安装

```bash
$ git clone https://github.com/Coder1906/node_election.git
$ cd ./node_election
$ npm i
```
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
