import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router'
import { CreateOrderItemComponent } from '@app/Master-Details1/create-order-item/create-order-item.component';
import { EditItemComponent } from '@app/Master-Details1/edit-item/edit-item.component';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateItem2InputDTO, GetItem2OutputDTO, GetItemOutputDTO, GetOreder2OutputDTO, Item2ServiceProxy, Order2ServiceProxy, UserDto, UserServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { DataItemsService } from '../data-items-service';
@Component({
  selector: 'app-edit-order2',
  templateUrl: './edit-order2.component.html',
  styleUrls: ['./edit-order2.component.css']
})
export class EditOrder2Component  extends AppComponentBase  implements OnInit {
  order = new GetOreder2OutputDTO ();
  saving = false;
  items : GetItem2OutputDTO[] =[];
  id: number;
  users: UserDto[] = [];
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _Order2Service: Order2ServiceProxy,
    private _userService: UserServiceProxy,
    public bsModalRef: BsModalRef,
    public _item2Service: Item2ServiceProxy,
    private _modalService: BsModalService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    public dataItemsService : DataItemsService,
  ) { 
    super(injector);
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id']; });
    
    this._Order2Service.getOrderById(this.id).subscribe((result) => {
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
  editItem(item: GetItem2OutputDTO): void {
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
        this._Order2Service.getOrderById(this.id).subscribe((result) => {
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
        this._Order2Service.getOrderById(this.id).subscribe((result) => {
          this.items = result.items;
          this.UpdateTotalPrice();
        }); 
      });
  }
  protected delete(item: GetItem2OutputDTO): void {
    abp.message.confirm(
      this.l('ItemDeleteWarningMessage', item.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._item2Service.deleteItem(item.id , null).subscribe(() => {
            this._Order2Service.getOrderById(this.id).subscribe((result) => {
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
    this._Order2Service
      .updateOrder(this.order)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.onSave.emit();
        this._router.navigate(['app/view-orders2']);
      });

  }


}
