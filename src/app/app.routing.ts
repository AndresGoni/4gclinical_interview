import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';

const appRoutes: Routes = [
  {
    path: '',
    component: GameComponent
  },
  {
    path: 'game',
    component: GameComponent
  },
  {
    path: '**',
    component: GameComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot( appRoutes )],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
