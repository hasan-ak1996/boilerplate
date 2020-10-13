import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output
} from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { forEach as _forEach, includes as _includes, map as _map } from 'lodash-es';
import { AppComponentBase } from '@shared/app-component-base';
import {
  GetItemOutputDTO,
  ItemServiceProxy,
} from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent extends AppComponentBase implements OnInit {
  saving = false;
  item = new GetItemOutputDTO ();
  id: number;
  @Output() onSave = new EventEmitter<any>();
  constructor(
    injector: Injector,
    public _ItemService: ItemServiceProxy,
    public bsModalRef: BsModalRef
  ) { 
    super(injector);
  }
  

  ngOnInit(): void {
    this._ItemService.getItemById(this.id).subscribe((result) => {
       this.item = result; 
        })
  }

  save(): void {
    this.saving = true;


    this._ItemService
      .updateItem(this.item)
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
