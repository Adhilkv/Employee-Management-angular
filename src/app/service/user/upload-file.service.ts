import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app.constants';
import { BasicAuthenticationService } from '../http/basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http: HttpClient,private basicAuthenticationService : BasicAuthenticationService) { }


  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${API_URL}/users/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${API_URL}/users/files`);
  }

  deleteFileDB(id : string)
  {
    return this.http.delete(`${API_URL}/users/delete/${id}`);
  }

  DownloadFileDB(id:string) {
    return this.http.get(`${API_URL}/users/files/${id}`, { responseType: 'blob' });
  }
  

 

}
