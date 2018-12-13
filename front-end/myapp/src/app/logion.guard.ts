import { SavedUser } from './saveduser';
import { Res } from './res';

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of as observableOf } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LogionGuard implements CanActivate {

  isLogin: boolean;
  res: Res = {
    code: '',
    msg: ''
  };
  constructor(private router: Router, private http: HttpClient) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
      this.res = await this.getData();
      if (SavedUser.getUser()) {
        if (this.res.code === '200') {
          this.isLogin = true;
        } else {
          alert('请登录！');
          this.isLogin = false;
          this.router.navigateByUrl('/login');
        }
      } else {
        alert('登录已过期。请重新登录！');
          this.isLogin = false;
          this.router.navigateByUrl('/login');
      }
      return this.isLogin;
  }

  getData(): Promise<Res> {
    const url = 'http://112.74.164.166:3000/judgeLogin';
    return this.http.post<Res>(url, {}, {withCredentials: true}).toPromise();
  }

}
