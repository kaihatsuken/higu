import './App.css';
import * as React from "react";
import {Routes, Route, Outlet, Link} from 'react-router-dom'
import messages from'./messages.json'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHHO7SE063JpuJPQNFW_r8eBT20dIFcjk",
  authDomain: "higu-website.firebaseapp.com",
  projectId: "higu-website",
  storageBucket: "higu-website.appspot.com",
  messagingSenderId: "580034754943",
  appId: "1:580034754943:web:00628449709623a634824a",
  measurementId: "G-6X6BPDCB4P"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const App = (() => {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='art' element={<Gallery/>}/>
          <Route path='merch' element={<Merch/>}/>

          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
})

const Layout = (() => {
  return (
    <div className='main'>
      <header>
        <h1 className='higu-title'>日ぐ</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/art">Art Gallery</Link>
          <Link to="/merch">Merch</Link>
        </nav>
      </header>

      <Outlet />

      <footer>
        <a href='https://www.twitch.tv/higuvt'><i class="fa-brands fa-twitch"></i></a>
        <a href='https://twitter.com/higu_VT'><i class="fa-brands fa-twitter"></i></a>
        <a href='https://www.tiktok.com/@higu_vt'><i class="fa-brands fa-tiktok"></i></a>
        <a href='https://discord.gg/SHw8CGYQZq'><i class="fa-brands fa-discord"></i></a>
      </footer>
    </div>
  )
})

const Home = (() => {
  const messagesArray = []

  for (let i = 0; i < messages.length; i++) {
    const message = messages[i];
    messagesArray.push(<Message content={message.message} author={message.author} float={i % 2 === 0 ? 'left' : 'right'}/>)
  }

  return (
    <>
      <div className="hero-image">
        <div className="hero-text">
          <h1>Happy Birthday Higu!!!</h1>
          <p>From your community with &#128151;</p>
        </div>
      </div>

      <div className='messages'>
        {messagesArray}
      </div>

      <div className='review'>
        <img src='/five-star.png' alt=''/>
        <p>5/5</p>
        <p className='italic'>Definitely a must watch</p>
      </div>
    </>
  )
})

const Message = (({content, author, float}) => {
  const className = `quote-${float}`

  return (
    <div className={className}>
      <blockquote style={float={float}}>
        {content}
      </blockquote>
      <cite style={float={float}}>{author}</cite>
    </div>
  )
})

const Merch = (() => {
  return (
    <div className="hero-image">
      <div className="hero-text">
        <h1>Sike there's nothing here</h1>
        <p>Maybe one day &#40;Prayge&#41;</p>
      </div>
    </div>
  )
})

const Gallery = (() => {
  const [gallery, setGallery] = React.useState(null)
  const ids = "1578149241498705921,1583369960612859906,1579597819249577985,1577611069614276608,1576631891981049856,1572250524375814148,1564040867891286016,1561122613296242688,1560363059373555712,1551421172843270150"
  const art = []

  React.useEffect(() => {
    if(!gallery){
      getTweets(ids).then(data => {
        console.log(data)
        let tweets = data.tweets.data
        
        for (let i = 0; i < tweets.length; i++) {
          let tweet = tweets[i];
          let url = data.tweets.includes.media[i].url
          art.push(<Art text={tweet.text} img={url} id={tweet.id} key={tweet.id}/>)
        }
  
        console.log(art)
        setGallery(art)
      })
    }
  })

  return (
    <div key={'galery'} className="gallery">
      {gallery}
    </div>
  )
})

const Art = (({text, img, id}) => {
  let originalTweet = `https://twitter.com/higu_VT/status/${id}`
  return (
    <div className='artCard'>
      <img src={img} alt=''/>
      <p>{text}</p>
      <a href={originalTweet}>Go to original tweet</a>
    </div>
  )
})

const NoMatch = (() => {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
})

async function getTweets(ids) {
  const baseUrl = 'https://twitter-api.herokuapp.com/twitter';
  const headers = {
    'Access-Control-Allow-Origin': '*'
  };
  const response = await fetch(`${baseUrl}?ids=${ids}`, {headers});
  const data = await response.json();
  return data;
}

export default App;
