import * as THREE from 'three';
import './style.css'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

var loader = new FontLoader();
loader.load('fonts/helvetiker_regular.typeface.json', function (font) {

    var scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xff0000 );
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.setZ(75);

    var renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#text')
    });

    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
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
    // camera.position.z = 10;
    // camera.position.z = 10;
    // camera.position.z = 10;
    function render() {
        requestAnimationFrame(render);
        textMesh1.rotation.y -= 0.00009;
        // textMesh1.rotation.z += 0.01;
        renderer.render(scene, camera);
    }
    render();
});


