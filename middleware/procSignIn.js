const callAPI = require('./utils/callAPI');

const getUser = () => {
    const form = document.forms[0];
    const data = new FormData(form);

    //["email","password"]
    const values = [...data.values()];

    const body = {
        'email': values[0],
        'password': values[1],
    }

    console.log(body)

    return callAPI.makeAPICall("POST", "http://localhost:3001/getBusiness", body);
}

function storeImage(imageFile) {
    console.log(imageFile)
      var reader = new FileReader();
      var img = document.getElementById('output');
      reader.onload = function(){
        output.src = reader.result;
      };
      reader.readAsDataURL(event.target.files[0]);
  }

module.exports = {
    getUser:getUser
}