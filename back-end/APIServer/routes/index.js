var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var dbConfig = require('/home/web/back_end/APIServer/db/DBConfig');
var userSQL = require('/home/web/back_end/APIServer/db/Usersql');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login',function(req,res){
  pool.getConnection(function(err, connection) {  
    connection.query(userSQL.getUserPswdById, req.body.pid,function(err, result) {
            if(result) {      
                if(req.body.pid == result[0].pid && req.body.password == result[0].password) {
                  req.session.regenerate(function(err) {
                    if(err) {
                      return res.json({code: '-200', msg: '登录失败！'});
                      
                    }
                    req.session.user = req.body.pid;
                    return res.json({code: '200', msg: '欢迎登陆！' + req.session.user});
                  });
                } else {
                  return res.json({code: '-200', msg: '账户名或密码错误！'});
                }
            }     
         // 释放连接  
          connection.release();  
    
        });
    });
});

router.get('/logout', function(req, res, next){

  if(req.session.user) {
    req.session.destroy(function(err) {
      if(err){
          res.json({code: '-200', msg: '退出登录失败'});
          return;
      }
      user = null;
      return res.json({code: '200', msg: '退出登录成功！'});
    });
  } else {
    return res.json({code: '-200', msg: '注销失败！出于未登录状态。'});
  }
});


module.exports = router;
