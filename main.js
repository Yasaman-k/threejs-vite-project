import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer({
    canvas: document.querySelector('#bg')
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30);
renderer.render(scene, camera)

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 });
const torus = new THREE.Mesh(geometry, material)
scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5, 5, 5)
const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50)
scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement)

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24)
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
    const star = new THREE.Mesh(geometry, material)
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))
    star.position.set(x, y, z)
    scene.add(star)
}

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('space.jpg')
scene.background = spaceTexture

// Avatar
const jeffTexture = new THREE.TextureLoader().load('jeff.png');
const jeff = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: jeffTexture }));
scene.add(jeff);


//text
var loader = new FontLoader();
loader.load('fonts/helvetiker_regular.typeface.json', function (font) {

    var textGeo = new TextGeometry("Yasaman Karbasi", {
        font: font,
        size: 8,
        height: 1,
        curveSegments: 1,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 0.2,
        bevelOffset: 0,
        bevelSegments: 5
    });

    textGeo.computeBoundingBox()
    const centerOffset = - 0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);
    var material = new THREE.MeshBasicMaterial({ color: 0x1AfCD4 });
    var textMesh1 = new THREE.Mesh(textGeo, material);
    textMesh1.position.x = centerOffset;
    textMesh1.position.y = 0;
    textMesh1.position.z = 0;
    scene.add(textMesh1);
});


//moon
const moonTexture = new THREE.TextureLoader().load('moon.jpg')
const normalTexture = new THREE.TextureLoader().load('normal.jpg')

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial(
        {
            map: moonTexture,
            normalMap: normalTexture
        }
    )
)
moon.position.z = 30
moon.position.setX(-10)
scene.add(moon);

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;

    jeff.rotation.y += 0.01;
    jeff.rotation.z += 0.01;

    camera.position.z = t * -0.01
    camera.position.x = t * -0.0002
    camera.position.y = t * -0.0002
}

document.body.onscroll = moveCamera

function animate() {
    requestAnimationFrame(animate)
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;
    controls.update()
    renderer.render(scene, camera)
}
animate()
