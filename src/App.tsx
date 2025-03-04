import './App.css'
import Card from './components/card/Card'
import RulesContainer from './components/rules/RulesContainer'

function App() {
  return (
    <>
      <Card
        title='Rules'
        subTitle='The offer will be triggered based on the rules in this section'
        hasDivider
      >
        <RulesContainer />
      </Card>
    </>
  )
}

export default App
