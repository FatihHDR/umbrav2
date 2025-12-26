"use client"

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Clock, TrendingUp } from 'lucide-react'
import { fetchModels } from '@/lib/services/api'
import { Model } from '@/lib/types/model'

export function ModelsCarousel() {
    const [models, setModels] = useState<Model[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function loadModels() {
            try {
                setLoading(true)
                const response = await fetchModels(10, 1)
                setModels(response.data || [])
                setError(null)
            } catch (err) {
                setError('Failed to load models')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        loadModels()
    }, [])

    if (error) {
        return (
            <div style={{
                position: 'fixed',
                top: '1rem',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 150,
                padding: '0.5rem 1rem',
                background: 'rgba(239, 68, 68, 0.1)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: '0.5rem',
                color: 'rgba(239, 68, 68, 0.9)',
                fontSize: '0.75rem',
                fontFamily: 'Arial, sans-serif'
            }}>
                {error}
            </div>
        )
    }

    return (
        <div style={{
            position: 'fixed',
            top: '1rem',
            left: '2rem',
            right: '2rem',
            zIndex: 150,
            pointerEvents: 'auto'
        }}>
            <div style={{
                display: 'flex',
                gap: '0.75rem',
                overflowX: 'auto',
                overflowY: 'hidden',
                padding: '0.5rem',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
            }}>
                <AnimatePresence>
                    {loading ? (
                        // Loading skeletons
                        Array.from({ length: 3 }).map((_, i) => (
                            <motion.div
                                key={`skeleton-${i}`}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                style={{
                                    minWidth: '200px',
                                    padding: '0.75rem 1rem',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    backdropFilter: 'blur(12px)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '0.75rem',
                                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                                }}
                            >
                                <div style={{
                                    height: '1rem',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    borderRadius: '0.25rem',
                                    marginBottom: '0.5rem'
                                }} />
                                <div style={{
                                    height: '0.75rem',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    borderRadius: '0.25rem',
                                    width: '60%'
                                }} />
                            </motion.div>
                        ))
                    ) : (
                        models.map((model, index) => (
                            <motion.div
                                key={model.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                style={{
                                    minWidth: '220px',
                                    padding: '0.875rem 1.125rem',
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    backdropFilter: 'blur(16px)',
                                    border: '1px solid rgba(255, 255, 255, 0.08)',
                                    borderRadius: '0.875rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                                }}
                                whileHover={{
                                    background: 'rgba(255, 255, 255, 0.06)',
                                    borderColor: 'rgba(139, 92, 246, 0.3)',
                                    y: -2,
                                    boxShadow: '0 8px 24px rgba(139, 92, 246, 0.15)'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                    <Sparkles className="w-3.5 h-3.5" style={{ color: '#a78bfa' }} />
                                    <h3 style={{
                                        fontFamily: 'Arial, sans-serif',
                                        fontSize: '0.8rem',
                                        fontWeight: '600',
                                        color: 'white',
                                        margin: 0,
                                        flex: 1,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        {model.name}
                                    </h3>
                                    <span style={{
                                        padding: '0.125rem 0.5rem',
                                        borderRadius: '0.375rem',
                                        fontSize: '0.625rem',
                                        fontWeight: '500',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                        background: model.status === 'active'
                                            ? 'rgba(34, 197, 94, 0.15)'
                                            : 'rgba(239, 68, 68, 0.15)',
                                        color: model.status === 'active'
                                            ? 'rgb(34, 197, 94)'
                                            : 'rgb(239, 68, 68)',
                                        border: `1px solid ${model.status === 'active'
                                            ? 'rgba(34, 197, 94, 0.3)'
                                            : 'rgba(239, 68, 68, 0.3)'}`
                                    }}>
                                        {model.status}
                                    </span>
                                </div>

                                <p style={{
                                    fontFamily: 'Arial, sans-serif',
                                    fontSize: '0.7rem',
                                    color: 'rgba(255, 255, 255, 0.5)',
                                    margin: 0,
                                    marginBottom: '0.625rem',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }}>
                                    {model.description || 'No description available'}
                                </p>

                                <div style={{
                                    display: 'flex',
                                    gap: '0.75rem',
                                    fontSize: '0.65rem',
                                    color: 'rgba(255, 255, 255, 0.4)'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                        <Clock className="w-3 h-3" />
                                        <span>{model.version}</span>
                                    </div>
                                    {model.metrics?.accuracy && (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                            <TrendingUp className="w-3 h-3" />
                                            <span>{(model.metrics.accuracy * 100).toFixed(0)}%</span>
                                        </div>
                                    )}
                                </div>

                                {model.tags && model.tags.length > 0 && (
                                    <div style={{
                                        display: 'flex',
                                        gap: '0.375rem',
                                        marginTop: '0.5rem',
                                        flexWrap: 'wrap'
                                    }}>
                                        {model.tags.slice(0, 2).map((tag, i) => (
                                            <span
                                                key={i}
                                                style={{
                                                    padding: '0.125rem 0.375rem',
                                                    background: 'rgba(139, 92, 246, 0.1)',
                                                    border: '1px solid rgba(139, 92, 246, 0.2)',
                                                    borderRadius: '0.25rem',
                                                    fontSize: '0.6rem',
                                                    color: 'rgba(167, 139, 250, 0.9)'
                                                }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>

            <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
        </div>
    )
}
