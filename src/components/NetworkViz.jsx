import React, { useRef, useEffect, useMemo, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Html, Line } from "@react-three/drei"
import {
  forceSimulation,
  forceManyBody,
  forceLink,
  forceCenter
} from "d3-force-3d"

// ---------------------------------------------------------
// Node Sphere Component
// ---------------------------------------------------------



function NodeSphere({ node, refCallback, highlighted, onHover, onSelect }) {
  const meshRef = useRef()

  useEffect(() => refCallback?.(node.id, meshRef), [refCallback, node])

  return (
    <mesh
      ref={meshRef}
      position={[node.x || 0, node.y || 0, node.z || 0]}
      onPointerOver={() => onHover?.(node.id)}
      onPointerOut={() => onHover?.(null)}
      onClick={() => onSelect?.(node)}
    >
      <sphereGeometry
        args={[
          node.type === "root"
            ? 0.28
            : node.type === "project"
            ? 0.18
            : 0.12,
          24,
          24
        ]}
      />
      <meshStandardMaterial
        color={highlighted ? "#58fbdc" : node.color}
        metalness={0.3}
        roughness={0.35}
      />

      <Html distanceFactor={8} center style={{ pointerEvents: "none" }}>
        <div style={{ color: "#cbd5e1", fontSize: 12 }}>{node.label}</div>
      </Html>
    </mesh>
  )
}

// ---------------------------------------------------------
// Link Component
// ---------------------------------------------------------

function Links({ links, nodeRefs }) {
  const lineRefs = useRef([])

  useFrame(() => {
    links.forEach((l, i) => {
      const line = lineRefs.current[i]
      const s = nodeRefs.current[l.source]
      const t = nodeRefs.current[l.target]

      if (!line || !s || !t) return

      line.setPoints([
        [s.position.x, s.position.y, s.position.z],
        [t.position.x, t.position.y, t.position.z]
      ])
    })
  })

  return (
    <group>
      {links.map((l, i) => (
        <Line
          ref={(r) => (lineRefs.current[i] = r)}
          key={i}
          points={[
            [0, 0, 0],
            [0, 0, 0]
          ]}
          color="#64748b"
          lineWidth={1}
        />
      ))}
    </group>
  )
}

// ---------------------------------------------------------
// Frame updater lives INSIDE the Canvas
// ---------------------------------------------------------

function NodePositionsUpdater({ nodes, nodeRefs }) {
  useFrame(() => {
    nodes.forEach((n) => {
      const r = nodeRefs.current[n.id]
      if (r) r.position.set(n.x || 0, n.y || 0, n.z || 0)
    })
  })

  return null
}

// ---------------------------------------------------------
// Main Graph Canvas
// ---------------------------------------------------------

