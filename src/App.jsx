
import { Route, Routes } from 'react-router-dom'
import './App.css'

// import Quiz1 from './components/QuizApp/Quiz1/Quiz1'
// import Quiz2 from './components/QuizApp/Quiz2/Quiz2'
// import Quiz3 from './components/QuizApp/Quiz3/Quiz3'

import Header from './components/Header/Header'
// import Home from './pages/Home/Home'
import Questions from './pages/Questions/Questions'
import Home from './pages/Home/Home'
import AttemptView from './pages/AttemptView/AttemptView'

function App() {


  return (
    <>
    
      <Header />

      <div style={{backgroundColor:'rgb(246, 255, 246)' , minHeight:'100vh'}}>
      <Routes>
        <Route path='/questions' element={<Questions />} />
        <Route path='/' element={<Home />} />
        <Route path='attempts/:attemptID' element={<AttemptView />} />
      </Routes>
      </div>


    </>
  )
}

export default App
