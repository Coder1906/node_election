# 管理端API接口



## 接口目录
+ [管理员](#管理员)  
    + [登陆](#登陆)  
+ [选举会](#选举会)  
    +  [选举会列表](#选举会列表)  
    +  [选举会总数量](#选举会总数量)  
    +  [选举会增加](#选举会增加)  
    +  [选举会修改](#选举会修改)  
+ [候选人](#候选人)  
    +  [候选人列表](#候选人列表)  
    +  [候选人总数量](#候选人总数量)  
    +  [候选人增加](#候选人增加)  
    +  [候选人修改](#候选人修改)  
+ [选举会&候选人](#选举会&候选人)  
    +  [选举会&候选人列表](#选举会&候选人列表)  
    +  [选举会&候选人总数量](#选举会&候选人总数量)  
    +  [选举会&候选人增加](#选举会&候选人增加)  
    +  [选举会&候选人修改](#选举会&候选人修改)  
    +  [选举会&候选人删除](#选举会&候选人删除)  
+ [投票记录](#投票记录)  
    +  [投票记录列表](#投票记录列表)  
    +  [投票记录总数量](#投票记录总数量)  


## 路由鉴权方式

在herder增加下面的参数，除了**管理登陆接口**不需要鉴权外，其它的全都要的设置

- auth-admin-token  
- auth-admin-username

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

### 管理员

#### 登陆

##### 初始账号密码

username: admin  
password: 123456

##### URL

> POST /admin/v1/admin/login

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
        "admin": {
            "id": 1,
            "username": "admin",
            "token": "eac9a10728e11e1ae5a6f52c91776ecb"
        }
    }
}
```

### 选举会

#### 选举会列表

##### URL

> GET /admin/v1/election

##### 请求参数

| 名称 | 类型 | 不能为空 | 说明 |
|:--:|:--:|:--:|:--:|
| id, limit, offset | int | 否 | id |
| name | string | 否 | 名称 | 
| status | enum(1, 2) | 否 | 状态 | 
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

> GET /admin/v1/election/total

##### 请求参数

| 名称 | 类型 | 不能为空 | 说明 |
|:--:|:--:|:--:|:--:|
| id, limit, offset | int | 否 | id |
| name | string | 否 | 名称 | 
| status | enum(1, 2) | 否 | 状态 | 

##### 返回参数示例

```json
{
    "code": 1,
    "data": {
        "total": 2
    }
}
```


#### 选举会添加

##### URL

> POST /admin/v1/election

##### 请求参数

| 名称 | 类型 | 不能为空 | 说明 |
|:--:|:--:|:--:|:--:|
| name | string | 是 | 名称 |
| start | datetime | 是 | 开始时间，示例（2018-01-01 10:10:10） | 
| start | datetime | 是 | 开始时间，示例（2018-01-01 10:10:10） | 
| end | datetime | 是 | 结束时间，示例（2018-01-01 10:10:10） | 
| status | enum(1, 2) | 是 | 状态 |

##### 返回参数示例

```json
{
    "code": 1
}
```

#### 选举会修改

##### URL

> POST /admin/v1/election/{id}

##### 请求参数

| 名称 | 类型 | 不能为空 | 说明 |
|:--:|:--:|:--:|:--:|
| name | string | 是 | 名称 |
| start | datetime | 是 | 开始时间，示例（2018-01-01 10:10:10） | 
| start | datetime | 是 | 开始时间，示例（2018-01-01 10:10:10） | 
| end | datetime | 是 | 结束时间，示例（2018-01-01 10:10:10） | 
| status | enum(1, 2) | 是 | 状态 |

##### 返回参数示例

```json
{
    "code": 1
}
```

### 候选人

#### 候选人列表

##### URL

> GET /admin/v1/candidate

##### 请求参数

| 名称 | 类型 | 不能为空 | 说明 |
|:--:|:--:|:--:|:--:|
| id | int | 否 | id |
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
                "name": "候选人1",
                "created": "2019-01-19T05:30:09.000Z"
            },
            {
                "id": 2,
                "name": "候选人2",
                "created": "2019-01-19T05:35:15.000Z"
            }
        ]
    }
}
```

#### 候选人总数量

##### URL

> GET /admin/v1/candidate/total

##### 请求参数

| 名称 | 类型 | 不能为空 | 说明 |
|:--:|:--:|:--:|:--:|
| id | int | 否 | id |
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


#### 候选人添加

##### URL

> POST /admin/v1/candidate

##### 请求参数

| 名称 | 类型 | 不能为空 | 说明 |
|:--:|:--:|:--:|:--:|
| name | string | 是 | 名称 |

##### 返回参数示例

```json
{
    "code": 1
}
```

#### 候选人修改

##### URL

> POST /admin/v1/candidate/{id}

##### 请求参数

| 名称 | 类型 | 不能为空 | 说明 |
|:--:|:--:|:--:|:--:|
| name | string | 是 | 名称 |

##### 返回参数示例

```json
{
    "code": 1
}
```

### 选举会&候选人

#### 选举会&候选人列表

##### URL

> GET /admin/v1/election_candidate

##### 请求参数

| 名称 | 类型 | 不能为空 | 说明 |
|:--:|:--:|:--:|:--:|
| id | int | 否 | id |
| election_id | int | 否 | 选举会id | 
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

> GET /admin/v1/election_candidate/total

##### 请求参数

| 名称 | 类型 | 不能为空 | 说明 |
|:--:|:--:|:--:|:--:|
| id | int | 否 | id |
| election_id | int | 否 | 选举会id | 
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


#### 选举会&候选人添加

##### URL

> POST /admin/v1/election_candidate

##### 请求参数

| 名称 | 类型 | 不能为空 | 说明 |
|:--:|:--:|:--:|:--:|
| election_id | int | 是 | 选举会id | 
| candidate_id | int | 是 | 候选人id |

##### 返回参数示例

```json
{
    "code": 1
}
```

#### 选举会&候选人修改

##### URL

> POST /admin/v1/election_candidate/{id}

##### 请求参数

| 名称 | 类型 | 不能为空 | 说明 |
|:--:|:--:|:--:|:--:|
| election_id | int | 是 | 选举会id | 
| candidate_id | int | 是 | 候选人id |

##### 返回参数示例

```json
{
    "code": 1
}
```

#### 选举会&候选人删除

##### URL

> DELETE /admin/v1/election_candidate/{id}

##### 返回参数示例

```json
{
    "code": 1
}
```

### 投票记录

#### 投票记录列表

##### URL

> GET /admin/v1/vote

##### 请求参数

| 名称 | 类型 | 不能为空 | 说明 |
|:--:|:--:|:--:|:--:|
| user_id | int | 否 | 用户id |
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
                "user_id": 2,
                "ec_id": 1,
                "created": "2019-01-19T13:56:21.000Z",
                "election_name": "选举会1",
                "candidate_name": "候选人2",
                "email": "531237023@qq.com"
            }
        ]
    }
}
```

#### 投票记录总数量

##### URL

> GET /admin/v1/vote/total

##### 请求参数

| 名称 | 类型 | 不能为空 | 说明 |
|:--:|:--:|:--:|:--:|
| user_id | int | 否 | 用户id |
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
