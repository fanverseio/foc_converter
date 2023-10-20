let iconBtn = document.querySelectorAll(".iconBtn");
let steps = document.querySelector(".steps");
const randomBtn = document.querySelector(".randomNum");
const refreshBtn = document.querySelector(".refresh");
const convertBtn = document.querySelector(".convert");
let unsignedSteps = document.getElementById("unsigned-steps");
const unsignText = document.getElementById("unsigned-binary");

const onesComplement = document.getElementById("ones-complement");

let twosComplement = document.getElementById("twos-complement");

iconBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    iconBtn.forEach((btn) => btn.classList.toggle("active"));
    steps.classList.toggle("active");
  });
});

randomBtn.addEventListener("click", () => {
  let randomNum = Math.floor(Math.random() * (1024 - -1024 + 1)) - 1024;
  document.querySelector(".input-area").value = randomNum;
});

refreshBtn.addEventListener("click", () => {
  document.querySelector(".input-area").value = "";
  document.querySelector("#unsigned-binary").value = "";
  document.querySelector("#ones-complement").value = "";
  document.querySelector("#twos-complement").value = "";
  document.getElementById("userNumber").innerHTML = "";

  // Remove all li elements from unsignedSteps
  while (unsignedSteps.firstChild) {
    unsignedSteps.removeChild(unsignedSteps.firstChild);
  }
});

convertBtn.addEventListener("click", convertAlgo);

//! main function

