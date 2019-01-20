# Docker安装步骤

1. 卸载旧版本

> sudo apt-get remove docker docker-engine docker.io

2. 更新包

> sudo apt-get update

3. 允许通过apt-get使用https安装软件包并安装curl

> sudo apt-get install apt-transport-https ca-certificates curl software-properties-common

4. 添加Docker官方密钥

> curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

5. 更新包

> sudo apt-get update

6. 安装最新版本

> sudo apt-get install docker-ce

7. 最后验证一下是否安装完成，打印版本号

> docker -v

# Docker Compose安装步骤

由于国内的网络下载实在太慢了，所以我找了一个国内的地址（DaoCloud）

> sudo curl -L https://get.daocloud.io/docker/compose/releases/download/1.22.0/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose

然后给它权限

> chmod +x /usr/local/bin/docker-compose

最后验证一下是否安装完成，打印版本号

> docker-compose -v

一般国内下载Docker的镜像都非常的慢，我是把源换成了DaoCloud，建议换一下。不过这个要先在DaoCloud注册账号才能查看到，后续查找镜像也要登陆进去才能查找的。

> curl -sSL https://get.daocloud.io/daotools/set_mirror.sh | sh -s http://949944e0.m.daocloud.io

切换完成之后记得要重启Docker

> service docker restart