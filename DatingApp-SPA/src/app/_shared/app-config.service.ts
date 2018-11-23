import { Injectable, APP_INITIALIZER } from "@angular/core";
import { IAppConfig } from "./app-config";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable()
export class AppConfigService {
  static settings: IAppConfig;

  constructor(private http: HttpClient) {}

  load() {
    const jsonFile = `assets/config/config.${environment.configName}.json`;
    return new Promise<void>((resolve, reject) => {
      this.http
        .get(jsonFile)
        .toPromise()
        .then(response => {
          AppConfigService.settings = <IAppConfig>response;
          resolve();
        })
        .catch((response: any) => {
          reject(
            `Could not load file '${jsonFile}': ${JSON.stringify(response)}`
          );
        });
    });
  }
}

export function ConfigFactory(config: AppConfigService) {
  return () => config.load();
}

export const AppConfigServiceProvider = {
  provide: APP_INITIALIZER,
  useFactory: ConfigFactory,
  deps: Array(AppConfigService),
  multi: true
};
