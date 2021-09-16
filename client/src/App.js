import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// стили
// import { Container } from 'react-bootstrap'
// компоненты
import { Home } from './components/Home/Home'
import { ChatRoom } from './components/ChatRoom/ChatRoom'

const routes = [
  { path: '/', name: 'Home', Component: Home },
  { path: '/:roomId', name: 'ChatRoom', Component: ChatRoom }
]

export const App = () => {

  return (
    <Router>
      <div style={{ maxWidth: '512px', position: 'relative', margin: '0 auto', textAlign: 'center' }}>
        {/* {window.location.pathname === '/' ?
          <h1 style={{ textAlign: 'center' }}>React Chat App</h1>
          :
          <h1 style={{ textAlign: 'center' }}>Room: {window.location.pathname.slice(1)}</h1>
        } */}
        <Switch>
          {routes.map(({ path, Component }) => (
            <Route key={path} path={path} exact>
              <Component />
            </Route>
          ))}
        </Switch>
      </div>
    </Router>
  )
}