import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router'

import { AppComponentBase } from '@shared/app-component-base';
import { CreateItem2InputDTO, GetItem2OutputDTO, GetItemOutputDTO, GetOreder2OutputDTO, Item2ServiceProxy, Order2ServiceProxy, UserDto, UserServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { DataItemsService } from '../data-items-service';
import { EditItem2Component } from '../edit-item2/edit-item2.component';
import { EditOrder2Items2Component } from '../edit-order2-items2/edit-order2-items2.component';
import { CreateItems2Component } from './create-items2/create-items2.component';
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
      this.items = this.dataItemsService.linesForUpdate =result.items;
      console.log(this.dataItemsService.linesForUpdate )
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
  editItem(id: number): void {
    this.showEditItemDialog(id);
  }
  private showCreateItemDialog(): void {
    let createItemDialog: BsModalRef;
      createItemDialog = this._modalService.show(
        CreateItems2Component,
        {
          class: 'modal-lg',
          initialState: {
            id: this.id,
          },
        }
      );
      createItemDialog.content.onSave.subscribe(() => {
        this.items = this.dataItemsService.linesForUpdate;
        this.notify.info(this.l('SavedSuccessfully'));
        this.UpdateTotalPrice(); 
      });
  }

  private showEditItemDialog(id: number): void {
    let EditItemDialog: BsModalRef;
      EditItemDialog = this._modalService.show(
        EditOrder2Items2Component,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
      EditItemDialog.content.onSave.subscribe(() => {
        this.items = this.dataItemsService.linesForUpdate;
        this.UpdateTotalPrice();
      });
  }
  protected delete(index): void {
    abp.message.confirm(
      this.l('ItemDeleteWarningMessage'),
      undefined,
      (result: boolean) => {
        if (result) {
          this.dataItemsService.deleteItemForEdit(index);
          abp.notify.success(this.l('SuccessfullyDeleted'));
          this.items = this.dataItemsService.linesForUpdate;
          this.UpdateTotalPrice();

        }
      }
    );
  }

  
  save(): void {
    this.saving = true;
    this.dataItemsService.deletedItem.forEach(function(item){ item.id = -item.id });
    this.items = this.dataItemsService.linesForUpdate.concat(this.dataItemsService.deletedItem);
    this.order.items = this.items;
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
        this.dataItemsService.linesForUpdate = [];
        this.dataItemsService.deletedItem = []
        this._router.navigate(['app/view-orders2']);
      });

  }
  
}





