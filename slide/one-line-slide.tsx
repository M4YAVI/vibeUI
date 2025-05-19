import { useState } from 'react'
import type { NextPage } from 'next'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

const slides = [
  'First slide',
  'Second slide',
  'Third slide'
]

const Home: NextPage = () => {
  const [index, setIndex] = useState(0)
  const prev = () => setIndex(i => (i - 1 + slides.length) % slides.length)
  const next = () => setIndex(i => (i + 1) % slides.length)

  return (
    <div className="h-screen flex items-center justify-center bg-black">
      <div className="relative w-full max-w-md overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(${-index * 100}%)` }}
        >
          {slides.map((text, idx) => (
            <div key={idx} className="flex-shrink-0 w-full px-4">
              <p className="text-white text-center text-xl whitespace-nowrap">{text}</p>
            </div>
          ))}
        </div>
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white p-2 hover:bg-white hover:bg-opacity-20 rounded-full"
          aria-label="Previous slide"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <button
          onClick={next}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white p-2 hover:bg-white hover:bg-opacity-20 rounded-full"
          aria-label="Next slide"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}

export default Home
