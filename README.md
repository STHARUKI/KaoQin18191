# KaoQin18191
Commit By 冯晴,2018/11/11

**题目：考核系统（《UML大战需求分析》第十章&附录一）**

| 组员姓名 | 学号         | 分工                         |
| ---- | ---------- | -------------------------- |
| 冯晴   | 3016218138 | PM，RD，DOC（软件设计说明书）         |
| 何雨璇  | 3016218141 | RD，DOC（软件设计说明书）            |
| 娄宇欣  | 3016218149 | RD，DOC（软件设计说明书）            |
| 张亚文  | 3016218161 | QA，DOC（软件需求规格说明书 ，软件测试说明书） |

说明：

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





