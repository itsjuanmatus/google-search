import { NextPage } from 'next'
import Results from '../components/Results'

const Home: NextPage = ({ data }: any) => {
  return (
    <div>
      {/* @ts-ignore */}
      <Results />
    </div>
  )
}

export default Home
