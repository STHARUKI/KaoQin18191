import { Res } from './../res';
import { LeaveInfo } from './../leaveinfo';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-showout',
  templateUrl: './showout.component.html',
  styleUrls: ['./showout.component.css']
})

export class ShowoutComponent implements OnInit {

  pid = '3051077';

  leaveRecordsPro: Promise<LeaveInfo[]>;
  leaveRecord: LeaveInfo[];
  selectedRecord: LeaveInfo;

  sent = {};
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  //查看请假申请
  getLeaveRecords(): Promise<LeaveInfo[]> {
    return this.http.get<LeaveInfo[]>('http://112.74.164.166:3000/leave/' + this.pid, {withCredentials: true}).toPromise();
  }

  async getLeaveRecord() {
    this.leaveRecord = await this.getLeaveRecords();
    console.log(this.leaveRecord);
  }

  editLeaveRecord(l: LeaveInfo) {
    this.selectedRecord = l;
  }

  async sentEdit() {
    await this.http.post<Res>('http://112.74.164.166:3000/leave/user/' +
     this.selectedRecord.rid, this.selectedRecord,
    {withCredentials: true, headers: {'Content-Type': 'application/json'}}).subscribe(data => {
      console.log(this.selectedRecord);
      if (data.code === '200') {
        alert('修改成功！');
      } else {
        alert('修改失败！');
      }
    });
  }
}
