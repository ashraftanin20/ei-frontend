import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InvoiceListComponent } from './invoice/invoice-list/invoice-list.component';
import { InvoiceShowComponent } from './invoice/invoice-show/invoice-show.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { authGuard } from './guard/auth.guard';
import { InvoiceAddComponent } from './invoice/invoice-add/invoice-add.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'invoices', component: InvoiceListComponent, canActivate: [authGuard]},
  {path: 'invoices/show/:id', component: InvoiceShowComponent, canActivate: [authGuard]},
  {path: 'invoices/add', component: InvoiceAddComponent, canActivate: [authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
