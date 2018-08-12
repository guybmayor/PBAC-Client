import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Request} from '../shared/request.model';

@Injectable()
export class PbacService {

  constructor(private http: HttpClient) {
  }

  init(): Observable<any> {
    return this.http.post('//localhost:8080/api/init', null);
  }

  getAllCases(): Observable<any> {
    return this.http.get('//localhost:8080/api/case');
  }

  getCaseActionTypes(caseName: string): Observable<any> {
    return this.http.get('//localhost:8080/api/' + caseName + '/action-type');
  }

  createUser(): Observable<any> {
    return this.http.post('//localhost:8080/api/user', null);
  }

  processRequest(caseName: string, request: Request): Observable<any> {
    console.log(request);
    return this.http.post('//localhost:8080/api/' + caseName + '/request', request);
  }

  getLastProvenanceData(caseName: string): Observable<any> {
    return this.http.get('//localhost:8080/api/' + caseName + '/provenance/last');
  }

  upload(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post('//localhost:8080/api/upload', formData);
  }
}
