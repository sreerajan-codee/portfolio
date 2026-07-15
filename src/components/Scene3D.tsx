"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, PerspectiveCamera } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

// 1. Dynamic Canvas Texture screen material
function AnimatedScreenMaterial() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const textureRef = useRef<THREE.CanvasTexture | null>(null);
  const [textureState, setTextureState] = useState<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    canvasRef.current = canvas;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const texture = new THREE.CanvasTexture(canvas);
    textureRef.current = texture;
    setTextureState(texture);

    let animFrame: number;
    const lines = Array.from({ length: 14 }, () => ({
      y: Math.random() * 512,
      width: Math.random() * 250 + 100,
      color: Math.random() > 0.5 ? "#00f5ff" : "#0066ff",
      speed: Math.random() * 1.5 + 0.8,
    }));

    const draw = () => {
      // Dark transparent screen backdrop
      ctx.fillStyle = "rgba(5, 5, 12, 0.25)";
      ctx.fillRect(0, 0, 512, 512);

      // Cyber grid matrix
      ctx.strokeStyle = "rgba(0, 102, 255, 0.1)";
      ctx.lineWidth = 1;
      const size = 32;
      for (let x = 0; x < 512; x += size) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 512);
        ctx.stroke();
      }
      for (let y = 0; y < 512; y += size) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(512, y);
        ctx.stroke();
      }

      // Draw scrolling code lines
      lines.forEach((line) => {
        ctx.fillStyle = line.color;
        ctx.fillRect(30, line.y, line.width, 5);
        line.y += line.speed;
        if (line.y > 512) {
          line.y = -10;
          line.width = Math.random() * 250 + 100;
        }
      });

      // System monitor texts
      ctx.fillStyle = "#bd00ff";
      ctx.font = "bold 15px monospace";
      ctx.fillText("MERN STACK ENGINE: ACTIVE", 40, 50);
      
      ctx.fillStyle = "#00f5ff";
      ctx.font = "13px monospace";
      ctx.fillText("> npm run dev", 40, 95);
      ctx.fillText("Ready on http://localhost:3000", 40, 125);
      ctx.fillText("MongoDB database connected", 40, 155);
      
      ctx.fillStyle = "#ffffff";
      ctx.font = "12px monospace";
      ctx.fillText(`API Response: 200 OK (${(Math.floor(Date.now() / 500) % 200) + 100}ms)`, 40, 200);
      ctx.fillText(`Server node process pid ${12845 + (Math.floor(Date.now() / 1500) % 10)}`, 40, 230);
      
      // Floating glowing orb in texture corner
      const pulse = Math.sin(Date.now() * 0.005) * 5 + 10;
      ctx.beginPath();
      ctx.arc(430, 50, pulse, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 245, 255, 0.4)";
      ctx.fill();

      texture.needsUpdate = true;
      animFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      texture.dispose();
    };
  }, []);

  if (!textureState) {
    return <meshBasicMaterial color="#050512" />;
  }

  return <meshBasicMaterial map={textureState} transparent opacity={0.9} />;
}

