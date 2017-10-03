const rsurl = 'https://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=';
let firstImage = document.getElementsByClassName('an-image');
console.log(firstImage);

function buttonClick() {
  alert(rsurl);
}

function buttonClick1() {
  fetch('/rsapi/get-icon')
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      firstImage[0].src = data.fullURL;
    })
}