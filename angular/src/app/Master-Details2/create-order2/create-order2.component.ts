import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditItem2Component } from '@app/Master-Details2/edit-item2/edit-item2.component';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateItem2InputDTO, CreateOrder2InputDTO, Order2ServiceProxy } from '@shared/service-proxies/service-proxies';
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
  
  @Output() onSave = new EventEmitter<any>();
  constructor(injector: Injector,
    public _orderService: Order2ServiceProxy,
    private _modalService: BsModalService,
    public dataItemsService : DataItemsService,
    private router: Router,
    private route: ActivatedRoute) {
      super(injector);
     }

  ngOnInit(): void {

    
  }
  createItem(): void {
    this.showCreateOrEditItemDialog();
  }
  private showCreateOrEditItemDialog(): void {
    let createOrEditItemDialog: BsModalRef;
      createOrEditItemDialog = this._modalService.show(
        CreateItem2Component,
        {
          class: 'modal-lg',
        }
      );
    
    createOrEditItemDialog.content.onSave.subscribe(() => {
       this.items2 =  this.dataItemsService.lines
    });
  }

    editItem(item: CreateItem2InputDTO): void {
    this.showEditItemDialog(item.name);
  }

  private showEditItemDialog(name: string): void {
    let createOrEditItemDialog: BsModalRef;
      createOrEditItemDialog = this._modalService.show(
        EditItem2Component,
        {
          class: 'modal-lg',
          initialState: {
            name: name,
          },
        }
      );
    
    createOrEditItemDialog.content.onSave.subscribe(() => {
      this.items2 =  this.dataItemsService.lines
    });
    

  }
  protected delete(index){
    abp.message.confirm(
      this.l('ItemDeleteWarningMessage'),
      undefined,
      (result: boolean) => {
        if (result) {
          this.dataItemsService.lines.splice(index , 1);
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.items2 =  this.dataItemsService.lines
        }
      }
    );




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
      });
  }

}
