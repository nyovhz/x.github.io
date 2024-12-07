import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Scene = () => {
  const mountRef = useRef(null);

  let alpha = 0;
  let beta = 0;
  let gamma = 0;

  useEffect(() => {
    // Solicitar permiso para usar los sensores en navegadores que lo requieren
    const requestPermission = async () => {
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        try {
          const permission = await DeviceOrientationEvent.requestPermission();
          if (permission !== 'granted') {
            console.warn('Permission to access device orientation denied.');
          }
        } catch (err) {
          console.error('Error requesting device orientation permission:', err);
        }
      }
    };
    requestPermission();

    // Listener para deviceorientation
    const handleOrientation = (evt) => {
      if (evt.alpha !== null && evt.beta !== null && evt.gamma !== null) {
        alpha = evt.alpha;
        beta = evt.beta;
        gamma = evt.gamma;
      }
    };
    window.addEventListener('deviceorientation', handleOrientation);

    // Configuración inicial de la escena
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Luz
    const light = new THREE.AmbientLight(0x404040); // Luz ambiental
    scene.add(light);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Luz direccional
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Cargar modelo GLTF
    const loader = new GLTFLoader();
    let model = null;

    loader.load(
      'public/hallway.glb',  // Cambia esto a la ruta de tu archivo GLTF
      (gltf) => {
        model = gltf.scene;
        scene.add(model);
      },
      // Progreso de carga
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% cargado');
      },
      // Error de carga
      (error) => {
        console.error('Error al cargar el modelo:', error);
      }
    );

    // Posiciones iniciales
    //camera.position.z = 5;

    let prevBeta = 0;
    let prevGamma = 0;
    let prevAlpha = 0;

    // Función para normalizar ángulos y suavizar cambios
    const normalizeAngle = (angle) => {
      while (angle > Math.PI) angle -= 2 * Math.PI;
      while (angle < -Math.PI) angle += 2 * Math.PI;
      return angle;
    };

    // Animación
    const animate = () => {
      requestAnimationFrame(animate);

      // Convertir a radianes
      const alphaRad = THREE.MathUtils.degToRad(alpha);
      const betaRad = THREE.MathUtils.degToRad(beta);
      const gammaRad = THREE.MathUtils.degToRad(gamma);

      // Normalizar cambios
      const deltaBeta = normalizeAngle(betaRad - prevBeta);
      const deltaGamma = normalizeAngle(gammaRad - prevGamma);
      const deltaAlpha = normalizeAngle(alphaRad - prevAlpha);

      // Suavizar movimientos
      const smoothingFactor = 0.1;
      const smoothBeta = prevBeta + deltaBeta * smoothingFactor;
      const smoothGamma = prevGamma + deltaGamma * smoothingFactor;

      // Crear cuaternión con ángulos suavizados
      const quaternion = new THREE.Quaternion();
      const euler = new THREE.Euler(smoothBeta, -smoothGamma, 0, 'YXZ'); // '0' fija la rotación en Z
      quaternion.setFromEuler(euler);
      camera.quaternion.copy(quaternion);

      // Guardar valores para el siguiente frame
      prevBeta = smoothBeta;
      prevGamma = smoothGamma;

      renderer.render(scene, camera);
    };
    animate();

    // Ajustar tamaño en caso de redimensionar la ventana
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onWindowResize);

    // Cleanup
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
      window.removeEventListener('resize', onWindowResize);
      mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
      renderer.forceContextLoss();
    };
  }, []);

  return <div ref={mountRef} />;
};

export default Scene;
