import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

var loader = new FontLoader();
loader.load('fonts/helvetiker_regular.typeface.json', function (font) {

        
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    var textGeo = new TextGeometry("fuckkkkkkkkkkkk", {

        font: font,
		size: 3,
		height: 1,
		// curveSegments: 12,
		// bevelEnabled: true,
		// bevelThickness: 10,
		// bevelSize: 8,
		// bevelOffset: 0,
		// bevelSegments: 5

    });


    //  var geometry = new THREE.CubeGeometry(10,10,1);
    var material = new THREE.MeshBasicMaterial({ color: 0x11ff00 });
    var textGeo = new THREE.Mesh(textGeo, material);
    scene.add(textGeo);
    camera.position.z = 10;
    function render() {
        requestAnimationFrame(render);
        textGeo.rotation.x += 0.01;
        // textGeo.rotation.y += 0.01;
        renderer.render(scene, camera);
    }


    render();

});


