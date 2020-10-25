import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { DataItemsService } from '@app/Master-Details2/data-items-service';
import { AppComponentBase } from '@shared/app-component-base';
import { GetItem2OutputDTO } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-items2',
  templateUrl: './create-items2.component.html',
  styleUrls: ['./create-items2.component.css']
})
export class CreateItems2Component extends AppComponentBase  implements OnInit {
  saving = false;
  item = new GetItem2OutputDTO ();
  id : number;
  @Output() onSave = new EventEmitter<any>();

  constructor(
    public dataItemsService : DataItemsService,
    injector: Injector,
    public bsModalRef: BsModalRef)
    { 
      super(injector);
    }

  ngOnInit(): void {

  }
  UpdateTotal(){
    this.item.totalPrice = parseInt((this.item.quantity * this.item.price).toFixed(2));
  }
  save(): void {
    this.item.orderId =this.id;
    this.dataItemsService.addItemForEdit(this.item);
    this.saving = true;
    this.bsModalRef.hide();
    this.onSave.emit();
  }

}
