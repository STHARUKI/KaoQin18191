var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  pool.getConnection(function(err, connection) {  
    connection.query(userSQL.queryAll,function(err, result) {
        if(result) {      
            console.log(result);
        }     
                
        // 以json形式，把操作结果返回给前台页面     
        responseJSON(res, result);   
    
        // 释放连接  
        connection.release();  
    
    });
  });
});

// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('/home/web/back_end/APIServer/db/DBConfig');
var userSQL = require('/home/web/back_end/APIServer/db/Usersql');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );
// 响应一个JSON数据
var responseJSON = function (res, ret) {
     if(typeof ret === 'undefined') { 
          res.json({     code:'-200',     msg: '操作失败'   
        }); 
    } else { 
      res.json(ret); 
  }};
// 添加用户
router.get('/:uid', function(req, res, next){
 // 从连接池获取连接 
pool.getConnection(function(err, connection) {  
connection.query(userSQL.getUserById, req.params.uid,function(err, result) {
        if(result) {      
            console.log(result);
        }     
          
     // 以json形式，把操作结果返回给前台页面     
       responseJSON(res, result);   

     // 释放连接  
      connection.release();  

       });
    });
});

router.get('/pswd/:uid', function(req, res, next){
 // 从连接池获取连接 
pool.getConnection(function(err, connection) {  
connection.query(userSQL.getUserPswdById, req.params.uid,function(err, result) {
        if(result) {      
            console.log(result);
        }     
          
     // 以json形式，把操作结果返回给前台页面     
       responseJSON(res, result);   

     // 释放连接  
      connection.release();  

       });
    });
});

module.exports = router;
