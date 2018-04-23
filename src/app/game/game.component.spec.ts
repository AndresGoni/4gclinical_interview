import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { GameComponent } from './game.component'

class GameServiceMock {

  loadBoard() {
    return [{x: 0, y: 4}, {x: 1, y: 4}, {x: 2, y: 4}, {x: 3, y: 4}, {x: 4, y: 4},
            {x: 0, y: 3}, {x: 1, y: 3}, {x: 2, y: 3}, {x: 3, y: 3}, {x: 4, y: 3},
            {x: 0, y: 2}, {x: 1, y: 2}, {x: 2, y: 2}, {x: 3, y: 2}, {x: 4, y: 2},
            {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1}, {x: 4, y: 1},
            {x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0}, {x: 4, y: 0}]
  }

  loadRobot() {
    return [{orientation: 'N', url: '../../assets/images/robotN.png'},
            {orientation: 'E', url: '../../assets/images/robotE.png'},
            {orientation: 'S', url: '../../assets/images/robotS.png'},
            {orientation: 'W', url: '../../assets/images/robotW.png'}]
  }

}

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  let gameBoard
  let gameRobot

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // gameBoard = new GameServiceMock().loadBoard()
    // gameRobot = new GameServiceMock().loadRobot()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('load game board', () => {
    gameBoard = new GameServiceMock().loadBoard()
    expect(gameBoard.length).toBe(25)
  })


  it('load robot', () => {
    gameRobot = new GameServiceMock().loadRobot()
    expect(gameRobot.length).toBe(4)
  })

  it('place robot on the game board', () => {
    component.initialX = 0
    component.initialY = 0
    component.initialF = 'N'

    component.place()

    expect(component.currentPoint).toBeDefined()
  })

  it('clear placement form', () => {
    component.initialX = 0
    component.initialY = 0
    component.initialF = 'N'

    component.cleanPlacementForm()

    expect(component.initialX).toBeNull()
    expect(component.initialY).toBeNull()
    expect(component.initialF).toBeNull()
  })

  it('rotate robot to the left', () => {
    component.currentPoint = {x: 1, y: 1, f: 'N'}

    component.cleanPlacementForm()

    expect(component.currentPoint.x).toBe('1')
    expect(component.currentPoint.y).toBe('1')
    expect(component.currentPoint.f).toBe('W')
  })

  it('rotate robot to the right', () => {
    component.currentPoint = {x: 1, y: 1, f: 'N'}

    component.cleanPlacementForm()

    expect(component.currentPoint.x).toBe('1')
    expect(component.currentPoint.y).toBe('1')
    expect(component.currentPoint.f).toBe('E')
  })

  it('display the position of the robot', () => {
    component.report()

    expect(component.reportRobotPosition).toBeDefined()
  })


  it('get robot image', () => {
    component.getRobotImage({x: 1, y: 1, f: 'N'})

    expect(component.reportRobotPosition).toBeDefined()
  })
});
