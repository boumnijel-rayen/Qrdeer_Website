import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { TablesComponent } from './pages/tables/tables.component';
import { SalesComponent } from './pages/sales/sales.component';
import { AccountComponent } from './pages/account/account.component';
import { LandingComponent } from './pages/landing/landing.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { TableAddComponent } from './pages/table-add/table-add.component';
import { TableEditComponent } from './pages/table-edit/table-edit.component';
import { TableQrComponent } from './pages/table-qr/table-qr.component';
import { StaffComponent } from './pages/staff/staff.component';
import { StaffAddComponent } from './pages/staff-add/staff-add.component';
import { StaffEditComponent } from './pages/staff-edit/staff-edit.component';
import { AccountEditComponent } from './pages/account-edit/account-edit.component';
import { SaleDetailsComponent } from './pages/sale-details/sale-details.component';
import { Notifications } from './pages/notifications/notifications';
import { ChangePassword } from './pages/change-password/change-password';
import { PasswordOtp } from './pages/password-otp/password-otp';
import { MenuComponent } from './pages/menu/menu.component';

export const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' },
  { path: 'pricing', component: PricingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'orders/:id', component: OrderDetailsComponent },
      { path: 'tables', component: TablesComponent },
      { path: 'tables/add', component: TableAddComponent },
      { path: 'tables/:id/edit', component: TableEditComponent },
      { path: 'tables/:id/qr', component: TableQrComponent },
      { path: 'staff', component: StaffComponent },
      { path: 'staff/add', component: StaffAddComponent },
      { path: 'staff/:id/edit', component: StaffEditComponent },
      { path: 'sales', component: SalesComponent },
      { path: 'sales/:id', component: SaleDetailsComponent },
      { path: 'account', component: AccountComponent },
      { path: 'account/edit', component: AccountEditComponent },
      { path: 'account/password', component: ChangePassword },
      { path: 'account/password/verify', component: PasswordOtp },
      { path: 'notifications', component: Notifications },
      { path: 'menu', component: MenuComponent },
    ]
  },
  { path: '**', redirectTo: '' },
];
