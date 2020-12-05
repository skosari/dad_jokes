import React, {Component} from 'react'
import axios from 'axios'
import Joke from './Joke'
import {v4 as uuidv4} from 'uuid'

const joke_API = "https://icanhazdadjoke.com/slack"

class DadJokes extends Component{
  constructor(props){
    super(props)
    this.state = {
      jokes: []
    }
    this.getJokes = this.getJokes.bind(this)
    this.rankJokes = this.rankJokes.bind(this)
  }
  
  async componentDidMount(){
    for (let i = 0; i < 10; i++){
      let joke_res = await axios.get(joke_API)
      // console.log(joke_res)
      let new_joke = joke_res.data.attachments[0].text
      this.setState(x => ({
        jokes: [...x.jokes, {joke: new_joke, id: uuidv4(), rank: 0}]
      }))
    }
  }
  
  async getJokes(){
    console.log('get jokes')
    for (var i = 0; i < 10; i++){
      var joke_res = await axios.get(joke_API)
      var new_joke = joke_res.data.attachments[0].text
      if (this.state.jokes.map(x => x.joke !== new_joke)){
        this.setState(x => ({
          jokes: [...x.jokes, {joke: new_joke, id: uuidv4(), rank: 0}]
        })) 
      } else {
        i--
        console.log('if is false')
      }
      console.log(i)
    }
  }
  
  rankJokes(id, delta){
    console.log(delta)
    this.state.jokes.map(x => {
      (
        x.id === id 
        &&
        this.setState({rank: x.rank += delta})
        )
      })
    }
    

    render(){
      let sortedJokes = this.state.jokes.sort((a,b)=> b.rank - a.rank)
      const jokeList = sortedJokes.map(x => (
        <Joke joke={x.joke} id={x.id} vote={this.rankJokes} rank={x.rank}/>
        ))
        return(
          <div style={{display: 'flex'}}>
       <button onClick={this.getJokes}>Get Jokes</button>
       <ul>
         {jokeList}
       </ul>
     </div>
    )
  }
}

export default DadJokes