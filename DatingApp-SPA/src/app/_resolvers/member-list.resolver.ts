import { Injectable } from "@angular/core";
import { User } from "../_models/user";
import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { UserService } from "../services/user.service";
import { AlertifyService } from "../services/alertify.service";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class MemberListResolver implements Resolve<Array<User>> {
  pageNubmer = 1;
  pageSize = 5;

  constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Array<User>> {
    return this.userService.getUsers(this.pageNubmer, this.pageSize).pipe(
      catchError(error => {
        this.alertify.error("Problem retrieving data");
        this.router.navigate(Array("/home"));
        return of(null);
      })
    );
  }
}
