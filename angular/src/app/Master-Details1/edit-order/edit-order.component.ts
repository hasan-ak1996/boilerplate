import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { CreateOrderItemComponent } from '../create-order-item/create-order-item.component';
import { EditItemComponent } from '../edit-item/edit-item.component';
import { AppComponentBase } from '@shared/app-component-base';
import { AttachmentDetail, AttachmentMasterDTO, AttachmentMasterServiceProxy, GetItemOutputDTO, GetOrederOutputDTO, ItemServiceProxy, OrderServiceProxy, UserDto, UserServiceProxy } from '@shared/service-proxies/service-proxies';
import { OrderService } from '../services/order-service.service';
import { HttpEventType } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FileValidator } from 'ngx-material-file-input';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent extends AppComponentBase  implements OnInit {
  saving = false;
  order = new GetOrederOutputDTO ();
  items : GetItemOutputDTO[] =[];
  displayedColumns: string[] = ['name', 'price', 'quantity', 'Total Price','Actions'];
  displayedColumnsFiles: string[] = ['File Name','Actions'];
  users: UserDto[] = [];
  id: number;
  orderFiles  = [];
  attachment = new AttachmentMasterDTO ();
  filesToEdit = [];
  fileName : string;
  uploadedFile : File;
  fileId : number;
  fileResult : any;
  file ;
  attachmentDetailId;
  attachmentMasterId
  attachmentId : number;
  myForm : FormGroup ;
  readonly maxSize = 5242880;
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _OrderService: OrderServiceProxy,
    public _AttachmentMasterService : AttachmentMasterServiceProxy,
    private _userService: UserServiceProxy,
    public _itemService: ItemServiceProxy,
    public bsModalRef: BsModalRef,
    private _modalService: BsModalService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private orderService : OrderService,
    private _fb: FormBuilder
  ) { 
    super(injector);
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params: Params) => {
    this.id = params['id']; });
    this.myForm = this._fb.group({
      file : new FormControl('', 
        [FileValidator.maxContentSize(this.maxSize)]
      )
      
    })
      
    this._OrderService.getOrderById(this.id).subscribe((result) => {
      this.order = result;
      this.items =result.items;
      this.attachmentId = result.attachmentMasterId;
      this._AttachmentMasterService.getFolderById(result.attachmentMasterId).subscribe((result) => {
        this.attachment = result;
        this.orderFiles = result.files;
        console.log(this.orderFiles)

      })
       });


       this._userService.getAll('',undefined,0,1000).subscribe((result) => {
        this.users = result.items;
      });

      console.log(this.myForm.get('file').hasError('maxContentSize'))
      
      
  }
  UpdateTotalPrice(){
    this.order.totalPrice = this.items.reduce((prev,curr) => {
      return prev + curr.totalPrice;
    },0);
    this.order.totalPrice = parseInt((this.order.totalPrice).toFixed(2));
  }


  createItem(): void {
    this.showCreateItemDialog();
  }
  editItem(item: GetItemOutputDTO): void {
    this.showEditItemDialog(item.id);
  }

  private showCreateItemDialog(): void {
    let createItemDialog: BsModalRef;
      createItemDialog = this._modalService.show(
        CreateOrderItemComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: this.id,
          },
        }
      );
      createItemDialog.content.onSave.subscribe(() => {
        this._OrderService.getOrderById(this.id).subscribe((result) => {
          this.items = result.items;
          this.UpdateTotalPrice();
        }); 
      });
  }

  private showEditItemDialog(id: number): void {
    let EditItemDialog: BsModalRef;
      EditItemDialog = this._modalService.show(
        EditItemComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
            orderId : this.id
          },
        }
      );
      EditItemDialog.content.onSave.subscribe(() => {
        this._OrderService.getOrderById(this.id).subscribe((result) => {
          this.items = result.items;
          this.UpdateTotalPrice();
        }); 
      });
  }

  protected delete(item: GetItemOutputDTO): void {
    abp.message.confirm(
      this.l('ItemDeleteWarningMessage', item.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._itemService.deleteItem(item.id , null).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));

            this._OrderService.getOrderById(this.id).subscribe((result) => {
              this.items = result.items;
              this.UpdateTotalPrice();
            }); 
          });
        }
      }
    );
  }
 public downloadFile(element,filename){
  this.orderService.DownloadFile(filename).subscribe((data) => {
    this.fileResult = data;
    switch (data.type) {
      case HttpEventType.Response:
      //, { type: this.fileResult.body.type }
        const downloadedFile = new Blob([this.fileResult.body], { type: this.fileResult.body.type });
        console.log(downloadedFile.type);
        element.download =filename;
        console.log(URL.createObjectURL(downloadedFile))
        element.href = URL.createObjectURL(downloadedFile);
    }
  });
  }

  public fileChange(r,element,file) {
    this.uploadedFile = file[0];
    if(!this.myForm.get('file').hasError('maxContentSize')){
      this.fileId = element.id;
      var formData = new FormData();
      formData.append('file' , this.uploadedFile);
      formData.append('id' , this.fileId.toString());
      this.orderService.UpdateFile(formData).subscribe((res) =>{

           this._AttachmentMasterService.getFolderById(this.attachmentId).subscribe((result) => {
            this.attachment = result;
            this.orderFiles = result.files;
            this.notify.info(this.l('Updated Successfully'));
            r.clear();
    
          })
      })

    }

  }

  



  save(): void {
    this.saving = true;
  //  var formData = new FormData();
  //  Array.from(this.filesToEdit).map((file) => {
  //    return formData.append('files', file);
  //  });
  //  formData.append('Order' , JSON.stringify(this.order));

  //  this.orderService.UpdateOrder(formData).subscribe((res) => {
  //    this.notify.info(this.l('SavedSuccessfully'));
  //    this._router.navigate(['app/view-orders']);
  //    this.onSave.emit();
  //  })
    this._OrderService
      .updateOrder(this.order)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(() => {
       this.notify.info(this.l('SavedSuccessfully'));
        this._router.navigate(['app/view-orders']);
        this.onSave.emit();
      });

  }

}
