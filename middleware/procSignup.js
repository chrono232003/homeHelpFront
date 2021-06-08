const callAPI = require('./utils/callAPI');

const createUser = () => {
    const form = document.forms[0];
    const data = new FormData(form);

    const logo = document.getElementById("output").src

    //["businessName","email","password","products","websiteLink","logo","description"]
    const values = [...data.values()];

    const body = {
        'businessName': values[0],
        'email': values[1],
        'password': values[2],
        'typeOfProduct': values[3],
        'logoImage': logo,
        'websiteLink':values[4],
        'description':values[6]
    }

    return callAPI.makeAPICall("POST", "http://localhost:3001/createBusiness", body);
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
    createUser:createUser
}