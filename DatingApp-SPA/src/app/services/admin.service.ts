import { Injectable } from "@angular/core";
import { AppConfigService } from "../_shared/app-config.service";
import { HttpClient } from "@angular/common/http";
import { User } from "../_models/user";

@Injectable({
  providedIn: "root"
})
export class AdminService {
  baseUrl = AppConfigService.settings.urls.apiUrl;

  constructor(private http: HttpClient) {}

  getUsersWithRoles() {
    return this.http.get(this.baseUrl + "admin/userWithRoles");
  }

  updateUserRoles(user: User, roles: {}) {
    return this.http.post(
      this.baseUrl + "admin/editRoles/" + user.userName,
      roles
    );
  }
}
