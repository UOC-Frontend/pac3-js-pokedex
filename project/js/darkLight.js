let themeColor = window.localStorage.getItem('tema');
// console.log('color is: ' + themeColor);

const body = document.querySelector('#body');

if (themeColor) {
  selectTheme(themeColor);
  updateRadio(themeColor);
}

function selectTheme(theme) {
  switch (theme) {
    case 'dark':
      body.classList.remove('light');
      body.classList.add('dark');
      window.localStorage.setItem('tema', 'dark');
      break;
    case 'light':
      body.classList.remove('dark');
      body.classList.add('light');
      window.localStorage.setItem('tema', 'light');
      break;
    default:
      break;
  }
}

function updateRadio(value) {
  switch (value) {
    case 'dark':
      document.getElementById('radioLight').checked = false;
      document.getElementById('radioDark').checked = true;
      break;
    case 'light':
      document.getElementById('radioDark').checked = false;
      document.getElementById('radioLight').checked = true;
      break;
    default:
      document.getElementById('radioDark').checked = false;
      document.getElementById('radioLight').checked = true;
      break;
  }

}




const radios = document.querySelectorAll('input[name="theme"]');
radios.forEach(x => {
  x.addEventListener('change', function () {
    console.log(this.value);

    selectTheme(this.value);
  })
})
