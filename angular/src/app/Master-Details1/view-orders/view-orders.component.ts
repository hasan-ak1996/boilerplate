import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditOrderComponent } from '@app/Master-Details1/edit-order/edit-order.component';
import { AppComponentBase } from '@shared/app-component-base';
import {
  OrderServiceProxy,
  GetOrederOutputDTO,
  
} from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent  extends AppComponentBase implements OnInit {
  orders : GetOrederOutputDTO[] =[];
  @Output() onSave = new EventEmitter<any>();
  constructor(injector: Injector ,
    public _orderService: OrderServiceProxy,
    private _modalService: BsModalService,
    private router : Router,
    private route : ActivatedRoute, ) {
    super(injector);
   }

  ngOnInit(): void {
    this._orderService.getAllOrders().subscribe((result) => {
      this.orders = result;
    });

  }
    protected delete(order: GetOrederOutputDTO): void {
    abp.message.confirm(
      this.l('OrderDeleteWarningMessage', order.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._orderService.deleteOrder(order.id , null).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            
            this._orderService.getAllOrders().subscribe((result) => {
              this.orders = result;
            }); 
          });
        }
      }
    );
  }
  goToCreateOrder(){
    this.router.navigate(['app/orders']);
  }

}
