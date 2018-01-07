export function disableButtons() {
  let buttons = document.querySelectorAll('button');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].setAttribute('disabled', 'true')
  }	
}

export function enableButtons() {
  let buttons = document.querySelectorAll('button');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].removeAttribute('disabled')
  }	
} 
