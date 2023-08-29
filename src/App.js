import {Switch, Route} from 'react-router-dom'
import LoginFrom from './Components/LoginFrom'
import Home from './Components/Home'
import Jobs from './Components/Jobs'
import './App.css'

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={LoginFrom} />
      <Route exact path="/" component={Home} />
      <Route exact path="/jobs" component={Jobs} />
    </Switch>
  </>
)

export default App
