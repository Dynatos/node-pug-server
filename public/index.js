const rsurl = 'https://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=';
const image1 = document.querySelector('.image1');
console.log(image1);

function buttonClick() {
  alert(rsurl);
}

function buttonClick1() {
  fetch('/rsapi/get-icon')
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      image1.src = data.fullURL;
    })
}