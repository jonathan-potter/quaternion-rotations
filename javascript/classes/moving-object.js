import Vec3 from 'math/vec3'
window.Vec3 = Vec3

const { abs } = Math

let CENTER = { x: 0, y: 0, z: 0 }
const BOUNDS = 1000

export default class MovingObject {
  constructor () {
    this.position = new Vec3({ x: 0, y: 0, z: 0 })
    this.velocity = new Vec3({ x: 0, y: 0, z: 0 })
  }

  outsideBounds () {
    return (
      abs(this.position.x - CENTER.x) > BOUNDS ||
      abs(this.position.y - CENTER.y) > BOUNDS ||
      abs(this.position.z - CENTER.z) > BOUNDS
    )
  }

  move () {
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    this.position.z += this.velocity.z

    if (this.outsideBounds()) {
      Object.assign(this.position, Vec3.randomInRadius(BOUNDS, CENTER))
      Object.assign(this.velocity, Vec3.randomInRadius(2))
    }
  }

  static createRandom () {
    var movingObject = new MovingObject()

    Object.assign(movingObject.position, Vec3.randomInRadius(1000, CENTER))
    Object.assign(movingObject.velocity, Vec3.randomInRadius(2))

    return movingObject
  }

  static setCenter (middle) {
    CENTER = middle
  }
}
