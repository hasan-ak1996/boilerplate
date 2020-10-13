import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { GetOrederOutputDTO, OrderServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent extends AppComponentBase  implements OnInit {
  saving = false;
  order = new GetOrederOutputDTO ();
  id: number;
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _OrderService: OrderServiceProxy,
    public bsModalRef: BsModalRef
  ) { 
    super(injector);
  }

  ngOnInit(): void {
    this._OrderService.getOrderById(this.id).subscribe((result) => {
      this.order = result; 
       })
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
        this.bsModalRef.hide();
        this.onSave.emit();
      });

  }

}
