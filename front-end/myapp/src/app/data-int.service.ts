import { Observable, of, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataIntService {


  private flag = new Subject<number>();

  constructor() { }


  public setFlag(_flag: number) {
    this.flag.next(_flag);
  }

  public getFlag(): Observable<number> {
    return this.flag.asObservable();
  }
}
