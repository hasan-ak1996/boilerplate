import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import {
  OrderServiceProxy,
  GetOrederOutputDTO,
  GetOrederOutputDTOPagedResultDto,
} from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

class PagedOrderssRequestDto extends PagedRequestDto {
  keyword: string;
  isSubmit: boolean | null;
}

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent extends PagedListingComponentBase<GetOrederOutputDTO> {

  orders : GetOrederOutputDTO[] =[];
  keyword = '';
  isSubmit: boolean | null;
  advancedFiltersVisible = false;
  @Output() onSave = new EventEmitter<any>();
  constructor(injector: Injector ,
    public _orderService: OrderServiceProxy,
    private _modalService: BsModalService,
    private router : Router,
    private route : ActivatedRoute, ) {
    super(injector);
   }

   protected list(
    request: PagedOrderssRequestDto, 
    pageNumber: number,
    finishedCallback: Function
    ): void 
    {
    request.keyword = this.keyword;
    request.isSubmit = this.isSubmit;
      this._orderService
      .getAllOrders(
        request.keyword,
        request.isSubmit,
        request.maxResultCount,
        request.skipCount,
      )
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result : GetOrederOutputDTOPagedResultDto) => {
        this.orders  = result.items;
        this.showPaging(result, pageNumber);
      });
  }
  clearFilters(): void {
    this.keyword = '';
    this.isSubmit = undefined;
    this.getDataPage(1);
  }



    protected delete(order: GetOrederOutputDTO): void {
    abp.message.confirm(
      this.l('OrderDeleteWarningMessage', order.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._orderService.deleteOrder(order.id , null).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );
  }
  goToCreateOrder(){
    this.router.navigate(['app/orders']);
  }

}
