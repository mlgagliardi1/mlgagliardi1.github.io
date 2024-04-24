
let currentURL = location.href;
let futureURL = currentURL + "/test";

function passvalid() {
    var validpass = document.getElementById("pass").value;
    if (validpass.length <= 8 || validpass.length >= 20) {
        document.getElementById("vaild-pass").innerHTML = "Minimum 8 characters";
        return false;
    } else {
        document.getElementById("vaild-pass").innerHTML = "";
    }
}

function show() {
    var x = document.getElementById("pass");
    if (x.type === "password") {
      x.type = "text";
      document.getElementById("showimg").src ="https://static.thenounproject.com/png/777494-200.png";
      let isValid = false;
      return isValid;
    } else {
      x.type = "password";
      document.getElementById("showimg").src ="https://cdn2.iconfinder.com/data/icons/basic-ui-interface-v-2/32/hide-512.png";
      let isValid = true;
      return isValid;
    }
  }

function validate() {
    var validuser = document.getElementById("user").value;
    var validpass = document.getElementById("pass").value;

    if (validuser == 'admin') {
        if (validpass == 'password123') {
            //window.location.href = futureURL;     
            console.log("in");
        } else {
            alert('Password is invalid, please try again!');
            let isValid = false;
            return isValid;
        }
    } else {
        alert('Username is invalid, please try again!');
        let isValid = false;
        return isValid;
    }

}