// 2. Coder Workstation Component
function Workstation() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    // Float desk assembly up and down
    if (groupRef.current) {
      groupRef.current.position.y = -0.4 + Math.sin(elapsed * 1.2) * 0.08;
      groupRef.current.rotation.y = Math.cos(elapsed * 0.4) * 0.04;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.4, 0]}>
      {/* Coder Desk Panel */}
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[3.2, 0.04, 1.4]} />
        <meshPhysicalMaterial 
          color="#0b0b14" 
          roughness={0.15} 
          metalness={0.8}
          transmission={0.5}
          thickness={0.8}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Desk Glowing Wireframes */}
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[3.22, 0.05, 1.42]} />
        <meshBasicMaterial color="#0066ff" wireframe transparent opacity={0.12} />
      </mesh>
      
      {/* Heavy Monitor stand */}
      <mesh position={[0, 0.05, -0.4]}>
        <cylinderGeometry args={[0.06, 0.08, 0.4, 16]} />
        <meshStandardMaterial color="#222" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Main Holographic Display */}
      <group position={[0, 0.65, -0.4]} rotation={[0.02, 0, 0]}>
        {/* Screen Bezel */}
        <mesh position={[0, 0, -0.03]}>
          <boxGeometry args={[1.9, 1.1, 0.05]} />
          <meshStandardMaterial color="#14141d" metalness={0.8} roughness={0.3} />
        </mesh>
        
        {/* Screen Content Plane */}
        <mesh position={[0, 0, 0.005]}>
          <planeGeometry args={[1.8, 1.0]} />
          <AnimatedScreenMaterial />
        </mesh>
        
        {/* Glass Screen glow panel */}
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[1.8, 1.0]} />
          <meshBasicMaterial color="#0055ff" transparent opacity={0.06} blending={THREE.AdditiveBlending} />
        </mesh>
      </group>

      {/* Keyboard (Procedural blocks) */}
      <group position={[0, -0.1, 0.2]} rotation={[-0.08, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.9, 0.03, 0.3]} />
          <meshStandardMaterial color="#1a1a24" roughness={0.4} />
        </mesh>
        {/* Mini glowing keyboard backlighting */}
        <mesh position={[0, -0.01, 0]}>
          <boxGeometry args={[0.92, 0.04, 0.32]} />
          <meshBasicMaterial color="#00f5ff" transparent opacity={0.3} />
        </mesh>
      </group>

      {/* Laptop to the left side */}
      <group position={[-1.1, -0.05, -0.1]} rotation={[0, 0.45, 0]}>
        {/* Base */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.7, 0.02, 0.55]} />
          <meshStandardMaterial color="#2a2a35" metalness={0.8} />
        </mesh>
        {/* Screen */}
        <group position={[0, 0.22, -0.26]} rotation={[-0.7, 0, 0]}>
          <mesh>
            <boxGeometry args={[0.7, 0.44, 0.02]} />
            <meshStandardMaterial color="#111" />
          </mesh>
          <mesh position={[0, 0, 0.015]}>
            <planeGeometry args={[0.66, 0.4]} />
            <meshBasicMaterial color="#bd00ff" transparent opacity={0.15} />
          </mesh>
        </group>
      </group>

      {/* Coffee mug */}
      <mesh position={[0.8, -0.05, 0.25]}>
        <cylinderGeometry args={[0.07, 0.07, 0.15, 12]} />
        <meshStandardMaterial color="#00f5ff" roughness={0.1} emissive="#0055ff" emissiveIntensity={0.2} />
      </mesh>

      {/* Cyber Desk Lamp Base */}
      <group position={[1.1, 0.05, -0.3]}>
        <mesh>
          <cylinderGeometry args={[0.05, 0.06, 0.04, 16]} />
          <meshStandardMaterial color="#222" />
        </mesh>
        {/* Lamp Arm */}
        <mesh position={[-0.05, 0.22, 0]} rotation={[0, 0, 0.3]}>
          <cylinderGeometry args={[0.015, 0.015, 0.4, 8]} />
          <meshStandardMaterial color="#333" />
        </mesh>
        {/* Glowing Head */}
        <mesh position={[-0.15, 0.42, 0]} rotation={[0, 0, -0.5]}>
          <boxGeometry args={[0.15, 0.03, 0.15]} />
          <meshStandardMaterial color="#222" />
        </mesh>
        {/* Light */}
        <pointLight position={[-0.15, 0.38, 0]} color="#00f5ff" intensity={1.5} distance={1.8} />
      </group>

      {/* Ambient workstation workspace point light */}
      <pointLight position={[0, 1.2, -0.1]} color="#0066ff" intensity={2.0} distance={3.5} decay={2.2} />
    </group>
  );
}

// 3. Rotating holographic Network Globe
function Globe3D() {
  const globeRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    if (globeRef.current) {
      globeRef.current.rotation.y = elapsed * 0.12;
      globeRef.current.rotation.x = Math.sin(elapsed * 0.05) * 0.15;
    }
  });

  // Procedural point coordinates on the globe surface
  const pointCount = 180;
  const pointsData = useMemo(() => {
    const coords = [];
    for (let i = 0; i < pointCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2 * Math.PI;
      const phi = Math.acos(2 * v - 1);
      const r = 2.4; // Globe radius
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      coords.push(new THREE.Vector3(x, y, z));
    }
    return coords;
  }, []);

  return (
    <group ref={globeRef} position={[3.2, 0.2, -2]}>
      {/* Base wireframe sphere */}
      <mesh>
        <sphereGeometry args={[2.4, 20, 20]} />
        <meshBasicMaterial 
          color="#00f5ff" 
          wireframe 
          transparent 
          opacity={0.06} 
        />
      </mesh>
      
      {/* Node Points */}
      {pointsData.map((pos, idx) => (
        <mesh key={idx} position={pos}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial 
            color={idx % 3 === 0 ? "#00f5ff" : idx % 3 === 1 ? "#bd00ff" : "#0066ff"} 
            transparent 
            opacity={0.7} 
          />
        </mesh>
      ))}

      {/* Network link rays (subtle lines) */}
      <group>
        {pointsData.slice(0, 45).map((pos, idx) => {
          // Connect to another random node in the group
          const targetNode = pointsData[Math.floor(Math.random() * pointsData.length)];
          const linePositions = [pos.x, pos.y, pos.z, targetNode.x, targetNode.y, targetNode.z];
          
          return (
            <line key={idx}>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  args={[new Float32Array(linePositions), 3]}
                />
              </bufferGeometry>
              <lineBasicMaterial 
                color="#0066ff" 
                transparent 
                opacity={0.12} 
                linewidth={0.5} 
              />
            </line>
          );
        })}
      </group>

      <pointLight color="#00f5ff" intensity={0.6} distance={4} />
    </group>
  );
}

// 4. Orbiting Skill Planet Props
interface SkillPlanetProps {
  name: string;
  radius: number;
  speed: number;
  color: string;
  size: number;
  heightOffset: number;
  onHover: (name: string | null) => void;
}

