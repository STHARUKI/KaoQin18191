var UserSQL = {  
    getUserById:'SELECT * FROM users WHERE pid = ?',
    queryAll:'SELECT * FROM users',  
    getUserPswdById:'SELECT * FROM user_password WHERE pid = ?',

    addRecordLeave:'REPLACE INTO leave_record(pid,begintime,endtime,type,reason,status) VALUES(?,?,?,?,?,?)',
    editRecordLeave:'UPDATE leave_record SET pid=?,begintime=?,endtime=?,type=?,reason=?,status=? WHERE rid =?',
    getUserByIdLeave:'SELECT * FROM leave_record WHERE pid = ?',
    queryAllLeave:'SELECT * FROM leave_record',
    searchLeave:'SELECT * FROM leave_record WHERE begintime=?',

    addRecordGoout:'REPLACE INTO goout_record(pid,begintime,endtime,reason,status) VALUES(?,?,?,?,?)',
    editRecordGoout:'UPDATE goout_record SET pid=?,begintime=?,endtime=?,reason=?,status=? WHERE rid =?',
    getUserByIdGoout:'SELECT * FROM goout_record WHERE pid = ?',
    queryAllGoout:'SELECT * FROM goout_record',

    addRecordPunch:'REPLACE INTO punch_record(pid,begintime,endtime) VALUES(?,?,?)',
    getUserByIdPunch:'SELECT * FROM punch_record WHERE pid = ?',
    queryAllPunch:'SELECT * FROM punch_record',
};
module.exports = UserSQL;