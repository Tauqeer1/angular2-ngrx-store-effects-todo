import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';

import 'rxjs/add/operator/map';

type customServerResponseObject = { 'success': boolean, 'data': any, 'error': any };

@Injectable()
export class HttpService {

  static api: string = 'https://todo-backend-express.herokuapp.com';

  constructor(public http: Http) {}

  GetHeaders() {
    let headers: Headers = new Headers();
    headers.append('Content-Type', 'text/plain');
    let options: RequestOptions = new RequestOptions();
    options.headers = headers;
    return options;
  }

  ResponseMap(res: Response): customServerResponseObject {
    // console.log(res);
    let response: customServerResponseObject = res.json();
    if (response.hasOwnProperty('success')) {
      return response;
    } else {
      return {
        success: false,
        data: null,
        error: response
      };
    }
  }

  GetRequest(url: string) {
    // return this.http.get(url).map(this.ResponseMap);
    return this.http.get(url);
  }

  PostRequest(url: string, obj: Object) {
    console.log(obj)
    // return this.http.post(url, JSON.stringify(obj), this.GetHeaders()).map(this.ResponseMap);
    return this.http.post(url, JSON.stringify(obj), this.GetHeaders());
  }

  PutRequest(url: string, obj: Object) {
    // return this.http.put(url, JSON.stringify(obj), this.GetHeaders()).map(this.ResponseMap);
    return this.http.put(url, JSON.stringify(obj), this.GetHeaders());
  }

  DeleteRequest(url: string) {
    // return this.http.delete(url).map((this.ResponseMap));
    return this.http.delete(url);
  }

}