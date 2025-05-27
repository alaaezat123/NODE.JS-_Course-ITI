import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router';
import { ProductListComponent } from './app/components/product-list/product-list.component';
import { ProductDetailsComponent } from './app/components/product-details/product-details.component';
import { ShoppingCartComponent } from './app/components/shopping-cart/shopping-cart.component';
import { LoginComponent } from './app/components/login/login.component';
import { RegisterComponent } from './app/components/register/register.component';
import { CheckoutComponent } from './app/components/checkout/checkout.component';

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'users/login', component: LoginComponent },
  { path: 'users/register', component: RegisterComponent },
  { path: 'orders/checkout', component: CheckoutComponent },
];

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(routes)
    ]
}).catch(err => console.error(err));