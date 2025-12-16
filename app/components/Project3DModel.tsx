"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";

// Temperature Sensor Box Model
function TemperatureSensorBox() {
  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      {/* Main box - wireframe */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 1.5, 1]} />
        <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
      </mesh>

      {/* Temperature sensor hole (side - right) */}
      <mesh position={[1.01, 0.3, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.1, 0.1, 0.1, 16]} />
        <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
      </mesh>

      {/* Buzzer hole (side - right) */}
      <mesh position={[1.01, -0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.12, 0.12, 0.1, 16]} />
        <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
      </mesh>

      {/* On/Off switch hole (side - right) */}
      <mesh position={[1.01, -0.6, 0]}>
        <boxGeometry args={[0.15, 0.08, 0.1]} />
        <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
      </mesh>
    </group>
  );
}

// Line Following Robot Model
function LineFollowingRobot() {
  return (
    <group>
      {/* Main chassis - wireframe */}
      <mesh position={[0, 0.15, 0.1]}>
        <boxGeometry args={[1.2, 0.25, 2.2]} />
        <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
      </mesh>

      {/* Middle section */}
      <mesh position={[0, 0.4, -0.3]}>
        <boxGeometry args={[1.0, 0.3, 1.2]} />
        <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
      </mesh>

      {/* Battery compartment (front left) */}
      <mesh position={[-0.35, 0.35, 0.6]}>
        <boxGeometry args={[0.35, 0.4, 0.5]} />
        <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
      </mesh>

      {/* Battery */}
      <mesh position={[-0.35, 0.55, 0.6]}>
        <boxGeometry args={[0.25, 0.15, 0.35]} />
        <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
      </mesh>

      {/* Back Wheels - wireframe */}
      {[[-0.6, -0.05, -0.7], [0.6, -0.05, -0.7]].map((pos, i) => (
        <group key={`back-${i}`}>
          <mesh position={pos as [number, number, number]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
            <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
          </mesh>
          <mesh position={pos as [number, number, number]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.15, 0.15, 0.21, 32]} />
            <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
          </mesh>
        </group>
      ))}

      {/* Front Wheel - single centered wheel */}
      <group>
        <mesh position={[0, -0.05, 0.9]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.25, 0.25, 0.2, 32]} />
          <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
        </mesh>
        <mesh position={[0, -0.05, 0.9]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.12, 0.12, 0.21, 32]} />
          <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
        </mesh>
      </group>

      {/* Ultrasonic sensor (front) */}
      <mesh position={[0.2, 0.35, 1.15]}>
        <boxGeometry args={[0.4, 0.2, 0.15]} />
        <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
      </mesh>

      {/* LED sensors */}
      {[-0.1, 0.1].map((x, i) => (
        <mesh key={i} position={[0.2 + x, 0.35, 1.23]}>
          <cylinderGeometry args={[0.05, 0.05, 0.05, 16]} />
          <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
        </mesh>
      ))}

      {/* Wiring detail */}
      <mesh position={[0, 0.45, 0.3]}>
        <boxGeometry args={[0.05, 0.05, 0.6]} />
        <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
      </mesh>
    </group>
  );
}

