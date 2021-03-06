import { createGlobalStyle} from "styled-components"

export const GlobalStyles = createGlobalStyle`
:root {
  ${({ theme }) => Object.keys(theme).map((key) => {
    return `--${key}: ${theme[key]};`
  })}
}

  body {
    background: var(--body);
    color: var(--text);
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
    margin: 0;
    height: 100vh;
  }
  
  button {
    color: inherit;
  }
  
  #root {
    height: 100%;
  }

  ///////////////////////////////
  input:invalid {
    box-shadow: 0 0 5px 1px red;
  }

  ///////////////////////////////

  .switch {
    position: absolute;
    right: 8px;
    top: 8px;
    display: inline-block;
    width: 60px;
    height: 34px;
    z-index: 150;
  }
  
  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
  }
  
  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }
  
  input:checked + .slider {
    background-color: #2196F3;
  }
  
  input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
  }
  
  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
  
  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }
  
  .slider.round:before {
    border-radius: 50%;
  }

  button {
    background-color: transparent;
    border-style: solid;
    border: 2px solid grery;
    cursor: pointer;
  }
  input {
    background-color: var(--primary2);
    border: 0;
    margin: 4px;
  }
  `