import React from 'react';

function Alert(props) {
  const capitalizeText = word =>{
    return word[0].toUpperCase()+word.slice(1);
  }
  

  return (
    props.alert&&
    <div>
      <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
      <strong>{capitalizeText(props.alert.strongText)}</strong> {props.alert.text}
    
      </div>
    </div>
  );
}

export default Alert;