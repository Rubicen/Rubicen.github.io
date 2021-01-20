import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
	{ path: '', redirectTo: '/Home', pathMatch: 'full' },
	{ path: 'Home', component: HomeComponent }
];

@NgModule({
  imports: [
    CommonModule,
	RouterModule.forRoot(routes)
  ],
  exports: [
	RouterModule
  ],
  declarations: [],
})
export class AppRoutingModule { }
