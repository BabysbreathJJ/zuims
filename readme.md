# zuims

## 项目介绍

zuims是一个服务于高端餐饮的美食预订系统

## 目录结构

```
doc/                      文档
    proposal/             立项相关文档
    sprint/               迭代相关文档
        sprint<N>/        迭代<N>
        ... 
src/                      源码
    user-service/         用户组件(submodule)
    restaurant-service/   餐厅组件(submodule)
    merchant-management/  商户后台(submodule)
    RestaurantInfoSpider/ 爬虫程序(submodule)
```

## 结构梳理

### 后端总体结构

代码一共分为四个submodule，未来可能还会添加运营后台的submodule。目前各个submodule没有交互，而且暂时没有严谨的安全保护，之后都是潜在的问题点，需要在之后的迭代里解决。

每一个模块都有对应的API文档，是以REST的方式对外提供服务。

#### user service

user service负责用户相关功能，包括登录注册，等等。其架构比较简单，由spring boot框架实现。该submodule不需要额外的数据初始化，只需要把会员等级，用户来源等等这些信息初始化好即可，对应的初始化脚本在sprint2中。

端口8001

#### restaurant service

负责餐厅相关功能，实现方式与user service类似，不过因为要有对地理位置的支持，因此使用了Mysql 5.7中的新特性，所以对环境的依赖高一些。同时还需要RestaurantInfoSpider来进行数据初始化的处理，目前因为没有数据来源，所以所有的餐厅数据都是依靠爬虫获得。

端口8002

#### RestaurantInfoSpider

爬虫程序，目前没有使用maven等依赖管理工具，所以导致环境问题比较突出，之后的迭代中可能需要考虑引入依赖管理。

无端口

#### merchant-management

商户管理，负责商户后台，这方面安全性要求会低一些，不过同样暂时没有任何的安全保护。目前根据功能的划分，把消息推送服务抽象了出来，使用nodejs来实现，对后台管理的common系统以REST的方式提供服务支持。在推送服务中，使用了leanCloud和mailGun的服务。

推送服务端口8004

后台common系统端口8005

## 进展情况

### 目前完成情况

1. 第一次迭代结束
2. 第二次迭代结束
3. 第三次迭代结束
4. 第四次迭代，正在进行预订功能实现
5. 第五次迭代，需求确定，可以进行开发

### 遇到的问题

1. 容器集群的整合：现在还没有进行
2. 预订消息推送：现在可以进行邮件和web的推送，短信功能暂无
3. 注册验证：短信验证暂无，但可以使用LeanCloud来实现

### Roadmap

DL: 12.15

### Done List

请见masterfile