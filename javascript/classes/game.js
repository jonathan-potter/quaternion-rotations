import { Matrix4 } from 'three'
import { init, render, setPositions, addObjectsToScene, camera as threeCamera } from 'utility/canvas-wrapper'
import MovingObject from 'classes/moving-object'
import Camera, { DIRECTION, UP } from 'classes/camera'
import Quaternion from 'classes/Quaternion'
import Vec3 from 'math/vec3'

const { requestAnimationFrame } = window
const { PI: pi } = Math

const camera = new Camera()
window.camera = camera
const OBJECTS = []
const NUMBER_OF_OBJECTS = 1000
const keyStates = {}

export default class Game {
  move () {
    OBJECTS.forEach(object => object.move())
    camera.move()
  }

  updateThreejsCamera () {
    const { direction, position, up } = camera

    threeCamera.up.set(up.x, up.y, up.z)
    threeCamera.position.set(position.x, position.y, position.z)

    const matrix = new Matrix4()
    const target = {
      x: position.x + direction.x,
      y: position.y + direction.y,
      z: position.z + direction.z
    }

    matrix.lookAt(position, target, up)

    threeCamera.quaternion.setFromRotationMatrix(matrix)
  }

  updateCameraState () {
    let { direction, up, velocity } = camera
    console.log(direction)
    console.log(up)

    const right = direction.cross(up)

    if (keyStates['w']) {
      const directionQ = Quaternion.fromVec3(direction)
      const rightQ = Quaternion.fromVec3(right)
      const newDirection = rightQ.rotateAroundCurrentAxis(-pi / 100, directionQ)
      direction = newDirection.toVec3()
      up = right.cross(direction)
    }

    if (keyStates['s']) {
      const directionQ = Quaternion.fromVec3(direction)
      const rightQ = Quaternion.fromVec3(right)
      const newDirection = rightQ.rotateAroundCurrentAxis(pi / 100, directionQ)
      direction = newDirection.toVec3()
      up = right.cross(direction)
    }

    if (keyStates['a']) {
      const directionQ = Quaternion.fromVec3(direction)
      const upQ = Quaternion.fromVec3(up)
      const newDirection = upQ.rotateAroundCurrentAxis(pi / 100, directionQ)
      direction = newDirection.toVec3()
    }

    if (keyStates['d']) {
      const directionQ = Quaternion.fromVec3(direction)
      const upQ = Quaternion.fromVec3(up)
      const newDirection = upQ.rotateAroundCurrentAxis(-pi / 100, directionQ)
      direction = newDirection.toVec3()
    }

    if (keyStates['q']) {
      const directionQ = Quaternion.fromVec3(direction)
      const upQ = Quaternion.fromVec3(up)
      const newUp = directionQ.rotateAroundCurrentAxis(-pi / 100, upQ)
      up = newUp.toVec3()
    }

    if (keyStates['e']) {
      const directionQ = Quaternion.fromVec3(direction)
      const upQ = Quaternion.fromVec3(up)
      const newUp = directionQ.rotateAroundCurrentAxis(pi / 100, upQ)
      up = newUp.toVec3()
    }

    if (keyStates['r']) {
      direction = DIRECTION
      up = UP
    }

    if (keyStates['-']) {
      velocity.add(direction.scale(0.05))
    }

    camera.direction = direction
    camera.up = up
  }

  step () {
    const { position } = camera
    MovingObject.setCenter(position)

    this.move()

    const positions = OBJECTS.map(object => object.position)

    this.updateCameraState()
    this.updateThreejsCamera()
    setPositions(positions)

    render()
    requestAnimationFrame(this.step.bind(this))
  }

  generateObjects () {
    while (OBJECTS.length < NUMBER_OF_OBJECTS) {
      OBJECTS.push(MovingObject.createRandom())
    }
  }

  start () {
    this.generateObjects()
    init()
    addObjectsToScene(NUMBER_OF_OBJECTS)

    this.step.apply(this)
  }
}

window.addEventListener('keydown', event => {
  keyStates[event.key] = true
})

window.addEventListener('keyup', event => {
  keyStates[event.key] = false
})
