import React, { useState } from 'react';
import PropTypes from 'prop-types';
export default function TextForm(props) {
  let handleUppercaseChange = (e) => {
    setText(rawText.toUpperCase());
    props.showAlert('Uppercase text','has been done sucessfully','success');
  }
  let handleLowercaseChange = (e) => {
    setText(rawText.toLowerCase());
    props.showAlert('Lowercse text','has been done sucessfully','success');
  }

  let handleOnChange = (e) => {
    setRawText(e.target.value);
  }
  let handleCopy = () => {
    let textarea = document.getElementById('textarea');
    textarea.select();
    navigator.clipboard.writeText(textarea.value);
    props.showAlert('Text copy','has been done sucessfully','success')
  }
  let handleExtraSpace = () => {
    let reg = /[ ]+/;
    let arr = rawText.split(reg);
    setText(arr.join(' '));
    props.showAlert('Extra space','has been removed sucessfully','success')
  }
  let extractPhoneNumbers = () => {
    //eslint-disable-next-line
    let reg = new RegExp('[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}', 'gi');
    let phone_numbers_str = rawText.match(reg).join('\n')
    setText(phone_numbers_str);
    props.showAlert('Phone numbers','has been extracted sucessfully','success')
  }

  let calculateWords = (str) => {
    let len = str.split(' ').length;
    if (str === '' || str.endsWith(' ')) {
      len--;
    }
    return len;
  }

  const [text, setText] = useState('');
  const [rawText, setRawText] = useState('');
  return (
    <div>

      <h1 className="mt-4 mb-4">{props.heading}</h1>
      <div className="form-floating">

        <textarea className="form-control" placeholder="Write your text here" value={rawText} id="textarea" style={{ height: "250px" ,backgroundColor:props.textBoxColor}} onChange={handleOnChange} ></textarea>
        <label forhtml="textarea">{props.label}</label>

      </div>
      <div className="d-flex justify-content-around flex-wrap mt-4">
        <button className="btn btn-primary " onClick={handleUppercaseChange}>Uppercase Text</button>
        <button className="btn btn-primary " onClick={handleLowercaseChange}>Lowercase Text</button>
        <button className="btn btn-primary " onClick={extractPhoneNumbers}>Extract phone numbers</button>
        <button className="btn btn-primary " onClick={handleCopy}>Copy</button>
        <button className="btn btn-primary " onClick={handleExtraSpace}>Remove Extra Space</button>


      </div>
      {rawText.length > 0 &&
        <div>
          <h3 className="mt-4 mb-3">Your optimized text is</h3>
          <textarea className="form-control" id="textarea" value={text} disabled style={{backgroundColor:props.textBoxColor}}></textarea>
          <div className="text-muted mt-1 text-sm">
            {Math.round(0.008 * calculateWords(rawText), 2)} Minutes to read.
            <br />
            {calculateWords(rawText)} Words | {rawText.length} Char
          </div>
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

