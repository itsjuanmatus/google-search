import React from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'

const links = [
  { url: '/search', text: 'All' },
  { url: '/news', text: 'News' },
  { url: '/images', text: 'Images' },
  { url: '/videos', text: 'Videos' }
]

export default function Links () {
    const router = useRouter()
  return (
    <div className='flex sm:justify-around justify-between items-center mt-4 space-x-10'>
      {links.map(({url, text}) => (
        <div key={url} className='cursor-pointer'>
          <Link href={url} passHref>
              <p className={`cursor-pointer text-blue-700 border-b-2 dark:text-blue-300 pb-2 ${router.pathname === url ? 'border-blue-700' : '' }`}>
                  {text}
              </p>
          </Link>
          </div>
      ))}
    </div>
  )
}
