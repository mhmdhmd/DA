import { Injectable } from "@angular/core";
import { AppConfigService } from "../_shared/app-config.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../_models/user";


@Injectable()
export class UserService {
  baseUrl = AppConfigService.settings.urls.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'users');
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  } 
}
