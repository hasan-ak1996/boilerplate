import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/shared.module';
import { HomeComponent } from '@app/home/home.component';
import { AboutComponent } from '@app/about/about.component';
// tenants
import { TenantsComponent } from '@app/tenants/tenants.component';
import { CreateTenantDialogComponent } from './tenants/create-tenant/create-tenant-dialog.component';
import { EditTenantDialogComponent } from './tenants/edit-tenant/edit-tenant-dialog.component';
// roles
import { RolesComponent } from '@app/roles/roles.component';
import { CreateRoleDialogComponent } from './roles/create-role/create-role-dialog.component';
import { EditRoleDialogComponent } from './roles/edit-role/edit-role-dialog.component';
// users
import { UsersComponent } from '@app/users/users.component';
import { CreateUserDialogComponent } from '@app/users/create-user/create-user-dialog.component';
import { EditUserDialogComponent } from '@app/users/edit-user/edit-user-dialog.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { ResetPasswordDialogComponent } from './users/reset-password/reset-password.component';
//Orders
import { CreateOrderComponent } from './Master-Details1/create-order/create-order.component';
// layout
import { HeaderComponent } from './layout/header.component';
import { HeaderLeftNavbarComponent } from './layout/header-left-navbar.component';
import { HeaderLanguageMenuComponent } from './layout/header-language-menu.component';
import { HeaderUserMenuComponent } from './layout/header-user-menu.component';
import { FooterComponent } from './layout/footer.component';
import { SidebarComponent } from './layout/sidebar.component';
import { SidebarLogoComponent } from './layout/sidebar-logo.component';
import { SidebarUserPanelComponent } from './layout/sidebar-user-panel.component';
import { SidebarMenuComponent } from './layout/sidebar-menu.component';
import { Item2ServiceProxy, Order2ServiceProxy, OrderServiceProxy } from '@shared/service-proxies/service-proxies';
import { ItemServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrderItemComponent } from './Master-Details1/create-order-item/create-order-item.component';
import { EditItemComponent } from './Master-Details1/edit-item/edit-item.component';
import { ViewOrdersComponent } from './Master-Details1/view-orders/view-orders.component';
import { RouterModule, Routes } from '@angular/router';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { EditOrderComponent } from './Master-Details1/edit-order/edit-order.component';
import { CreateOrder2Component } from './Master-Details2/create-order2/create-order2.component';
import{DataItemsService} from './Master-Details2/data-items-service';
import { CreateItem2Component } from './Master-Details2/create-item2/create-item2.component';
import { ViewOrders2Component } from './Master-Details2/view-orders2/view-orders2.component';
import { EditOrder2Component } from './Master-Details2/edit-order2/edit-order2.component';
import { EditItem2Component } from './Master-Details2/edit-item2/edit-item2.component';
import { MatSliderModule } from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { EditOrder2Items2Component } from './Master-Details2/edit-order2-items2/edit-order2-items2.component';
import { CreateItems2Component } from './Master-Details2/edit-order2/create-items2/create-items2.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    // tenants
    TenantsComponent,
    CreateTenantDialogComponent,
    EditTenantDialogComponent,
    // roles
    RolesComponent,
    CreateRoleDialogComponent,
    EditRoleDialogComponent,
    // users
    UsersComponent,
    CreateUserDialogComponent,
    EditUserDialogComponent,
    ChangePasswordComponent,
    ResetPasswordDialogComponent,
    // layout
    HeaderComponent,
    HeaderLeftNavbarComponent,
    HeaderLanguageMenuComponent,
    HeaderUserMenuComponent,
    FooterComponent,
    SidebarComponent,
    SidebarLogoComponent,
    SidebarUserPanelComponent,
    SidebarMenuComponent,
    CreateOrderComponent,
    CreateOrderItemComponent,
    EditItemComponent,
    ViewOrdersComponent,
    EditOrderComponent,
    CreateOrder2Component,
    CreateItem2Component,
    ViewOrders2Component,
    EditOrder2Component,
    EditItem2Component,
    EditOrder2Items2Component,
    CreateItems2Component,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ModalModule.forChild(),
    BsDropdownModule,
    CollapseModule,
    TabsModule,
    AppRoutingModule,
    ServiceProxyModule,
    SharedModule,
    NgxPaginationModule,
    MatSliderModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatIconModule,
    MatTableModule
    
    
  ],
  providers: [
    MatDatepickerModule, 
    MatNativeDateModule,
    { provide : ItemServiceProxy , useClass : ItemServiceProxy},
    { provide : Item2ServiceProxy , useClass : Item2ServiceProxy},
    { provide : Order2ServiceProxy , useClass : Order2ServiceProxy},
    { provide : CreateOrderItemComponent , useClass : CreateOrderItemComponent},
    { provide: DataItemsService, useClass: DataItemsService },
    { provide : BsModalRef , useClass : BsModalRef},
    
    
  ],
  entryComponents: [
    // tenants
    CreateTenantDialogComponent,
    EditTenantDialogComponent,
    // roles
    CreateRoleDialogComponent,
    EditRoleDialogComponent,
    // users
    CreateUserDialogComponent,
    EditUserDialogComponent,
    ResetPasswordDialogComponent,
    CreateOrderItemComponent,

  ],
})
export class AppModule {}
