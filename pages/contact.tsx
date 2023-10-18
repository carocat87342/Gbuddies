import React from 'react';
import Head from 'next/head'
import {isMobile } from 'react-device-detect';

import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"
import Header from '../components/header/Header';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { title } from 'process';
import {CSS2DRenderer, CSS2DObject} from "three/examples/jsm/renderers/CSS2DRenderer";
class Home extends React.Component<{}> {

    componentDidMount() {
        let container: any, clock: any = new THREE.Clock();
        let camera: any, renderer: any;
        let scene: any = new THREE.Scene()
        let parameters = {
            materialColor: '#81d4fa'
        }
        let previousTime = 0
        const gltfLoader = new GLTFLoader()

        /**
         * Sizes
         */
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }

        const labelRederer = new CSS2DRenderer();
        labelRederer.setSize(window.innerWidth * 0.98, window.innerHeight * 0.98);
        labelRederer.domElement.style.position = 'absolute';
        labelRederer.domElement.style.top = '0px';
        document.body.appendChild(labelRederer.domElement);

        //Models
        const params = {
            color: 0xffffff,
            transmission: 0.8,
            opacity: 3,
            metalness: 0,
            roughness: 0,
            ior: 1.52,
            thickness: 0.1,
            specularIntensity: 10,
            specularColor: 0xffffff,
            lightIntensity: 1,
            exposure: 1
        };

        

        const material = new THREE.MeshPhysicalMaterial({
            color: params.color,
            metalness: params.metalness,
            roughness: params.roughness,
            ior: params.ior,
            transmission: params.transmission,
            specularIntensity: params.specularIntensity,
            opacity: params.opacity,
            side: THREE.DoubleSide,
        });

        // Load Models

        let siliconYellowMesh: any = undefined;
        let siliconLightBlueMesh: any = undefined;
        let siliconPinkOrangeMesh: any = undefined;
        gltfLoader.load(
            '/assets/models/SiliconYellow.glb',

            (gltf) => {
                siliconYellowMesh = gltf.scene;
                siliconYellowMesh.scale.set(0.018, 0.018, 0.018)
                siliconYellowMesh.position.set(0, -0.7, 3)
                siliconYellowMesh.rotation.z = - Math.PI / 4.5
                scene.add(siliconYellowMesh)

            }
        )
        gltfLoader.load(
            '/assets/models/SiliconLightBlue.glb',

            (gltf) => {
                siliconLightBlueMesh = gltf.scene;
                siliconLightBlueMesh.scale.set(0.018, 0.018, 0.018)
                siliconLightBlueMesh.position.set(1.5, -0.7, 3)
                siliconLightBlueMesh.rotation.z = - Math.PI / 4.5
                scene.add(siliconLightBlueMesh)

            }
        )
        gltfLoader.load(
            '/assets/models/SiliconPinkOrange.glb',

            (gltf) => {
                siliconPinkOrangeMesh = gltf.scene;
                siliconPinkOrangeMesh.scale.set(0.018, 0.018, 0.018)
                siliconPinkOrangeMesh.position.set(-1.5, -0.7, 3)
                siliconPinkOrangeMesh.rotation.z = - Math.PI / 4.5
                scene.add(siliconPinkOrangeMesh)

            }
        )

        const p = document.createElement('p');
        p.textContent = 'Hello';
        const cPointLabel = new CSS2DObject(p);
        scene.add(cPointLabel)
        cPointLabel.position.set(0, -2, 0);

        
        const cartmove = 0
            // title

        

        

        //=========== scene, camera, renderer ===========
        container = document.getElementById('index-canvas-container');
        scene = new THREE.Scene();

        

        /**
         * Camera
         */

        const cameraGroup = new THREE.Group()
        scene.add(cameraGroup)

        // Base camera
        camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
        camera.position.z = 7
        cameraGroup.add(camera)

        // Particles
        // geometry 
        const particlesCount = 500
        const positions = new Float32Array(particlesCount * 3)

        for (let i = 0; i < particlesCount; i++) {
            positions[i * 3 + 0] = (Math.random() - 0.5) * 10
            positions[i * 3 + 1] = 4 * 0.5 - Math.random() * 24 //the length of the particles in the window
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10
        }

