import MathSpace3D from '@/components/MathSpace3D';
import { useState } from 'react';

export default function Home() {
  const [height, setHeight] = useState(2);
  const [baseRadius, setBaseRadius] = useState(1.5);
  const [showWireframe, setShowWireframe] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);

  // Calculate volume of pyramid: V = (1/3) * B * h
  // For a square pyramid, B = (2 * baseRadius)^2 = 4 * baseRadius^2
  const baseArea = 4 * Math.pow(baseRadius, 2);
  const volume = (1/3) * baseArea * height;

  return (
    <main className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-8 text-center text-neutral-100">
      <div className="w-full max-w-6xl space-y-8">
        {/* Header */}
        <header className="text-center mb-6">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            MathSpace 3D
          </h1>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
            Interactive 3D Geometry Learning Platform
          </p>
        </header>

        {/* Main 3D Visualization */}
        <section className="glass-panel-dark h-[500px] relative">
          <MathSpace3D 
            height={height} 
            baseRadius={baseRadius} 
          />
          
          {/* Controls Overlay */}
          <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
            <div className="w-full max-w-md space-y-6 pointer-events-all">
              {/* Height Slider */}
              <div className="space-y-3">
                <label className="flex items-center justify-between text-sm font-medium">
                  <span>Height: {height.toFixed(1)}</span>
                  <button 
                    onClick={() => setShowWireframe(!showWireframe)}
                    className={`p-2 rounded hover:bg-neutral-800/50 transition-colors ${showWireframe ? 'bg-neutral-700' : ''}`}
                  >
                    Toggle Wireframe
                  </button>
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="5"
                  step="0.1"
                  value={height}
                  onChange={(e) => setHeight(parseFloat(e.target.value))}
                  className="w-full h-2 bg-neutral-800 rounded cursor-pointer"
                  style={{ 
                    background: `linear-gradient(to right, cyan 0%, cyan ${(height-0.5)/4.5*100}%, transparent ${(height-0.5)/4.5*100}% 100%)` 
                  }}
                />
              </div>

              {/* Base Radius Slider */}
              <div className="space-y-3">
                <label className="flex items-center justify-between text-sm font-medium">
                  <span>Base Radius: {baseRadius.toFixed(1)}</span>
                  <button 
                    onClick={() => alert('Coming soon: 2D patron unfolding animation!')}
                    className="p-2 rounded hover:bg-neutral-800/50 transition-colors bg-neutral-700"
                  >
                    Unfold to 2D Patron
                  </button>
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.1"
                  value={baseRadius}
                  onChange={(e) => setBaseRadius(parseFloat(e.target.value))}
                  className="w-full h-2 bg-neutral-800 rounded cursor-pointer"
                  style={{ 
                    background: `linear-gradient(to right, cyan 0%, cyan ${(baseRadius-0.5)/2.5*100}%, transparent ${(baseRadius-0.5)/2.5*100}% 100%)` 
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Information Panel */}
        <section className="glass-panel-dark grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Volume Formula */}
          <div className="p-6 space-y-4">
            <h2 className="text-xl font-bold flex items-center">
              <span className="w-5 h-5 bg-cyan-400/20 rounded flex items-center justify-center mr-3">∿</span>
              Volume Formula
            </h2>
            <div className="bg-neutral-800/50 p-4 rounded-lg">
              <p className="text-2xl font-bold text-cyan-400">
                V = <span className="text-neutral-200">⅓</span> × B × h
              </p>
              <p className="text-neutral-300 mt-2">
                Where:<br/>
                B = Base Area = <span className="text-neutral-200">{baseArea.toFixed(2)}</span><br/>
                h = Height = <span className="text-neutral-200">{height.toFixed(2)}</span>
              </p>
              <p className="mt-4 text-2xl font-bold text-blue-400">
                Volume = <span className="text-neutral-200">{volume.toFixed(2)}</span> unit³
              </p>
            </div>
          </div>

          {/* Quiz Panel */}
          <div className="p-6 space-y-4">
            <h2 className="text-xl font-bold flex items-center">
              <span className="w-5 h-5 bg-blue-400/20 rounded flex items-center justify-center mr-3">❓</span>
              Quick Quiz
            </h2>
            <div className="bg-neutral-800/50 p-4 rounded-lg">
              <p className="text-lg font-medium mb-4">
                How many vertices does a square pyramid have?
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => setQuizAnswer(4)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border border-neutral-700 hover:border-cyan-400/50 transition-all ${quizAnswer === 4 ? 'bg-cyan-900/50 border-cyan-400' : ''}`}
                >
                  <span>4 vertices</span>
                  <span className="text-sm opacity-70">(Correct!)</span>
                </button>
                <button
                  onClick={() => setQuizAnswer(5)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border border-neutral-700 hover:border-blue-400/50 transition-all ${quizAnswer === 5 ? 'bg-blue-900/50 border-blue-400' : ''}`}
                >
                  <span>5 vertices</span>
                  <span className="text-sm opacity-70">(Try again)</span>
                </button>
                <button
                  onClick={() => setQuizAnswer(3)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border border-neutral-700 hover:border-blue-400/50 transition-all ${quizAnswer === 3 ? 'bg-blue-900/50 border-blue-400' : ''}`}
                >
                  <span>3 vertices</span>
                  <span className="text-sm opacity-70">(Try again)</span>
                </button>
                <button
                  onClick={() => setQuizAnswer(6)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border border-neutral-700 hover:border-blue-400/50 transition-all ${quizAnswer === 6 ? 'bg-blue-900/50 border-blue-400' : ''}`}
                >
                  <span>6 vertices</span>
                  <span className="text-sm opacity-70">(Try again)</span>
                </button>
              </div>
              {quizAnswer === 4 && (
                <>
                  <p className="mt-4 text-lg font-bold text-cyan-400">
                    ✅ Correct! A square pyramid has 5 vertices (4 base + 1 apex)
                  </p>
                </>
              )}
              {quizAnswer && quizAnswer !== 4 && (
                <>
                  <p className="mt-4 text-lg font-bold text-blue-400">
                    ❌ Not quite. Think about the base corners plus the top point.
                  </p>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center mt-8 text-neutral-500 text-sm">
          <p>MathSpace 3D • Interactive 3D Geometry Learning • Built with Next.js 16 & Three.js</p>
        </footer>
      </div>
    </main>
  );
}
