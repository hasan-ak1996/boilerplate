import {
   Component,
   Injector,
   OnInit,
   EventEmitter,
   Output,
   } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import {
  OrderServiceProxy,
  ItemServiceProxy,
  RoleDto,
  CreateOrderInputDTO,
  PermissionDto,
  RoleServiceProxy,
  PermissionDtoListResultDto,
  GetItemOutputDTO
} from '@shared/service-proxies/service-proxies';
import { forEach as _forEach, map as _map } from 'lodash-es';
import { AbpValidationError } from '@shared/components/validation/abp-validation.api';
import { CreateOrderItemComponent } from '@app/create-order-item/create-order-item.component';
@Component({
  selector: 'create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent extends AppComponentBase
implements OnInit {
  saving = false;
  order = new CreateOrderInputDTO ();
  roles: RoleDto[] = [];
  items : GetItemOutputDTO[] = []; 
  permissions: PermissionDto[] = [];
  checkedPermissionsMap: { [key: string]: boolean } = {};
  defaultPermissionCheckedStatus = true;
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _orderService: OrderServiceProxy,
    private _roleService: RoleServiceProxy,
    private _modalService: BsModalService,
    public _itemService: ItemServiceProxy,

  ) { 
    super(injector);
  }

  ngOnInit(): void {
    this._roleService
    .getAllPermissions()
    .subscribe((result: PermissionDtoListResultDto) => {
      this.permissions = result.items;
      this.setInitialPermissionsStatus();
    });

    this._itemService.getAllItems().subscribe((result) => {
      this.items = result;
    });
    console.log(this.items);
  }
  
  
  setInitialPermissionsStatus(): void {
    _map(this.permissions, (item) => {
      this.checkedPermissionsMap[item.name] = this.isPermissionChecked(
        item.name
      );
    });
  }

  isPermissionChecked(permissionName: string): boolean {
    // just return default permission checked status
    // it's better to use a setting
    return this.defaultPermissionCheckedStatus;
  }

  onPermissionChange(permission: PermissionDto, $event) {
    this.checkedPermissionsMap[permission.name] = $event.target.checked;
  }

  getCheckedPermissions(): string[] {
    const permissions: string[] = [];
    _forEach(this.checkedPermissionsMap, function (value, key) {
      if (value) {
        permissions.push(key);
      }
    });
    return permissions;
  }

  createItem(): void {
    this.showCreateOrEditItemDialog();
  }

  
  private showCreateOrEditItemDialog(id?: number): void {
    let createOrEditItemDialog: BsModalRef;
    if (!id) {
      createOrEditItemDialog = this._modalService.show(
        CreateOrderItemComponent,
        {
          class: 'modal-lg',
        }
      );
    }

  }


  
  save(): void {
    this.saving = true;
    console.log(this.order);
    this._orderService
      .createOrder(this.order)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(() => {

        this.notify.info(this.l('SavedSuccessfully'));
        this.onSave.emit();
      });
  }

}
