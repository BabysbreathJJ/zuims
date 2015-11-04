# zuims

## 项目介绍

zuims是一个服务于高端餐饮的美食预订系统

## 目录结构

```
doc/                文档
    proposal/       立项相关文档
    sprint/         迭代相关文档
        sprint1/    迭代一 
src/                源码
    user-service/   用户组件(submodule)
```

## 进展情况

### 目前完成情况

进行了第一次迭代，集群构建还在进行中，搭建起了基本的开发框架

### 遇到的问题

<table>
	<thead>
		<tr>
			<th>Problem</th>
			<th>Description</th>
			<th>Owner</th>
			<th>Status</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>集群IP相同</td>
			<td>整个虚拟机集群，是公用的一个IP，如何暴露端口出来还是一个问题</td>
			<td>张坚鑫，高策</td>
			<td style="text-align:right">Doing</td>
		</tr>
		<tr>
			<td>Docker与翻墙</td>
			<td>Docker hub似乎需要翻墙才能访问？</td>
			<td>张坚鑫，高策</td>
			<td style="text-align:right">Doing</td>
		</tr>
	</tbody>
</table>

### Roadmap

DL: 11.17

1. 完成用户注册登录，会员卡等等相关功能

### Done List

1. 书写概要需求规约
2. 搭建后端REST服务大致框架