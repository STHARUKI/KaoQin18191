# KaoQin18191
Commit By 冯晴,2018/11/11

**题目：考核系统（《UML大战需求分析》第十章&附录一）**


- #### 前端

- 使用的框架为angular, ui的框架为 angular material 

  如果想要在自己的机器上运行，需进行

  ```
  >npm init
  >npm install
  >ng server--open
  ```

- 注意事项：

    1）由于该项目是上传到阿里云服务器上的,所以需要联网访问后端api

    2）根据自身的使用情况，需要酌情对back-end/APIServer/app.js文件中以下部分中的header设置进行调整


  ```
  app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", 'http://112.74.164.166');
  
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    return next();
  });
  ```

    3）没有对页面做安卓端的支持

    4）建议在 Chrome 浏览器运行

- ####后端

- 数据库是置于云服务器上的，若使用该系统则需要按照软件设计说明书中的数据库设计部分在本地使用MySQL数据库建立本地数据库


- 后端代码使用nodejs+express框架搭建


- 后端代码部署在linux系统云服务器上，因此如果要在自己的本地服务器运行，需重新进行

  ```
  >npm init
  >npm install
  ```

  操作，并对route目录下的.js文件中导入Mysql模块的文件路径进行修改

  ```
  //var dbConfig = require('/home/web/back_end/APIServer/db/DBConfig');
  //var userSQL = require('/home/web/back_end/APIServer/db/Usersql');
  var dbConfig = require('../db/DBConfig');
  var userSQL = require('../db/Usersql');
  ```

  以及对app.js文件中的路径进行修改

  ```
  //var indexRouter = require('/home/web/back_end/APIServer/routes/index');
  //var usersRouter = require('/home/web/back_end/APIServer/routes/users');
  //var leaveRouter = require('/home/web/back_end/APIServer/routes/leave');
  //var punchRouter = require('/home/web/back_end/APIServer/routes/punch');
  //var gooutRouter = require('/home/web/back_end/APIServer/routes/goout');

  var indexRouter = require('./routes/index');
  var usersRouter = require('./routes/users');
  var leaveRouter = require('./routes/leave');
  var punchRouter = require('./routes/punch');
  var gooutRouter = require('./routes/goout');
  ```

  ​





