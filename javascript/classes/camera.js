import MovingObject from 'classes/moving-object'
import Vec3 from 'math/vec3'

export const UP = new Vec3({ x: 0, y: 1, z: 0 })
export const DIRECTION = new Vec3({ x: 1, y: 0, z: 0 })
export const VELOCITY = new Vec3({ x: 0, y: 0, z: 0 })

export default class Camera extends MovingObject {
  constructor () {
    super()
    this.direction = DIRECTION
    this.up = UP
    this.velocity = VELOCITY
  }
}
