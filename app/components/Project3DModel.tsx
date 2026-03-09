"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Suspense, useRef, useCallback } from "react";
import * as THREE from "three";

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

// Stock Chart Model - Phone with candlestick chart
function StockChart() {
  return (
    <group>
      {/* Phone body - wireframe */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.6, 2.8, 0.1]} />
        <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
      </mesh>

      {/* Screen area */}
      <mesh position={[0, 0.1, 0.06]}>
        <boxGeometry args={[1.35, 2.2, 0.01]} />
        <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
      </mesh>

      {/* Notch at top */}
      <mesh position={[0, 1.25, 0.06]}>
        <boxGeometry args={[0.4, 0.08, 0.02]} />
        <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
      </mesh>

      {/* Chart Y axis */}
      <mesh position={[-0.55, 0.1, 0.08]}>
        <boxGeometry args={[0.015, 1.6, 0.01]} />
        <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
      </mesh>

      {/* Chart X axis */}
      <mesh position={[0, -0.7, 0.08]}>
        <boxGeometry args={[1.1, 0.015, 0.01]} />
        <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
      </mesh>

      {/* Grid lines - horizontal */}
      {Array.from({ length: 4 }, (_, i) => (
        <mesh key={`grid-h-${i}`} position={[0, -0.35 + i * 0.3, 0.075]}>
          <boxGeometry args={[1.05, 0.005, 0.005]} />
          <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
        </mesh>
      ))}

      {/* Candlestick bars - body (thick) and wicks (thin) */}
      {[
        { x: -0.4, low: -0.5, open: -0.3, close: -0.1, high: 0.0 },
        { x: -0.22, low: -0.2, open: -0.1, close: 0.15, high: 0.25 },
        { x: -0.04, low: -0.05, open: 0.2, close: 0.05, high: 0.3 },
        { x: 0.14, low: 0.0, open: 0.1, close: 0.35, high: 0.45 },
        { x: 0.32, low: 0.15, open: 0.35, close: 0.2, high: 0.5 },
        { x: 0.5, low: 0.25, open: 0.3, close: 0.55, high: 0.65 },
      ].map((candle, i) => {
        const bodyBottom = Math.min(candle.open, candle.close);
        const bodyTop = Math.max(candle.open, candle.close);
        const bodyHeight = bodyTop - bodyBottom;
        const bodyCenter = (bodyTop + bodyBottom) / 2;
        const wickHeight = candle.high - candle.low;
        const wickCenter = (candle.high + candle.low) / 2;

        return (
          <group key={`candle-${i}`}>
            {/* Wick (thin line) */}
            <mesh position={[candle.x, wickCenter, 0.08]}>
              <boxGeometry args={[0.015, wickHeight, 0.01]} />
              <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
            </mesh>
            {/* Body (thick bar) */}
            <mesh position={[candle.x, bodyCenter, 0.08]}>
              <boxGeometry args={[0.1, Math.max(bodyHeight, 0.04), 0.03]} />
              <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
            </mesh>
          </group>
        );
      })}

      {/* Trend line connecting closes */}
      {[
        [-0.4, -0.1, -0.22, 0.15],
        [-0.22, 0.15, -0.04, 0.05],
        [-0.04, 0.05, 0.14, 0.35],
        [0.14, 0.35, 0.32, 0.2],
        [0.32, 0.2, 0.5, 0.55],
      ].map((line, i) => {
        const cx = (line[0] + line[2]) / 2;
        const cy = (line[1] + line[3]) / 2;
        const dx = line[2] - line[0];
        const dy = line[3] - line[1];
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);
        return (
          <mesh key={`trend-${i}`} position={[cx, cy, 0.09]} rotation={[0, 0, angle]}>
            <boxGeometry args={[length, 0.02, 0.01]} />
            <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
          </mesh>
        );
      })}

      {/* Dollar sign indicator (top of screen) */}
      <mesh position={[-0.45, 0.95, 0.08]}>
        <boxGeometry args={[0.3, 0.12, 0.01]} />
        <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
      </mesh>

      {/* Portfolio value box (top right) */}
      <mesh position={[0.3, 0.95, 0.08]}>
        <boxGeometry args={[0.5, 0.12, 0.01]} />
        <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
      </mesh>
    </group>
  );
}

