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
import { forEach as _forEach, map as _map, result } from 'lodash-es';
import { CreateOrderItemComponent } from '@app/Master-Details1/create-order-item/create-order-item.component';
import { EditItemComponent } from '@app/Master-Details1/edit-item/edit-item.component';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css'],

})
export class CreateOrderComponent extends AppComponentBase
implements OnInit {
  saving = false;
  orderId : number;
  EditItemComponent
  order = new CreateOrderInputDTO ();
  users: UserDto[] = [];
  items : GetItemOutputDTO[] =[];
  @Output() onSave = new EventEmitter<any>();
  
  constructor(
    injector: Injector,
    public _orderService: OrderServiceProxy,
    private _userService: UserServiceProxy,
    private _modalService: BsModalService,
    public _itemService: ItemServiceProxy,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    super(injector);
  }

  ngOnInit(): void {
    this._orderService.getOrderById(this.orderId).subscribe((result) => {
      this.items = result.items;
      this.order.totalPrice = 0;
    });

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
    

  save(): void {
    this.saving = true;
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
        console.log(this.orderId );
        this.router.navigate(['app/view-orders' , this.orderId ]);
      });
  }
  goToViewOrders(){
    this.router.navigate(['app/view-orders']);
  }


}
