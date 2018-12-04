var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  pool.getConnection(function(err, connection) {  
    connection.query(userSQL.queryAllGoout,function(err, result) {
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
connection.query(userSQL.getUserByIdGoout, req.params.uid,function(err, result) {
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

router.post("/user",function(req,res){  
    var params = req.body;
    pool.getConnection(function(err,connection) {
        connection.query(userSQL.addRecordGoout,[params.pid,params.begintime,params.endtime,params.reason,params.status],function(err,result) {
            if(result) {
                result = {
                    code: '200',
                    message: '操作成功'
                };
            }
            responseJSON(res,result);
            connection.release();
        });
    });
});

router.post("/user/:rid",function(req,res){  
    var param = req.body;
    pool.getConnection(function(err,connection) {
        connection.query(userSQL.editRecordGoout,[param.pid,param.begintime,param.endtime,param.reason,param.status,parseInt(req.params.rid)],function(err,result) {
            if(result) {
                result = {
                    code: '200',
                    message: '操作成功'
                };
            }
            responseJSON(res,result);
            connection.release();
        });
    });
});

module.exports = router;
