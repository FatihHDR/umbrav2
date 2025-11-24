
"use client"

import React, { useEffect, useRef, useState } from 'react'

export default function Overlay() {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const grainCanvasRef = useRef(null)
  const scrollProgressRef = useRef(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const rafRef = useRef(null)

  // Update scrollProgressRef on scroll
  useEffect(() => {
    function onScroll() {
      scrollProgressRef.current = Math.max(0, window.scrollY / (window.innerHeight || 1))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // rAF loop to sync scrollProgress into state for rendering
  useEffect(() => {
    function tick() {
      setScrollProgress(scrollProgressRef.current)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  // Film-grain canvas drawing (animated)
  useEffect(() => {
    const canvas = grainCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let w = 0
    let h = 0
    let raf

    function resize() {
      const ratio = window.devicePixelRatio || 1
      w = canvas.clientWidth * ratio
      h = canvas.clientHeight * ratio
      canvas.width = w
      canvas.height = h
    }

    function draw() {
      if (!ctx) return
      const imageData = ctx.createImageData(w, h)
      const data = imageData.data
      for (let i = 0; i < data.length; i += 4) {
        const v = (Math.random() * 255) | 0
        data[i] = v
        data[i + 1] = v
        data[i + 2] = v
        data[i + 3] = 12 // low alpha for subtle grain
      }
      ctx.putImageData(imageData, 0, 0)
      raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', background: 'transparent', position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 20 }}>
      {/* Navigation*/}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '1.5rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'rgba(0, 0, 0, 0.2)',
        pointerEvents: 'auto'
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            background: '#000'
          }} />
        </div>

        <div style={{
          display: 'flex',
          gap: '2rem',
          fontFamily: 'Arial, sans-serif',
          fontSize: '11px',
          fontWeight: '500',
          letterSpacing: '1px',
          textTransform: 'uppercase'
        }}>
          <a href="#" style={{ color: 'white', textDecoration: 'none', opacity: 0.9 }}>
            Creative Journey
          </a>
          <a href="#" style={{ color: 'white', textDecoration: 'none', opacity: 0.9 }}>
            About
          </a>
          <a href="#" style={{ color: 'white', textDecoration: 'none', opacity: 0.9 }}>
            Sound
          </a>
        </div>

        <div style={{
          fontFamily: 'Arial, sans-serif',
          fontSize: '11px',
          fontWeight: '500',
          color: 'white',
          opacity: 0.9,
          letterSpacing: '1px',
          textTransform: 'uppercase'
        }}>
          + Connect
        </div>
      </nav>

      {/* Large text*/}
      <div style={{
        position: 'fixed',
        bottom: '15%',
        left: 0,
        right: 0,
        zIndex: 50,
        transform: `translateY(${scrollProgress * 100}px)`,
        opacity: Math.max(0, 1 - scrollProgress * 1.5),
        transition: 'transform 0.1s ease-out',
        pointerEvents: 'none'
      }}>
        <div style={{
          fontFamily: 'Arial Black, Arial, sans-serif',
          fontSize: 'clamp(4rem, 15vw, 12rem)',
          fontWeight: '900',
          color: 'white',
          textAlign: 'center',
          lineHeight: 0.8,
          letterSpacing: '-0.02em',
          textShadow: '0 0 50px rgba(255, 255, 255, 0.3)',
          filter: 'contrast(1.2)'
        }}>
          UMBRA
        </div>
      </div>

      {/* Left side text */}
      <div style={{
        position: 'fixed',
        left: '2rem',
        top: '40%',
        zIndex: 50,
        transform: `translateX(${-scrollProgress * 200}px)`,
        opacity: Math.max(0, 1 - scrollProgress * 2),
        transition: 'transform 0.1s ease-out',
        pointerEvents: 'none'
      }}>
        <div style={{
          fontFamily: 'Arial, sans-serif',
          fontSize: '11px',
          color: 'white',
          lineHeight: 1.4,
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
          opacity: 0.8,
          maxWidth: '150px'
        }}>
          In the dark<br />
          is where<br />
          light takes form<br />
          <br />
        </div>
      </div>

      {/* Right side text */}
      <div style={{
        position: 'fixed',
        right: '2rem',
        top: '40%',
        zIndex: 50,
        transform: `translateX(${scrollProgress * 200}px)`,
        opacity: Math.max(0, 1 - scrollProgress * 2),
        transition: 'transform 0.1s ease-out',
        pointerEvents: 'none'
      }}>
        <div style={{
          fontFamily: 'Arial, sans-serif',
          fontSize: '11px',
          color: 'white',
          lineHeight: 1.4,
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
          opacity: 0.8,
          maxWidth: '150px',
          textAlign: 'right'
        }}>
          In emptiness<br/>
          we find<br/>
          true happiness

        </div>
      </div>

      {/* Bottom text*/}
      <div style={{
        position: 'fixed',
        bottom: '8%',
        left: '2rem',
        zIndex: 50,
        transform: `translateY(${scrollProgress * 50}px)`,
        opacity: Math.max(0, 1 - scrollProgress * 1.5),
        transition: 'transform 0.1s ease-out',
        pointerEvents: 'none'
      }}>
        <div style={{
          fontFamily: 'Arial, sans-serif',
          fontSize: '10px',
          color: 'white',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          opacity: 0.7
        }}>
        </div>
      </div>

      {/* Canvas Container */}
      <div style={{ position: 'sticky', top: 0, width: '100%', height: '100vh', pointerEvents: 'none' }}>
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'transparent'
          }}
        />
        {/* Film Grain Overlay Canvas */}
        <canvas
          ref={grainCanvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            mixBlendMode: 'overlay',
            opacity: 0.6
          }}
        />
      </div>

      {/* CSS for exact styling and animations */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500&display=swap');
        
        @keyframes grainMove {
          0% { 
            background-position: 0px 0px, 0px 0px, 0px 0px;
          }
          10% { 
            background-position: -5px -10px, 10px -15px, -10px 5px;
          }
          20% { 
            background-position: -10px 5px, -5px 10px, 15px -10px;
          }
          30% { 
            background-position: 15px -5px, -10px 5px, -5px 15px;
          }
          40% { 
            background-position: 5px 10px, 15px -10px, 10px -5px;
          }
          50% { 
            background-position: -15px 10px, 5px 15px, -10px -15px;
          }
          60% { 
            background-position: 10px -15px, -15px -5px, 15px 10px;
          }
          70% { 
            background-position: -5px 15px, 10px -10px, -15px 5px;
          }
          80% { 
            background-position: 15px 5px, -5px -15px, 5px -10px;
          }
          90% { 
            background-position: -10px -5px, 15px 10px, 10px 15px;
          }
          100% { 
            background-position: 0px 0px, 0px 0px, 0px 0px;
          }
        }
        
        a:hover {
          opacity: 1 !important;
          transition: opacity 0.2s ease;
        }
        
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
