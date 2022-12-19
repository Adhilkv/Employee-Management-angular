import { Component } from '@angular/core';
import { BasicAuthenticationService } from '../service/http/basic-authentication.service';
import { UserDataService } from '../service/data/user-data.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UploadFileService } from '../service/user/upload-file.service';


export class AuthenticatedUser {
  
  constructor(public userName: string,public firstName: string,public lastName: string,public password: string,public department: string,public createdDate: Date,public role: string) 
   { 

   }
}


@Component({
  selector: 'app-user-files',
  templateUrl: './user-files.component.html',
  styleUrls: ['./user-files.component.css']
})
export class UserFilesComponent {

  AuthenticatedUserData : AuthenticatedUser = <AuthenticatedUser>{ };
  message:string = ''
  AuthenticatedUser : any = '';

  selectedFiles: FileList | any = null;
  currentFile: File | any = null;
  progress : number = 0 ;
  Uploadmessage : string= '';

  fileInfos: Observable<any>;

  blob : Blob

  constructor(private basicAuthenticationService:BasicAuthenticationService,private UserDataService : UserDataService,private uploadService:UploadFileService)
  {}

  ngOnInit()
  {
    this.getData();
  }

  getData()
  {
    this.AuthenticatedUser = this.basicAuthenticationService.getAuthenticatedUser()
    this.UserDataService.retriveUser().subscribe( response => {
    this.AuthenticatedUserData = response;
    this.fileInfos = this.uploadService.getFiles();})
  }

  selectFile(event : any) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress = 0;
  
    this.currentFile = this.selectedFiles.item(0)!;
    this.uploadService.upload(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total!);
        } else if (event instanceof HttpResponse) {
          this.progress = 0
          this.Uploadmessage = event.body.Uploadmessage;
          this.fileInfos = this.uploadService.getFiles();
          this.currentFile = null;
          this.Uploadmessage = 'Upload Success';
        }
      },
      err => {
        this.progress = 0;
        this.Uploadmessage = 'Could not upload the file!';
        this.currentFile = null;
      });

    this.selectedFiles = null;
  }

  
  deleteFile(id:string)
  {
    this.uploadService.deleteFileDB(id).subscribe(
      event => {
        console.log(event);
        this.message = ' Deleted User';
       this.fileInfos = this.uploadService.getFiles();
      },
      err => {
        
      });
  }

  DownloadFile(id : string,name:any)
  {
    this.uploadService.DownloadFileDB(id).subscribe((data : any) => {
      this.blob = new Blob([data]);
      var downloadURL = window.URL.createObjectURL(data);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = name;
      link.click();
    });  
  }
  

}
