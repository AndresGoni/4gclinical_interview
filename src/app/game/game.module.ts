import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GameComponent } from './game.component';
import { GameService } from './game.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    GameComponent
  ],
  providers: [
    GameService
  ]
})
export class GameModule { }
