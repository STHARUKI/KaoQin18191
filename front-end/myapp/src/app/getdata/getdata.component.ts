import { OutRecord } from './../data/outrecord';
import { LeaveRecord } from './../data/leaverecord';
import { Res } from './../res';
import { AppDateAdapter, APP_DATE_FORMATS } from './adapter/date.adapter';
import { PunchInfo } from './../punchinfo';
import { OutInfo } from './../outinfo';
import { PunchRecord } from './../data/punchrecord';
import { SavedUser } from './../saveduser';
import { DataIntService } from './../data-int.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { LeaveInfo } from '../leaveinfo';
import { MatPaginator, MatTableDataSource, DateAdapter, MAT_DATE_FORMATS, MatDateFormats } from '@angular/material';
import { Router } from '@angular/router';
import {ChangeDetectorRef} from '@angular/core';
import { UserInfo } from '../userinfo';


@Component({
  selector: 'app-getdata',
  templateUrl: './getdata.component.html',
  styleUrls: ['./getdata.component.css'],
  providers: [
    {
        provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
    ]
})
export class GetdataComponent implements OnInit {

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();

  flag: number;
  begintime: Date;
  endtime: Date;
  type: string;
  userinfo: UserInfo;

  dataSourceLeaveSelf: MatTableDataSource<LeaveInfo>;
  displayedColumnsLeaveSelf: string[];
  isHiddenLeaveSelf = false;
  selectedElementLeaveSelf;

  dataSourceOutSelf: MatTableDataSource<OutInfo>;
  displayedColumnsOutSelf: string[];
  isHiddenOutSelf = true;
  selectedElementOutSelf;

  dataSourcePunchSelf: MatTableDataSource<PunchInfo>;
  displayedColumnsPunchSelf: string[];
  isHiddenPunchSelf = true;

  isHiddenNewLeaveSelf = true;
  newLeaveInfo = new LeaveInfo();
  isHiddenNewOutSelf = true;
  newOutInfo = new OutInfo();

  dataSourceLeaveRecord: MatTableDataSource<LeaveRecord>;
  isHiddenLeaveRecord = true;
  displayedColumnsLeaveRecord: string[];
  selectedElementLeaveRecord;

  dataSourceOutRecord: MatTableDataSource<OutRecord>;
  isHiddenOutRecord = true;
  displayedColumnsOutRecord: string[];
  selectedElementOutRecord;
  newLeaveRecord: LeaveInfo;
  newOutRecord: OutInfo;

  dataSourcePunchRecord: MatTableDataSource<PunchRecord>;
  isHiddenPunchRecord = true;
  displayedColumnsPunchRecord: string[];


  constructor(private http: HttpClient, private dataIntService: DataIntService,
    private router: Router, private changeDetectorRef: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.dataIntService.getFlag().subscribe(data => {

      this.type = SavedUser.getUserInfo().type;
      if (data === 1) {
        this.getUserLeaveSelf();
        this.changeDetectorRef.detectChanges();
      } else if (data === 2) {
        this.getUserOutSelf();
        this.changeDetectorRef.detectChanges();
      } else if (data === 3) {
        this.getUserPunchSelf();
        this.changeDetectorRef.detectChanges();
      } else if (data === 4) {
        this.newUserLeaveSelf();
        this.changeDetectorRef.detectChanges();
      } else if (data === 5) {
        this.newUserOutSelf();
        this.changeDetectorRef.detectChanges();
      } else if (data === 6) {
        this.getLeaveRecord();
        this.changeDetectorRef.detectChanges();
      } else if (data === 7) {
        this.getOutRecord();
        this.changeDetectorRef.detectChanges();
      } else if (data === 8) {
        this.getPunchRecord();
        this.changeDetectorRef.detectChanges();
      }
    });
  }


  private dateFormat(date: Date): string {
    const year = date.getFullYear().toString();
    const month = (date.getUTCMonth() + 1).toString();
    const day = date.getDate().toString();
    const hour = date.getHours().toString();
    const min = date.getMinutes().toString();
    const sec = date.getSeconds().toString();
    return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
  }

  getUserLeaveSelf() {
    this.isHiddenLeaveSelf = false;
    this.isHiddenOutSelf = true;
    this.isHiddenPunchSelf = true;
    this.isHiddenNewLeaveSelf = true;
    this.isHiddenNewOutSelf = true;
    this.isHiddenLeaveRecord = true;
    this.isHiddenOutRecord = true;
    this.isHiddenPunchRecord = true;
    this.flag = 1;
    const url = 'http://112.74.164.166:3000/leave/' + SavedUser.getUser().pid;
    this.http.get<LeaveInfo[]>(url, {withCredentials: true}).toPromise().then(data => {
      SavedUser.setUserLeaveSelf(data);
      this.displayedColumnsLeaveSelf = ['rid', 'begintime', 'endtime', 'type', 'reason', 'status'];
      this.dataSourceLeaveSelf = new MatTableDataSource<LeaveInfo>(SavedUser.getUserLeaveSelf());
      this.dataSourceLeaveSelf.paginator = this.paginator.toArray()[0];
    });
  }

  getUserOutSelf() {
    this.isHiddenLeaveSelf = true;
    this.isHiddenOutSelf = false;
    this.isHiddenPunchSelf = true;
    this.isHiddenNewLeaveSelf = true;
    this.isHiddenNewOutSelf = true;
    this.isHiddenLeaveRecord = true;
    this.isHiddenOutRecord = true;
    this.isHiddenPunchRecord = true;
    this.flag = 2;
    const url = 'http://112.74.164.166:3000/out/' + SavedUser.getUser().pid;
    this.http.get<OutInfo[]>(url, {withCredentials: true}).toPromise().then(data => {
      SavedUser.setUserOutSelf(data);
    this.displayedColumnsOutSelf = ['rid', 'begintime', 'endtime', 'reason', 'status'];
    this.dataSourceOutSelf = new MatTableDataSource<OutInfo>(SavedUser.getUserOutSelf());
    this.dataSourceOutSelf.paginator =  this.paginator.toArray()[1];
    });
  }

  getUserPunchSelf() {
    this.isHiddenLeaveSelf = true;
    this.isHiddenOutSelf = true;
    this.isHiddenPunchSelf = false;
    this.isHiddenNewLeaveSelf = true;
    this.isHiddenNewOutSelf = true;
    this.isHiddenLeaveRecord = true;
    this.isHiddenOutRecord = true;
    this.isHiddenPunchRecord = true;
    this.flag = 3;
    const url = 'http://112.74.164.166:3000/punch/' + SavedUser.getUser().pid;
    this.http.get<PunchInfo[]>(url, {withCredentials: true}).toPromise().then(data => {
      SavedUser.setUserPunchSelf(data);
    this.displayedColumnsPunchSelf = ['rid', 'begintime', 'endtime'];
    this.dataSourcePunchSelf = new MatTableDataSource<PunchInfo>(SavedUser.getUserPunchSelf());
    this.dataSourcePunchSelf.paginator =  this.paginator.toArray()[2];
    });
  }

  newUserLeaveSelf() {
    this.flag = 4;
    this.isHiddenLeaveSelf = true;
    this.isHiddenOutSelf = true;
    this.isHiddenPunchSelf = true;
    this.isHiddenNewLeaveSelf = false;
    this.isHiddenNewOutSelf = true;
    this.isHiddenLeaveRecord = true;
    this.isHiddenOutRecord = true;
    this.isHiddenPunchRecord = true;
  }

  newUserOutSelf() {
    this.flag = 5;
    this.isHiddenLeaveSelf = true;
    this.isHiddenOutSelf = true;
    this.isHiddenPunchSelf = true;
    this.isHiddenNewLeaveSelf = true;
    this.isHiddenNewOutSelf = false;
    this.isHiddenLeaveRecord = true;
    this.isHiddenOutRecord = true;
    this.isHiddenPunchRecord = true;
  }


  onNewUserLeaveSubmit() {
    this.newLeaveInfo.pid = SavedUser.getUser().pid;
    this.newLeaveInfo.status = '未审核';
    this.newLeaveInfo.begintime = this.dateFormat(this.begintime);
    this.newLeaveInfo.endtime = this.dateFormat(this.endtime);
    const url = 'http://112.74.164.166:3000/leave/user';
    this.http.post<Res>(url, this.newLeaveInfo,
      {withCredentials: true, headers: {'Content-Type': 'application/json'}}).subscribe(data => {
        if (data.code === '200') {
          alert('提交成功！');
        } else {
          alert('提交失败！');
        }
    });
  }

  onNewUserLeaveCancel() {
    this.isHiddenNewLeaveSelf = true;
  }

  onNewUserOutSubmit() {
    this.newOutInfo.pid = SavedUser.getUser().pid;
    this.newOutInfo.status = '未审核';
    this.newOutInfo.begintime = this.dateFormat(this.begintime);
    this.newOutInfo.endtime = this.dateFormat(this.endtime);
    const url = 'http://112.74.164.166:3000/out/user';
    this.http.post<Res>(url, this.newOutInfo,
      {withCredentials: true, headers: {'Content-Type': 'application/json'}}).subscribe(data => {
        if (data.code === '200') {
          alert('提交成功！');
        } else {
          alert('提交失败！');
        }
    });
  }
  onNewUserOutCancel() {
    this.isHiddenNewOutSelf = true;
  }

  changeOutSelf(element) {
    if (element.status === '未批准' || element.status === '未审核') {
      this.selectedElementOutSelf = element;
    } else {
      alert('不能修改已经批准的请求或正在审核中的请求！');
    }
  }

  onChangeUserOutSubmit() {
    this.selectedElementOutSelf.pid = SavedUser.getUser().pid;
    this.selectedElementOutSelf.status = '未审核';
    this.selectedElementOutSelf.begintime = this.dateFormat(this.begintime);
    this.selectedElementOutSelf.endtime = this.dateFormat(this.endtime);
    const url = 'http://112.74.164.166:3000/out/user/' + this.selectedElementOutSelf.rid;
    this.http.post<Res>(url, this.selectedElementOutSelf,
      {withCredentials: true, headers: {'Content-Type': 'application/json'}}).subscribe(data => {
        if (data.code === '200') {
          alert('提交成功！');
        } else {
          alert('提交失败！');
        }
    });
  }

  onChangeUserOutCancel() {
    this.selectedElementOutSelf = null;
  }

  changeLeaveSelf(element) {
    if (element.status === '未批准' || element.status === '未审核') {
      this.selectedElementLeaveSelf = element;
    } else {
      alert('不能修改已经批准的请求或正在审核中的请求！');
    }
  }

  onChangeUserLeaveSubmit() {
    this.selectedElementLeaveSelf.pid = SavedUser.getUser().pid;
    this.selectedElementLeaveSelf.status = '未审核';
    this.selectedElementLeaveSelf.begintime = this.dateFormat(this.begintime);
    this.selectedElementLeaveSelf.endtime = this.dateFormat(this.endtime);
    const url = 'http://112.74.164.166:3000/leave/user/' + this.selectedElementLeaveSelf.rid;
    this.http.post<Res>(url, this.selectedElementLeaveSelf,
      {withCredentials: true, headers: {'Content-Type': 'application/json'}}).subscribe(data => {
        if (data.code === '200') {
          alert('提交成功！');
        } else {
          alert('提交失败！');
        }
    });
  }

  onChangeUserLeaveCancel() {
    this.selectedElementLeaveSelf = null;
  }

  getLeaveRecord() {
    this.isHiddenLeaveSelf = true;
    this.isHiddenOutSelf = true;
    this.isHiddenPunchSelf = true;
    this.isHiddenNewLeaveSelf = true;
    this.isHiddenNewOutSelf = true;
    this.isHiddenLeaveRecord = false;
    this.isHiddenOutRecord = true;
    this.isHiddenPunchRecord = true;
    this.flag = 6;
    const url = 'http://112.74.164.166:3000/leave';
    this.http.get<LeaveRecord[]>(url, {withCredentials: true}).toPromise().then(data => {
      SavedUser.setLeaveRecord(data);
    this.displayedColumnsLeaveRecord = ['pid', 'name', 'department', 'restvacation', 'begintime', 'endtime', 'ltype', 'status'];
    this.dataSourceLeaveRecord = new MatTableDataSource<LeaveRecord>(SavedUser.getLeaveRecord());
    this.dataSourceLeaveRecord.paginator =  this.paginator.toArray()[3];
    });
  }

  applyFilterLeaveRecord(filterValue: string) {
    this.dataSourceLeaveRecord.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceLeaveRecord.paginator) {
      this.dataSourceLeaveRecord.paginator.firstPage();
    }
  }

  getOutRecord() {
    this.isHiddenLeaveSelf = true;
    this.isHiddenOutSelf = true;
    this.isHiddenPunchSelf = true;
    this.isHiddenNewLeaveSelf = true;
    this.isHiddenNewOutSelf = true;
    this.isHiddenLeaveRecord = true;
    this.isHiddenOutRecord = false;
    this.isHiddenPunchRecord = true;
    this.flag = 7;
    const url = 'http://112.74.164.166:3000/out';
    this.http.get<OutRecord[]>(url, {withCredentials: true}).toPromise().then(data => {
      SavedUser.setOutRecord(data);
    this.displayedColumnsOutRecord = ['pid', 'name', 'department', 'begintime', 'endtime', 'reason', 'status'];
    this.dataSourceOutRecord = new MatTableDataSource<OutRecord>(SavedUser.getOutRecord());
    this.dataSourceOutRecord.paginator =  this.paginator.toArray()[4];
    });
  }

  applyFilterOutRecord(filterValue: string) {
    this.dataSourceOutRecord.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceOutRecord.paginator) {
      this.dataSourceOutRecord.paginator.firstPage();
    }
  }

  getPunchRecord() {
    this.isHiddenLeaveSelf = true;
    this.isHiddenOutSelf = true;
    this.isHiddenPunchSelf = true;
    this.isHiddenNewLeaveSelf = true;
    this.isHiddenNewOutSelf = true;
    this.isHiddenLeaveRecord = true;
    this.isHiddenOutRecord = true;
    this.isHiddenPunchRecord = false;
    this.flag = 8;
    const url = 'http://112.74.164.166:3000/punch';
    this.http.get<PunchRecord[]>(url, {withCredentials: true}).toPromise().then(data => {
      SavedUser.setPunchRecord(data);
    this.displayedColumnsPunchRecord = ['pid', 'name', 'department', 'begintime', 'endtime'];
    this.dataSourcePunchRecord = new MatTableDataSource<PunchRecord>(SavedUser.getPunchRecord());
    this.dataSourcePunchRecord.paginator =  this.paginator.toArray()[5];
    });
  }

  applyFilterPunchRecord(filterValue: string) {
    this.dataSourcePunchRecord.filter = filterValue.trim().toLowerCase();

    if (this.dataSourcePunchRecord.paginator) {
      this.dataSourcePunchRecord.paginator.firstPage();
    }
  }

  onChangeLeaveRecord(element) {
    this.selectedElementLeaveRecord = element;
  }

  onChangeOutRecord(element) {
    this.selectedElementOutRecord = element;
  }

  onChangeLeaveRecordYes() {
    const date1 = new Date(this.selectedElementLeaveRecord.begintime);
    const date2 = new Date(this.selectedElementLeaveRecord.endtime);
    const time1 = date1.getTime() / (1000 * 60 * 60 * 24);
    const time2 = date2.getTime() / (1000 * 60 * 60 * 24);
    const url = 'http://112.74.164.166:3000/leave/user/' + this.selectedElementLeaveRecord.rid;
    if ((time2 - time1) < 3) {
      if (SavedUser.getUserInfo().type === '部门') {
        this.selectedElementLeaveRecord.status = '等待副总经理审核';
      } else if (SavedUser.getUserInfo().type === '副总') {
        this.selectedElementLeaveRecord.status = '批准';
      } else if (SavedUser.getUserInfo().type === '总经理') {
        this.selectedElementLeaveRecord.status = '批准';
      }
    } else {
      if (SavedUser.getUserInfo().type === '部门') {
        this.selectedElementLeaveRecord.status = '等待副总经理审核';
      } else if (SavedUser.getUserInfo().type === '副总') {
        this.selectedElementLeaveRecord.status = '等待总经理审核';
      } else if (SavedUser.getUserInfo().type === '总经理') {
        this.selectedElementLeaveRecord.status = '批准';
      }
    }
    this.newLeaveInfo.pid = this.selectedElementLeaveRecord.pid;
    this.newLeaveInfo.begintime = this.selectedElementLeaveRecord.begintime;
    this.newLeaveInfo.endtime = this.selectedElementLeaveRecord.endtime;
    this.newLeaveInfo.ltype = this.selectedElementLeaveRecord.ltype;
    this.newLeaveInfo.reason = this.selectedElementLeaveRecord.reason;
    this.newLeaveInfo.status = this.selectedElementLeaveRecord.status;
    this.http.post<Res>(url, this.newLeaveInfo,
      {withCredentials: true, headers: {'Content-Type': 'application/json'}}).subscribe(data => {
        if (data.code === '200') {

        } else {
          alert('操作失败！');
        }
      });
    if (this.selectedElementLeaveRecord.ltype === '年假') {
      const numbr = SavedUser.getUserInfo().restvacation  - time2 + time1;
      const url2 = 'http://112.74.164.166:3000/userid/' + SavedUser.getUserInfo().pid;
      const jsonPost = {
        restvacation: numbr
      };
      this.http.post<Res>(url2, jsonPost,
        {withCredentials: true, headers: {'Content-Type': 'application/json'}}).subscribe();
    }
    this.selectedElementLeaveRecord = null;
  }

  onChangeLeaveRecordNo() {
    const url = 'http://112.74.164.166:3000/leave/user/' + this.selectedElementLeaveRecord.rid;
    this.newLeaveInfo.pid = this.selectedElementLeaveRecord.pid;
    this.newLeaveInfo.begintime = this.selectedElementLeaveRecord.begintime;
    this.newLeaveInfo.endtime = this.selectedElementLeaveRecord.endtime;
    this.newLeaveInfo.ltype = this.selectedElementLeaveRecord.ltype;
    this.newLeaveInfo.reason = this.selectedElementLeaveRecord.reason;
    this.newLeaveInfo.status = '未批准';
    this.http.post<Res>(url, this.newLeaveInfo,
      {withCredentials: true, headers: {'Content-Type': 'application/json'}}).subscribe(data => {
        if (data.code === '200') {
          alert('操作成功！');
        } else {
          alert('操作失败！');
        }
      });
    this.selectedElementLeaveRecord = null;
  }

  onChangeLeaveRecordCancel() {
    this.selectedElementLeaveRecord = null;
  }

  onChangeOutRecordYes() {
    const date1 = new Date(this.selectedElementOutRecord.begintime);
    const date2 = new Date(this.selectedElementOutRecord.endtime);
    const time1 = date1.getTime() / (1000 * 60 * 60 * 24);
    const time2 = date2.getTime() / (1000 * 60 * 60 * 24);
    const url = 'http://112.74.164.166:3000/out/user/' + this.selectedElementOutRecord.rid;
    if ((time2 - time1) < 3) {
      if (SavedUser.getUserInfo().type === '部门') {
        this.selectedElementOutRecord.status = '等待副总经理审核';
      } else if (SavedUser.getUserInfo().type === '副总') {
        this.selectedElementOutRecord.status = '批准';
      } else if (SavedUser.getUserInfo().type === '总经理') {
        this.selectedElementOutRecord.status = '批准';
      }
    } else {
      if (SavedUser.getUserInfo().type === '部门') {
        this.selectedElementOutRecord.status = '等待副总经理审核';
      } else if (SavedUser.getUserInfo().type === '副总') {
        this.selectedElementOutRecord.status = '等待总经理审核';
      } else if (SavedUser.getUserInfo().type === '总经理') {
        this.selectedElementOutRecord.status = '批准';
      }
    }
    this.newOutInfo.pid = this.selectedElementOutRecord.pid;
    this.newOutInfo.begintime = this.selectedElementOutRecord.begintime;
    this.newOutInfo.endtime = this.selectedElementOutRecord.endtime;
    this.newOutInfo.reason = this.selectedElementOutRecord.reason;
    this.newOutInfo.status = this.selectedElementOutRecord.status;
    this.http.post<Res>(url, this.newOutInfo,
      {withCredentials: true, headers: {'Content-Type': 'application/json'}}).subscribe(data => {
        if (data.code === '200') {
          alert('操作成功！');
        } else {
          alert('操作失败！');
        }
      });
    this.selectedElementOutRecord = null;
  }

  onChangeOutRecordNo() {
    const url = 'http://112.74.164.166:3000/out/user/' + this.selectedElementOutRecord.rid;
    this.newOutInfo.pid = this.selectedElementOutRecord.pid;
    this.newOutInfo.begintime = this.selectedElementOutRecord.begintime;
    this.newOutInfo.endtime = this.selectedElementOutRecord.endtime;
    this.newOutInfo.reason = this.selectedElementOutRecord.reason;
    this.newOutInfo.status = '未批准';
    this.http.post<Res>(url, this.newOutInfo,
      {withCredentials: true, headers: {'Content-Type': 'application/json'}}).subscribe(data => {
        if (data.code === '200') {
          alert('操作成功！');
        } else {
          alert('操作失败！');
        }
      });
    this.selectedElementOutRecord = null;
  }

  onChangeOutRecordCancel() {
    this.selectedElementOutRecord = null;
  }
}
