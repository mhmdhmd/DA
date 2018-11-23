import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { UserService } from "../services/user.service";
import { AlertifyService } from "../services/alertify.service";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "../services/auth.service";
import { Message } from "../_models/message";

@Injectable()
export class MessagesResolver implements Resolve<Array<Message>> {
  pageNubmer = 1;
  pageSize = 5;
  messageContainer = "Unread";

  constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService,
    private authService: AuthService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Array<Message>> {
    return this.userService
      .getMessages(
        this.authService.decodedToken.nameid,
        this.pageNubmer,
        this.pageSize,
        this.messageContainer
      )
      .pipe(
        catchError(error => {
          this.alertify.error("Problem retrieving messages");
          this.router.navigate(Array("/home"));
          return of(null);
        })
      );
  }
}
