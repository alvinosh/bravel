import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UrlBuilder } from '../../shared/classes/url-builder';
import { QueryStringParameters } from '../../shared/classes/query-string-parameters';
import { Constants } from 'src/app/core/constants';
import { Observable } from 'rxjs';
@Injectable()
export class ApiHttpService {
  constructor(
    // Angular Modules
    private http: HttpClient,
    private constants: Constants
  ) {}
  public get(url: string, options?: any): Observable<any> {
    return this.http.get<any>(url, options);
  }
  public post(url: string, data: any, options?: any): Observable<any> {
    return this.http.post<any>(url, data, options);
  }
  public put(url: string, data: any, options?: any): Observable<any> {
    return this.http.put<any>(url, data, options);
  }
  public delete(url: string, options?: any): Observable<any> {
    return this.http.delete<any>(url, options);
  }

  public createUrl(action: string, isMockAPI: boolean = false): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(
      isMockAPI
        ? this.constants.API_MOCK_ENDPOINT
        : this.constants.API_ENDPOINT,
      action
    );
    return urlBuilder.toString();
  }
  public createUrlWithQueryParameters(
    action: string,
    queryStringHandler?: (queryStringParameters: QueryStringParameters) => void
  ): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(
      this.constants.API_ENDPOINT,
      action
    );
    // Push extra query string params
    if (queryStringHandler) {
      queryStringHandler(urlBuilder.queryString);
    }
    return urlBuilder.toString();
  }
  public createUrlWithPathVariables(
    action: string,
    pathVariables: any[] = []
  ): string {
    let encodedPathVariablesUrl: string = '';
    // Push extra path variables
    for (const pathVariable of pathVariables) {
      if (pathVariable !== null) {
        encodedPathVariablesUrl += `/${encodeURIComponent(
          pathVariable.toString()
        )}`;
      }
    }
    const urlBuilder: UrlBuilder = new UrlBuilder(
      this.constants.API_ENDPOINT,
      `${action}${encodedPathVariablesUrl}`
    );
    return urlBuilder.toString();
  }
}
