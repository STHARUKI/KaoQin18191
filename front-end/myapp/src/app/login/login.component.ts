import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = '考勤登录系统';
  url = '';
  user: User = {
    pid: '',
    password: ''
  };
  isHidden = false;
  constructor(private http: HttpClient, private router: Router) {}
  ngOnInit() {
  }
  login(): void {
    if (!this.user.pid || !this.user.password) {
      alert('请输入账号或密码');
    } else {
      this.http.post('http://112.74.164.166:3000/login', this.user,
      {withCredentials: true, headers: {'Content-Type': 'application/json'}}).subscribe(data => {
      if (JSON.parse(JSON.stringify(data)).code === '200') {
        this.isHidden = true;
        this.url = '/showuser';
        this.router.navigate([this.url], {queryParams: {'pid': this.user.pid}});
      } else {
        alert('登录失败');
      }
    });
    }
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
  getUser(): void {
    const url = 'http://112.74.164.166:3000/judgeLogin';
    this.http.post(url, {}, {withCredentials: true}).subscribe(data => {
    });
  }

}
