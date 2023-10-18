import React from 'react';
import Head from 'next/head'
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
// @ts-ignore
import { Text } from "troika-three-text";
import TweenMax from "gsap"
import Header from '../components/header/Header';

import fontStyle from "../public/assets/fonts/gentilis_bold.typeface.json"
import { text } from 'node:stream/consumers';
class Home extends React.Component<{}> { 

  componentDidMount(){        
    let container:any, clock:any = new THREE.Clock();    
    let camera:any, renderer:any;
    let scene:any = new THREE.Scene()
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
    // console.log(sizes.width)
    // console.log(sizes.height)

    let sili_scale = 0
    let rot_scale = 0
    let log_scale = 0
    let flip_scale = 0
    let flip_size_scale = 0
    let flip_rot_scale = 0
    let flip_parms = 0
    let cart_scale = 0
    let carty = 0
    let cartz = 0
    let cart_move = 0
    let cloth_move = 0
    let corn_move = 0
    let extract_parms = 1
    //Iphone 12
    if (300 <= sizes.width && sizes.width < 600) {
      sili_scale = -0.05
      log_scale = -0.25
      rot_scale = 0.75
      flip_scale = 1
      flip_size_scale = 0.35
      flip_rot_scale = 1
      flip_parms = 1
      cart_scale = 0.37
      carty = 0.93
      cartz = 1.01
      cart_move = 4
      cloth_move = 7.5
      corn_move = 11
      // Ipad air/mini
    } else if (600 <= sizes.width && sizes.width < 900) {
      sili_scale = -0.25
      log_scale = -0.7
      rot_scale = 1.25
      flip_scale = 1.1
      flip_size_scale = 0.45
      flip_rot_scale = 1
      flip_parms = 1
      cart_scale = 0.5
      carty = 1.05
      cartz = 1.1
      cart_move = 4
      cloth_move = 7.5
      corn_move = 11
      // responsive
    } else if (900 <= sizes.width && sizes.width < 1200) {
      sili_scale = 0.1
      log_scale = -0.25
      rot_scale = 1.75
      flip_scale = 1.1
      flip_size_scale = 0.45
      flip_rot_scale = 1
      flip_parms = 1
      cart_scale = 0.49
      carty = 1.3
      cartz = 1.1
      cart_move = 4
      cloth_move = 7.5
      corn_move = 11
    } else if (1200 <= sizes.width && sizes.width < 1800) {
      sili_scale = -0.3
      log_scale = -1
      rot_scale = 2.3
      flip_scale = 1.1
      flip_size_scale = 0.45
      flip_rot_scale = 1
      flip_parms = 1
      cart_scale = 0.49 
      carty = 1.33
      cartz = 1.1
      cart_move = 4
      cloth_move = 7.5
      corn_move = 10.6
    } else if (1800 <= sizes.width && sizes.width < 3000) {
      sili_scale = -0.75
      log_scale = -2
      rot_scale = 3
      flip_scale = 1.8
      flip_size_scale = 1
      flip_rot_scale = 0.4
      flip_parms = 2.5
      cart_scale = 1
      carty = 2.75
      cartz = 2
      cart_move = 14
      cloth_move = 22
      corn_move = 29.3
      extract_parms = 1.69
    }
    
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

    let siliconCherryMesh:any = undefined;
    let siliconYellowMesh:any = undefined;
    let siliconLightBlueMesh:any = undefined;
    let siliconLightGreenMesh:any = undefined;
    let siliconPinkOrangeMesh:any = undefined;
    let glassBongMesh:any = undefined;
    let whiteLogoMesh:any = undefined;
    let siliconBongMesh:any = undefined;
    let topCapMesh:any = undefined;
    let topVentMesh:any = undefined;
    let mainTubeMesh:any = undefined;
    let bottomVentMesh:any = undefined;
    let bottomCapMesh:any = undefined;
    let outerCasingMesh:any = undefined;
    let carbonCheeseClothMesh:any = undefined;
    let cornSpiralMesh:any = undefined;
    const cartmove = 0

    const materialGlass = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0,
      roughness: 0.2,
      transmission: 1,
      ior: 1.5,
      reflectivity: 0.5,
      envMapIntensity: 1.5,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      normalScale: new THREE.Vector2( 0.3, 0.3 ),
      clearcoatNormalScale: new THREE.Vector2( 0.2, 0.2 ),
    });

    gltfLoader.load(
      '/assets/models/SiliconCherry.glb',
      
      (gltf) => {
        siliconCherryMesh = gltf.scene;
        siliconCherryMesh.scale.set(0.000012 * innerWidth, 0.000012 * innerWidth, 0.000012 * innerWidth)
        siliconCherryMesh.position.set(0,0,3)
        scene.add(siliconCherryMesh)

      }
    )
    gltfLoader.load(
      '/assets/models/SiliconYellow.glb',

      (gltf) => {
        siliconYellowMesh = gltf.scene;
        siliconYellowMesh.scale.set(0.000012 * innerWidth, 0.000012 * innerWidth, 0.000012 * innerWidth)
        siliconYellowMesh.position.set(0, 0, 3)
        scene.add(siliconYellowMesh)

      }
    )
    gltfLoader.load(
      '/assets/models/SiliconLightBlue.glb',

      (gltf) => {
        siliconLightBlueMesh = gltf.scene;
        siliconLightBlueMesh.scale.set(0.000012 * innerWidth, 0.000012 * innerWidth, 0.000012 * innerWidth)
        siliconLightBlueMesh.position.set(0.5, 0, 3)
        scene.add(siliconLightBlueMesh)

      }
    )
    gltfLoader.load(
      '/assets/models/SiliconLightGreen.glb',

      (gltf) => {
        siliconLightGreenMesh = gltf.scene;
        siliconLightGreenMesh.scale.set(0.000012 * innerWidth, 0.000012 * innerWidth, 0.000012 * innerWidth)
        siliconLightGreenMesh.position.set(1, 0, 3)
        scene.add(siliconLightGreenMesh)

      }
    )
    gltfLoader.load(
      '/assets/models/SiliconPinkOrange.glb',

      (gltf) => {
        siliconPinkOrangeMesh = gltf.scene;
        siliconPinkOrangeMesh.scale.set(0.000012 * innerWidth, 0.000012 * innerWidth, 0.000012 * innerWidth)
        siliconPinkOrangeMesh.position.set(1.5, 0, 3)
        scene.add(siliconPinkOrangeMesh)

      }
    )
    gltfLoader.load(
      '/assets/models/glassBong.glb',

      (gltf) => {
        let bong:any = gltf.scene.children.find((mesh) => mesh.name === "BONG_2");
        const geometry = bong.geometry.clone();

        glassBongMesh = new THREE.Mesh(geometry, materialGlass);
        glassBongMesh.scale.set(0.078, 0.078, 0.078)
        glassBongMesh.position.set(-0.86, -8.8, 0)
        glassBongMesh.rotation.set(0, Math.PI/2, 0)
        glassBongMesh.material = material
        //scene.add(glassBongMesh)
      }
    )
    gltfLoader.load(
      '/assets/models/whiteLogo.glb',

      (gltf) => {
        whiteLogoMesh = gltf.scene;
        whiteLogoMesh.scale.set(.00003 * innerWidth, .00003 * innerWidth, .00003 * innerWidth)
        whiteLogoMesh.position.set(0, log_scale , 0)

        scene.add(whiteLogoMesh)
      }
    )
    gltfLoader.load(
      '/assets/models/SiliconBong.glb',

      (gltf) => {
        siliconBongMesh = gltf.scene;
        siliconBongMesh.scale.set(0.045 * flip_size_scale, 0.045 * flip_size_scale, 0.045 * flip_size_scale)
        siliconBongMesh.position.set(0, flip_scale * -3.7, 0)
        scene.add(siliconBongMesh)
      }
    )
    gltfLoader.load(
      '/assets/models/outerCasing.glb',

      (gltf) => {
        outerCasingMesh = gltf.scene;
        outerCasingMesh.scale.set(cart_scale, cart_scale, cart_scale)
        outerCasingMesh.position.set(0, cartz * -4.3, carty)
      }
    )
    gltfLoader.load(
      '/assets/models/carbonCheeseCloth.glb',

      (gltf) => {
        carbonCheeseClothMesh = gltf.scene;
        carbonCheeseClothMesh.scale.set(cart_scale, cart_scale, cart_scale)
        carbonCheeseClothMesh.position.set(0, cartz * -4.3, carty)
      }
    )
    gltfLoader.load(
      '/assets/models/CornSpiral.glb',

      (gltf) => {
        cornSpiralMesh = gltf.scene;
        cornSpiralMesh.scale.set(cart_scale, cart_scale, cart_scale)
        cornSpiralMesh.position.set(0, cartz * -4.3, carty)
      }
    )
    
    

    //=========== scene, camera, renderer ===========
    container = document.getElementById( 'index-canvas-container' );
    scene = new THREE.Scene();

    const silLigRed = new THREE.PointLight(0xf7022a, 2, 3)
    const silLigYellow = new THREE.PointLight(0xffe135, 2, 3)
    const silLigLBlue = new THREE.PointLight(0x039be5, 2, 3)
    const silLigLGreen = new THREE.PointLight(0x26d701, 2, 3)
    const silLigPinOran = new THREE.PointLight(0xff9566, 2, 3)
    scene.add(silLigRed, silLigYellow, silLigPinOran, silLigLGreen, silLigLBlue)

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
        positions[i * 3 + 1] = 4 * 0.5 - Math.random()  * 24 //the length of the particles in the window
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

    // Create a texture loader so we can load our image file
    const loader = new THREE.TextureLoader();

    const geometry = new THREE.PlaneBufferGeometry( 1, 1 );

    const materialImg = new THREE.MeshPhongMaterial({
      map: loader.load('/assets/img/cat.jpg'),
      side: THREE.DoubleSide,
      transparent: true,
    });

    materialImg.needsUpdate = true;
    const planeImg = new THREE.Mesh( geometry, materialImg );
    planeImg.position.set(-2, -13, 0)

    // load font
    const font = new FontLoader().parse(fontStyle);

    // create text
    const textEnt = new Text();

    textEnt.text = "Hello";
    textEnt.font = font;
    textEnt.fontSize = 1.0;
    textEnt.maxWidth = 1.0;
    textEnt.position.x = -1.0;
    textEnt.position.y = -12.0;
    textEnt.position.z = 1.0;
    textEnt.textAlign = "center";
    textEnt.color = 0xFF0000;
    textEnt.anchorX = "right";
    textEnt.anchorY = "middle";
    textEnt.sync()

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
    
    container.appendChild( renderer.domElement );

    // Scroll
    let scrollY = window.scrollY
    let currentSection = 0

    window.addEventListener('scroll', () => {
      // console.log('scroll = ', window.scrollY)

      scrollY = window.scrollY / 2
      
      const newSection = scrollY / sizes.height

      if (newSection != currentSection) {
        currentSection = newSection
      }
      
      // Movement of bong
      // if (siliconBongMesh != undefined && topCapMesh != undefined && topVentMesh != undefined && mainTubeMesh != undefined && bottomCapMesh != undefined && bottomVentMesh != undefined) {
      //   if (0.3 < newSection && newSection  < 0.55) {
      //     siliconBongMesh.position.set(0, -5.55, 0)
      //     glassBongMesh.position.set(-0.86, -8.8 - ((newSection - 0.3) * 6), -0.2)
      //     topCapMesh.position.set(0, -4.5 + ((newSection - 0.3) * 4), 0)
      //     topVentMesh.position.set(0, -4.47 + ((newSection - 0.3) * 4), 0)
      //     mainTubeMesh.position.set(0, -5 + ((newSection - 0.3) * 4), 0)
      //     bottomVentMesh.position.set(0, -5.03 + ((newSection - 0.3) * 4), 0)
      //     bottomCapMesh.position.set(0, -5.02 + ((newSection - 0.3) * 4), 0)
      //   }
      //   if (0.55 < newSection && newSection < 1.4) {
      //       siliconBongMesh.position.set(0, -5.55, 0)
      //       glassBongMesh.position.set(-0.86, (-8.8 - ((newSection - 0.3) * 6)) + ((newSection - 0.55) * 12), -0.2)
      //       //topCapMesh.position.set(0, -4.5 + ((newSection - 0.3) * 4), 0)
      //       //topVentMesh.position.set(0, -4.47 + ((newSection - 0.3) * 4), 0)
      //       //mainTubeMesh.position.set(0, -5 + ((newSection - 0.3) * 4), 0)
      //       //bottomVentMesh.position.set(0, -5.03 + ((newSection - 0.3) * 4), 0)
      //       //bottomCapMesh.position.set(0, -5.02 + ((newSection - 0.3) * 4), 0)
      //   }
      // }
      if (siliconBongMesh != undefined && outerCasingMesh != undefined && carbonCheeseClothMesh != undefined && cornSpiralMesh != undefined) {
        if (0.01 < newSection && newSection  < 0.39 * flip_parms) {
          siliconBongMesh.rotation.set(0, 0, - Math.PI * newSection * 2.57 * flip_rot_scale)
          scene.remove(outerCasingMesh)
          scene.remove(carbonCheeseClothMesh)
          scene.remove(cornSpiralMesh)
          scene.remove(planeImg);
          scene.remove(textEnt)
        }
        if (0.39 * flip_parms < newSection && newSection < 0.5 * flip_parms) {
          siliconBongMesh.rotation.set(0, 0, - Math.PI )
          scene.add(outerCasingMesh)
          scene.add(carbonCheeseClothMesh)
          scene.add(cornSpiralMesh)
          scene.add(planeImg);
          scene.add(textEnt)
        }
        if (0.51 * flip_parms < newSection && newSection  < 0.93 * extract_parms) {
          outerCasingMesh.position.set(0, cartz * -4.3 - ((newSection - 0.51 * flip_parms) * cart_move), carty)
          carbonCheeseClothMesh.position.set(0, cartz * -4.3 - ((newSection - 0.51 * flip_parms) * cloth_move), carty)
          cornSpiralMesh.position.set(0, cartz * -4.3 - ((newSection - 0.51 * flip_parms) * corn_move), carty)
        }
      }
    })      
    
    window.addEventListener('resize', () =>
    {
      // Update sizes
      sizes.width = window.innerWidth
      sizes.height = window.innerHeight 

      // Update camera
      camera.aspect = sizes.width / sizes.height
      camera.updateProjectionMatrix()

      // Update renderer
      renderer.textureEncoding = THREE.sRGBEncoding;
      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })
    
    // cursor
    const cursor = {x: 0, y: 0};

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

      if (siliconCherryMesh != undefined && siliconYellowMesh != undefined && siliconLightGreenMesh != undefined && siliconLightBlueMesh != undefined && siliconPinkOrangeMesh != undefined && glassBongMesh != undefined) {
        siliconCherryMesh.position.set(Math.sin((elapsedTime / 2) - (Math.PI * 1 / 5 * 2)) * rot_scale, 1.5 * sili_scale, Math.cos((elapsedTime / 2) - (Math.PI * 1 / 5 * 2)) * rot_scale)
        siliconYellowMesh.position.set(Math.sin((elapsedTime / 2) - (Math.PI * 2 / 5 * 2)) * rot_scale, 1.5 * sili_scale, Math.cos((elapsedTime / 2) - (Math.PI * 2 / 5 * 2)) * rot_scale)
        siliconLightGreenMesh.position.set(Math.sin((elapsedTime / 2) - (Math.PI * 3 / 5 * 2)) * rot_scale, 1.5 * sili_scale, Math.cos((elapsedTime / 2) - (Math.PI * 3 / 5 * 2)) * rot_scale)
        siliconLightBlueMesh.position.set(Math.sin((elapsedTime / 2) - (Math.PI * 4 / 5 * 2)) * rot_scale, 1.5 * sili_scale, Math.cos((elapsedTime / 2) - (Math.PI * 4 / 5 * 2)) * rot_scale)
        siliconPinkOrangeMesh.position.set(Math.sin((elapsedTime / 2) - (Math.PI * 2)) * rot_scale, 1.5 * sili_scale, Math.cos((elapsedTime / 2) - (Math.PI * 2)) * rot_scale)
      }

      //movement of lights inside of silicon
      silLigRed.position.set(Math.sin((elapsedTime / 2) - (Math.PI * 1 / 5 * 2)) * rot_scale, 1.5 * sili_scale, Math.cos((elapsedTime / 2) - (Math.PI * 1 / 5 * 2)) * rot_scale)
      silLigYellow.position.set(Math.sin((elapsedTime / 2) - (Math.PI * 2 / 5 * 2)) * rot_scale, 1.5 * sili_scale, Math.cos((elapsedTime / 2) - (Math.PI * 2 / 5 * 2)) * rot_scale)
      silLigLGreen.position.set(Math.sin((elapsedTime / 2) - (Math.PI * 3 / 5 * 2)) * rot_scale, 1.5 * sili_scale, Math.cos((elapsedTime / 2) - (Math.PI * 3 / 5 * 2)) * rot_scale)
      silLigLBlue.position.set(Math.sin((elapsedTime / 2) - (Math.PI * 4 / 5 * 2)) * rot_scale, 1.5 * sili_scale, Math.cos((elapsedTime / 2) - (Math.PI * 4 / 5 * 2)) * rot_scale)
      silLigPinOran.position.set(Math.sin((elapsedTime / 2) - (Math.PI * 2)) * rot_scale, 1.5 * sili_scale, Math.cos((elapsedTime / 2) - (Math.PI * 2)) * rot_scale)

      
      
      



      // Render
      renderer.render(scene, camera)

      // Call tick again on the next frame
      window.requestAnimationFrame(animate)    
    }

    animate();
  }

  render(){
    return (
      <>
        <Head>
          <title>Gbuddies</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <div id='index-canvas-container'></div>
        <section className="section">
            <h1></h1>
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
            <h2></h2>
        </section>
        <section className="section">
            <h2></h2>
        </section>
        <Header/>
      </>
    );
  }
}

export default Home;