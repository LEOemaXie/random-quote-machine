import React from 'react';
import ReactDOM from 'react-dom';

const colors = [
    "#234E70",
    "#5CBDB9",
    "#9AD8D1",
    "#0D518A",
    "#632238",
    "#216A9A",
    "#34568B",
    "#BD8C7D",
    "#E1B382",
    "#FFE000",
    "#8458B3",
    "#A28089",
    "#2D545E",
    "firebrick",
    "#237E70",
    "#0F2862",
    "#9BC400",
    "#008080",
    "#OD5184"
  ];

const Title = () => {
  return <h1 className="title">RANDOM QUOTE MACHINE</h1>
}

class Paragraph extends React.Component {
  render() {
    return (
      <div id="quote-box">
        <blockquote className="blockquote">
          <span className="quote">“</span>
          <p id="text" className="text">{this.props.text}</p>
          <span className="quote">”</span>
          <p className="author" id="author">- {this.props.author}</p>
        </blockquote>
        <span className="flex">
          <i className="fas fa-chevron-left" onClick={this.props.back}></i>
          <i className="fab fa-twitter-square"><a id="tweet-quote" href="twitter.com/intent/tweet" target="_top"></a></i>
          <i id="new-quote" className="fas fa-chevron-right" onClick={this.props.next}></i>
        </span>
      </div>
    );
  }
}

const Footer = () => {
  return <footer className="footer">By: Leo emaXie</footer>
}

let quoteState = [];
let colorState = [];

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [{ text: "", author: "" }],
      randomIndex: 0,
      colorIndex: 0,
      hasChangedBackground: false,
      counter: -1,
    };
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  componentDidMount() {
    fetch("https://type.fit/api/quotes")
      .then(response => response.json())
      .then(data => this.setState({ quotes: data }));
  }

  handleNext() {
    this.setState(state => ({
      randomIndex: Math.floor(Math.random() * this.state.quotes.length),
      colorIndex: Math.floor(Math.random() * colors.length),
      hasChangedBackground: true,
      counter: state.counter >= this.state.quotes.length ? state.counter + 0 : state.counter += 1
    }));
    quoteState.push(this.state.randomIndex);
    colorState.push(this.state.colorIndex);
  }

  handleBack() {
    quoteState.length > 0 ? this.setState(state => ({
      randomIndex: quoteState[this.state.counter],
      colorIndex: colorState[this.state.counter],
      counter: state.counter < 1 ? 0 : state.counter -= 1
    })) : ""
  }

  render() {
    const getQuotes = this.state.quotes[this.state.randomIndex];
    const setColor = colors[this.state.colorIndex];

    { this.state.hasChangedBackground ? document.body.style.backgroundColor = setColor : document.body.style.backgroundColor = "#234E70" }

    const changeStyle = {
      color: setColor,
      backgroundColor: "white",
      margin: "0 auto",
      maxHeight: "50%",
      border: "2px solid transparent",
      overflow: "auto",
    }

    return (
      <div>
        <Title color={setColor}/>
        <div className="width" style ={changeStyle}>
          <Paragraph text={getQuotes.text} author={getQuotes.author} next={this.handleNext} back={this.handleBack}/>
        </div>
        <Footer/> 
      </div>
    )
  }
}

ReactDOM.render(
  <Main/>,
  document.getElementById('container')
);
