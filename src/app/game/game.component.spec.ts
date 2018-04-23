import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { GameComponent } from './game.component'
import { GameService } from './game.service'

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('place robot', () => {
    const place = component.place()
    expect(place.currentPoint).toBeDefined()
  })


  it('load robot', () => {
    const gameRobot = component.loadRobot()
    expect(gameRobot.length).toBe(25)
  })
});
