import './App.css';
import * as React from "react";
import {Routes, Route, Outlet, Link} from 'react-router-dom'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const App = (() => {
  /* const channelUrl = `https://discordapp.com/api/v6/channels/1051197137049878549/messages`;
  React.useEffect(() => {
    getMessages(channelUrl).then(messages => {
      messages.forEach(message => {
        console.log(message.content);
      });
    })
  }) */

  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='art' element={<Art/>}/>
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
        <p>Credits</p>
      </footer>
    </div>
  )
})

const Home = (() => {
  return (
    <div className="hero-image">
      <div className="hero-text">
        <h1>I am John Doe</h1>
        <p>And I'm a Photographer</p>
        <button>Hire me</button>
      </div>
    </div>
  )
})

const Merch = (() => {
  return (
    <div className="hero-image">
      <div className="hero-text">
        <h1>Maybe one day &#40;Prayge&#41;</h1>
      </div>
    </div>
  )
})

const Art = (() => {
  const ids = "1578149241498705921,1583369960612859906,1579597819249577985,1577611069614276608,1576631891981049856,1572250524375814148,1564040867891286016,1561122613296242688,1560363059373555712,1551421172843270150"

  React.useEffect(() => {
    getTweets(ids).then(data => {
      console.log(data)
    })
  })

  return (
    <div>Art Gallery</div>
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

/* async function getMessages(channelUrl) {
  let messages = [];
  let beforeId = null;
  let hasMore = true;

  while (hasMore) {
    const queryString = beforeId ? `?before=${beforeId}` : '';
    const response = await fetch(channelUrl + queryString, {
      headers: {
        'Authorization': `Bot `,
        'Access-Control-Allow-Origin':'*'
      },
      mode: 'cors',
    });
    const data = await response.json();
    messages = messages.concat(data);
    beforeId = data[data.length - 1].id;
    hasMore = data.length === 100; // Discord API returns a maximum of 100 messages per request
  }

  return messages;
} */


export default App;
