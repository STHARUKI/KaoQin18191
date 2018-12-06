import { User } from './user';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = '考勤登录系统';
  pswd = '';
  user: User = {
    pid: '',
    password: ''
  };
  constructor(private http: HttpClient) {}
  ngOnInit() {
  }
  login(): void {
    this.http.post('http://112.74.164.166:3000/login', this.user,
    {withCredentials: true, headers: {'Content-Type': 'application/json'}}).subscribe(data => {
      if (JSON.parse(JSON.stringify(data)).code === '200') {
        alert('登陆成功！');
      } else {
        alert('登录失败');
      }
    });
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
    this.http.get('http://112.74.164.166:3000/userid', {withCredentials: true}).subscribe(data => {

    });
  }
}
