import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router'
import { AppComponentBase } from '@shared/app-component-base';
import { CreateItem2InputDTO, GetItem2OutputDTO, GetOreder2OutputDTO, Order2ServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { DataItemsService } from '../data-items-service';
@Component({
  selector: 'app-edit-order2',
  templateUrl: './edit-order2.component.html',
  styleUrls: ['./edit-order2.component.css']
})
export class EditOrder2Component  extends AppComponentBase  implements OnInit {
  order = new GetOreder2OutputDTO ();
  saving = false;
  id: number;
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _Order2Service: Order2ServiceProxy,
    public bsModalRef: BsModalRef,
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
       });
  }
  save(): void {
    this.saving = true;
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
        this._router.navigate(['app/view-orders2']);
      });

  }


}