// Animated ECG waveform line
function AnimatedECGLine() {
  const groupRef = useRef<THREE.Group>(null);

  const ecgWave = useCallback((t: number): number => {
    const tn = ((t % 1) + 1) % 1;
    // P wave
    if (tn > 0.08 && tn < 0.18) {
      return 0.12 * Math.sin(((tn - 0.08) / 0.1) * Math.PI);
    }
    // Q dip
    if (tn > 0.28 && tn < 0.31) {
      return -0.08 * Math.sin(((tn - 0.28) / 0.03) * Math.PI);
    }
    // R peak (tall spike)
    if (tn > 0.31 && tn < 0.37) {
      return 0.55 * Math.sin(((tn - 0.31) / 0.06) * Math.PI);
    }
    // S dip
    if (tn > 0.37 && tn < 0.41) {
      return -0.15 * Math.sin(((tn - 0.37) / 0.04) * Math.PI);
    }
    // T wave
    if (tn > 0.52 && tn < 0.66) {
      return 0.18 * Math.sin(((tn - 0.52) / 0.14) * Math.PI);
    }
    return 0;
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const time = clock.getElapsedTime() * 0.4;
    const children = groupRef.current.children;
    const count = children.length;
    for (let i = 0; i < count; i++) {
      const mesh = children[i] as THREE.Mesh;
      const xNorm = i / (count - 1);
      mesh.position.y = ecgWave(xNorm - time);
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 100 }, (_, i) => (
        <mesh key={i} position={[-1.1 + i * (2.2 / 99), 0, 0.05]}>
          <sphereGeometry args={[0.018, 6, 6]} />
          <meshBasicMaterial color="#ef4444" />
        </mesh>
      ))}
    </group>
  );
}

// ECG Heartbeat Model - just the waveform, no monitor
function ECGHeartbeat() {
  return (
    <group>
      {/* Animated ECG waveform */}
      <AnimatedECGLine />
    </group>
  );
}

// LLM Incident Pipeline Model
function LLMPipeline() {
  return (
    <group>
      {/* Input documents (left side) - 3 log files feeding in */}
      {[-0.4, 0, 0.4].map((z, i) => (
        <mesh key={`doc-${i}`} position={[-1.2, 0.1 * i - 0.1, z]}>
          <boxGeometry args={[0.4, 0.5, 0.02]} />
          <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
        </mesh>
      ))}

      {/* Document lines (text representation) */}
      {[-0.4, 0, 0.4].map((z, i) =>
        [0.1, 0, -0.1].map((ly, j) => (
          <mesh key={`line-${i}-${j}`} position={[-1.2, 0.1 * i - 0.1 + ly, z + 0.02]}>
            <boxGeometry args={[0.25, 0.02, 0.01]} />
            <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
          </mesh>
        ))
      )}

      {/* Arrow / connection from docs to LLM (left pipe) */}
      <mesh position={[-0.7, 0, 0]}>
        <boxGeometry args={[0.5, 0.04, 0.04]} />
        <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
      </mesh>

      {/* Central LLM processor box */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
      </mesh>

      {/* Inner chip / brain detail */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
      </mesh>

      {/* Neural network nodes inside processor */}
      {[
        [-0.12, 0.12, 0.41], [0.12, 0.12, 0.41],
        [-0.12, -0.12, 0.41], [0.12, -0.12, 0.41],
        [0, 0, 0.41],
      ].map((pos, i) => (
        <mesh key={`node-${i}`} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
        </mesh>
      ))}

      {/* Arrow / connection from LLM to clusters (right pipe) */}
      <mesh position={[0.7, 0, 0]}>
        <boxGeometry args={[0.5, 0.04, 0.04]} />
        <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
      </mesh>

      {/* Output clusters - Cluster 1 (top right) */}
      {[
        [1.3, 0.35, 0.15], [1.5, 0.4, -0.1], [1.35, 0.25, -0.15], [1.45, 0.45, 0.05],
      ].map((pos, i) => (
        <mesh key={`c1-${i}`} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
        </mesh>
      ))}

      {/* Output clusters - Cluster 2 (bottom right) */}
      {[
        [1.25, -0.3, 0.1], [1.45, -0.35, -0.05], [1.35, -0.2, -0.2], [1.5, -0.25, 0.15],
      ].map((pos, i) => (
        <mesh key={`c2-${i}`} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
        </mesh>
      ))}

      {/* Output clusters - Cluster 3 (middle right) */}
      {[
        [1.55, 0.05, 0.2], [1.7, 0, -0.05], [1.6, -0.05, 0.1],
      ].map((pos, i) => (
        <mesh key={`c3-${i}`} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
        </mesh>
      ))}

      {/* Base platform */}
      <mesh position={[0.2, -0.55, 0]}>
        <boxGeometry args={[3.5, 0.04, 1.2]} />
        <meshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={2} />
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
      case "llm-incident-pipeline":
        return <LLMPipeline />;
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
