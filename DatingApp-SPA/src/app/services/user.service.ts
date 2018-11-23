import { Injectable } from "@angular/core";
import { AppConfigService } from "../_shared/app-config.service";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../_models/user";
import { PaginatedResult } from "../_models/Pagination";
import { map, retry } from "rxjs/operators";
import { Message } from "../_models/message";

@Injectable()
export class UserService {
  baseUrl = AppConfigService.settings.urls.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers(
    page?,
    itemsPerPage?,
    userParams?,
    likesParam?
  ): Observable<PaginatedResult<Array<User>>> {
    const paginatedResult: PaginatedResult<Array<User>> = new PaginatedResult<
      Array<User>
    >();

    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append("pageNumber", page);
      params = params.append("pageSize", itemsPerPage);
    }

    if (userParams != null) {
      params = params.append("minAge", userParams.minAge);
      params = params.append("maxAge", userParams.maxAge);
      params = params.append("gender", userParams.gender);
      params = params.append("orderBy", userParams.orderBy);
    }

    if (likesParam === "Likers") {
      params = params.append("likers", "true");
    }

    if (likesParam === "Likees") {
      params = params.append("likees", "true");
    }

    return this.http
      .get<Array<User>>(this.baseUrl + "users", { observe: "response", params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get("Pagination") != null) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get("Pagination")
            );
          }
          return paginatedResult;
        })
      );
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + "users/" + id);
  }

  updateUser(id: number, user: User) {
    return this.http.put(this.baseUrl + "users/" + id, user);
  }

  setMainPhoto(userId: number, id: number) {
    return this.http.post(
      this.baseUrl + "users/" + userId + "/photos/" + id + "/setMain",
      {}
    );
  }

  deletePhoto(userId: number, id: number) {
    return this.http.delete(this.baseUrl + "users/" + userId + "/photos/" + id);
  }

  sendLike(id: number, recipientId: number) {
    return this.http.post(
      this.baseUrl + "users/" + id + "/like/" + recipientId,
      {}
    );
  }

  getMessages(id: number, page?, itemsPerPage?, messageContainer?) {
    const paginatedResult: PaginatedResult<
      Array<Message>
    > = new PaginatedResult<Array<Message>>();

    let params = new HttpParams();
    params = params.append("MessageContainer", messageContainer);
    if (page != null && itemsPerPage != null) {
      params = params.append("pageNumber", page);
      params = params.append("pageSize", itemsPerPage);
    }

    return this.http
      .get<Array<Message>>(this.baseUrl + "users/" + id + "/messages", {
        observe: "response",
        params
      })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get("Pagination") !== null) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get("Pagination")
            );
          }

          return paginatedResult;
        })
      );
  }

  getMessageThread(id: number, recipientId: number) {
    return this.http.get<Array<Message>>(
      this.baseUrl + "users/" + id + "/messages/thread/" + recipientId
    );
  }

  sendMessage(id: number, message: Message) {
    return this.http.post(this.baseUrl + "users/" + id + "/messages", message);
  }

  deleteMessage(id: number, userId: number) {
    return this.http.post(
      this.baseUrl + "users/" + userId + "/messages/" + id,
      {}
    );
  }

  markAsRead(userId: number, messageId: number) {
    this.http
      .post(
        this.baseUrl + "users/" + userId + "/messages/" + messageId + "/read",
        {}
      )
      .subscribe();
  }
}
