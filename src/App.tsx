import './App.css'
import Container from './components/layout/Container'
import Header from './components/layout/Header'
import AppRoutes from './routes/AppRoutes'

function App() {

  return (
    <>
      <Header />
      <Container>
        <AppRoutes />
      </Container>
    </>
  )
}

export default App
