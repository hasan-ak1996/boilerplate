import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { GetOreder2OutputDTO, Order2ServiceProxy } from '@shared/service-proxies/service-proxies';
import {ActivatedRoute, Router} from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EditOrder2Component } from '../edit-order2/edit-order2.component';

@Component({
  selector: 'app-view-orders2',
  templateUrl: './view-orders2.component.html',
  styleUrls: ['./view-orders2.component.css']
})
export class ViewOrders2Component  extends AppComponentBase
 implements OnInit {
  orders : GetOreder2OutputDTO[] =[];

  constructor(injector: Injector ,
    public _order2Service: Order2ServiceProxy,
    private router : Router,
    private route : ActivatedRoute,
    private _modalService: BsModalService,
    ) {
      super(injector);
     }

  ngOnInit(): void {
    this._order2Service.getAllOrders().subscribe((result) => {
      this.orders = result;
    });
  }

      protected delete(order: GetOreder2OutputDTO): void {
    abp.message.confirm(
      this.l('OrderDeleteWarningMessage', order.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._order2Service.deleteOrder(order.id , null).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            
            this._order2Service.getAllOrders().subscribe((result) => {
              this.orders = result;
            }); 
          });
        }
      }
    );
    }
    editOrder(order: GetOreder2OutputDTO): void {
      this.showEditOrderDialog(order.id);
    }
  
    private showEditOrderDialog(id: number): void {
      let EditOrderDialog: BsModalRef;
        EditOrderDialog = this._modalService.show(
          EditOrder2Component,
          {
            class: 'modal-lg',
            initialState: {
              id: id,
            },
          }
        );
    }

}
