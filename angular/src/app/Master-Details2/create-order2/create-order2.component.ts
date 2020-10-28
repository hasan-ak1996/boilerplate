import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditItem2Component } from '@app/Master-Details2/edit-item2/edit-item2.component';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateItem2InputDTO, CreateOrder2InputDTO, Order2ServiceProxy, UserDto, UserServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { CreateItem2Component } from '../create-item2/create-item2.component';
import { DataItemsService } from '../data-items-service';

@Component({
  selector: 'app-create-order2',
  templateUrl: './create-order2.component.html',
  styleUrls: ['./create-order2.component.css']
})
export class CreateOrder2Component extends AppComponentBase
 implements OnInit {
  saving = false;
  order = new CreateOrder2InputDTO ();
  items2 : CreateItem2InputDTO[] = [];
  users: UserDto[] = [];
  displayedColumns: string[] = ['name', 'price', 'quantity', 'Total Price','actions'];
  @Output() onSave = new EventEmitter<any>();
  constructor(injector: Injector,
    public _orderService: Order2ServiceProxy,
    private _userService: UserServiceProxy,
    private _modalService: BsModalService,
    public dataItemsService : DataItemsService,
    private router: Router,
    private route: ActivatedRoute) {
      super(injector);
     }

  ngOnInit(): void {
    this._userService.getAll('',undefined,0,1000).subscribe((result) => {
    this.users = result.items;
    });
  }

  UpdateTotalPrice(){
    this.order.totalPrice = this.items2.reduce((prev,curr) => {
      return prev + curr.totalPrice;
    },0);
    this.order.totalPrice = parseInt((this.order.totalPrice).toFixed(2));
  }
  createItem(): void {
    this.showCreateItemDialog();
  }
  private showCreateItemDialog(): void {
    let createOrEditItemDialog: BsModalRef;
      createOrEditItemDialog = this._modalService.show(
        CreateItem2Component,
        {
          class: 'modal-lg',
        }
      );
    
    createOrEditItemDialog.content.onSave.subscribe(() => {
       this.items2 =  this.dataItemsService.lines;
       this.UpdateTotalPrice()
    });
  }

    editItem(id :number): void {
    this.showEditItemDialog(id);
  }

  private showEditItemDialog(id: number): void {
    let createOrEditItemDialog: BsModalRef;
      createOrEditItemDialog = this._modalService.show(
        EditItem2Component,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    
    createOrEditItemDialog.content.onSave.subscribe(() => {
      this.items2 =  this.dataItemsService.lines;
      this.UpdateTotalPrice()
    });
    

  }
  protected delete(index){
    abp.message.confirm(
      this.l('ItemDeleteWarningMessage'),
      undefined,
      (result: boolean) => {
        if (result) {
          this.dataItemsService.deleteItem(index);
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.items2 =  this.dataItemsService.lines;
            this.UpdateTotalPrice();
        }
      }
    );
  }
  goToViewOrders(){
    this.router.navigate(['app/view-orders2']);
  }
  save(): void {
    this.order.items = this.dataItemsService.lines ;
    this.saving = true;
    this._orderService
      .createOrder(this.order)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.onSave.emit();
        this.router.navigate(['app/view-orders2']);
        this.dataItemsService.lines =[];
      });
  }

}
