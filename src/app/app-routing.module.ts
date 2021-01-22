import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { BologneseComponent } from './bolognese/bolognese.component';

const routes: Routes = [
	{ path: '', redirectTo: '/Home', pathMatch: 'full' },
	{ path: 'Home', component: HomeComponent },
	{ path: 'Bolognese', component: BologneseComponent }
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
