import { useState } from 'react'

import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'


function App() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">
      <div className="rounded-xl border border-slate-700 bg-slate-900 p-10 shadow-2xl">
        <h1 className="text-5xl font-bold text-indigo-500">
          QuillMind
        </h1>

        <p className="mt-4 text-slate-300">
          Tailwind CSS v4 is working 🚀
        </p>
      </div>
    </div>
  );
}

export default App;

