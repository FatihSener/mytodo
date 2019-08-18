import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import {MyTodoItem} from '../models/mytodo-item';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { ObservableInput } from 'rxjs/Observable';


@Injectable()
export class MyTodoItemService {

  constructor(private http: Http) { }

  private baseUrl = '/api/v1/mytodo-item';

  saveMyTodoItem(mytodoItem: MyTodoItem): Observable<MyTodoItem> {
    return this.http.post(this.baseUrl, mytodoItem)
      .map((res: Response)=>res.json());
  }

  getMyTodoItems(): Observable<MyTodoItem[]> {
    return this.http.get(this.baseUrl)
      .map((res: Response) => res.json());
  }

  deleteMyTodoItem(mytodoItem: MyTodoItem) :Observable<any> {
    return this.http.delete(this.baseUrl + "/" + mytodoItem.id).map(this.extractData);
  }

  updateMyTodoItem(mytodoItem: MyTodoItem): Observable<MyTodoItem> {
    return this.http.put(this.baseUrl + "/" + mytodoItem.id, mytodoItem)
      .map((res: Response)=>res.json());
  }

  private extractData(res: Response) {
    return res.text().length ? res.json() : {};
}
}