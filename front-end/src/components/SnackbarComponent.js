import styled from 'styled-components'
import { useEffect, useState } from 'react'

const Wrapper = styled.div`

visibility: hidden; /* Hidden by default. Visible on click */
min-width: 250px; /* Set a default minimum width */
margin-left: -125px; /* Divide value of min-width by 2 */
background-color: #333; /* Black background color */
color: #fff; /* White text color */
text-align: center; /* Centered text */
border-radius: 2px; /* Rounded borders */
padding: 16px; /* Padding */
position: fixed; /* Sit on top of the screen */
z-index: 1; /* Add a z-index if needed */
left: 50%; /* Center the snackbar */
bottom: 80px; /* 80px from the bottom */

/* Show the snackbar when clicking on a button (class added with JavaScript) */
&.show {
  visibility: visible; /* Show the snackbar */
  /* Add animation: Take 0.5 seconds to fade in and out the snackbar.
  However, delay the fade out process for 2.5 seconds */
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

/* Animations to fade the snackbar in and out */
@-webkit-keyframes fadein {
  from {bottom: 0; opacity: 0;}
  to {bottom: 80px; opacity: 1;}
}

@keyframes fadein {
  from {bottom: 0; opacity: 0;}
  to {bottom: 80px; opacity: 1;}
}

@-webkit-keyframes fadeout {
  from {bottom: 80px; opacity: 1;}
  to {bottom: 0; opacity: 0;}
}

@keyframes fadeout {
  from {bottom: 80px; opacity: 1;}
  to {bottom: 0; opacity: 0;}
}
`
const Snackbar = ({ data }) => {
  const [visibleInternalState, setVisibleInternalState] = useState(data.visible)
  useEffect(() => {
    setVisibleInternalState(data.visible)
    const ref = setTimeout(() => {
      setVisibleInternalState(false)
    }, 2800)
    return (() => {
      clearTimeout(ref)
      setVisibleInternalState(false)
    })
  }, [data])
  return (
    <Wrapper id="snackbar" className={visibleInternalState ? 'show' : ''}>{data.text}</Wrapper>
  )
}

export default Snackbar
