
import { Route, Routes } from 'react-router-dom'
import './App.css'

// import Quiz1 from './components/QuizApp/Quiz1/Quiz1'
// import Quiz2 from './components/QuizApp/Quiz2/Quiz2'
// import Quiz3 from './components/QuizApp/Quiz3/Quiz3'

import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import Questions from './pages/Questions/Questions'

function App() {
  

  return (
    <>
     {/* <Quiz1/> */}
     {/* <Quiz2 /> */}
     {/* <Quiz3 /> */}

     <Header />

     <Routes>
      <Route path='/home' element ={<Home/>}/>
      <Route path='/questions' element ={<Questions/>}/>
     </Routes>
    </>
  )
}

export default App
