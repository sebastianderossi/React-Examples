import React, { Component } from 'react';
import Palindrome from './Palindrome';
import './App.css';

class App extends Component {
    constructor(props) {
      super(props);
        this.state = {
            words: []
        }
        this.parlindrome = new Palindrome();
  }

    clear() {
        //SD:Clear display... might be hack :)
        this.setState({words:[]});
    }

    parseData() {
        this.clear();
        setTimeout(()=> {
            var txt = this.refs.textInput;
            var data = this.parlindrome.getAllPalindromes(txt.value);
            var words = this.state.words;
            var l = data.length;
            //SD:Pick a hue
            var hue = Math.random()*360 | 0;
            for(var i=0;i<l;i++) {
                var style = {};
                var sat = 100;
                var lum = 10+((i+1)/50) * 100;
                style.backgroundColor = "hsl("+hue+","+sat+"%,"+lum+"%,1"+")";
                words.push((<div style={style}>{data[i]}</div>));
            }
            //this.refs.textInput.value = "";
            this.setState({words:words});
        }, 10);


    }

    render() {
    return (
      <div className="App">

          <div className="wrapper">
              <h3>Palindrome</h3>
              <div className="listItems">
                  {this.state.words}
             </div>
              <div className="inputDiv">
                  <input type="text" className="textInput" ref="textInput"></input>
                  <input type="button" className="inputButton" onClick={this.parseData.bind(this)} value="+"/>
              </div>

          </div>
      </div>
    );
  }
}

export default App;
