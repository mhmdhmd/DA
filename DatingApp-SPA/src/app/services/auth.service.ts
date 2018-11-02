import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AppConfigService } from '../_shared/app-config.service';

@Injectable()
export class AuthService {
  baseUrl =
    AppConfigService.settings.urls.apiUrl +
    AppConfigService.settings.urls.authUrl;

  constructor(private http: HttpClient) {}

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
        }
      })
    );
  }

  register(model: any){
    return this.http.post(this.baseUrl + 'register', model);
  }
}
