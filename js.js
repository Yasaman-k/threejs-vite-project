import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'




var loader = new FontLoader();
loader.load('fonts/helvetiker_regular.typeface.json', function (font) {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    scene.add(camera)

    const renderer = new THREE.WebGL1Renderer()

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var logo = new TextGeometry('HELOOWW WORLD',
        {
            font: font, size: 80, height: 5,
            curveSegments: 12, bevelEnabled: true,
            bevelThickness: 10, bevelSize: 8,
            bevelSegments: 5
        });

    var material = new THREE.MeshPhongMaterial({ color: 0xFF0033 });
    var mesh = new THREE.Mesh(logo, material);
    mesh.position.z = -1000;
    scene.add(mesh);

    camera.position.z = 5;


    function animate() {
        requestAnimationFrame(animate)
        renderer.render(scene, camera)
    }
    animate()
});


