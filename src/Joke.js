import React, {Component} from 'react'

class Joke extends Component{

  constructor(props){
    super(props)
    this.upVote = this.upVote.bind(this)
    this.downVote = this.downVote.bind(this)
  }

  upVote(){
    this.props.vote(this.props.id, 1)
  }
  
  downVote(){
    this.props.vote(this.props.id, -1)
  }

  // componentDidUpdate(){
  //   this.props.rank(this.props.id, this.state.rank)
  // }

  render(){
    return(
      <li style={{display: 'flex'}} key={this.props.id}>
        <div>
          <button onClick={this.upVote}>Up</button>
          {this.props.rank}
          <button onClick={this.downVote}>Down</button>
        </div>
        <div>
          {this.props.joke}
        </div>
        </li>
    )
  }
}

export default Joke