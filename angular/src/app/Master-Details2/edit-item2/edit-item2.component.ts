import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { DataItemsService } from '@app/Master-Details2/data-items-service';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateItem2InputDTO } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-item2',
  templateUrl: './edit-item2.component.html',
  styleUrls: ['./edit-item2.component.css']
})
export class EditItem2Component  extends AppComponentBase  implements OnInit {
  saving = false;
  id: number;
  item =new CreateItem2InputDTO();
  @Output() onSave = new EventEmitter<any>();
  constructor(
    injector: Injector,
    public dataItemsService : DataItemsService , 
    public bsModalRef: BsModalRef)
    {
      super(injector);
    }

  ngOnInit(): void {
    this.item  = this.dataItemsService.getItemByIndex(this.id)
  }

  UpdateTotal(){
    this.item.totalPrice = parseInt((this.item.quantity * this.item.price).toFixed(2));
  }

  save(): void {
    this.saving = true;
    this.notify.info(this.l('SavedSuccessfully'));
    this.bsModalRef.hide();
    this.onSave.emit();
  }

}
