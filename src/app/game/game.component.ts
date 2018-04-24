import { Component, OnInit } from '@angular/core';
import { GameService } from './game.service'
import * as _ from 'lodash'

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.less'],
})
export class GameComponent implements OnInit {

  gameBoard: Array<{x: number, y: number}> /* 5 x 5 array of points {x: number, y: number} */
  robotImages: Array<{orientation: string, url: string}> /* orientation: ['N', 'E', 'S', 'W'] */
  currentPoint: {x: number, y: number, f: string} /* x: [0-4], y: [0-4], f: ['N', 'E', 'S', 'W'] */
  placementError: string
  movementValidation: string
  reportRobotPosition: string

  initialX: number
  initialY: number
  initialF: string

  constructor( private _gameService: GameService) { }

  ngOnInit() {
    this.gameBoard = this._gameService.loadBoard()
    this.robotImages = this._gameService.loadRobot()
    this.currentPoint = null
    this.cleanPlacementForm()
  }


  /**
   * Set the initial position
   */
  place() {
    this.placementError = null
    if (this._gameService.validateCoordinates(this.gameBoard, {x: Number(this.initialX), y: Number(this.initialY)})) {
      this.paintGameBoard(this.currentPoint, null)
      this.currentPoint = {x: Number(this.initialX), y: Number(this.initialY), f: this.initialF}
      this.paintGameBoard(null, this.currentPoint)
      this.cleanPlacementForm()
    } else {
      this.placementError = 'Initial coordinates must be an integer value between 0 and 4.'
    }
  }

  /**
   * Clear the values of X, Y, and direction in the 'Initial coordinates' form
   */
  cleanPlacementForm() {
    this.initialX = null
    this.initialY = null
    this.initialF = null
  }

  /**
   * Rotate the robot 90° to the left
   */
  left() {
    this.currentPoint = this._gameService.rotateLeft(this.currentPoint)
    this.paintGameBoard(null, this.currentPoint)
  }

  /**
   * Rotate the robot 90° to the right
   */
  right() {
    this.currentPoint = this._gameService.rotateRight(this.currentPoint)
    this.paintGameBoard(null, this.currentPoint)
  }

  /**
   * Display the current position
   */
  report() {
    this.reportRobotPosition = this._gameService.getCurrentPosition(this.currentPoint)
  }

  /**
   * Hide the 'Robot position' information
   */
  closeReport() {
    this.reportRobotPosition = null
  }

  /**
   * Move the robot a position in the direction of the 'f' value of the current position
   */
  move() {
    this.clearBorders()
    this.currentPoint = this.validateMovement(this.currentPoint)
  }

  /**
   * Validate if the requested movement is allowed based on the current position
   *   if valid: move the robot
   *   else: highlight the board border and display an error message
   * @param point {x: number, y: number, f: string}
   * @returns point {x: number, y: number, f: string}
   */
  validateMovement(point) {
    const nextStep = this._gameService.simulateMovement(point)

    if (this._gameService.validateCoordinates(this.gameBoard, {x: nextStep.x, y: nextStep.y})) {
      this.paintGameBoard(this.currentPoint, nextStep)
      return nextStep
    } else {
      this.highlightBorder(nextStep)
      this.movementValidation = 'Invalid movement. The requested position is out of the game board.'
      return point
    }
  }

  /**
   * Check the border that must be painted when the robot reaches the limit of the board
   * @param point
   */
  highlightBorder(point) {
    if (point.x < 0) {
      this.paintLeftBorder()
    } else if (point.x > 4) {
      this.paintRightBorder()
    } else if (point.y < 0) {
      this.paintBottomBorder()
    } else if (point.y > 4) {
      this.paintTopBorder()
    }
  }

  /**
   * Highlight in red the left border
   */
  paintLeftBorder() {
    _.forEach(this.gameBoard, function(point) {
      if (point.x === 0) { document.getElementById('0' + point.y).style.borderLeft = '5px solid red' }
    })
  }

  /**
   * Highlight in red the right border
   */
  paintRightBorder() {
    _.forEach(this.gameBoard, function(point) {
      if (point.x === 4) { document.getElementById('4' + point.y).style.borderRight = '5px solid red' }
    })
  }

  /**
   * Highlight in red the bottom border
   */
  paintBottomBorder() {
    _.forEach(this.gameBoard, function(point) {
      if (point.y === 0) { document.getElementById(point.x + '0').style.borderBottom = '5px solid red' }
    })
  }

  /**
   * Highlight in red the top border
   */
  paintTopBorder() {
    _.forEach(this.gameBoard, function(point) {
      if (point.y === 4) { document.getElementById(point.x + '4').style.borderTop = '5px solid red' }
    })
  }

  /**
   * Hide the movement validation error message
   * Paint the board borders in white
   */
  clearBorders() {
    this.movementValidation = null
    _.forEach(this.gameBoard, function(key) {
      document.getElementById(key.x + '' + key.y).style.border = '1px solid white'
    })
  }

  /**
   * Place the robot on the game board
   * @param point1: current position
   * @param point2: next position
   */
  paintGameBoard(point1, point2) {
    /* clear the current position */
    if (point1) {
      document.getElementById(point1.x.toString() + point1.y.toString()).style.backgroundImage = ''
      document.getElementById(point1.x.toString() + point1.y.toString()).style.backgroundSize = ''
    }
    /* place the robot in the new position */
    if (point2) {
      document.getElementById(point2.x.toString() + point2.y.toString()).style.backgroundImage = this.getRobotImage(point2)
      document.getElementById(point2.x.toString() + point2.y.toString()).style.backgroundSize = '100% 100%'
    }
  }

  /**
   * Provide robot image to be displayed
   * @param point
   * @returns robot image
   */
  getRobotImage(point) {
    return 'url("' + this.robotImages[_.findIndex(this.robotImages, function(position) { return position.orientation === point.f })].url + '")'
  }

}
