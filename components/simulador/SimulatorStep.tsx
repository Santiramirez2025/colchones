'use client'

import { motion } from 'framer-motion'

interface Option {
  value: string
  label: string
  icon?: string
}

interface Question {
  id: string
  title: string
  subtitle: string
  type: 'choice' | 'scale'
  options?: Option[]
  min?: number
  max?: number
  labels?: string[]
}

interface SimulatorStepProps {
  question: Question
  onAnswer: (value: any) => void
  currentAnswer: any
}

export default function SimulatorStep({ question, onAnswer, currentAnswer }: SimulatorStepProps) {
  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card text-center p-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{question.title}</h2>
        <p className="text-gray-600 text-lg mb-12">{question.subtitle}</p>

        {question.type === 'choice' && question.options && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {question.options.map((option) => (
              <motion.button
                key={option.value}
                onClick={() => onAnswer(option.value)}
                className={`p-6 rounded-xl border-2 transition-all text-left ${
                  currentAnswer === option.value
                    ? 'border-primary-600 bg-primary-50 shadow-glow'
                    : 'border-gray-200 hover:border-primary-300 hover:bg-warm-50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-4">
                  {option.icon && <span className="text-4xl">{option.icon}</span>}
                  <div className="flex-1">
                    <p className="font-semibold text-lg">{option.label}</p>
                  </div>
                  {currentAnswer === option.value && (
                    <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        )}

        {question.type === 'scale' && question.min && question.max && question.labels && (
          <div className="space-y-8">
            <div className="flex justify-between gap-2">
              {Array.from({ length: question.max - question.min + 1 }, (_, i) => {
                const value = question.min! + i
                return (
                  <motion.button
                    key={value}
                    onClick={() => onAnswer(value)}
                    className={`flex-1 aspect-square rounded-xl border-2 transition-all flex flex-col items-center justify-center ${
                      currentAnswer === value
                        ? 'border-primary-600 bg-primary-600 text-white shadow-glow'
                        : 'border-gray-200 hover:border-primary-300 hover:bg-warm-50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-2xl font-bold">{value}</span>
                  </motion.button>
                )
              })}
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              {question.labels.map((label, i) => (
                <span key={i} className="text-center flex-1">
                  {label}
                </span>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
