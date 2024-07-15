import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AboutTeaComponent } from './about-tea/about-tea.component';
import { SuccessfulTransactionComponent } from './successful-transaction/successful-transaction.component';
import { PaymentComponent } from './payment/payment.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { TeaAndHerbsComponent } from './tea-and-herbs/tea-and-herbs.component';

const routes: Routes = [
  { path: '', component: HomePageComponent, title: 'Home Page' },
  { path: 'about-tea', component: AboutTeaComponent, title: 'About Tea' },
  { path: 'tea', component: TeaAndHerbsComponent, title: 'Tea and Herbs' },
  { path: 'checkout', component: CheckoutComponent, title: 'Checkout' },
  { path: 'payment', component: PaymentComponent, title: 'Payment' },
  {
    path: 'success',
    component: SuccessfulTransactionComponent,
    title: 'Success',
  },
];

export default routes;
