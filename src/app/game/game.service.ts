import { Injectable } from '@angular/core';
import * as _ from 'lodash'

@Injectable()
export class GameService {

  constructor() {}

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

  rotateLeft(point) {
    switch (point.f) {
      case 'N':
        point.f = 'W'
        break;
      case 'E':
        point.f = 'N'
        break;
      case 'S':
        point.f = 'E'
        break;
      case 'W':
        point.f = 'S'
        break;
      default:
        break;
    }
    return point
  }

  rotateRight(point) {
    switch (point.f) {
      case 'N':
        point.f = 'E'
        break;
      case 'E':
        point.f = 'S'
        break;
      case 'S':
        point.f = 'W'
        break;
      case 'W':
        point.f = 'N'
        break;
      default:
        break;
    }
    return point
  }

  getCurrentPosition(point) {
    switch (point.f) {
      case 'N':
        return 'The robot is in the position: (' + point.x + ',' + point.y + ') oriented to the North.'
      case 'E':
        return 'The robot is in the position: (' + point.x + ',' + point.y + ') oriented to the East.'
      case 'S':
        return 'The robot is in the position: (' + point.x + ',' + point.y + ') oriented to the South.'
      case 'W':
        return 'The robot is in the position: (' + point.x + ',' + point.y + ') oriented to the West.'
    }
  }

  simulateMovement(point) {
    switch (point.f) {
      case 'N':
        return {x: point.x, y: point.y + 1, f: 'N'}
      case 'E':
        return {x: point.x + 1, y: point.y, f: 'E'}
      case 'S':
        return {x: point.x, y: point.y - 1, f: 'S'}
      case 'W':
        return {x: point.x - 1, y: point.y, f: 'W'}
      default:
        return point
    }
  }

  validateCoordinates(board, point) {
    return _.findIndex(board, {x: point.x, y: point.y}) >= 0
  }

}
