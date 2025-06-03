'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface MenuSection {
  title: string
  items: MenuItem[]
}

interface MenuItem {
  title: string
  description: string
}

const Navbar: React.FC = () => {
  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState<boolean>(false)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
  const productsMenuRef = useRef<HTMLDivElement>(null)

  const menuSections: MenuSection[] = [
    {
      title: "Beginner",
      items: [
        { title: "Quest", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
        { title: "Paper Trading", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." }
      ]
    },
    {
      title: "Intermediate",
      items: [
        { title: "Copy Trading", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." }
      ]
    },
    {
      title: "Advanced",
      items: [
        { title: "Strategy Visualizer", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
        { title: "Screener", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
        { title: "Backtest", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
        { title: "Algo trading", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." }
      ]
    }
  ]

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "light") {
      setIsDarkMode(true)
      document.documentElement.classList.add("light-mode")
      document.body.classList.add("light-mode")
    } else {
      document.documentElement.classList.remove("light-mode")
      document.body.classList.remove("light-mode")
    }
  }, [])

  const handleThemeToggle = (): void => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("light-mode")
    document.body.classList.toggle("light-mode")
    localStorage.setItem("theme", document.documentElement.classList.contains("light-mode") ? "light" : "dark")
  }

  const handleProductsToggle = (): void => {
    setIsProductsMenuOpen(!isProductsMenuOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (productsMenuRef.current && !productsMenuRef.current.contains(event.target as Node)) {
        setIsProductsMenuOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <>
      <style jsx global>{`
        :root {
          --bg-primary: #000000;
          --bg-secondary: rgba(20, 25, 15, 0.9);
          --text-primary: #ffffff;
          --text-secondary: rgba(245, 245, 245, 0.7);
          --accent-color: #a4ff00;
          --border-color: rgba(255, 255, 255, 0.1);
          --hover-bg: rgba(255, 255, 255, 0.05);
        }

        :root.light-mode {
          --bg-primary: #ffffff;
          --text-primary: #333333;
        }

        body {
          background-color: var(--bg-primary);
          color: var(--text-primary);
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .navbar {
          max-width: 1200px;
          margin: 41px auto 0;
          display: flex;
          // justify-content: space-between;
          align-items: center;
          padding: 15px 20px;
          background: transparent; /* ✅ Transparent */
          border: none;            /* ✅ No border */
          border-radius: 0;        /* ✅ No border radius */
          box-shadow: none !important;
        }

        .logo {
          margin-left: 50px;
        }

        .nav-links {
          display: flex;
          gap: 40px;
          margin-left:17rem;
        }

        .products-dropdown {
          position: relative;
        }

        .products-button {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          color: var(--text-primary);
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          padding: 8px 12px;
        }

        .products-button svg {
          transition: transform 0.3s ease;
        }

        .products-button.active svg {
          transform: rotate(180deg);
        }

        .products-menu {
          display: none;
          position: absolute;
          top: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          background: #0F1209;
          border-radius: 12px;
          padding: 10px;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          z-index: 1000;
        }

        .products-menu.active {
          display: grid;
        }
          .nav-links .pri{
          margin-top:0.4rem;
          }

        .menu-section {
          background: #181C0E;
          padding: 10px;
          border-radius: 8px;
        }

        .menu-section h3,
        .menu-item h4,
        .menu-item p {
          color: #F5F5F5;
        }

        .menu-item {
          padding-bottom: 10px;
          border-bottom: 1.5px solid #F8FFEB;
        }

        .nav-links a {
          text-decoration: none;
          color: var(--text-primary);
          font-weight: 600;
          font-size: 16px;
          transition: color 0.3s;
        }

        .nav-links a:hover {
          color: #a4ff00;
        }

        .auth {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .auth a {
          text-decoration: none;
          color: var(--text-primary);
          font-weight: 600;
          font-size: 16px;
        }

        .auth a:hover {
          color: #a4ff00;
        }

        .theme-toggle-container {
          display: flex;
          // align-items: center;
          margin-left:25rem;
        }

        .theme-toggle {
          display: none;
        }

        .toggle-label {
          width: 40px;
          height: 22px;
          background: white;
          border-radius: 50px;
          position: relative;
          cursor: pointer;
          border: 1px solid #ccc;
        }

        .toggle-slider {
          position: absolute;
          top: 50%;
          left: 2px;
          transform: translateY(-50%);
          width: 18px;
          height: 18px;
          background: #333;
          border-radius: 50%;
          transition: 0.3s;
        }

        .theme-toggle:checked + .toggle-label {
          background: #333;
        }

        .theme-toggle:checked + .toggle-label .toggle-slider {
          left: 20px;
          background: white;
        }
          /* Remove background and border from navbar in light mode */
.light-mode .navbar {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

/* (Optional) Remove border from the navbar toggler button in light mode */
.light-mode .navbar-toggler,
.light-mode .navbar-toggler:focus,
.light-mode .navbar-toggler:active {
  outline: none !important;
  border: none !important;
  box-shadow: none !important;
}


        .light-mode .nav-links a,
        .light-mode .auth a {
          color: black;
        }

        .light-mode .nav-links a:hover {
          color: #007bff;
        }

        .light-mode .products-button {
          color: black;
        }
      `}</style>

      <nav className="navbar">
      <div className="logo" onClick={() => (window.location.href = "/")} style={{ cursor: 'pointer' }}>
  <Image src="/logo.png" alt="TradeVed Logo" width={150} height={40} priority />
</div>


        <nav className="nav-links">
          <div className="products-dropdown" ref={productsMenuRef}>
            <button
              className={`products-button ${isProductsMenuOpen ? 'active' : ''}`}
              onClick={handleProductsToggle}
              type="button"
              aria-expanded={isProductsMenuOpen}
              aria-haspopup="true"
            >
              Products
              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            <div className={`products-menu ${isProductsMenuOpen ? 'active' : ''}`}>
              {menuSections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="menu-section">
                  <h3>{section.title}</h3>
                  <div className="menu-items">
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="menu-item">
                        <h4>{item.title}</h4>
                        <p>{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pri"><Link href="/pricing">Pricing</Link></div>
        </nav>

        <nav className="auth">
          <div className="theme-toggle-container">
            <input
              type="checkbox"
              id="theme-toggle"
              className="theme-toggle"
              checked={isDarkMode}
              onChange={handleThemeToggle}
            />
            <label htmlFor="theme-toggle" className="toggle-label">
              <span className="toggle-slider" />
            </label>
          </div>
        </nav>
      </nav>
    </>
  )
}

export default Navbar
