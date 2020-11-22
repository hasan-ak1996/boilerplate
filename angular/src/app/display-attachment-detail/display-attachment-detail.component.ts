import { HttpClient, HttpEventType, HttpRequest } from '@angular/common/http';
import { Component ,forwardRef} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'display-attachment-detail',
  templateUrl: './display-attachment-detail.component.html',
  styleUrls: ['./display-attachment-detail.component.css'],
  providers: [     
    {       provide: NG_VALUE_ACCESSOR, 
            useExisting: forwardRef(() => DisplayAttachmentDetailComponent),
            multi: true     
    } 
  ]
})
export class DisplayAttachmentDetailComponent implements ControlValueAccessor {
  fileResult;
  constructor(public http : HttpClient) { }

  ngOnInit(): void {
  }
  onChange: any = () => {}
  onTouch: any = () => {}
  fileId;

  public GetFile(id: number){
    return this.http.request(new HttpRequest(
  'GET',
  `http://localhost:21021/OrdersFile/GetFile/${id}`,
  null,
  {
    responseType: 'blob'
  }
));
  }

  set value(val){
    if( val !== undefined && this.fileId !== val && val !== null && val !== "")
    {
    this.fileId = val
    this.onChange(val)
    this.onTouch(val)
    console.log(this.fileId);
    this.GetFile(this.fileId).subscribe((data) => {
      this.fileResult = data;
      switch (data.type) {
        case HttpEventType.Response:
        //, { type: this.fileResult.body.type }
          const downloadedFile = new Blob([this.fileResult.body], { type: this.fileResult.body.type });
          console.log(downloadedFile.type);
          if(downloadedFile.type.startsWith("image"))
          {
              const a = document.createElement('a');
              a.setAttribute('style', 'display:none;');
              document.body.appendChild(a);
              a.href = URL.createObjectURL(downloadedFile);
              a.target = '_blank';
              a.click();
              document.body.removeChild(a);
          }else{break;}

        //  element.download =filename;
          console.log(URL.createObjectURL(downloadedFile))
          //element.href = URL.createObjectURL(downloadedFile);
     }
    });
    }
  }


  writeValue(value: any): void {
    this.value = value
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }



}
