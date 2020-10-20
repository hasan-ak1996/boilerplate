import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateItem2InputDTO, GetItem2OutputDTO } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DataItemsService } from '../data-items-service';

@Component({
  selector: 'app-create-item2',
  templateUrl: './create-item2.component.html',
  styleUrls: ['./create-item2.component.css']
})
export class CreateItem2Component  extends AppComponentBase implements OnInit {
  saving = false;
  item = new CreateItem2InputDTO ();
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
    
    this.dataItemsService.lines.push(this.item);
    this.saving = true;
    this.bsModalRef.hide();
    this.onSave.emit();
  }

}
