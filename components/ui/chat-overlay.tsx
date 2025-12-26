"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { XIcon } from "lucide-react"
import { AnimatedAIChat } from "./animated-ai-chat"

interface ChatOverlayProps {
    isOpen: boolean
    onClose: () => void
}

export function ChatOverlay({ isOpen, onClose }: ChatOverlayProps) {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener("keydown", handleEscape)
        }

        return () => {
            document.removeEventListener("keydown", handleEscape)
        }
    }, [isOpen, onClose])

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="fixed inset-0 z-[300] w-full h-full"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all backdrop-blur-sm"
                    >
                        <XIcon className="w-6 h-6" />
                    </button>

                    {/* Chat Content */}
                    <div className="w-full h-full">
                        <AnimatedAIChat />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
