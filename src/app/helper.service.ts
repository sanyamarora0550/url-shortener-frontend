import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private http: HttpClient) { }

  getUrl(json: any): Promise<any> {
    return this.http.post('https://lil-ly.herokuapp.com/api/v1/url/get-short-url', json).toPromise();
  }
}
