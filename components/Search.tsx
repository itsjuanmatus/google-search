import React from 'react'
import Links from './Links'
import { useDebounce } from 'use-debounce'

import { useResultContext } from '../contexts/ResultContextProvider'

export default function Search () {
  const [text, setText] = React.useState('Elon Musk')
  const { setSearchTerm }:any = useResultContext()
  const [debouncedValue] = useDebounce(text, 300)

  React.useEffect(() => {
    if (debouncedValue) setSearchTerm(debouncedValue)
  }, [debouncedValue])

  return (
    <div className='relative sm:ml-48 md:ml-72 sm:-mt-10 mt-3 items-center'>
      <input
        value={text}
        type='text'
        className='sm:w-96 w-80 h-10 dark:bg-gray-200 border rounded-full shadow-sm outline-none p-6 text-black hover:shadow-lg'
        onChange={(e)=>setText(e.target.value)}
      />
      
      <Links />
    </div>
  )
}
