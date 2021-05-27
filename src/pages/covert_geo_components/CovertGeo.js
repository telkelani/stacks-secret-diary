import React, {useEffect, useState} from 'react'
import Card  from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import  Button from 'react-bootstrap/Button';
import Header  from './HeaderGeo'
import Container from 'react-bootstrap/Container'
import axios from 'axios'
import _ from 'underscore'

//Have to import images from directory to render them in React.
import waterBackground from './waterBackground.gif'
import './CovertGeo.css'

/**
 * 
 * Might use this function as my covert page because the news api has 100 requests per day which 
 * is very little. 
 * REST API is completely free to use with no quotas. I dont want to have to subsidize API costs 
 * for news API if the app is going to be tested by many people. 
 */

export function CovertGeo() {
  /**
   * States: {
   *  question: generates new country for question,
   *  answers: a set of 4 answers (country Object),
   *  score: keep score,
   *  questionNumber: to stop at a certain number of questions
   *  gameOver: to change the component shown when game is over
   */
  const [question, setQuestion] = useState({}) 
  const [answers, setAnswers] = useState([])
  const [score,setScore] = useState(0)
  const [questionNumber, setQuestionNumber] = useState(1)
  const [gameOver, setGameOver] = useState(false)


  
  useEffect( () => {
    const url = "https://restcountries.eu/rest/v2/all?fields=name;capital"
    axios.get(url).
    then(async response => {
      /**
       * This function is what happens when we get the data. This is async function
       * Gets country data from restcountries api. 
       *
       */ 
      var response_countries = await response.data
      var countries = []
      for (let i=0;i<response_countries.length;i++){
        if (response_countries[i].capital != ""){ //Some countries returned dont have a capital
          countries.push(response_countries[i])
        }
      }
      var random_countries = []

      /**
       * Picks 4 countries and user will have to guess capital for one of them
       * The if statement is there so there is no duplicate answers
       * The first variable gets a random country
       */
      let count = 0
      while (count < 4){
        var random_country = countries[Math.floor( Math.random() * countries.length)]
        if (random_countries.includes(random_country)){
          continue
        }
        else{
          random_countries.push(random_country)
          count++;
        }
      }
        
      //Here the state is set to the first country it picked. 
      setQuestion(random_countries[0])
      //So the answer isn't always the first option, the array is shuffled here
      var random_countries = _.shuffle(random_countries)

      //Then the array is set as the answers state. This has to be in a map because on its own will be undefined
      setAnswers(random_countries.map(country => country))
      
      


     
    })
    //All the states will update when the questionNumber changes. 
  },[questionNumber])


  /**
   * Executes this function when user clicks an answer
   * e = event (button click)
   * if the clicked button is equal to the question's capital then the score is updated.
   * if the question number is 10 then gameOver state is true so the game is over
   * questionnumber is updated here
   */
  function handleClick(e) {
    var clicked = e.target.textContent //Gets text of clicked button
    
    if (clicked === question.capital){
      setScore(score+1)

    }
    if (questionNumber === 10){
      setGameOver(true)
      
    }
    setQuestionNumber(questionNumber+1)
  }

  /**
   * The game component. This will render if gameOver = false.
   * 
   * @returns Game Component
   */

  const Game = () => {


    return (
    <div>
    <div className="game-info">
      <h3>Question Number: {questionNumber}</h3>
      <h4>Your Score: {score}/10</h4>

    </div>

    
    <Card className="middle-card" >
      <Card.Body >
        <Card.Title>
          
          What is the capital of {question.name}?
          
        </Card.Title>
        {/* Renders buttons based on the answers generated */}
        {answers.map(answer => <Button onClick={(e) => handleClick(e)}  className="quiz-button">{answer.capital}</Button>)}            
      </Card.Body>

    </Card>
    </div>
    
    )
  }

  /**
   * Reset: this resets the game when the user clicks play again
   * Basically setting all the state values to their default value
   */
  const reset = () => {
    setScore(0)
    setQuestionNumber(1)
    setQuestion({})
    setAnswers([])
    setGameOver(false)
  }

  /**
   * Component that renders play again button
   * @returns Play again button
   */
  const PlayAgain = () => {
    return (
      <Card className="middle-card">
      <Card.Body >
        <Card.Title>
          
        <h1>Your final score is: {score}</h1>
          
        </Card.Title>
        <Button className="quiz-button" onClick={reset}>Play Again</Button>         
      </Card.Body>

    </Card>

    )
  }

  //Had to define style here to use as inline style to override bootstrap container css
  const containerStyle={
    background: `url(${waterBackground}) no-repeat center`,
    backgroundSize: 'cover',

    width: '100%',
    minHeight: '100vh'
    
  }

  
  /**
   * Covert page component will return this.
   * If gameOVer is true, then the PlayAgain component will be rendered, if not then the Game component
   */
  return (
    <div style={containerStyle}>

   
    <Header />
    <Container fluid >
        <Row >
          <Col className="text-center">
            {gameOver ? <PlayAgain /> : <Game />}
          </Col>
        </Row> 
    </Container>
    </div>
      
    
  )
}


