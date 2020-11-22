import {
   Component,
   Injector,
   OnInit,
   EventEmitter,
   Output,
   } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import {
  OrderServiceProxy,
  ItemServiceProxy,
  CreateOrderInputDTO,
  GetItemOutputDTO,
  UserDto,
  UserServiceProxy,
  
} from '@shared/service-proxies/service-proxies';
import { FileValidator } from 'ngx-material-file-input';
import { forEach as _forEach, map as _map, result } from 'lodash-es';
import { CreateOrderItemComponent } from '@app/Master-Details1/create-order-item/create-order-item.component';
import { EditItemComponent } from '@app/Master-Details1/edit-item/edit-item.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { observable } from 'rxjs';
import { OrderService } from '../services/order-service.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { parse } from 'path';
import { Moment } from 'moment-timezone';
import * as moment from 'moment-timezone';

@Component({
  
  selector: 'create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css'],

})
export class CreateOrderComponent extends AppComponentBase
implements OnInit {
  saving = false;
  orderId : number;
  filesToUpload  : File[];
  order = new CreateOrderInputDTO ();
  users: UserDto[] = [];
  items : GetItemOutputDTO[] =[];
  orderResult : any;
  file  ;
  t : boolean ;
  time :Moment ;
  registerForm : FormGroup;
  MinFilesCount : number =2 ;
  MaxFilesCount :number = 4;
  isValidFormSubmitted = null;
  readonly maxSize = 104857600;
  
  
  @Output() onSave = new EventEmitter<any>();
  
  constructor(
    injector: Injector,
    public _orderService: OrderServiceProxy,
    private _userService: UserServiceProxy,
    private _modalService: BsModalService,
    public _itemService: ItemServiceProxy,
    public http : HttpClient,
    private router: Router,
    private orderService : OrderService,
    private formBuilder : FormBuilder
    
  ) { 
    super(injector);
  }

  ngOnInit(): void {
    this._orderService.getOrderById(this.orderId).subscribe((result) => {
      
      
      this.items = result.items;
      this.order.totalPrice = 0;
    });
        

    this.registerForm = this.formBuilder.group({
      'name' :new FormControl('',[
        Validators.required
      ]), 
      'orderNo' :new FormControl('',[
        Validators.required
      ]),
      'empolyeeName' :new FormControl('',[
        Validators.required
      ]),
      'totalPrice' :new FormControl(''),
      'file' :new FormControl('',[
        Validators.required , Validators.minLength(2)
      ]),
      'datetime' :new FormControl('',[
        Validators.required
      ]),
      'isSubmit' :new FormControl(''),
      
    });
    console.log(this.registerForm)

    this._userService.getAll('',undefined,0,1000).subscribe((result) => {
      this.users = result.items;
    });
    
  }

  


  createItem(): void {
    this.showCreateItemDialog();
  }
  editItem(item: GetItemOutputDTO): void {
    this.showEditItemDialog(item.id);
  }
  protected delete(item: GetItemOutputDTO): void {
    abp.message.confirm(
      this.l('ItemDeleteWarningMessage', item.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._itemService.deleteItem(item.id , null).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));

            this._orderService.getOrderById(this.orderId).subscribe((result) => {
              this.items = result.items;
              this.UpdateTotalPrice()
            }); 
          });
        }
      }
    );
  }

  private showCreateItemDialog(): void {
    let createItemDialog: BsModalRef;
      createItemDialog = this._modalService.show(
        CreateOrderItemComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: this.orderId,
          },
        }
      );
      createItemDialog.content.onSave.subscribe(() => {
        this._orderService.getOrderById(this.orderId).subscribe((result) => {
          this.items = result.items;
          this.UpdateTotalPrice()
        }); 
      });
  }
  UpdateTotalPrice(){
    this.order.totalPrice = this.items.reduce((prev,curr) => {
      return prev + curr.totalPrice;
    },0);
    this.order.totalPrice = parseInt((this.order.totalPrice).toFixed(2));
  }

  private showEditItemDialog(id: number): void {
    let EditItemDialog: BsModalRef;
      EditItemDialog = this._modalService.show(
        EditItemComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
            orderId : this.orderId
          },
        }
      );
      EditItemDialog.content.onSave.subscribe(() => {
        this._orderService.getOrderById(this.orderId).subscribe((result) => {
          this.items = result.items;
        }); 
      });
  }
  public fileChange(files) {
    console.log(this.file.files);
    this.filesToUpload  = files;
    console.log(this.filesToUpload )
    let FilesCounts = this.filesToUpload.length;
    this.t =this.test(FilesCounts);
    console.log(this.t);
    console.log(FilesCounts)

  }
  public test(filecount : number) : boolean {
    if (filecount = this.MinFilesCount){
      return true;
    }else{
      return false;
    }
  }
  

  save(): void {
    this.isValidFormSubmitted = false;
     if (this.registerForm.invalid) {
        return;
     }
     this.isValidFormSubmitted = true;
    this.saving = true;
    var formData = new FormData();
    this.filesToUpload = this.file._files;
    if(this.filesToUpload == null){
        formData.append('files', null);
    }else{
      Array.from(this.filesToUpload).map((file) => {
        return formData.append('files', file);
      });
    }
    
    //formData.append('Order' , JSON.stringify(this.order));
    this.orderService.CreateOrder(formData).subscribe(res => {
      this.orderResult = res;
      this.order.attachmentMasterId = this.orderResult.result.id;
      this.order.name = this.registerForm.get('name').value;
      this.order.orderNo = this.registerForm.get('orderNo').value;
      this.order.empolyeeName = this.registerForm.get('empolyeeName').value;
  
     
     //var date = new Date(this.registerForm.get('datetime').value + " UTC");
     //console.log(date);
     //date.setMinutes(date.getMinutes() - 0);
     //console.log(date)
     //this.time = this.registerForm.get('datetime').value;
      this.order.orderDate = this.registerForm.get('datetime').value;
      console.log(this.order.orderDate )
     //console.log(this.time)


     // this.order.creationTime = new Date(date.toLocaleString());
      if(this.registerForm.get('isSubmit').value == false){
        this.order.isSubmit = false
      }else{
        this.order.isSubmit = this.registerForm.get('isSubmit').value;
      }
      
        this._orderService
          .createOrder(this.order)
          .pipe(
            finalize(() => {
              this.saving = false;
            })
        )
          .subscribe((result) => {
            this.notify.info(this.l('SavedSuccessfully'));
            this.onSave.emit();
            
            this.orderId = result.id;
            this.router.navigate(['app/view-orders' , this.orderId ]);
          });
      this.onSave.emit();
     // this.orderId =this.orderResult.result.id;
     // this.router.navigate(['app/view-orders' , this.orderId ]);
    });
    //this.http.post("http://localhost:21021/OrdersFile/Create",formData).subscribe(result => {});


  }
  goToViewOrders(){
    this.router.navigate(['app/view-orders']);
  }


}
