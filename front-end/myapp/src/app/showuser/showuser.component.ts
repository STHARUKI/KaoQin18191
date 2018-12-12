
import { PunchInfo } from './../punchinfo';
import { UserInfo } from './../userinfo';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-showuser',
  templateUrl: './showuser.component.html',
  styleUrls: ['./showuser.component.css']
})


export class ShowuserComponent implements OnInit {

  pid = '';

  userInfo: UserInfo;
  type: string;
  punchInfo = new PunchInfo();
  punchCount = 0;


  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) { }



  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(param => {
      this.pid = param['pid'];
    });
  }

  private getUserinfo(): Promise<UserInfo> {
    const url = 'http://112.74.164.166:3000/userid/' + this.pid;
    return this.http.get<UserInfo>(url, {withCredentials: true}).toPromise();
  }

  private async  getType(): Promise<string> {
    this.userInfo = await this.getUserinfo();
    console.log(this.userInfo[0]);
    return this.userInfo[0].type;
  }

  logout(): void {
    this.http.get('http://112.74.164.166:3000/logout', {withCredentials: true}).subscribe(data => {
      if (JSON.parse(JSON.stringify(data)).code === '200') {
        alert('注销成功！');
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
      this.punchInfo.pid = this.pid;
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



}
