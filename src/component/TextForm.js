import React, { useState } from 'react';
import PropTypes from 'prop-types';
export default function TextForm(props) {
  props.setActive('homeActive');
  let handleUppercaseChange = (e) => {
    setText(rawText.toUpperCase());
    props.showAlert('Uppercase text', 'has been done sucessfully', 'success');
  }
  let handleLowercaseChange = (e) => {
    setText(rawText.toLowerCase());
    props.showAlert('Lowercse text', 'has been done sucessfully', 'success');
  }

  let handleOnChange = (e) => {
    setRawText(e.target.value);
  }
  let handleCopy = () => {

    navigator.clipboard.writeText(text);
    props.showAlert('Text copy', 'has been done sucessfully', 'success');

  }
  let handleExtraSpace = () => {
    let reg = /[ ]+/;
    let arr = rawText.split(reg);
    setText(arr.join(' '));
    props.showAlert('Extra space', 'has been removed sucessfully', 'success');
  }
  let extractPhoneNumbers = () => {
    //eslint-disable-next-line
    let reg = new RegExp('[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}', 'gi');
    let phone_numbers_str = rawText.match(reg).join('\n');
    setText(phone_numbers_str);
    props.showAlert('Phone numbers', 'has been extracted sucessfully', 'success');
  }

  let calculateWords = (str) => {
    let splited = str.split(/\s+/);
    splited = splited.filter((e) => {
      return e.length > 0;

    });
    return splited.length;

  }

  const [text, setText] = useState('');
  const [rawText, setRawText] = useState('');
  return (
    <div>

      <h1 className="mt-4 mb-4">{props.heading}</h1>
      <div className="form-floating">

        <textarea className="form-control" placeholder="Write your text here" value={rawText} id="textarea" style={{ height: "250px", backgroundColor: props.textBoxColor }} onChange={handleOnChange} ></textarea>
        <label forhtml="textarea">{props.label}</label>

      </div>
      <div className="d-flex justify-content-around flex-wrap mt-4">
        <button className="btn btn-primary my-2 mx-2" disabled={rawText.length === 0} onClick={handleUppercaseChange}>Uppercase Text</button>
        <button className="btn btn-primary my-2 mx-2" disabled={rawText.length === 0} onClick={handleLowercaseChange}>Lowercase Text</button>
        <button className="btn btn-primary my-2 mx-2" disabled={rawText.length === 0} onClick={extractPhoneNumbers}>Extract phone numbers</button>

        <button className="btn btn-primary my-2 mx-2" disabled={rawText.length === 0} onClick={handleExtraSpace}>Remove Extra Space</button>
      </div>
      {rawText.length > 0 &&
        <div >
          <h3 className="mt-4 mb-3">Your optimized text is</h3>
          <textarea className="form-control" id="textarea" value={text} disabled style={{ backgroundColor: props.textBoxColor }}></textarea>
          <div className="text-muted mt-1 text-sm">
            {Math.round(0.008 * calculateWords(rawText), 2)} Minutes to read.
            <br />
            {calculateWords(rawText)} Words | {rawText.length} Char
          </div>
          <button className="btn btn-primary my-3" disabled={rawText.length === 0} onClick={handleCopy}>Copy Text</button>
        </div>
      }
    </div>

  )
}



TextForm.propTypes = {
  label: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
}

TextForm.defaultProps = {
  label: "Enter your text to optimize it"
}

