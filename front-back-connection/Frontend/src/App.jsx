import { useEffect, useState } from 'react'
import axios from "axios"
import './App.css'

function App() {
  const [texts, setTexts] = useState([]);

  useEffect(() => {
    axios.get('/api/texts')
      .then((response) => {
        setTexts(response.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  return (
    <div>
      <h1>Some Texts</h1>
      <p>Total texts - {texts.length}</p>

      {
        texts.map((item) => {
          return <div key={item.id}>
            <h4>{item.text}</h4>
            <h5>{item.description}</h5>
          </div>
        })
      }
    </div>
  )
}

export default App