function GraphCanvas({ nodes, links, onNodeSelect, highlightedId }) {
  const nodeRefs = useRef({})
  const [highlight, setHighlight] = useState(null)

  const refCallback = (id, ref) => {
    if (ref && ref.current) nodeRefs.current[id] = ref.current
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      style={{ height: "420px" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={0.6} />
      <OrbitControls enableZoom enablePan />

      <NodePositionsUpdater nodes={nodes} nodeRefs={nodeRefs} />

      {nodes.map((n) => (
        <NodeSphere
          key={n.id}
          node={n}
          refCallback={refCallback}
          highlighted={highlight === n.id || highlightedId === n.id}
          onHover={setHighlight}
          onSelect={(node) => onNodeSelect?.(node)}
        />
      ))}

      <Links links={links} nodeRefs={nodeRefs} />
    </Canvas>
  )
}

// ---------------------------------------------------------
// MAIN EXPORT – Network Visualization Component
// ---------------------------------------------------------

export default function NetworkViz({ resume }) {
  const { projects = [], skills = {} } = resume
  const techs = skills.frameworks || []

  // Build nodes + links
  const graph = useMemo(() => {
    const nodes = []
    const links = []

    const addNode = (id, label, type, color) => {
      nodes.push({
        id,
        label,
        type,
        color,
        x: Math.random() * 2 - 1,
        y: Math.random() * 2 - 1,
        z: Math.random() * 2 - 1
      })
    }

    // Root node
    addNode("root", "Parthiv", "root", "#8b5cf6")

    // Project nodes
    projects.forEach((p, i) => addNode(`p${i}`, p.name, "project", "#58fbdc"))

    // Tech nodes
    techs.forEach((t, i) => addNode(`t${i}`, t, "tech", "#a78bfa"))

    // Links (root -> projects)
    projects.forEach((p, i) => {
      links.push({ source: "root", target: `p${i}` })

      const usedTechs = p.tech || []
      usedTechs.forEach((t) => {
        const ti = techs.indexOf(t)
        if (ti >= 0) links.push({ source: `p${i}`, target: `t${ti}` })
      })
    })

    return { nodes, links }
  }, [projects, techs])

  // Run force simulation
  useEffect(() => {
    const { nodes, links } = graph

    const simulation = forceSimulation(nodes)
      .force("charge", forceManyBody().strength(-35))
      .force(
        "link",
        forceLink(links)
          .distance(1.8)
          .strength(1)
          .id((d) => d.id)
      )
      .force("center", forceCenter(0, 0, 0))
      .alphaDecay(0.02)

    simulation.tick(80)
    simulation.stop()

    // Slight Z randomization
    nodes.forEach((n) => {
      n.z = n.z || (Math.random() - 0.5) * 1.8
    })
  }, [graph])

  const [selected, setSelected] = useState(null)

  return (
    <section id="systems" style={{ padding: "2rem 0" }}>
      <h2>Systems Visualization</h2>
      <p style={{ color: "#94a3b8" }}>
        Interactive 3D network showing how projects and technologies connect.
      </p>

      <div
        style={{
          borderRadius: 12,
          overflow: "hidden",
          marginTop: ".75rem",
          background: "rgba(255,255,255,0.02)"
        }}
      >
        <GraphCanvas
          nodes={graph.nodes}
          links={graph.links}
          onNodeSelect={(node) => setSelected(node)}
          highlightedId={selected?.id}
        />
      </div>

      {/* SIDE PANEL */}
      <div
        style={{
          marginTop: ".75rem",
          display: "flex",
          gap: "1rem",
          alignItems: "flex-start"
        }}
      >
        <div
          style={{
            flex: 1,
            padding: ".75rem 1rem",
            borderRadius: 10,
            background: "rgba(255,255,255,0.02)"
          }}
        >
          <strong>Node details</strong>

          {!selected ? (
            <div style={{ color: "#94a3b8", marginTop: ".5rem" }}>
              Click a node to see details
            </div>
          ) : (
            <div style={{ marginTop: ".5rem", color: "#cbd5e1" }}>
              <div style={{ fontWeight: 700 }}>{selected.label}</div>

              {/* Project details */}
              {selected.type === "project" && (
                <div>
                  {(projects.find((p) => p.name === selected.label)?.bullets ||
                    []
                  ).map((b, i) => (
                    <div key={i} style={{ fontSize: 13, marginTop: ".35rem" }}>
                      • {b}
                    </div>
                  ))}
                </div>
              )}

              {/* Tech details */}
              {selected.type === "tech" && (
                <div>
                  <div style={{ fontSize: 13, marginBottom: ".5rem" }}>
                    Used by:
                  </div>
                  {projects
                    .filter((p) => (p.tech || []).includes(selected.label))
                    .map((p) => (
                      <div
                        key={p.name}
                        style={{ fontSize: 13, marginTop: ".35rem" }}
                      >
                        • {p.name}
                      </div>
                    ))}
                </div>
              )}

              {/* Root details */}
              {selected.type === "root" && (
                <div style={{ marginTop: ".5rem", color: "#9aa4b2" }}>
                  Parthiv — Full-stack AI, Databases, Systems & Security
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
