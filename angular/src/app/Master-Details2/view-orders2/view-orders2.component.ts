import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { GetOreder2OutputDTO, Order2ServiceProxy } from '@shared/service-proxies/service-proxies';
import {ActivatedRoute, Router} from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EditOrder2Component } from '../edit-order2/edit-order2.component';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-view-orders2',
  templateUrl: './view-orders2.component.html',
  styleUrls: ['./view-orders2.component.css']
})
export class ViewOrders2Component  extends PagedListingComponentBase<GetOreder2OutputDTO>{
  orders : GetOreder2OutputDTO[] =[];
  constructor(injector: Injector ,
    public _order2Service: Order2ServiceProxy,
    private router : Router,
    private route : ActivatedRoute,
    private _modalService: BsModalService,
    ) {
      super(injector);
     }

     protected list(
       request: PagedRequestDto,
        pageNumber: number,
         finishedCallback: Function
         ): void 
        {
          this._order2Service
          .getAllOrders(
            request.maxResultCount,
            request.skipCount
          )
          .pipe(
            finalize(() => {
              finishedCallback();
            })
          )
          .subscribe((result) => {
            this.orders  = result.items;
            this.showPaging(result, pageNumber);
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
            this.refresh();
          });
        }
      }
    );
    }
    goToCreateOrder(){
      this.router.navigate(['app/orders2']);
    }
  

}
