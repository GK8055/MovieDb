import './App.css'
import {Switch, Route} from 'react-router-dom'

import Home from './Home'
import TopMovies from './TopMovies'
import UpcomingMovies from './UpcomingMovies'
import SingleMovieDetails from './SingleMovieDetails'

// write your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/top-rated" component={TopMovies} />
    <Route exact path="/upcoming" component={UpcomingMovies} />
    <Route exact path="/movie/:id" component={SingleMovieDetails} />
  </Switch>
)

export default App
