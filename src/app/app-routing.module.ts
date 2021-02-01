import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { BologneseComponent } from './bolognese/bolognese.component';
import { SpoonComponent } from './spoon/spoon.component';
import { DrivingGameComponent } from './driving-game/driving-game.component';

const routes: Routes = [
	{ path: '', redirectTo: '/Home', pathMatch: 'full' },
	{ path: 'Home', component: HomeComponent },
  { path: 'Bolognese', component: BologneseComponent },
	{ path: 'Spoon', component: SpoonComponent },
  { path: 'Zoomzoom', component: DrivingGameComponent }
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
