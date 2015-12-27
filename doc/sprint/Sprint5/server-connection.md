# 服务器漫游指南

连接服务器，大概需要这样几步：

1. ssh到服务器上
2. 使用screen工具来连接到对应服务的会话
3. 执行相关的操作
4. 挂起会话

## 步骤

修改~/.ssh/config，添加如下内容

	Host zuims-test-server
	HostName 202.120.40.175
	User administrator
	Port 21122

然后在命令行中执行`ssh zuims-test-server`，输入密码

之后在命令行中执行`screen -r merchant-front-end`，这句话的意思对应着上面的第二步，连接到merchant-front-end的会话，然后可以进行操作，操作完后，Ctrl + A, C退出会话，然后继续Ctrl + A, C结束服务器链接。