function convertAlgo() {
  let decimalValue = Math.abs(document.querySelector(".input-area").value);

  let remainValue;

  const num = nearestPowerOfTwo(decimalValue);

  const n = Math.log2(num);

  function decArray(n) {
    const array = [];

    for (let i = n; i >= 1; i = i / 2) {
      array.push(i);
    }

    return array;
  }

  let decArrayResult = decArray(num);

  let biArray = new Array(n + 1).fill(0);

  for (i = 0; i < decArrayResult.length; i++) {
    while (decimalValue >= decArrayResult[i]) {
      biArray[i] = 1;
      decimalValue -= decArrayResult[i];
    }
  }

  // The binary result
  const biArrayResult = biArray.join("");

  //  filling in the unsigned binary

  if (document.querySelector(".input-area").value < 0) {
    unsignText.value = "-" + biArrayResult;
  } else {
    unsignText.value = biArrayResult;
  }

  // filling in the ones complement

  if (document.querySelector(".input-area").value > 0) {
    let onesComplementValue = "";
    unsignText.value.split("").forEach((item) => {
      if (item === "0") {
        onesComplementValue += "1";
      } else {
        onesComplementValue += "0";
      }
    });
    onesComplement.value = onesComplementValue;
  } else if (document.querySelector(".input-area").value < 0) {
    let onesComplementValue = "";
    unsignText.value.split("").forEach((item) => {
      if (item === "0") {
        onesComplementValue += "1";
      } else if (item === "1") {
        onesComplementValue += "0";
      } else if (item === "-") {
        onesComplementValue += "1";
      }
    });
    onesComplement.value = onesComplementValue;
  }

  let unsignedToOnes = document.querySelectorAll("#unsignedToOnes");

  unsignedToOnes.forEach((item) => {
    item.innerHTML = onesComplement.value;
    item.style.color = "red";
    item.style.fontSize = "1.25rem";
    item.style.textAlign = "center";
  });

  // filling in the twos complement

  // twosComplement.value = "Hello";

  if (document.querySelector(".input-area").value > 0) {
    twosComplement.value = onesComplement.value;
    for (i = onesComplement.value.length - 1; i >= 0; i--) {
      if (onesComplement.value[i] === "0") {
        twosComplement.value =
          twosComplement.value.substring(0, i) +
          "1" +
          twosComplement.value.substring(i + 1);
        break;
      } else {
        twosComplement.value =
          twosComplement.value.substring(0, i) +
          "0" +
          twosComplement.value.substring(i + 1);
      }
    }
  } else if (document.querySelector(".input-area").value < 0) {
    twosComplement.value = onesComplement.value;
    for (i = onesComplement.value.length - 1; i >= 0; i--) {
      if (onesComplement.value[i] === "0") {
        twosComplement.value =
          twosComplement.value.substring(0, i) +
          "1" +
          twosComplement.value.substring(i + 1);
        break;
      } else {
        twosComplement.value =
          twosComplement.value.substring(0, i) +
          "0" +
          twosComplement.value.substring(i + 1);
      }
    }
  } else {
    twosComplement.value = "0";
  }

  // addOne

  // let addOne = document.getElementById("addOne");
  // addOne.styly.textAlign = "center";
  // addOne.innerText = "      " + "1";

  // console.log(addOne.innerText);

  let toTwos = document.getElementById("unsignedToTwos");
  toTwos.innerHTML = twosComplement.value;
  toTwos.style.color = "red";
  toTwos.style.fontSize = "1.25rem";
  toTwos.style.textAlign = "center";

  // console.log(unsignText.value);
  // console.log(onesComplement.value);
  // console.log(twosComplement.value);

  //! Steps and Functions

  let userNumber = document.getElementById("userNumber");

  userNumber.innerText = " " + document.querySelector(".input-area").value;

  // while (userNumebr >0){
  //   const li = document.createElement("li");
  //   let remainder = userNumber % 2;
  //   binaryString = remainder + binaryString;
  //   userNumber = Math.floor(userNumber / 2);
  //   console.log(userNumber);
  //   li.innerText = "step " + i + ": " + userNumber + " / 2 = " + userNumber + " remainder " + remainder;
  //   unsignedSteps.appendChild(li);
  // }

  let remainingNumberArray = [];
  let inputNumber = Math.abs(document.querySelector(".input-area").value);

  for (let i = 0; i < n + 1; i++) {
    let remainder = inputNumber % 2;
    if (remainder == 0) {
      biArray[i] = 0;
    } else {
      biArray[i] = 1;
    }

    remainingNumber = Math.floor(inputNumber / 2);
    remainingNumberArray.push(inputNumber);

    const li = document.createElement("li");
    inputNumber = Math.floor(inputNumber / 2);
    li.innerText =
      "step " +
      (i + 1) +
      ": " +
      remainingNumberArray[i] +
      " / 2 = " +
      inputNumber +
      " remainder " +
      remainder;
    unsignedSteps.appendChild(li);
  }

  document.getElementById("unsigned-steps-result").innerText = biArrayResult;
  // document.getElementById("unsigned-steps-result").style.fontWeight = "bold";
  document.getElementById("unsigned-steps-result").style.fontSize = "1.25rem";
  document.getElementById("unsigned-steps-result").style.textAlign = "center";
  document.getElementById("unsigned-steps-result").style.color = "red";
}

function nearestPowerOfTwo(num) {
  const exponent = Math.floor(Math.log2(num));
  return Math.pow(2, exponent);
}

// copy buttons

const copyBtns = document.querySelectorAll(".copy-button");

copyBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    if (index === 0) {
      unsignText.select();
      let originalValue = unsignText.value;
      navigator.clipboard.writeText(unsignText.value);
      unsignText.value = "Copied";

      setTimeout(() => {
        unsignText.value = originalValue;
      }, 1000);
    } else if (index === 1) {
      onesComplement.select();
      let originalValue1 = unsignText.value;
      navigator.clipboard.writeText(onesComplement.value);
      onesComplement.value = "Copied";

      setTimeout(() => {
        onesComplement.value = originalValue1;
      }, 1000);
    } else if (index === 2) {
      twosComplement.select();
      let originalValue2 = twosComplement.value;
      navigator.clipboard.writeText(twosComplement.value);
      twosComplement.value = "Copied";

      setTimeout(() => {
        twosComplement.value = originalValue2;
      }, 1000);
    }
  });
});
