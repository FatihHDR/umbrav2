"use client"
import dynamic from 'next/dynamic'
const ThreeCanvas = dynamic(() => import('./ThreeCanvas'), { ssr: false })
const Overlay = dynamic(() => import('./components/Overlay'), { ssr: false })

export default function Page() {
    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
            <ThreeCanvas />
            <Overlay />
        </div>
    )
}
