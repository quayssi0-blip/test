'use client';

import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';

interface MathSpace3DProps {
  height: number;
  baseRadius: number;
}

export default function MathSpace3D({ height, baseRadius }: MathSpace3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a1a); // Deep space blue

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 3, 6);

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    // Create pyramid group
    const pyramidGroup = new THREE.Group();
    scene.add(pyramidGroup);

    // Function to create/update pyramid
    const updatePyramid = () => {
      // Clear existing pyramid
      pyramidGroup.clear();

      // Create pyramid geometry (square base pyramid)
      const geometry = new THREE.ConeGeometry(baseRadius, height, 4, 1);
      
      // Create luminous cyan material with some transparency
      const material = new THREE.MeshStandardMaterial({
        color: 0x00ffff, // Cyan
        transparent: true,
        opacity: 0.7,
        emissive: 0x00ffff,
        emissiveIntensity: 0.5,
      });

      const pyramid = new THREE.Mesh(geometry, material);
      pyramid.rotation.x = Math.PI / 2; // Rotate to sit on base
      pyramidGroup.add(pyramid);

      // Add wireframe version (toggleable)
      const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      });
      const wireframePyramid = new THREE.Mesh(geometry, wireframeMaterial);
      wireframePyramid.rotation.x = Math.PI / 2;
      pyramidGroup.add(wireframePyramid);
    };

    // Initial pyramid creation
    updatePyramid();

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Slow rotation
      setRotation(prevRotation => prevRotation + 0.005);

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect =
        containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [height, baseRadius]);

  return (
    <div
      ref={containerRef}
      className="w-full h-[600px] rounded-2xl glass-panel-dark relative"
    >
      {/* Glass panel overlay for UI controls */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-4 flex flex-col items-center justify-center pointer-events-all">
          {/* Controls will be added here */}
        </div>
      </div>
    </div>
  );
}