// FPGA Board Model - Nexys4 DDR
function FPGABoard() {
  return (
    <group>
      {/* Main FPGA board - Nexys4 DDR (6.5" x 4.25") */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3.0, 0.08, 2.0]} />
        <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
      </mesh>

      {/* Large Artix-7 FPGA chip (center-left) */}
      <mesh position={[-0.3, 0.12, 0]}>
        <boxGeometry args={[1.0, 0.16, 1.0]} />
        <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
      </mesh>

      {/* DDR2 memory chip (right of FPGA) */}
      <mesh position={[0.8, 0.08, 0]}>
        <boxGeometry args={[0.6, 0.1, 0.4]} />
        <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
      </mesh>

      {/* 16 LEDs (top row) - LD15 to LD0 */}
      {Array.from({length: 16}, (_, i) => {
        const x = -1.35 + (i * 0.18);
        return (
          <mesh key={`led-${i}`} position={[x, 0.06, 0.9]}>
            <cylinderGeometry args={[0.04, 0.04, 0.04, 16]} />
            <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
          </mesh>
        );
      })}

      {/* 16 Slide Switches (bottom row) - SW15 to SW0 */}
      {Array.from({length: 16}, (_, i) => {
        const x = -1.35 + (i * 0.18);
        return (
          <mesh key={`sw-${i}`} position={[x, 0.06, -0.9]}>
            <boxGeometry args={[0.08, 0.06, 0.15]} />
            <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
          </mesh>
        );
      })}

      {/* 8 Seven-Segment Displays (middle) */}
      {Array.from({length: 8}, (_, i) => {
        const x = -1.05 + (i * 0.3);
        return (
          <mesh key={`7seg-${i}`} position={[x, 0.06, 0.3]}>
            <boxGeometry args={[0.24, 0.04, 0.35]} />
            <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
          </mesh>
        );
      })}

      {/* 5 Push Buttons (BTNC, BTNU, BTNL, BTNR, BTND) */}
      {[
        [0, 0.5],      // BTNU (up)
        [-0.25, 0.25], // BTNL (left)
        [0, 0.25],     // BTNC (center)
        [0.25, 0.25],  // BTNR (right)
        [0, 0],        // BTND (down)
      ].map((pos, i) => (
        <mesh key={`btn-${i}`} position={[pos[0], 0.07, pos[1]]}>
          <cylinderGeometry args={[0.06, 0.06, 0.05, 16]} />
          <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
        </mesh>
      ))}

      {/* 4 RGB LEDs (below 7-seg) */}
      {[-0.6, -0.2, 0.2, 0.6].map((x, i) => (
        <mesh key={`rgb-${i}`} position={[x, 0.06, -0.1]}>
          <cylinderGeometry args={[0.05, 0.05, 0.04, 16]} />
          <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
        </mesh>
      ))}

      {/* Micro-USB connector (left side, top) */}
      <mesh position={[-1.45, 0.06, 0.6]}>
        <boxGeometry args={[0.08, 0.06, 0.15]} />
        <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
      </mesh>

      {/* Power barrel jack (left side, bottom) */}
      <mesh position={[-1.45, 0.07, -0.6]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.07, 0.07, 0.1, 16]} />
        <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
      </mesh>

      {/* VGA connector (right side, top) */}
      <mesh position={[1.45, 0.06, 0.5]}>
        <boxGeometry args={[0.1, 0.1, 0.3]} />
        <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
      </mesh>

      {/* USB Host connector (bottom edge) */}
      <mesh position={[0.4, 0.06, -0.95]}>
        <boxGeometry args={[0.15, 0.08, 0.08]} />
        <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
      </mesh>

      {/* PMOD connectors JA, JB, JC, JD (top edge) */}
      {[-0.9, -0.3, 0.3, 0.9].map((x, i) => (
        <mesh key={`pmod-${i}`} position={[x, 0.06, 0.95]}>
          <boxGeometry args={[0.15, 0.06, 0.08]} />
          <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
        </mesh>
      ))}

      {/* XADC header (top right) */}
      <mesh position={[1.2, 0.06, 0.8]}>
        <boxGeometry args={[0.12, 0.06, 0.2]} />
        <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
      </mesh>
    </group>
  );
}

// Portfolio Website Model
function PortfolioWebsite() {
  return (
    <group>
      {/* Browser window frame */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.8, 1.8, 0.08]} />
        <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
      </mesh>

      {/* Browser header bar */}
      <mesh position={[0, 0.82, 0.05]}>
        <boxGeometry args={[2.7, 0.15, 0.04]} />
        <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
      </mesh>

      {/* Browser buttons (close, minimize, maximize) */}
      {[-1.2, -1.05, -0.9].map((x, i) => (
        <mesh key={`btn-${i}`} position={[x, 0.82, 0.07]}>
          <cylinderGeometry args={[0.03, 0.03, 0.02, 16]} />
          <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
        </mesh>
      ))}

      {/* URL/Address bar */}
      <mesh position={[0.1, 0.82, 0.07]}>
        <boxGeometry args={[2.0, 0.08, 0.02]} />
        <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
      </mesh>

      {/* Navigation/Header section */}
      <mesh position={[0, 0.6, 0.05]}>
        <boxGeometry args={[2.6, 0.12, 0.04]} />
        <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
      </mesh>

      {/* Main content sections - 3 content blocks */}
      {[0.2, -0.15, -0.5].map((y, i) => (
        <mesh key={`section-${i}`} position={[0, y, 0.05]}>
          <boxGeometry args={[2.4, 0.25, 0.04]} />
          <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
        </mesh>
      ))}

      {/* Project cards - small rectangular sections */}
      {[
        [-0.8, 0.05],
        [0, 0.05],
        [0.8, 0.05],
      ].map((pos, i) => (
        <mesh key={`card-${i}`} position={[pos[0], pos[1], 0.07]}>
          <boxGeometry args={[0.6, 0.4, 0.02]} />
          <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
        </mesh>
      ))}

      {/* Footer */}
      <mesh position={[0, -0.8, 0.05]}>
        <boxGeometry args={[2.6, 0.08, 0.04]} />
        <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
      </mesh>
    </group>
  );
}

