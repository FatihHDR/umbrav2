"use client"
import { useState } from 'react'
import dynamic from 'next/dynamic'
const ThreeCanvas = dynamic(() => import('./ThreeCanvas'), { ssr: false })
const Overlay = dynamic(() => import('./components/Overlay'), { ssr: false })
import { ChatOverlay } from '@/components/ui/chat-overlay'
import { ModelsOverlay } from '@/components/ui/models-overlay'

export default function Page() {
    const [isChatOpen, setIsChatOpen] = useState(false)
    const [isModelsOpen, setIsModelsOpen] = useState(false)
    
    return (
        <>
            <div style={{ 
                position: 'relative', 
                width: '100vw', 
                height: '100vh', 
                overflow: 'hidden',
                filter: (isChatOpen || isModelsOpen) ? 'blur(8px)' : 'none',
                transition: 'filter 0.4s ease-in-out'
            }}>
                <ThreeCanvas />
                <Overlay 
                    isChatOpen={isChatOpen} 
                    setIsChatOpen={setIsChatOpen}
                    isModelsOpen={isModelsOpen}
                    setIsModelsOpen={setIsModelsOpen}
                />
            </div>
            
            {/* Dark tint overlay saat chat/models dibuka */}
            <div style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                opacity: (isChatOpen || isModelsOpen) ? 1 : 0,
                pointerEvents: (isChatOpen || isModelsOpen) ? 'auto' : 'none',
                transition: 'opacity 0.4s ease-in-out',
                zIndex: 299
            }} />
            
            <ChatOverlay isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
            <ModelsOverlay isOpen={isModelsOpen} onClose={() => setIsModelsOpen(false)} />
        </>
    )
}
