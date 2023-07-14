import React from 'react'

interface State {
  technology: string[]
  seniority: string[]
  availability: string[]
  location: string[]
}

export const FilterContext = React.createContext<State>({
  technology: [],
  seniority: [],
  availability: [],
  location: [],
})