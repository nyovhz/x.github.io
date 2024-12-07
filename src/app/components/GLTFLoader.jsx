import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const GLTFModel = ({ modelUrl }) => {
  const meshRef = useRef(null);

  useEffect(() => {
    const loader = new GLTFLoader();

    // Cargar el modelo 3D
    loader.load(
      modelUrl,  // Ruta al archivo GLTF o GLB
      (gltf) => {
        if (meshRef.current) {
          meshRef.current.add(gltf.scene); // Añadir el modelo cargado a la escena
        }
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

    // Cleanup: no es necesario si `meshRef` no se desmonta, pero es recomendable
    return () => {
      if (meshRef.current) {
        meshRef.current.clear(); // Limpiar cualquier modelo si el componente se desmonta
      }
    };
  }, [modelUrl]); // Se ejecuta cuando modelUrl cambia

  return <group ref={meshRef} />; // Devolvemos un grupo para añadir el modelo
};

export default GLTFModel;
