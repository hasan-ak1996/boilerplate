import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { GetItem2OutputDTO } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DataItemsService } from '../data-items-service';

@Component({
  selector: 'app-edit-order2-items2',
  templateUrl: './edit-order2-items2.component.html',
  styleUrls: ['./edit-order2-items2.component.css']
})
export class EditOrder2Items2Component extends AppComponentBase implements OnInit {
  saving = false;
  id: number;
  item =new GetItem2OutputDTO();
  @Output() onSave = new EventEmitter<any>();
  constructor(
    injector: Injector,
    public dataItemsService : DataItemsService , 
    public bsModalRef: BsModalRef)
    {
      super(injector);
    }

  ngOnInit(): void {
    this.item  = this.dataItemsService.getItemForEdit(this.id)
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
