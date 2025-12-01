import { useState } from 'react'
import ScratchCard from './components/ScratchCard'
import './App.css'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="app-container">
      <div className="mobile-frame">
        <div className="mobile-notch"></div>
        <div className="mobile-screen">
          {!isModalOpen ? (
            <div className="content">
              <div className="gift-icon">🎁</div>
              <h1>Scratch & Win</h1>
              <p className="subtitle">Exciting rewards await you!</p>
              <button className="scratch-btn" onClick={() => setIsModalOpen(true)}>
                <span className="btn-icon">✨</span>
                Scratch Now
                <span className="btn-icon">✨</span>
              </button>
              <div className="decorative-elements">
                <span className="float-emoji emoji-1">🎉</span>
                <span className="float-emoji emoji-2">🎊</span>
                <span className="float-emoji emoji-3">🎈</span>
                <span className="float-emoji emoji-4">⭐</span>
              </div>
            </div>
          ) : (
            <ScratchCard isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
          )}
        </div>
        <div className="mobile-bottom-bar"></div>
      </div>
    </div>
  )
}

export default App
