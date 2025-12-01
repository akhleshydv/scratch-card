import { useEffect, useRef, useState, useCallback } from 'react';
import './ScratchCard.css';

const ScratchCard = ({ isOpen, onClose }) => {
  const canvasRef = useRef(null);
  const [isScratching, setIsScratching] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const lastPointRef = useRef(null);

  const drawGiftBox = useCallback((ctx, centerX, centerY, canvasHeight) => {
    ctx.fillStyle = '#e88f6f';
    ctx.fillRect(centerX - 50, centerY - 30, 100, 60);
    
    ctx.fillStyle = '#f5b896';
    ctx.fillRect(centerX - 55, centerY - 45, 110, 20);
    
    ctx.fillStyle = '#3b5dcc';
    ctx.fillRect(centerX - 8, centerY - 45, 16, 85);
    ctx.fillRect(centerX - 60, centerY - 15, 120, 16);
    
    ctx.beginPath();
    ctx.ellipse(centerX - 25, centerY - 50, 20, 15, 0, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.ellipse(centerX + 25, centerY - 50, 20, 15, 0, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(centerX, centerY - 50, 10, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#d9a5b5';
    
    ctx.beginPath();
    ctx.ellipse(centerX - 40, centerY + 50, 35, 30, -0.3, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.ellipse(centerX - 60, centerY + 30, 12, 25, -0.5, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.ellipse(centerX - 50, centerY + 15, 12, 28, -0.3, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.ellipse(centerX - 35, centerY + 5, 12, 30, -0.1, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.ellipse(centerX - 10, centerY + 45, 15, 20, 0.5, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    
    ctx.beginPath();
    ctx.arc(centerX - 90, centerY + 20, 40, -0.5, 0.5, false);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(centerX - 95, centerY + 35, 35, -0.5, 0.5, false);
    ctx.stroke();
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.beginPath();
    ctx.arc(60, canvasHeight - 80, 8, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(80, canvasHeight - 100, 6, 0, Math.PI * 2);
    ctx.fill();
  }, []);

  const drawScratchSurface = useCallback((ctx, width, height) => {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#6dd999');
    gradient.addColorStop(1, '#4ec57a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 42px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('Scratch', 40, 40);
    ctx.fillText('Now', 40, 90);
    
    ctx.font = '600 20px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    ctx.fillText('bigbasket', width - 40, height - 40);
    
    drawGiftBox(ctx, width / 2 + 20, height / 2 + 20, height);
  }, [drawGiftBox]);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    
    drawScratchSurface(ctx, rect.width, rect.height);
  }, [drawScratchSurface]);

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      setIsRevealed(false);
      lastPointRef.current = null;
      initCanvas();
    }
  }, [isOpen, initCanvas]);

  const startScratching = (e) => {
    setIsScratching(true);
    scratch(e);
  };

  const stopScratching = () => {
    setIsScratching(false);
    lastPointRef.current = null;
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    setIsScratching(true);
    const touch = e.touches[0];
    scratch({
      clientX: touch.clientX,
      clientY: touch.clientY
    });
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    if (!isScratching) return;
    
    const touch = e.touches[0];
    scratch({
      clientX: touch.clientX,
      clientY: touch.clientY
    });
  };

  const scratch = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 60;
    
    if (lastPointRef.current) {
      ctx.beginPath();
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
      
      const dist = Math.sqrt(
        Math.pow(x - lastPointRef.current.x, 2) + 
        Math.pow(y - lastPointRef.current.y, 2)
      );
      const angle = Math.atan2(y - lastPointRef.current.y, x - lastPointRef.current.x);
      
      for (let i = 0; i < dist; i += 5) {
        const px = lastPointRef.current.x + Math.cos(angle) * i;
        const py = lastPointRef.current.y + Math.sin(angle) * i;
        ctx.beginPath();
        ctx.arc(px, py, 30, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI * 2);
    ctx.fill();
    
    lastPointRef.current = { x, y };
    checkScratchedArea();
  };

  const checkScratchedArea = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width / window.devicePixelRatio;
    const height = canvas.height / window.devicePixelRatio;
    
    const sampleSize = 40;
    const stepX = Math.floor(width / sampleSize);
    const stepY = Math.floor(height / sampleSize);
    
    let transparentPixels = 0;
    let totalPixels = 0;
    
    for (let x = 0; x < width; x += stepX) {
      for (let y = 0; y < height; y += stepY) {
        const pixel = ctx.getImageData(x, y, 1, 1).data;
        totalPixels++;
        if (pixel[3] < 128) {
          transparentPixels++;
        }
      }
    }
    
    const scratchedPercentage = (transparentPixels / totalPixels) * 100;
    
    if (scratchedPercentage > 30 && !isRevealed) {
      setIsRevealed(true);
      setTimeout(() => {
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }, 400);
    }
  };

  const handleClaimClick = () => {
    alert('Coupon CCBB20 claimed! 🎉');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('CCBB20');
    alert('Coupon code copied!');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <button className="close-btn" onClick={onClose}>✕</button>
      
      <div className="scratch-card">
        <div className="scratch-content">
          <div className="win-header">Yay! You've won a scratch card</div>
          
          <div className="brand-logo">
            <span className="clay-text">CLAY</span>
            <span className="co-text">Co.</span>
          </div>
          
          <div className="offer-title">Flat 20% Off</div>
          <div className="offer-subtitle">& Get Free Moisturiser worth ₹399</div>
          
          <div className="coupon-code-wrapper">
            <div className="coupon-code">
              CCBB20
              <button className="copy-icon" onClick={handleCopyCode} aria-label="Copy code">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="5" y="5" width="9" height="9" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M3 11V3C3 2.44772 3.44772 2 4 2H10" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                </svg>
              </button>
            </div>
          </div>
          
          <button className="claim-btn" onClick={handleClaimClick}>Claim now</button>
          <div className="terms">Terms and Conditions</div>
        </div>
        
        <canvas
          ref={canvasRef}
          id="scratchCanvas"
          className={isRevealed ? 'revealed' : ''}
          onMouseDown={startScratching}
          onMouseMove={scratch}
          onMouseUp={stopScratching}
          onMouseLeave={stopScratching}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={stopScratching}
        />
      </div>
    </div>
  );
};

export default ScratchCard;
