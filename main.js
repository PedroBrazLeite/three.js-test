import './style.css';

import * as THREE from 'https://unpkg.com/three@0.139.2/build/three.module.js';

//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);

const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
// camera.position.setZ(30);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
	color: 0xff6347,
});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

//const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
	const geometry = new THREE.SphereGeometry(0.25, 24, 24);
	const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
	const star = new THREE.Mesh(geometry, material);

	const [x, y, z] = Array(3)
		.fill()
		.map(() => THREE.MathUtils.randFloatSpread(100));

	star.position.set(x, y, z);
	scene.add(star);
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// Avatar

const pedroTexture = new THREE.TextureLoader().load('pedro.jpg');

const pedro = new THREE.Mesh(
	new THREE.BoxGeometry(3, 3, 3),
	new THREE.MeshStandardMaterial({ map: pedroTexture })
);

scene.add(pedro);

// Moon

const marsTexture = new THREE.TextureLoader().load('mars.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const mars = new THREE.Mesh(
	new THREE.SphereGeometry(3, 32, 32),
	new THREE.MeshStandardMaterial({
		map: marsTexture,
		normalMap: normalTexture,
	})
);

scene.add(mars);

mars.position.z = 30;
mars.position.setX(-10);

pedro.position.z = -5;
pedro.position.x = 2;

function moveCamera() {
	const t = document.body.getBoundingClientRect().top;

	mars.rotation.x += 0.05;
	mars.rotation.y += 0.075;
	mars.rotation.z += 0.05;

	pedro.rotation.y += 0.01;
	pedro.rotation.z += 0.01;

	camera.position.z = t * -0.01;
	camera.position.x = t * -0.0002;
	camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

function animate() {
	requestAnimationFrame(animate);

	torus.rotation.x += 0.01;
	torus.rotation.y += 0.005;
	torus.rotation.z += 0.01;

	mars.rotation.x += 0.005;

	//controls.update();

	renderer.render(scene, camera);
}

animate();
