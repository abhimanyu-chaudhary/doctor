"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Doctor3DScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 28;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group to hold our DNA
    const dnaGroup = new THREE.Group();
    scene.add(dnaGroup);

    // Create DNA Double Helix
    const numPoints = 140;
    const radius = 5;
    const turns = 4.5;

    const geomHelix1 = new THREE.BufferGeometry();
    const geomHelix2 = new THREE.BufferGeometry();
    const geomRungs = new THREE.BufferGeometry();

    const posHelix1: number[] = [];
    const posHelix2: number[] = [];
    const posRungs: number[] = [];

    const colorHelix1: number[] = [];
    const colorHelix2: number[] = [];
    const colorRungs: number[] = [];

    const colorPrimary = new THREE.Color("#00f2fe");
    const colorSecondary = new THREE.Color("#4facfe");

    for (let i = 0; i < numPoints; i++) {
      const t = (i / numPoints) * Math.PI * 2 * turns;
      const y = (i / numPoints) * 22 - 11; // Center along Y (-11 to 11)

      // Helix 1
      const x1 = radius * Math.cos(t);
      const z1 = radius * Math.sin(t);
      posHelix1.push(x1, y, z1);
      colorHelix1.push(colorPrimary.r, colorPrimary.g, colorPrimary.b);

      // Helix 2
      const x2 = -radius * Math.cos(t);
      const z2 = -radius * Math.sin(t);
      posHelix2.push(x2, y, z2);
      colorHelix2.push(colorSecondary.r, colorSecondary.g, colorSecondary.b);

      // Connecting rungs every few steps
      if (i % 3 === 0) {
        posRungs.push(x1, y, z1);
        posRungs.push(x2, y, z2);
        
        colorRungs.push(colorPrimary.r, colorPrimary.g, colorPrimary.b);
        colorRungs.push(colorSecondary.r, colorSecondary.g, colorSecondary.b);
      }
    }

    geomHelix1.setAttribute("position", new THREE.Float32BufferAttribute(posHelix1, 3));
    geomHelix1.setAttribute("color", new THREE.Float32BufferAttribute(colorHelix1, 3));

    geomHelix2.setAttribute("position", new THREE.Float32BufferAttribute(posHelix2, 3));
    geomHelix2.setAttribute("color", new THREE.Float32BufferAttribute(colorHelix2, 3));

    geomRungs.setAttribute("position", new THREE.Float32BufferAttribute(posRungs, 3));
    geomRungs.setAttribute("color", new THREE.Float32BufferAttribute(colorRungs, 3));

    // Particle materials
    const matHelix = new THREE.PointsMaterial({
      size: 0.3,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });

    const matRungs = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending
    });

    const points1 = new THREE.Points(geomHelix1, matHelix);
    const points2 = new THREE.Points(geomHelix2, matHelix);
    const rungs = new THREE.LineSegments(geomRungs, matRungs);

    dnaGroup.add(points1);
    dnaGroup.add(points2);
    dnaGroup.add(rungs);

    // Add some soft background particles
    const bgParticlesGeom = new THREE.BufferGeometry();
    const bgCount = 180;
    const bgPos: number[] = [];
    for (let i = 0; i < bgCount; i++) {
      bgPos.push(
        (Math.random() - 0.5) * 55,
        (Math.random() - 0.5) * 55,
        (Math.random() - 0.5) * 55
      );
    }
    bgParticlesGeom.setAttribute("position", new THREE.Float32BufferAttribute(bgPos, 3));
    const bgParticlesMat = new THREE.PointsMaterial({
      size: 0.08,
      color: 0x4facfe,
      transparent: true,
      opacity: 0.25
    });
    const bgParticles = new THREE.Points(bgParticlesGeom, bgParticlesMat);
    scene.add(bgParticles);

    // Mouse movement interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Scroll interaction
    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Animation loop
    let animationFrameId: number;
    const startTime = Date.now();

    const animate = () => {
      const elapsedTime = (Date.now() - startTime) / 1000;

      // Rotate DNA
      dnaGroup.rotation.y = elapsedTime * 0.15;
      dnaGroup.rotation.x = elapsedTime * 0.04;

      // Mouse parallax smoothing
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;
      
      dnaGroup.position.x = targetX * 4;
      dnaGroup.position.y = -targetY * 2.5;

      // Scroll rotation influence
      dnaGroup.rotation.y += scrollY * 0.0008;

      // Render
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Clean up
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      // Dispose materials/geometries
      geomHelix1.dispose();
      geomHelix2.dispose();
      geomRungs.dispose();
      matHelix.dispose();
      matRungs.dispose();
      bgParticlesGeom.dispose();
      bgParticlesMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
}
