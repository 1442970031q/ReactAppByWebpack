import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import tempPng from '../static/temp-test.png'
import icon from '../static/icon.svg'
import TestChild1 from '@/components/TestChild1'
import './index.less'

const App = () => {
    const [num, setNum] = useState(0)
    return <div id='app'>
        当前：{num}
        <img src={tempPng} className='img' />
        <img src={icon} className='img' />
        <button onClick={() => {
            debugger
            setNum(v => v + 1);
        }}>
            点击 +1
        </button>
        <TestChild1 name="2"/>
    </div>
}

const element = document.createElement("div")
element.id = "root"
document.body.appendChild(element)
const root = createRoot(document.getElementById('root'))
root.render(<App />);