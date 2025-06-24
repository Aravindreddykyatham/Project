import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AddProductComponent } from './add-product/add-product.component';
import { LoginComponent } from '../auth/login/login.component';
import { authGuard } from '../shared/route-guard/auth.guard';
import { SellerGuard } from '../shared/route-guard/seller.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'product-details/:id',
    component: ProductDetailsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'add-product',
    component: AddProductComponent,
    canActivate: [SellerGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
