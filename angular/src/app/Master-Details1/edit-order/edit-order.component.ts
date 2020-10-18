import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
    public bsModalRef: BsModalRef,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) { 
    super(injector);
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params: Params) => {
    this.id = params['id']; });
      
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
        this._router.navigate(['app/view-orders']);
        this.onSave.emit();
      });

  }

}
