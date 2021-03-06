# 用户端API接口

## 接口目录
+ [用户](#用户)  
    + [发送验证码](#发送验证码)  
    + [注册](#注册)  
    + [登陆](#登陆)  
+ [选举会](#选举会)  
    + [选举会列表](#选举会列表)  
    + [选举会总数量](#选举会总数量)  
+ [选举会&候选人](#选举会&候选人)  
    + [选举会&候选人列表](#选举会&候选人列表)  
    + [选举会&候选人总数量](#选举会&候选人总数量)  
+ [投票记录](#投票记录)  
    + [投票记录列表](#投票记录列表)  
    + [投票记录总数量](#投票记录总数量)  
    + [添加投票](#添加投票) 

## 路由鉴权方式

在herder增加下面的参数，除了**用户登陆、发送验证码、注册等接口**不需要鉴权外，其它的全都要设置的

- auth-user-token  
- auth-user-email

## 返回格式结构

```json
{
    "code": 1,
    "data": {},
    "msg": "错误信息"
}
```

code为1时是请求成功，其它的请看[code 返回码说明文档](https://github.com/Coder1906/node_election/blob/master/docs/code.md)

## 接口列表

### 用户

#### 发送验证码

##### URL

> POST /api/v1/user/captcha

##### 请求参数

| 名称 | 类型 | 不能为空 | 说明 |
|:--:|:--:|:--:|:--:|
| email | string | 是 | 邮箱 |

##### 返回参数示例

```json
{
    "code": 1,
}
```

#### 注册

##### URL

> POST /api/v1/user/register

##### 请求参数

| 名称 | 类型 | 不能为空 | 说明 |
|:--:|:--:|:--:|:--:|
| email | string | 是 | 邮箱 |
| password | string | 是 | 密码 |
| captcha | string | 是 | 验证码 |

##### 返回参数示例

```json
{
    "code": 1,
     "data": {
        "user": {
            "id": 1,
            "email": "23424@qq.com",
            "token": "eac9a10728e11e1ae5a6f52c91776ecb"
        }
    }
}
```

#### 登陆

##### URL

> POST /api/v1/user/login

##### 请求参数

| 名称 | 类型 | 不能为空 | 说明 |
|:--:|:--:|:--:|:--:|
| username | string | 是 | 用户名 |
| password | string | 是 | 密码 | 

##### 返回参数示例

```json
{
    "code": 1,
    "data": {
        "user": {
            "id": 1,
            "email": "23424@qq.com",
            "token": "eac9a10728e11e1ae5a6f52c91776ecb"
        }
    }
}
```

### 选举会

#### 选举会列表

##### URL

> GET /api/v1/election

##### 请求参数

| 名称 | 类型 | 不能为空 | 说明 |
|:--:|:--:|:--:|:--:|
| id, limit, offset | int | 否 | id |
| name | string | 否 | 名称 | 
| limit | uint | 否 | 查询数量，默认20条 | 
| offset | uint | 否 | 偏移数 | 

##### 返回参数示例

```json
{
    "code": 1,
    "data": {
        "list": [
            {
                "id": 1,
                "name": "选举会1",
                "start": "2018-10-20T12:02:10.000Z",
                "end": "2019-01-20T12:11:10.000Z",
                "status": 1,
                "created": "2019-01-19T05:30:09.000Z"
            },
            {
                "id": 2,
                "name": "选举会2",
                "start": "2018-10-20T12:02:10.000Z",
                "end": "2018-10-20T12:11:10.000Z",
                "status": 1,
                "created": "2019-01-19T05:35:15.000Z"
            }
        ]
    }
}
```

#### 选举会总数量

##### URL

> GET /api/v1/election/total

##### 请求参数

| 名称 | 类型 | 不能为空 | 说明 |
|:--:|:--:|:--:|:--:|
| id, limit, offset | int | 否 | id |
| name | string | 否 | 名称 | 

##### 返回参数示例

```json
{
    "code": 1,
    "data": {
        "total": 2
    }
}
```

### 选举会&候选人

#### 选举会&候选人列表

##### URL

> GET /api/v1/election_candidate

##### 请求参数

| 名称 | 类型 | 不能为空 | 说明 |
|:--:|:--:|:--:|:--:|
| id | int | 否 | id |
| election_id | int | 是 | 选举会id | 
| candidate_id | int | 否 | 候选人id |
| limit | uint | 否 | 查询数量，默认20条 | 
| offset | uint | 否 | 偏移数 | 

##### 返回参数示例

```json
{
    "code": 1,
    "data": {
        "list": [
            {
                "id": 1,
                "election_id": 1,
                "candidate_id": 2,
                "election_name": "选举会1",
                "candidate_name": "候选人2"
            },
            {
                "id": 2,
                "election_id": 1,
                "candidate_id": 1,
                "election_name": "选举会1",
                "candidate_name": "候选人3"
            }
        ]
    }
}
```

#### 选举会&候选人总数量

##### URL

> GET /api/v1/election_candidate/total

##### 请求参数

| 名称 | 类型 | 不能为空 | 说明 |
|:--:|:--:|:--:|:--:|
| id | int | 否 | id |
| election_id | int | 是 | 选举会id | 
| candidate_id | int | 否 | 候选人id |

##### 返回参数示例

```json
{
    "code": 1,
    "data": {
        "total": 2
    }
}
```

### 投票记录

#### 投票记录列表

##### URL

> GET /api/v1/vote

##### 请求参数

| 名称 | 类型 | 不能为空 | 说明 |
|:--:|:--:|:--:|:--:|
| election_id | int | 否 | 选举会id | 
| candidate_id | int | 否 | 候选人id |
| ec_id | int | 否 | 选举会&候选人id | 
| start | datetime | 否 | 开始时间，示例（2018-01-01 10:10:10） |
| end | datetime | 否 | 结束时间，示例（2018-01-01 10:10:10） |
| limit | uint | 否 | 查询数量，默认20条 | 
| offset | uint | 否 | 偏移数 | 

##### 返回参数示例

```json
{
    "code": 1,
    "data": {
        "list": [
            {
                "id": 1,
                "ec_id": 1,
                "created": "2019-01-19T13:56:21.000Z",
                "election_name": "选举会1",
                "candidate_name": "候选人2"
            }
        ]
    }
}
```

#### 投票记录总数量

##### URL

> GET /api/v1/vote/total

##### 请求参数

| 名称 | 类型 | 不能为空 | 说明 |
|:--:|:--:|:--:|:--:|
| election_id | int | 否 | 选举会id | 
| candidate_id | int | 否 | 候选人id |
| ec_id | int | 否 | 选举会&候选人id | 
| start | datetime | 否 | 开始时间，示例（2018-01-01 10:10:10） |
| end | datetime | 否 | 结束时间，示例（2018-01-01 10:10:10） |

##### 返回参数示例

```json
{
    "code": 1,
    "data": {
        "total": 2
    }
}
```

#### 添加投票

##### URL

> POST /api/v1/vote/total

##### 请求参数

| 名称 | 类型 | 不能为空 | 说明 |
|:--:|:--:|:--:|:--:|
| election_id | int | 是 | 选举会id | 
| ec_ids | array(int) | 是 | 选中的候选人id |

##### 返回参数示例

```json
{
    "code": 1
}
```

