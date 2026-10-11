import { Suspense, useEffect, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { PerformanceMonitor, Preload } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { addFrameHook } from '../lib/loop'
import { isMobile, isLowEnd } from '../lib/device'
import Particles from './Particles'
import AICore from './AICore'
import Badge from './Badge'
import SkillSphere from './SkillSphere'
import ProcessPipeline from './ProcessPipeline'
import Globe from './Globe'

/** Renders the canvas from the shared gsap ticker, right after Lenis has scrolled. */
function Driver() {
  const advance = useThree((s) => s.advance)
  useEffect(() => addFrameHook((t) => advance(t * 1000)), [advance])
  return null
}

export default function Scene() {
  const lite = isMobile || isLowEnd
  const [dpr, setDpr] = useState(lite ? 1.25 : 1.75)
  const [fx, setFx] = useState(!lite)

  return (
    <div className="webgl" aria-hidden="true">
      <Canvas
        frameloop="never"
        dpr={dpr}
        flat
        camera={{ fov: 35, position: [0, 0, 10], near: 0.1, far: 60 }}
        gl={{ antialias: !fx, alpha: false, powerPreference: 'high-performance', stencil: false }}
        eventSource={document.getElementById('root')}
        eventPrefix="client"
      >
        <color attach="background" args={['#07070a']} />
        <Driver />
        <PerformanceMonitor
          onDecline={() => {
            setDpr(1)
            setFx(false)
          }}
          flipflops={2}
        />
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 4, 6]} intensity={2.2} />
        <pointLight position={[-4, -2, 3]} intensity={30} color="#ff2a23" />

        <Particles count={lite ? 1200 : 2600} />
        <Suspense fallback={null}>
          <AICore detail={lite ? 20 : 32} />
          <Badge />
          <SkillSphere />
          <ProcessPipeline />
          <Globe dots={lite ? 900 : 1600} />
          <Preload all />
        </Suspense>

        {fx && (
          <EffectComposer multisampling={4} enableNormalPass={false}>
            <Bloom mipmapBlur intensity={0.85} luminanceThreshold={0.85} luminanceSmoothing={0.25} radius={0.7} />
            <Vignette offset={0.25} darkness={0.6} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  )
}
