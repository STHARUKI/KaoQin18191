import { DataIntService } from './../data-int.service';
import { SavedUser } from './../saveduser';
import { PunchInfo } from './../punchinfo';
import { UserInfo } from './../userinfo';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { User } from './../user';
import { LeaveInfo } from '../leaveinfo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-showuser',
  templateUrl: './showuser.component.html',
  styleUrls: ['./showuser.component.css']
})



export class ShowuserComponent implements OnInit {

  user: User;
  userInfo: UserInfo;
  type: string;
  typeHigher = 1;
  typeHighest = 1;
  punchInfo = new PunchInfo();
  punchCount = 0;
  date = new Date();
  dateShow = this.date.getFullYear() + '/' + this.date.getUTCMonth() + '/' + this.date.getDate();


  constructor(private http: HttpClient, private dataIntService: DataIntService, private router: Router) {
    this.user = SavedUser.getUser();
   }




  async ngOnInit() {
    await this.getUserinfo().then(data => {
      SavedUser.setUserInfo(data[0]);
    });
    this.userInfo = SavedUser.getUserInfo();
    if (SavedUser.getUserInfo().type === '员工') {
      this.typeHigher = null;
      this.typeHighest = null;
    } else if (SavedUser.getUserInfo().type === '行政') {
      this.typeHighest = null;
    } else {
    }
  }

  logout(): void {
    this.http.get('http://112.74.164.166:3000/logout', {withCredentials: true}).subscribe(data => {
      if (JSON.parse(JSON.stringify(data)).code === '200') {
        alert('注销成功！');
        this.router.navigateByUrl('/login');
      } else {
        alert('注销失败');
      }
    });
  }

  punch() {
    if (this.punchCount === 0) {
      const date: Date = new Date();
      this.punchInfo.begintime = this.dateFormat(date);
      this.punchCount = 1;
      alert('打卡成功！');
      console.log(this.punchInfo.begintime);
    } else {
      const date: Date = new Date();
      this.punchInfo.endtime = this.dateFormat(date);
      this.punchInfo.pid = SavedUser.getUser().pid;
      this.punchCount = 0;
      this.http.post('http://112.74.164.166:3000/punch/user', this.punchInfo,
      {withCredentials: true, headers: {'Content-Type': 'application/json'}}).subscribe(data => {
        if (JSON.parse(JSON.stringify(data)).code === '200') {
          alert('打卡成功！');
        } else {
          alert('打卡失败！');
        }
      });
    }
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

  private getUserinfo() {
    const url = 'http://112.74.164.166:3000/userid/' + this.user.pid;
    return this.http.get<UserInfo>(url, {withCredentials: true}).toPromise();
  }

  getLeaveSelf() {
    this.dataIntService.setFlag(1);
  }

  getOutSelf() {
    this.dataIntService.setFlag(2);
  }

  getPunchSelf() {
    this.dataIntService.setFlag(3);
  }

  newLeaveSelf() {
    this.dataIntService.setFlag(4);
  }

  newOutSelf() {
    this.dataIntService.setFlag(5);
  }

  getLeaveRecord() {
    this.dataIntService.setFlag(6);
  }

  getOutRecord() {
    this.dataIntService.setFlag(7);
  }

  getPunchRecord() {
    this.dataIntService.setFlag(8);
  }

}
