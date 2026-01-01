'use client'

import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const weeksWigsRef = useRef<HTMLDivElement>(null)
  const dunkPickRef = useRef<HTMLDivElement>(null)
  const accessoriesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Hero section animations
    if (heroRef.current) {
      const heroTitle = heroRef.current.querySelector('.hero-title')
      const heroSubtitle = heroRef.current.querySelector('.hero-subtitle')
      const heroImage = heroRef.current.querySelector('.hero-image')

      gsap.fromTo(heroTitle,
        {
          y: 100,
          opacity: 0,
          scale: 0.8,
          rotation: -5
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.5,
          ease: 'elastic.out(1, 0.5)',
        }
      )

      gsap.fromTo(heroSubtitle,
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3,
          ease: 'power3.out',
        }
      )

      gsap.fromTo(heroImage,
        {
          scale: 1.2,
          opacity: 0
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: 'power2.out',
        }
      )

      // Parallax effect for hero
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        y: 200,
        opacity: 0.3,
        scale: 0.95,
      })
    }

    // This Week's Wigs section
    if (weeksWigsRef.current) {
      const wigCards = weeksWigsRef.current.querySelectorAll('.wig-card')
      const sectionTitle = weeksWigsRef.current.querySelector('.section-title')

      gsap.fromTo(sectionTitle,
        {
          x: -100,
          opacity: 0,
          rotation: -10
        },
        {
          x: 0,
          opacity: 1,
          rotation: 0,
          duration: 1.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionTitle,
            start: 'top 80%',
          },
        }
      )

      wigCards.forEach((card, index) => {
        gsap.fromTo(card,
          {
            y: 150,
            opacity: 0,
            rotation: index % 2 === 0 ? -15 : 15,
            scale: 0.8
          },
          {
            y: 0,
            opacity: 1,
            rotation: 0,
            scale: 1,
            duration: 1,
            delay: index * 0.2,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
          }
        )

        // Hover animation
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.05,
            rotation: index % 2 === 0 ? 2 : -2,
            duration: 0.3,
            ease: 'power2.out'
          })
        })

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: 'power2.out'
          })
        })
      })
    }

    // Dunk's Pick section
    if (dunkPickRef.current) {
      const dunkCard = dunkPickRef.current.querySelector('.dunk-card')
      const dunkTitle = dunkPickRef.current.querySelector('.section-title')

      gsap.fromTo(dunkTitle,
        {
          scale: 0.5,
          opacity: 0,
          rotation: 360
        },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1.5,
          ease: 'elastic.out(1, 0.8)',
          scrollTrigger: {
            trigger: dunkTitle,
            start: 'top 80%',
          },
        }
      )

      gsap.fromTo(dunkCard,
        {
          scale: 0.7,
          opacity: 0,
          y: 100
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: dunkCard,
            start: 'top 80%',
          },
        }
      )

      // Continuous subtle animation
      gsap.to(dunkCard, {
        y: -20,
        duration: 2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
    }

    // Accessories section
    if (accessoriesRef.current) {
      const accessoryItems = accessoriesRef.current.querySelectorAll('.accessory-item')
      const sectionTitle = accessoriesRef.current.querySelector('.section-title')

      gsap.fromTo(sectionTitle,
        {
          x: 100,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionTitle,
            start: 'top 80%',
          },
        }
      )

      accessoryItems.forEach((item, index) => {
        gsap.fromTo(item,
          {
            y: 100,
            opacity: 0,
            scale: 0.5
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
            },
          }
        )
      })
    }

    return () => {
      lenis.destroy()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const wigs = [
    { name: "The Disco Inferno", price: "$89.99", color: "Fiery Orange", style: "Afro" },
    { name: "The Funky Shag", price: "$74.99", color: "Golden Blonde", style: "Layered" },
    { name: "The Soul Sister", price: "$94.99", color: "Rich Brown", style: "Natural Curl" },
    { name: "The Groovy Wave", price: "$79.99", color: "Sunset Red", style: "Beach Wave" },
  ]

  const accessories = [
    { name: "Retro Headbands", price: "$19.99" },
    { name: "Wig Caps", price: "$12.99" },
    { name: "Styling Combs", price: "$15.99" },
    { name: "Wig Stand", price: "$24.99" },
    { name: "Shine Spray", price: "$18.99" },
    { name: "Care Kit", price: "$34.99" },
  ]

  return (
    <main className="relative">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6"
      >
        <div className="absolute inset-0 disco-ball opacity-30"></div>

        <div className="hero-image relative w-full max-w-4xl mb-12 z-10">
          <div className="retro-border rounded-3xl overflow-hidden">
            <Image
              src="https://iili.io/fT6gj29.png"
              alt="Morrie's Wig Shop"
              width={1200}
              height={600}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>

        <h1 className="hero-title retro-text text-7xl md:text-9xl text-center mb-6 neon-glow z-10">
          MORRIE'S
          <br />
          <span className="groovy-gradient bg-clip-text text-transparent">
            WIG SHOP
          </span>
        </h1>

        <p className="hero-subtitle text-2xl md:text-4xl text-center text-retro-yellow z-10">
          Far Out Styles Since 1972 ✌️
        </p>

        <div className="absolute bottom-12 animate-bounce">
          <div className="text-4xl text-retro-orange">↓</div>
        </div>
      </section>

      {/* This Week's Wigs */}
      <section
        ref={weeksWigsRef}
        className="min-h-screen py-24 px-6 relative"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title retro-text text-6xl md:text-8xl text-center mb-20 funky-shadow text-retro-yellow">
            THIS WEEK'S WIGS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {wigs.map((wig, index) => (
              <div
                key={index}
                className="wig-card rounded-2xl p-8 cursor-pointer"
              >
                <div className="aspect-square bg-gradient-to-br from-retro-orange/20 to-retro-yellow/20 rounded-xl mb-6 flex items-center justify-center">
                  <div className="text-8xl">💇</div>
                </div>
                <h3 className="retro-text text-3xl mb-3 text-retro-cream">{wig.name}</h3>
                <p className="text-xl text-retro-yellow mb-2">{wig.style} • {wig.color}</p>
                <p className="text-4xl font-bold text-retro-orange">{wig.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dunk's Pick of the Week */}
      <section
        ref={dunkPickRef}
        className="min-h-screen py-24 px-6 relative flex items-center justify-center"
      >
        <div className="max-w-5xl mx-auto w-full">
          <h2 className="section-title retro-text text-6xl md:text-8xl text-center mb-16 neon-glow">
            DUNK'S PICK
            <br />
            <span className="text-5xl md:text-6xl text-retro-yellow">OF THE WEEK</span>
          </h2>

          <div className="dunk-card wig-card rounded-3xl p-12 text-center">
            <div className="aspect-video bg-gradient-to-br from-retro-teal/30 to-retro-orange/30 rounded-2xl mb-8 flex items-center justify-center">
              <div className="text-9xl">👑</div>
            </div>
            <h3 className="retro-text text-5xl mb-4 text-retro-cream">The Platinum Funk</h3>
            <p className="text-2xl text-retro-yellow mb-6">
              Shimmering Silver • Premium Synthetic
            </p>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Dunk says: "This is THE wig that'll make you the star of every disco ball in town!
              Shine bright like a diamond, baby!"
            </p>
            <p className="text-6xl font-bold groovy-gradient bg-clip-text text-transparent">
              $129.99
            </p>
          </div>
        </div>
      </section>

      {/* Accessories */}
      <section
        ref={accessoriesRef}
        className="min-h-screen py-24 px-6 relative"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title retro-text text-6xl md:text-8xl text-center mb-20 funky-shadow text-retro-teal">
            ACCESSORIES
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {accessories.map((item, index) => (
              <div
                key={index}
                className="accessory-item wig-card rounded-xl p-8 text-center cursor-pointer hover:scale-105 transition-transform"
              >
                <div className="text-6xl mb-4">✨</div>
                <h3 className="retro-text text-2xl mb-3 text-retro-cream">{item.name}</h3>
                <p className="text-3xl font-bold text-retro-orange">{item.price}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <p className="retro-text text-3xl text-retro-yellow mb-4">
              Stay Groovy! ✌️
            </p>
            <p className="text-xl text-white/60">
              © 2026 Morrie's Wig Shop • Est. 1972
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
