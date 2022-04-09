//Created by Aurange

let scaleElem = document.getElementById("scale"), timesElem = document.getElementById("times"), inElem = document.getElementById("in"), brElem = document.getElementsByTagName("br")[0], messageElem = document.getElementById("message"), canElem = document.getElementById("canvas"), ctx = canElem.getContext("2d");

scaleElem.onkeypress = function(e){
  e.preventDefault();
};

scaleElem.oninput = function(){
  if(inElem.style.display !== "inline") inElem.style.display = "inline";
  if(canElem.style.display !== "none") canElem.style.display = "none";
}

inElem.onchange = function(){
  let sEVal = Number(scaleElem.value), file = new FileReader();

  file.onload = function(){
    let input = new Image();

    input.src = file.result;

    input.onload = function(){
      let colors, len, oWidth = input.width, upscaled = [], storage = [];

      canElem.width = oWidth;
      canElem.height = input.height;

      ctx.drawImage(input, 0, 0);

      colors = ctx.getImageData(0, 0, canElem.width, canElem.height).data;

      len = colors.length;

      canElem.width *= sEVal;
      canElem.height *= sEVal;

      scaleElem.style.display = "none";
      timesElem.style.display = "none";
      inElem.style.display = "none";
      brElem.style.display = "none";
      messageElem.style.display = "block";

      for(let i = 0, j = 1; i < len; i += 4, ++j){
        for(let k = 0; k < sEVal; ++k){
          upscaled.push(colors[i], colors[i + 1], colors[i + 2], colors[i + 3]);
          storage.push(colors[i], colors[i + 1], colors[i + 2], colors[i + 3]);
        }

        if(j % oWidth === 0){
          for(let k = 1; k < sEVal; ++k){
            upscaled.push(...storage);
          }

          storage = [];
        }
      }

      ctx.putImageData(new ImageData(Uint8ClampedArray.from(upscaled), canElem.width), 0, 0);

      messageElem.style.display = "none";
      scaleElem.style.display = "inline";
      timesElem.style.display = "inline";
      brElem.style.display = "inline";
      canElem.style.display = "block";
    }
  }

  file.readAsDataURL(inElem.files[0]);

  scaleElem.value = null;
  inElem.value = null;

  inElem.blur();
};
