import React, { createContext, useContext } from 'react'

interface SomeProps {
  /* your interface */
}

const ResultContext = createContext<SomeProps>(null!)
const baseUrl = 'https://google-search3.p.rapidapi.com/api/v1'

export const ResultContextProvider = ({ children }: any) => {
  const [results, setResults] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState('')

  const getResults = async (type: any) => {
    setIsLoading(true)
    const response = await fetch(`${baseUrl}${type}`, {
      method: 'GET',
      headers: {
        'x-user-agent': 'desktop',
        'x-rapidapi-host': 'google-search3.p.rapidapi.com',
        'x-rapidapi-key': '67f1b9b329msh37f1aaceb84a3aep18c5fejsn7dd88e237824'
      }
    })

    const data = await response.json()

    if (type.includes('/news')) {
      setResults(data.entries)
    } else if (type.includes('/images')) {
      setResults(data.image_results)
    } else setResults(data.results)

    setIsLoading(false)
  }

  return (
    <ResultContext.Provider
      value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}
    >
      {children}
    </ResultContext.Provider>
  )
}

export const useResultContext = () => useContext(ResultContext)
