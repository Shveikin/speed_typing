import { useState } from 'react';
import './App.css';

function App() {

  const [task, setTask] = useState('Enter training data [↲]');
  
  const [train, setTrain] = useState(false);
  const [input, setInput] = useState('qwertyuiopasdfghjklzxcvbnm');
  const [color, setColor] = useState('white');

  const [counter, setCounter] = useState(0);
  const [errorsCount, setErrorsCount] = useState(0);

  const [errors, setErrors] = useState({});
  const [activeError, setActiveError] = useState(false);


  const changeError = (task, mass = -1) => {
    setErrors(prev => {
      if (!(task in prev))
        prev[task] = 6
      else 
        prev[task] += mass

      if (prev[task]==0){
        delete prev[task]
        setActiveError(Object.keys(prev).length ? Object.keys(prev)[0] : false)
      }

      return prev
    })
  }


  const error = task => {
    setColor('red')
    setErrorsCount(prev => prev +1)

    changeError(task, 2)

    if (!activeError)
      setActiveError(task)
  }


  const next = (date, last = false, error = false) => {

    if (error){

      changeError(error)

      if (errors[error] % 2){
        setTask(error[0])
        // setColor('green')
        return false
      }

    }



    date = last ? date.filter(itm => itm != last) : date
    const char = date[Math.floor(Math.random()*date.length)];
    setTask(char)
  }


  const keyDown = e => {
    if (train){
      if (input==task){
        setColor('white')
        next(train, task, activeError)
      } else {
        error(task)
      }
      setInput('')
      setCounter(prev => prev +1)
    } else {
      if (e.key == 'Enter') {
        const value = input.split('')
        setTrain(value)
        setInput('')
        next(value)
      }
    }
  }


  return (
    <div className="App">
      <header className="App-header">
          <div style={{color}}>
            {task}
          </div>
          
          <input 
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyUp={keyDown}
          />


          {
            train && <small>
              <span> {counter} </span>
              /
              <span> {errorsCount} </span>
              :
              <span> {counter ? Math.round(100 / counter * errorsCount) : counter}% </span>
            </small>
          }
      </header>
    </div>
  );
}

export default App;
