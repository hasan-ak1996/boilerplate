import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { GetOreder2OutputDTO, Order2ServiceProxy } from '@shared/service-proxies/service-proxies';
import {ActivatedRoute, Router} from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EditOrder2Component } from '../edit-order2/edit-order2.component';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { finalize } from 'rxjs/operators';

class PagedOrders2RequestDto extends PagedRequestDto {
  keyword: string;
  isSubmit: boolean | null;
}


@Component({
  selector: 'app-view-orders2',
  templateUrl: './view-orders2.component.html',
  styleUrls: ['./view-orders2.component.css']
})
export class ViewOrders2Component  extends PagedListingComponentBase<GetOreder2OutputDTO>{
  orders : GetOreder2OutputDTO[] =[];
  keyword = '';
  isSubmit: boolean | null;
  advancedFiltersVisible = false;
  constructor(injector: Injector ,
    public _order2Service: Order2ServiceProxy,
    private router : Router,
    private route : ActivatedRoute,
    private _modalService: BsModalService,
    ) {
      super(injector);
     }

     protected list(
       request: PagedOrders2RequestDto,
        pageNumber: number,
         finishedCallback: Function
         ): void 
        {
          request.keyword = this.keyword;
          request.isSubmit = this.isSubmit;
          this._order2Service
          .getAllOrders(
            request.keyword,
            request.isSubmit,
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
        clearFilters(): void {
          this.keyword = '';
          this.isSubmit = undefined;
          this.getDataPage(1);
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
