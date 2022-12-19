import './App.css';
import {useEffect, useState} from "react";
import santa from './assets/santa.jpg'

function App() {
    const [donate, setDonate] = useState(['Владимир', 'Ирина', 'Кристина', 'Фёдор', 'Любовь',
        'Вова', 'Александр', 'Алексей', 'Анатолий', 'Ринат'])
    const [randomDonate, setRandomDonate] = useState(Math.floor(Math.random() * donate.length))

    const [present, setPresent] = useState(['Владимир', 'Ирина', 'Кристина', 'Фёдор', 'Любовь',
        'Вова', 'Александр', 'Алексей', 'Анатолий', 'Ринат'])
    const [randomPresent, setRandomPresent] = useState(Math.floor(Math.random() * present.length))

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
        setRandomDonate(Math.floor(Math.random() * donate.length))
        setRandomPresent(Math.floor(Math.random() * present.length))
        setDonate(donate.filter((el, key) => key !== randomDonate))
        setPresent(present.filter((el, key) => key !== randomPresent))

    }
    if (donate.length === 0) return <div className="App">
        <div className="Container end">закончили</div>
    </div>

    return (
        <>
            <div className="App">
                <div className="Container">
                    <img className="image" src={santa} alt="santa"/>
                    <p>подарок дарит <br/> {donate[randomDonate]}</p>
                    <p>подарок получает <br/> {present[randomPresent]}</p>
                    <button onClick={handleClick}>
                        следующий
                    </button>
                </div>
            </div>
        </>

    );
}

export default App;
