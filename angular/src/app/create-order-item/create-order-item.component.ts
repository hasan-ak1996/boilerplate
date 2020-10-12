import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,
  Injectable,
  } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import {
  ItemServiceProxy,
  CreateItemInputDTO,
  GetItemOutputDTO,
} from '@shared/service-proxies/service-proxies';
import { forEach as _forEach, map as _map } from 'lodash-es';
@Component({
  selector: 'app-create-order-item',
  templateUrl: './create-order-item.component.html',
  styleUrls: ['./create-order-item.component.css']
})

export class CreateOrderItemComponent extends AppComponentBase
implements OnInit {
  saving = false;
  item = new CreateItemInputDTO ();
  items : GetItemOutputDTO[] = []; 
  @Output() onSave = new EventEmitter<any>();
  constructor(
    injector: Injector,
    public _itemService: ItemServiceProxy,
    public bsModalRef: BsModalRef
  ) { 
    super(injector);
  }


  ngOnInit(): void {
  }

  save(): void {
    this.saving = true;
    console.log(this.item);
    this._itemService
      .createItem(this.item)
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

      this._itemService.getAllItems().subscribe((result) => {
        this.items = result;
      });

  }

}
