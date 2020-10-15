import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import { AppComponentBase } from '@shared/app-component-base';
import { GetOreder2OutputDTO, Order2ServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
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
    public bsModalRef: BsModalRef
  ) { 
    super(injector);
  }

  ngOnInit(): void {
    
    this._Order2Service.getOrderById(this.id).subscribe((result) => {
      this.order = result; 
       });

  }

}
