# zui.ms 前端开发模块
#####2015-11-18

##技术

AngularJS进行前端开发

前端测试框架 Jasmine，单元测试运行器Karma,端对端测试运行期protractor




##目录结构
```
app/                    --> all of the source files for the application
    css/               --> stylesheet
    components/           --> all app specific modules
      version/              --> version related components
        version.js                 --> version module declaration and basic "version" value service
        version_test.js            --> "version" value service tests
        version-directive.js       --> custom directive that returns the current app version
        version-directive_test.js  --> version directive tests
        interpolate-filter.js      --> custom interpolation filter
        interpolate-filter_test.js --> interpolate filter tests
    view_about/                --> the view_about view template and logic
        about.html            --> the partial template
        about.js              --> the controller logic
        about_test.js         --> tests of the controller
    view_register/                --> the view_regitser view template and logic
        experience_register.html            --> the partial template
        pay_regitser.html                   --> the partial template
        register.js              --> the controller logic
        register_test.js         --> tests of the controller
    app.js                --> main application module
    index.html            --> app layout file (the main html template file of the app)
karma.conf.js         --> config file for running unit tests with Karma
e2e-tests/            --> end-to-end tests
        protractor-conf.js    --> Protractor config file
        scenarios.js          --> end-to-end scenarios to be run by Protractor
```

##开发阶段运行，将文件部署到服务器
 利用node.js的工具 [http-server][http-server].  通过 `npm start` 运行服务器

 也可以在全局安装http-server:

```
sudo npm install -g http-server
```

之后可以cd 到app/下，运行如下命令

```
http-server -a localhost -p 8000
```


