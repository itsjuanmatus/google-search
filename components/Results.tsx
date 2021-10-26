import React, { useEffect } from 'react'
import { useResultContext } from '../contexts/ResultContextProvider'
import { useRouter } from 'next/router'
import Loading from './Loading'
import ReactPlayer from 'react-player'

export default function Results ({ data }: any) {
  console.log(data)
  const { results, isLoading, getResults, searchTerm }: any = useResultContext()
  const router = useRouter()

  useEffect(() => {
    if (searchTerm) {
      if (router.pathname === '/videos') {
        getResults(`/search/q=${searchTerm} videos`)
      } else {
        getResults(`${router.pathname}/q=${searchTerm}&num=40`)
      }
    }
  }, [searchTerm, router.pathname])

  if (isLoading) return <Loading />

  switch (router.pathname) {
    case '/search':
      return (
        <div className='grid md:grid-cols-2 gap-x-10 w-full m-auto place-items-center'>
          {results?.map(({ link, title }: any, index: any) => (
            <div key={index} className='md:w-2/5 w-full p-3'>
              <a href={link} target='_blank' rel='noreferrer'>
                <p className='text-sm'>
                  {link.length > 30 ? link.substring(0, 30) : link}
                </p>
                <p className='text-lg hover:underline dark:text-blue-300 text-blue-700'>
                  {title}
                </p>
              </a>
            </div>
          ))}
        </div>
      )
    case '/images':
      return (
        <div className='grid md:grid-cols-2 gap-x-10 w-full m-auto place-items-center'>
          {results?.map(({ image, link: { href, title } }: any, index: any) => (
            <a
              className='sm:p-3 p-5'
              href={href}
              key={index}
              target='_blank'
              rel='noreferrer'
            >
              <img src={image?.src} alt={title} loading='lazy' />
              <p className='w-36 break-words text-sm mt-2'>{title}</p>
            </a>
          ))}
        </div>
      )
    case '/news':
      return (
        <div className='grid md:grid-cols-2 gap-10 w-full m-auto place-items-center mt-2'>
          {results?.map(({ links, id, source, title }: any) => (
            <div key={id} className='md:w-2/5 w-full'>
              <a
                href={links?.[0].href}
                target='_blank'
                rel='noreferrer'
                className='hover:underline'
              >
                <p className='text-lg dark:text-blue-300 text-blue-700'>
                  {title}
                </p>
                <div className='flex gap-4'>
                  <a href={source?.href} target='_blank' rel='noreferrer'>
                    {source?.href}
                  </a>
                </div>
              </a>
            </div>
          ))}
        </div>
      )
    case '/videos':
      return (
        <div className='flex flex-wrap'>
          {results.map((video: any, index: any) => (
            <div key={index} className='p-2'>
              {video?.additional_links?.[0]?.href && <ReactPlayer
                url={video.additional_links?.[0].href}
                controls
                width='355px'
                height='200px'
              />}
            </div>
          ))}
        </div>
      )

    default:
      return 'ERROR!'
  }
}