function SkillPlanet({ name, radius, speed, color, size, heightOffset, onHover }: SkillPlanetProps) {
  const planetRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime() * speed;
    if (planetRef.current) {
      // Calculate circular orbit coordinates
      planetRef.current.position.x = Math.cos(elapsed) * radius;
      planetRef.current.position.z = Math.sin(elapsed) * radius;
      planetRef.current.position.y = heightOffset + Math.sin(elapsed * 1.4) * 0.25;
      
      // Rotate planet on its axis
      planetRef.current.rotation.y += 0.015;
    }
  });

  return (
    <group>
      {/* Subtle orbital path ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, heightOffset, 0]}>
        <ringGeometry args={[radius - 0.01, radius + 0.01, 80]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.035} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Hoverable Planet Mesh */}
      <mesh
        ref={planetRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
          onHover(name);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "auto";
          onHover(null);
        }}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          roughness={0.25} 
          metalness={0.7}
          emissive={color}
          emissiveIntensity={0.25}
        />
        {/* Glow halo around planet */}
        <pointLight color={color} intensity={0.8} distance={1.8} decay={2} />
      </mesh>
    </group>
  );
}

// 5. Coder Rising Particles Component
function FloatingCodeParticles() {
  const count = 100;
  const pointsRef = useRef<THREE.Points>(null);

  // Initial particle layout
  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Scatter in cylinder around workstation
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 2.8 + 0.5;
      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = Math.random() * 5 - 2.5; // Y position
      pos[i * 3 + 2] = Math.sin(angle) * r;
      
      spds[i] = Math.random() * 0.01 + 0.005;
    }
    return [pos, spds];
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const posArr = geo.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      // Float upwards
      posArr[i * 3 + 1] += speeds[i];
      // Reset if floated past viewport ceiling
      if (posArr[i * 3 + 1] > 3) {
        posArr[i * 3 + 1] = -2.5;
      }
    }
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.035} 
        color="#00f5ff" 
        transparent 
        opacity={0.4} 
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// MAIN 3D EXPERIENCE CONTAINER
export default function Scene3D() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Skill planets dataset
  const planets = [
    { name: "MongoDB Database", radius: 2.2, speed: 0.18, color: "#10b981", size: 0.16, heightOffset: -0.2 },
    { name: "Express.js Engine", radius: 2.7, speed: 0.14, color: "#6b7280", size: 0.14, heightOffset: 0.2 },
    { name: "React Web Apps", radius: 3.3, speed: 0.11, color: "#00f5ff", size: 0.20, heightOffset: -0.1 },
    { name: "Node.js Platform", radius: 3.9, speed: 0.09, color: "#22c55e", size: 0.18, heightOffset: 0.3 },
    { name: "Next.js Core Framework", radius: 4.5, speed: 0.07, color: "#ffffff", size: 0.22, heightOffset: -0.3 },
    { name: "Tailwind Styling", radius: 5.1, speed: 0.05, color: "#3b82f6", size: 0.13, heightOffset: 0.1 },
  ];

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ touchAction: "pan-y" }}
    >
      {/* 3D Canvas Scene */}
      <Canvas eventSource={containerRef as any} eventPrefix="client">
        <PerspectiveCamera makeDefault position={[0, 1.8, 5.5]} fov={60} />
        
        {/* Environmental Lights */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 10, 3]} intensity={0.8} color="#00f5ff" />
        <directionalLight position={[-5, 5, -5]} intensity={0.4} color="#bd00ff" />
        
        {/* Stars backdrop */}
        <Stars radius={120} depth={50} count={3500} factor={6} saturation={0.5} fade speed={1.5} />
        
        {/* Floating elements */}
        <FloatingCodeParticles />
        <Workstation />
        <Globe3D />
        
        {/* Planets */}
        {planets.map((planet, idx) => (
          <SkillPlanet
            key={idx}
            name={planet.name}
            radius={planet.radius}
            speed={planet.speed}
            color={planet.color}
            size={planet.size}
            heightOffset={planet.heightOffset}
            onHover={setHoveredSkill}
          />
        ))}

        {/* Orbit Controls (constrained rotation to protect scroll viewport) */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          maxPolarAngle={Math.PI / 2 - 0.05} // Do not tilt below desk line
          minPolarAngle={Math.PI / 4}
          rotateSpeed={0.5}
        />
      </Canvas>

      {/* Floating 3D HUD Tooltip */}
      {hoveredSkill && (
        <div 
          className="absolute top-12 left-1/2 -translate-x-1/2 glass-panel-glow border-accent-cyan/40 px-6 py-2.5 rounded-full font-mono text-sm text-center flex items-center gap-3 animate-pulse pointer-events-none select-none z-10"
        >
          <span className="w-2 h-2 rounded-full bg-accent-cyan animate-ping" />
          <span className="text-zinc-500 uppercase tracking-widest text-xs">Inspecting node:</span>
          <span className="text-[#f5f5f7] font-semibold tracking-wide">{hoveredSkill}</span>
        </div>
      )}
    </div>
  );
}
