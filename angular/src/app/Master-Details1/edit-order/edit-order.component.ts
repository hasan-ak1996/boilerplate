import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { CreateOrderItemComponent } from '../create-order-item/create-order-item.component';
import { EditItemComponent } from '../edit-item/edit-item.component';
import { AppComponentBase } from '@shared/app-component-base';
import { Attachment, GetItemOutputDTO, GetOrederOutputDTO, ItemServiceProxy, OrderServiceProxy, UserDto, UserServiceProxy } from '@shared/service-proxies/service-proxies';
import { OrderService } from '../services/order-service.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent extends AppComponentBase  implements OnInit {
  saving = false;
  order = new GetOrederOutputDTO ();
  items : GetItemOutputDTO[] =[];
  displayedColumns: string[] = ['name', 'price', 'quantity', 'Total Price','actions'];
  displayedColumnsFiles: string[] = ['File Name','actions'];
  users: UserDto[] = [];
  id: number;
  orderFiles : Attachment[] = [];
  filesToEdit = [];
  fileName : string;
  uploadedFile : File;
  fileId : number;
  fileResult : any;
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _OrderService: OrderServiceProxy,
    private _userService: UserServiceProxy,
    public _itemService: ItemServiceProxy,
    public bsModalRef: BsModalRef,
    private _modalService: BsModalService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private orderService : OrderService
  ) { 
    super(injector);
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params: Params) => {
    this.id = params['id']; });
      
    this._OrderService.getOrderById(this.id).subscribe((result) => {
      this.order = result;
      this.orderFiles = result.files;
      console.log(this.orderFiles)
      this.items =result.items;
       });
       this._userService.getAll('',undefined,0,1000).subscribe((result) => {
        this.users = result.items;
      });
      
      
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
    //switch (data.type) {
      //case HttpEventType.Response:
      //, { type: this.fileResult.body.type }
        const downloadedFile = new Blob([this.fileResult.body]);
        element.download =filename;
        element.href = URL.createObjectURL(downloadedFile);
    //}
  });
  }

  public fileChange(element,file) {
    this.uploadedFile = file[0];
    this.fileId = element.id;
    var formData = new FormData();
    formData.append('file' , this.uploadedFile);
    formData.append('id' , this.fileId.toString());
    this.orderService.UpdateFile(formData).subscribe((res) =>{
      this._OrderService.getOrderById(this.id).subscribe((result) => {
        this.notify.info(this.l('Updated Successfully'));
        this.orderFiles = result.files;
         });
    })

   
  }
  public edit(){


  }
  



  save(): void {
    this.saving = true;
    var formData = new FormData();
    Array.from(this.filesToEdit).map((file) => {
      return formData.append('files', file);
    });
    formData.append('Order' , JSON.stringify(this.order));
    this.orderService.UpdateOrder(formData).subscribe((res) => {
      this.notify.info(this.l('SavedSuccessfully'));
      this._router.navigate(['app/view-orders']);
      this.onSave.emit();
    })
  //  this._OrderService
   //   .updateOrder(this.order)
   //   .pipe(
    //    finalize(() => {
    //      this.saving = false;
    //    })
    //  )
    //  .subscribe(() => {
    //    this.notify.info(this.l('SavedSuccessfully'));
    //    this._router.navigate(['app/view-orders']);
    //    this.onSave.emit();
    //  });

  }

}
