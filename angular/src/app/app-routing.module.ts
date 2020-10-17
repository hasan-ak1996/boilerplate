import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UsersComponent } from './users/users.component';
import { TenantsComponent } from './tenants/tenants.component';
import { RolesComponent } from 'app/roles/roles.component';

import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { CreateOrderComponent } from './Master-Details1/create-order/create-order.component';
import { ViewOrdersComponent } from './Master-Details1/view-orders/view-orders.component';
import { CreateOrder2Component } from './Master-Details2/create-order2/create-order2.component';
import { ViewOrders2Component } from './Master-Details2/view-orders2/view-orders2.component';
import { EditOrder2Component } from './Master-Details2/edit-order2/edit-order2.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
              
                children: [
                    { path: 'home', component: HomeComponent, canActivate: [AppRouteGuard] },
                    { path: 'users', component: UsersComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
                    { path: 'roles', component: RolesComponent, data: { permission: 'Pages.Roles' }, canActivate: [AppRouteGuard] },

                    { path: 'orders',
                        component: CreateOrderComponent,

                    },
                    { path: 'tenants', component: TenantsComponent, data: { permission: 'Pages.Tenants' }, canActivate: [AppRouteGuard] },
                    { path: 'about', component: AboutComponent },
                    { path: 'orders2', component: CreateOrder2Component ,},
                    { path: 'view-orders', component: ViewOrdersComponent },
                    { path: 'view-orders2', component: ViewOrders2Component },
                    { path: 'view-orders2/:id', component: EditOrder2Component },
                    { path: 'update-password', component: ChangePasswordComponent },
                   
                ]
            }
        ])
    ],
    
    exports: [RouterModule]
})
export class AppRoutingModule { }
