import './App.css';
import {useEffect, useState} from "react";
import santa from './assets/santa.jpg'

function App() {
    const [donate, setDonate] = useState([])
    const [randomDonate, setRandomDonate] = useState(Math.floor(Math.random() * donate.length))

    const [present, setPresent] = useState([])
    const [randomPresent, setRandomPresent] = useState(Math.floor(Math.random() * present.length))

    const [visible, setVisible] = useState(false)
    const [theEnd, setTheEnd] = useState(false)
    const [value, setValue] = useState('')

    useEffect(() => {
        if (present[randomPresent] === donate[randomDonate]) {
            setRandomDonate(Math.floor(Math.random() * donate.length))
        }
        if (donate[randomDonate] === undefined || present[randomPresent] === undefined) {
            setRandomPresent(Math.floor(Math.random() * present.length))
            setRandomDonate(Math.floor(Math.random() * donate.length))
        }
    }, [present, randomPresent, donate, randomDonate])

    const handleClick = () => {
        if(donate.length === 0) {
            setTheEnd(true)
        } else {
            setRandomDonate(Math.floor(Math.random() * donate.length))
            setRandomPresent(Math.floor(Math.random() * present.length))
            setDonate(donate.filter((el, key) => key !== randomDonate))
            setPresent(present.filter((el, key) => key !== randomPresent))
            const fileData = JSON.stringify(present[randomPresent]);
            const blob = new Blob([fileData], {type: "text/plain;charset=utf-8;"});
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = donate[randomDonate];
            link.href = url;
            link.click();
        }
    }

    const handeChange = (e) => {
        setValue(e.target.value)
    }
    const nextPerson = () => {
        setValue('')
        setDonate([...donate, value])
        setPresent([...present, value])
    }
     const letsGo = () => {
         setVisible(true)
     }

    if (theEnd) return <div className="App">
        <div className="Container end">закончили</div>
    </div>

    return (
        <>
            {!visible &&
                <div className="App">
                    <div className="Container">
                        <div className="position">
                        <input value={value} onChange={handeChange} type="text" placeholder="введите имя"/>
                        <button onClick={nextPerson}>добавить еще человека</button>
                        <button onClick={letsGo}>начать генерацию</button>
                        </div>
                        {donate.length !==0 &&
                            <>
                            <span>список добавленных</span>
                        {donate.map(el => <p className="render-name">{el}</p>)}
                            </>
                        }
                    </div>
                </div>
            }
            {visible &&
                <div className="App">
                    <div className="Container">
                        <img className="image" src={santa} alt="santa"/>
                        <p>подарок дарит <br/> {donate[randomDonate]}</p>
                        <p>подарок получает <br/></p>
                        <button onClick={handleClick}>
                            следующий
                        </button>
                    </div>
                </div>
            }
        </>

    );
}

export default App;