        const particlesGeometry = new THREE.BufferGeometry()
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

        // matrerial

        const particlesMaterial = new THREE.PointsMaterial({
            color: parameters.materialColor,
            sizeAttenuation: true,
            size: 0.03
        })

        

        // points
        const particles = new THREE.Points(particlesGeometry, particlesMaterial)
        scene.add(particles)
        // lights

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
        directionalLight.position.set(0, 0, 1)
        scene.add(directionalLight)

        const ambientLight = new THREE.AmbientLight()
        ambientLight.color = new THREE.Color(0xffffff)
        ambientLight.intensity = 0.3
        scene.add(ambientLight)

        /**
         * Renderer
         */
        renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        })

        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.shadowMap.enabled = true

        container.appendChild(renderer.domElement);

        // Scroll
        let scrollY = window.scrollY
        let currentSection = 0

        window.addEventListener('scroll', () => {
            console.log('scroll = ', window.scrollY)

            scrollY = window.scrollY / 2

            const newSection = scrollY / sizes.height
            console.log(scrollY)
            console.log(newSection)

            if (newSection != currentSection) {
                currentSection = newSection
            }

            // Movement of bong
            //if (siliconBongMesh != undefined && topCapMesh != undefined && topVentMesh != undefined && mainTubeMesh != undefined && bottomCapMesh != undefined && bottomVentMesh != undefined) {
            //    if (0.3 < newSection && newSection < 0.55) {
            //        siliconBongMesh.position.set(0, -5.55, 0)
                   
            //    }
            //}
        })

        window.addEventListener('resize', () => {
            // Update sizes
            sizes.width = window.innerWidth
            sizes.height = window.innerHeight

            // Update camera
            camera.aspect = sizes.width / sizes.height
            camera.updateProjectionMatrix()

            // Update renderer
            renderer.setSize(sizes.width, sizes.height)

            // Update renderer
            renderer.textureEncoding = THREE.sRGBEncoding;
            renderer.setSize(sizes.width, sizes.height)
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        })



        // cursor
        const cursor = { x: 0, y: 0 };

        window.addEventListener('mousemove', (event) => {
            cursor.x = event.clientX / sizes.width - 0.5
            cursor.y = event.clientY / sizes.height - 0.5
        })

        function animate() {
            const elapsedTime = clock.getElapsedTime()
            const deltaTime = elapsedTime - previousTime
            previousTime = elapsedTime

            //animate camera
            // Window length
            camera.position.y = - scrollY / sizes.height * 8 //the 4 is the height of the window

            const parallaxX = cursor.x * 0.5
            const parallaxY = - cursor.y * 0.5
            cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 5 * deltaTime
            cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 5 * deltaTime

            //movement of silicon top page

            if (siliconYellowMesh != undefined && siliconLightBlueMesh != undefined && siliconPinkOrangeMesh != undefined ) {
                siliconYellowMesh.rotation.y = - elapsedTime
                siliconLightBlueMesh.rotation.y = - elapsedTime
                siliconPinkOrangeMesh.rotation.y = - elapsedTime
            }

            //movement of lights inside of silicon
            //silLigRed.position.set(Math.sin((elapsedTime / 2) - (Math.PI * 1 / 5 * 2)) * 2, -0.4, Math.cos((elapsedTime / 2) - (Math.PI * 1 / 5 * 2)) * 2)
            //render text\
            labelRederer.render(scene, camera);

            // Render
            renderer.render(scene, camera)

            // Call tick again on the next frame
            window.requestAnimationFrame(animate)
        }

        animate();
    }

    render() {
        return (
            <>
                <Head>
                    <title>Gbuddies</title>
                    <meta name="description" content="Generated by create next app" />
                    <link rel="icon" href="/favicon.png" />
                </Head>
                <div id='index-canvas-container'></div>
                <section className="productsTitle">
                    <h1>hi</h1>
                </section>
                <section className="section">
                    <h2></h2>
                </section>
                <section className="section">
                    <h2></h2>
                </section>
                <section className="section">
                    <h2></h2>
                </section>
                <section className="section">
                    <h2>Hello</h2>
                </section>
                <Header />
            </>
        );
    }
}

export default Home;