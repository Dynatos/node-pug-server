// const rsurl = 'https://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=';
const rsImageFirstHalf = 'http://services.runescape.com/m=itemdb_oldschool/';
const rsImageSecondHalf = '_obj_sprite.gif?id=';
let timestamp;

if (timestamp === undefined) {
  fetch('/rsapi/get-icon')
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      timestamp = data.timestamp;
    })
}

document.querySelector('.formWithImageID').onsubmit = (e) => {
  e.preventDefault();
  const inputData = e.target.children[0].value;
  const newImage = document.createElement('img');
  newImage.src = rsImageFirstHalf + timestamp + rsImageSecondHalf + inputData;
  document.querySelector('.imageContainer').append(newImage);
};