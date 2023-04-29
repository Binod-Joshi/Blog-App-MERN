
import Header from '../../header/Header'
import Posts from '../../posts/Posts'
import './Home.css'

const Home = () => {
  return (
    <>
    <Header/>
    <div className='home'>
      <Posts/>
    </div>
    </>
  )
}

export default Home
