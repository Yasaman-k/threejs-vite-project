import '../css/cube.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

let scene, camera, renderer;


function init() {
    scene = new THREE.Scene()
    scene.background = new THREE.Color(0xff0000)
    camera = new THREE.PerspectiveCamera(75, window.innerWidth, window.innerHeight, 0.1, 30000)
    camera.position.set(-900, -200, -900)
    renderer = new THREE.WebGL1Renderer({
        canvas: document.querySelector('#bg')
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement);


    let controls = new OrbitControls(camera, renderer.domElement)
    controls.addEventListener('change', renderer)
    controls.minDistance = 500
    controls.maxDistance = 1500

    let materialArray = []
    let texture_ft = new THREE.TextureLoader().load('images/skybox/heather_ft.jpg')
    let texture_dn = new THREE.TextureLoader().load('images/skybox/heather_dn.jpg')
    let texture_bk = new THREE.TextureLoader().load('images/skybox/heather_bk.jpg')
    let texture_up = new THREE.TextureLoader().load('images/skybox/heather_up.jpg')
    let texture_lf = new THREE.TextureLoader().load('images/skybox/heather_lf.jpg')
    let texture_rt = new THREE.TextureLoader().load('images/skybox/heather_rt.jpg')

    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }))
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }))
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }))
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }))
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lf }))
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }))


    for (let i = 0; i < 6; i++)
        materialArray[i].side = THREE.BackSide;

    console.log(materialArray);

    let skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
    let skybox = new THREE.Mesh(skyboxGeo, materialArray);
    scene.add(skybox);
    animate()
}


function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

init()