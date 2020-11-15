import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor( public http : HttpClient) { }

  public CreateOrder (data: FormData){
    return this.http.post("http://localhost:21021/OrdersFile/Create",data);
  }
  public UpdateOrder(data: FormData){
    return this.http.post("http://localhost:21021/OrdersFile/Edit",data);
  }
  public DownloadFile(fileName: string){
      return this.http.request(new HttpRequest(
    'GET',
    `http://localhost:21021/OrdersFile/Download?fileName=${fileName}`,
    null,
    {
      responseType: 'blob'
    }
  ));


  }
  public UpdateFile(data : FormData){
    return this.http.post("http://localhost:21021/OrdersFile/EditFile",data);
  }

  //return this.http.request(new HttpRequest(
    //'GET',
   // `http://localhost:21021/OrdersFile/Download?fileName=${fileName}`,
   // null,
    //{
     // reportProgress: true,
     // responseType: 'blob'
   // }
  //));
}
