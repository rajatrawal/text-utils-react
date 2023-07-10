import './App.css';
import './logo.svg';
import Navbar from "./component/Navbar";
import TextForm from "./component/TextForm";
import Alert from "./component/Alert";
import About from "./component/About";
import tinycolor from "tinycolor2";
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";



function App() {
  const [theme, setTheme] = useState('dark');
  const [alert, setAlert] = useState(null);
  const [navColor, setNavColor] = useState('');
  const [textBoxColor, setTextBoxColor] = useState('');
  const [myActive,setActive] = useState('homeActive');

  const showAlert = (strongText, text, type) => {
    setAlert(
      { type: type, strongText: strongText, text: text }
    )
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  }
  const changeColor = (e) => {
    let color = e.target.value;
    let tinyColor = tinycolor(color);
    if (tinyColor.getBrightness() > 127.5) {
      setTheme('dark');

      document.getElementById("checkbox").checked=true;
    }
    else {
      setTheme('light');
      document.getElementById("checkbox").checked=false;
    }

    setNavColor(tinyColor.darken(7).toString());

    setTextBoxColor(tinyColor.lighten(10).toString());
    document.body.style.backgroundColor = `${color}`;
    let currentTheme = theme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-bs-theme', currentTheme);
    // document.title = `Texty - ${currentTheme} mode`;


  }

  // setInterval(() => {
  //   document.title = `Texty - dark mode`;
  // }, 2000);
  // setInterval(() => {
  //   document.title = `Welcome to Texty `;
  // }, 1000);

  let changeTheme = (e) => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
    let currentTheme = theme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-bs-theme', currentTheme);
    showAlert(currentTheme, 'mode has been set successfully!', 'success');

  }
  

  return (
    <>
      {/* <Navbar title="Texty" about="About us" theme={theme} changeTheme={changeTheme} changeColor={changeColor} navColor={navColor} />
      <Alert alert={alert} />
      <div className="container my-4" >
        <TextForm heading="Welcome to Texty" showAlert={showAlert} textBoxColor={textBoxColor} />
      </div> */}
      <BrowserRouter>
        <Navbar title="Texty" about="About us" theme={theme} changeTheme={changeTheme} changeColor={changeColor} navColor={navColor} active = {myActive} />
        <div style={{height:'4rem'}}>

        <Alert alert={alert} />
        </div>
        <div className="container my-4" >
          <Routes>
            <Route exact path="/about" element={<About backgroundColor={textBoxColor}  setActive={setActive}/>} ></Route>
            <Route
              exact path="/"
              element={
                <TextForm heading="Welcome to Texty" showAlert={showAlert} textBoxColor={textBoxColor} setActive={setActive}/>
              }
            ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App;
