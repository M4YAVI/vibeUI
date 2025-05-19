import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const cardData = [
  {
    id: 1,
    title: 'Explore',
    description: 'Discover new horizons',
    color: 'bg-gradient-to-br from-purple-600 to-indigo-800',
    icon: '🌍'
  },
  {
    id: 2,
    title: 'Innovate',
    description: 'Create breakthrough ideas',
    color: 'bg-gradient-to-br from-green-500 to-emerald-700',
    icon: '💡'
  },
  {
    id: 3,
    title: 'Connect',
    description: 'Build meaningful relationships',
    color: 'bg-gradient-to-br from-pink-500 to-rose-600',
    icon: '🤝'
  },
  {
    id: 4,
    title: 'Grow',
    description: 'Continuously evolve',
    color: 'bg-gradient-to-br from-orange-500 to-red-600',
    icon: '🌱'
  },
  {
    id: 5,
    title: 'Balance',
    description: 'Find inner harmony',
    color: 'bg-gradient-to-br from-blue-500 to-cyan-600',
    icon: '☯️'
  }
]

const CardStack: React.FC = () => {
  const [cards, setCards] = useState(cardData)

  const handleSwipe = () => {
    // Move the top card to the bottom of the stack
    setCards(prevCards => {
      const [firstCard, ...restCards] = prevCards
      return [...restCards, firstCard]
    })
  }

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center p-4 overflow-hidden">
      <div className="relative w-72 h-[420px]">
        <AnimatePresence>
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              drag="x"
              dragConstraints={{ left: -300, right: 300 }}
              dragElastic={0.7}
              onDragEnd={(e, { offset }) => {
                if (Math.abs(offset.x) > 100) {
                  handleSwipe()
                }
              }}
              initial={{ 
                scale: 1 - index * 0.05, 
                y: index * 8,
                zIndex: cards.length - index,
                opacity: 1 - index * 0.15
              }}
              animate={{ 
                scale: 1 - index * 0.05, 
                y: index * 8,
                zIndex: cards.length - index,
                opacity: 1 - index * 0.15,
                x: 0
              }}
              exit={{
                x: 300,
                opacity: 0,
                transition: { duration: 0.3 }
              }}
              whileDrag={{ 
                scale: 1.02,
                transition: { duration: 0.1 }
              }}
              transition={{ 
                type: "spring", 
                stiffness: 250, 
                damping: 20 
              }}
              className={`
                absolute w-full h-[380px] rounded-2xl p-5 text-white
                cursor-grab active:cursor-grabbing
                ${card.color} 
                shadow-2xl
                flex flex-col justify-between
                transform origin-bottom
              `}
              style={{
                top: index * 6,
                zIndex: cards.length - index
              }}
            >
              <div className="text-5xl mb-3 opacity-80">{card.icon}</div>
              <div>
                <h2 className="text-2xl font-bold mb-2">{card.title}</h2>
                <p className="text-sm opacity-70">{card.description}</p>
              </div>
              <div className="absolute bottom-4 right-4 text-xs opacity-50">
                Swipe to explore
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default CardStack
