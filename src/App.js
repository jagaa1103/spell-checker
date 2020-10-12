import React, {useState, useEffect} from 'react';
import './App.css';
import { Container, FormControl,Input, InputLabel, Button } from '@material-ui/core';



let words = [];

function App() {
  const [inputText, setText] = useState('');
  const [resultText, setResultText] = useState('');
  
  useEffect(()=> {
    if(words.length < 1) {
      fetch("words.txt")
      .then(response => response.text())
      .then(text => words = text.split("\n"));
    }
  })

  function handleEvent(e){
    setText(e.target.value);
    setResultText("");
  }

  async function checkWord() {
    if(inputText.length < 1) return;
    var casedWord = checkByCase(inputText);
    if(casedWord !== '') setResultText(casedWord);
    else{
      casedWord = checkCorrection(inputText);
      if(casedWord !== '') setResultText(casedWord);
      else setResultText('No Correction Found');
    }
  }

  function checkByCase(cWord){
    var found = words.filter(word => word.toUpperCase() === cWord.toUpperCase())
    return found.length > 0 ? found[0] : '';
  }

  function checkCorrection(cWord){
    var recentChar = '';
    var i = 0;
    while(i < cWord.length){
      if(cWord[i] === recentChar) {
        cWord = cWord.slice(0, i - 1) + cWord.slice(i, cWord.length);
        var res = checkByCase(cWord);
        if(res !== '') return res;
        recentChar = cWord[i];
      }else{
        recentChar = cWord[i];
        i++;
      }
    }
    return '';
  }

  return (
    <Container maxWidth="md" className="container">
      <div className="bigText">Spell Checker</div>
      <FormControl className="form">
        <InputLabel htmlFor="my-input">Insert your word</InputLabel>
        <Input id="my-input" aria-describedby="insert your word" className="inputField" value={inputText} onChange={handleEvent} />
        <Button variant="contained" color="primary" className="button" onClick={checkWord}>Check it</Button>
      </FormControl>
      <div className="resultText">{resultText}</div>
    </Container>
    
  );

  

}

export default App;
