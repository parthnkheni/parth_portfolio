"use client";

import { useEffect, useRef } from "react";

type Neuron = {
  x: number;
  y: number;
  layer: number;
  activation: number;
};

type Connection = {
  from: Neuron;
  to: Neuron;
  weight: number;
  signal: number;
};

export default function NeuralNetworkViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    // Network architecture: 3 input, 5 hidden, 2 output
    const layers = [3, 5, 2];
    const neurons: Neuron[] = [];
    const connections: Connection[] = [];

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    const layerSpacing = width / (layers.length + 1);

    // Create neurons
    layers.forEach((count, layerIndex) => {
      const verticalSpacing = height / (count + 1);
      for (let i = 0; i < count; i++) {
        neurons.push({
          x: layerSpacing * (layerIndex + 1),
          y: verticalSpacing * (i + 1),
          layer: layerIndex,
          activation: Math.random(),
        });
      }
    });

    // Create connections
    let neuronIndex = 0;
    layers.forEach((count, layerIndex) => {
      if (layerIndex < layers.length - 1) {
        const currentLayerNeurons = neurons.slice(neuronIndex, neuronIndex + count);
        const nextLayerStart = neuronIndex + count;
        const nextLayerCount = layers[layerIndex + 1];
        const nextLayerNeurons = neurons.slice(nextLayerStart, nextLayerStart + nextLayerCount);

        currentLayerNeurons.forEach((from) => {
          nextLayerNeurons.forEach((to) => {
            connections.push({
              from,
              to,
              weight: Math.random() * 2 - 1,
              signal: 0,
            });
          });
        });
      }
      neuronIndex += count;
    });

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Update neuron activations based on mouse position and time
      neurons.forEach((neuron, idx) => {
        const dx = neuron.x - mouseRef.current.x;
        const dy = neuron.y - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const mouseInfluence = Math.max(0, 1 - distance / 200);

        neuron.activation =
          0.3 +
          0.4 * Math.sin(time * 0.001 + idx * 0.5) +
          0.3 * mouseInfluence;
      });

      // Animate signals through connections
      connections.forEach((conn) => {
        conn.signal = (conn.signal + 0.03) % 1;

        // Draw connection
        const opacity = Math.abs(conn.weight) * 0.3;
        ctx.strokeStyle = conn.weight > 0
          ? `rgba(52, 211, 153, ${opacity})`
          : `rgba(239, 68, 68, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(conn.from.x, conn.from.y);
        ctx.lineTo(conn.to.x, conn.to.y);
        ctx.stroke();

        // Draw signal particle
        const signalX = conn.from.x + (conn.to.x - conn.from.x) * conn.signal;
        const signalY = conn.from.y + (conn.to.y - conn.from.y) * conn.signal;

        ctx.fillStyle = `rgba(96, 165, 250, ${0.6 * Math.abs(conn.weight)})`;
        ctx.beginPath();
        ctx.arc(signalX, signalY, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw neurons
      neurons.forEach((neuron) => {
        const radius = 8 + neuron.activation * 4;

        // Glow effect
        const gradient = ctx.createRadialGradient(
          neuron.x, neuron.y, 0,
          neuron.x, neuron.y, radius * 2
        );
        gradient.addColorStop(0, `rgba(167, 139, 250, ${neuron.activation * 0.8})`);
        gradient.addColorStop(0.5, `rgba(167, 139, 250, ${neuron.activation * 0.3})`);
        gradient.addColorStop(1, 'rgba(167, 139, 250, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(neuron.x, neuron.y, radius * 2, 0, Math.PI * 2);
        ctx.fill();

        // Neuron core
        ctx.fillStyle = `rgb(${167 * neuron.activation}, ${139 * neuron.activation}, ${250 * neuron.activation})`;
        ctx.beginPath();
        ctx.arc(neuron.x, neuron.y, radius, 0, Math.PI * 2);
        ctx.fill();

        // Border
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      time += 1;
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ opacity: 0.6 }}
      aria-label="Interactive neural network visualization with animated neurons and connections"
    />
  );
}
