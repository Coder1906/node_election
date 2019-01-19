# 用户端API接口

## 错误代码说明

| 代码 | 说明 |
|:--:|:--:|
| 1 | 成功 |
| 0 | 内部错误 |
| -1 | 参数错误 |
| -2 | 用户名或者密码错误 | 
| -3 | 选举会不存在 | 
| -4 | 该选举会已经存在该候选人 | 
| -5 | 登陆失效，请重新登陆 | 
| -6 | 发送验证码频繁，请稍后再重发 | 
| -7 | 验证码已过有效期，请重新发送 |
| -8 | 验证码错误 |
| -9 | 该邮箱已经被使用 |
| -10 | 该邮箱还没注册 |
| -11 | 密码错误 |
| -12 | 候选人不存在 |
| -13 | 旧的选举会已经启动，不能再增减候选人 |
| -14 | 该选举会您已经投过票了 |
| -15 | 选举会还没开始 |
| -16 | 选举会已经结束 |
| -17 | 选中的候选人列表异常 |
| -18 | 您选中的选中的候选人总数已经达到了上限 |

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

#### 候选人列表

##### URL

> GET /api/v1/candidate

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

> GET /api/v1/candidate/total

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

> POST /api/v1/candidate

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

> POST /api/v1/candidate/{id}

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
| start | datetime | 否 | 开始时间 |
| end | datetime | 否 | 结束时间 |
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
| start | datetime | 否 | 开始时间 |
| end | datetime | 否 | 结束时间 |

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

