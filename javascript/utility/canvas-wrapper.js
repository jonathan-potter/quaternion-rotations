import * as THREE from 'three'

const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight
const FAR = 5000
const meshes = []
const renderer = new THREE.WebGLRenderer({ antialias: true })
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT)
const light = new THREE.DirectionalLight(0xffffbb, 0x080820, 0.7)

let numberOfMeshes

export function init (meshCount) {
  renderer.setSize(WIDTH, HEIGHT)
  renderer.setClearColor(0xDDDDDD, 1)

  renderer.shadowMapEnabled = true
  renderer.shadowMapType = THREE.PCFSoftShadowMap
  renderer.shadowMapSoft = true

  renderer.shadowCameraNear = 3
  renderer.shadowCameraFar = camera.far
  renderer.shadowCameraFov = 50

  renderer.shadowMapBias = 0.0039
  renderer.shadowMapDarkness = 0.5
  renderer.shadowMapWidth = 1024
  renderer.shadowMapHeight = 1024

  document.body.appendChild(renderer.domElement)

  camera.position.x = 0
  camera.position.y = 0
  camera.position.z = 0
  camera.far = FAR

  light.position.set(0, 1000, 20)
  light.target.position.set(0, 0, 0)

  light.castShadow = true
  light.shadowDarkness = 0.5
  light.shadowCameraVisible = true

  scene.add(camera)
  scene.add(light)
}

export function addObjectsToScene (meshCount) {
  numberOfMeshes = meshCount

  for (let count = 0; count < numberOfMeshes; count++) {
    let sphereGeometry = new THREE.SphereGeometry(10, 10, 10)
    let basicMaterial = new THREE.MeshLambertMaterial({color: 0x0095DD})
    let sphere = new THREE.Mesh(sphereGeometry, basicMaterial)
    sphere.castShadow = true
    sphere.recieveShadow = true
    meshes.push(sphere)
    scene.add(sphere)
  }
}

export function render () {
  renderer.render(scene, camera)
}

export function setPositions (positions) {
  positions.forEach(({ x, y, z }, index) => {
    meshes[index].position.set(x, y, z)
  })
}

export { camera }
