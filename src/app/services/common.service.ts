import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  api = environment.api
  constructor(
    private _HttpClient: HttpClient
  ) { }

  post(route, body = {}, params = {}) {
    return this._HttpClient.post(`${this.api}${route}`, body, { params })
  }

  get(route, params = {}) {
    return this._HttpClient.post(`${this.api}${route}`, { params })
  }

}