// Stock Chart Model
function StockChart() {
  return (
    <group>
      {/* Chart background */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.5, 1.5, 0.1]} />
        <meshStandardMaterial color="#0f172a" metalness={0.2} roughness={0.8} />
      </mesh>

      {/* Grid lines */}
      {[...Array(5)].map((_, i) => (
        <mesh key={`h-${i}`} position={[0, -0.6 + i * 0.3, 0.06]}>
          <boxGeometry args={[2.3, 0.01, 0.01]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
      ))}

      {/* Stock line chart (upward trend) */}
      {[
        [-1, -0.4], [-0.7, -0.2], [-0.4, 0], [-0.1, -0.1],
        [0.2, 0.2], [0.5, 0.3], [0.8, 0.5], [1.1, 0.6]
      ].map((pos, i) => (
        <mesh key={i} position={[pos[0], pos[1], 0.06]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.3} />
        </mesh>
      ))}

      {/* Connecting lines */}
      {[
        [-1, -0.4, -0.7, -0.2], [-0.7, -0.2, -0.4, 0], [-0.4, 0, -0.1, -0.1],
        [-0.1, -0.1, 0.2, 0.2], [0.2, 0.2, 0.5, 0.3], [0.5, 0.3, 0.8, 0.5],
        [0.8, 0.5, 1.1, 0.6]
      ].map((line, i) => {
        const x = (line[0] + line[2]) / 2;
        const y = (line[1] + line[3]) / 2;
        const length = Math.sqrt(Math.pow(line[2] - line[0], 2) + Math.pow(line[3] - line[1], 2));
        const angle = Math.atan2(line[3] - line[1], line[2] - line[0]);

        return (
          <mesh key={i} position={[x, y, 0.06]} rotation={[0, 0, angle]}>
            <boxGeometry args={[length, 0.03, 0.01]} />
            <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.2} />
          </mesh>
        );
      })}

      {/* Phone frame */}
      <mesh position={[0, 0, -0.06]}>
        <boxGeometry args={[2.7, 1.7, 0.15]} />
        <meshStandardMaterial color="#18181b" metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  );
}

// ECG Heartbeat Model
function ECGHeartbeat() {
  return (
    <group>
      {/* Monitor screen */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.5, 1.5, 0.1]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* Grid background */}
      {[...Array(8)].map((_, i) => (
        <mesh key={`v-${i}`} position={[-1.1 + i * 0.3, 0, 0.06]}>
          <boxGeometry args={[0.01, 1.4, 0.01]} />
          <meshStandardMaterial color="#1a3a1a" />
        </mesh>
      ))}
      {[...Array(6)].map((_, i) => (
        <mesh key={`h-${i}`} position={[0, -0.6 + i * 0.25, 0.06]}>
          <boxGeometry args={[2.3, 0.01, 0.01]} />
          <meshStandardMaterial color="#1a3a1a" />
        </mesh>
      ))}

      {/* ECG waveform */}
      {[
        [-1.2, 0], [-1.1, 0], [-1.0, 0.1], [-0.95, -0.1], [-0.9, 0.6],
        [-0.85, -0.2], [-0.8, 0.15], [-0.75, 0], [-0.5, 0],
        [-0.4, 0], [-0.35, 0.1], [-0.3, -0.1], [-0.25, 0.6],
        [-0.2, -0.2], [-0.15, 0.15], [-0.1, 0], [0.2, 0],
        [0.3, 0], [0.35, 0.1], [0.4, -0.1], [0.45, 0.6],
        [0.5, -0.2], [0.55, 0.15], [0.6, 0], [0.9, 0],
        [1.0, 0], [1.05, 0.1], [1.1, -0.1], [1.15, 0.6]
      ].map((pos, i) => (
        <mesh key={i} position={[pos[0], pos[1], 0.07]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.5} />
        </mesh>
      ))}

      {/* Heart rate indicator */}
      <mesh position={[-1, 0.6, 0.07]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.6} />
      </mesh>

      {/* Monitor frame */}
      <mesh position={[0, 0, -0.06]}>
        <boxGeometry args={[2.7, 1.7, 0.15]} />
        <meshStandardMaterial color="#18181b" metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  );
}

type Project3DModelProps = {
  projectSlug: string;
};

export default function Project3DModel({ projectSlug }: Project3DModelProps) {
  const getModel = () => {
    switch (projectSlug) {
      case "portfolio-website":
        return <PortfolioWebsite />;
      case "room-temperature-monitor":
        return <TemperatureSensorBox />;
      case "maps-robot":
        return <LineFollowingRobot />;
      case "whack-a-mole-fpga":
        return <FPGABoard />;
      case "personal-finance-app":
        return <StockChart />;
      case "ecg-data-analysis":
        return <ECGHeartbeat />;
      default:
        return null;
    }
  };

  const model = getModel();
  if (!model) return null;

  return (
    <div className="w-full h-full relative">
      <Canvas>
        <Suspense fallback={
          <mesh>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshBasicMaterial color="#52525b" wireframe />
          </mesh>
        }>
          <PerspectiveCamera makeDefault position={[3, 2, 3]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          {model}
          <OrbitControls
            enableZoom={false}
            autoRotate
            autoRotateSpeed={1}
            enablePan={false}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
