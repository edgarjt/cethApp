import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HomeService
{
  api: string;

  constructor(private http: HttpClient)
  {
    this.api = environment.apiUrl + '/api/mobile/products/search/';
  }

  getUsersVendors(): Observable<any> {
    return this.http.get(this.api + '7501058620002');
  }
}
