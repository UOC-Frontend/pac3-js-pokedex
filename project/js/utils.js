function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function addZerosBeforeRandomNumber(number) {
  if (number < 10) {
    console.log();
    return `00${number}`;
  }
  if (number < 90) {
    return `0${number}`;
  }
  return number;
}