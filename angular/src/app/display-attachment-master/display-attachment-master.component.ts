import { HttpClient, HttpEventType, HttpRequest } from '@angular/common/http';
import { Component ,forwardRef} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'display-attachment-master',
  templateUrl: './display-attachment-master.component.html',
  styleUrls: ['./display-attachment-master.component.css'],
  providers: [     
    {       provide: NG_VALUE_ACCESSOR, 
            useExisting: forwardRef(() => DisplayAttachmentMasterComponent),
            multi: true     
    } 
  ]
})
export class DisplayAttachmentMasterComponent implements ControlValueAccessor {
  onChange: any = () => {}
  onTouch: any = () => {}
  folderId;
  fileResult;

  constructor( public http : HttpClient ) { }
  ngOnInit(): void {
  }
  public GetFileFromFolder(id: number){
    return this.http.request(new HttpRequest(
  'GET',
  `http://localhost:21021/OrdersFile/GetFileFromFolder/${id}`,
  null,
  {
    responseType: 'blob'
  }
));
  }

 

  set value(val){
    if( val !== undefined && this.folderId !== val && val != null && val != ""){
    this.folderId = val
    this.onChange(val)
    this.onTouch(val);
    console.log(val);

    this.GetFileFromFolder(this.folderId).subscribe((data) => {
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
