import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { CreateOrderItemComponent } from '../create-order-item/create-order-item.component';
import { EditItemComponent } from '../edit-item/edit-item.component';
import { AppComponentBase } from '@shared/app-component-base';
import { GetItemOutputDTO, GetOrederOutputDTO, ItemServiceProxy, OrderServiceProxy, UserDto, UserServiceProxy } from '@shared/service-proxies/service-proxies';

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
  users: UserDto[] = [];
  id: number;
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _OrderService: OrderServiceProxy,
    private _userService: UserServiceProxy,
    public _itemService: ItemServiceProxy,
    public bsModalRef: BsModalRef,
    private _modalService: BsModalService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) { 
    super(injector);
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params: Params) => {
    this.id = params['id']; });
      
    this._OrderService.getOrderById(this.id).subscribe((result) => {
      this.order = result; 
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


  save(): void {
    this.saving = true;
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
