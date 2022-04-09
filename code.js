//Created by Aurange

let scale = document.getElementById("scale"), times = document.getElementById("times"), inElem = document.getElementById("in"), br = document.getElementsByTagName("br")[0], message = document.getElementById("message"), can = document.getElementById("canvas"), ctx = can.getContext("2d");

document.getElementById("scale").onkeypress = function(e){
  e.preventDefault();
};

document.getElementById("scale").oninput = function(){
  if(document.getElementById("in").style.display !== "inline") document.getElementById("in").style.display = "inline";
  if(document.getElementById("canvas").style.display !== "none") document.getElementById("canvas").style.display = "none";
}

document.getElementById("in").onchange = function(){
  let sVal = Number(scale.value), file = new FileReader();

  file.onload = function(){
    let input = new Image();

    input.src = file.result;

    input.onload = function(){
      let colors, len, oWidth = input.width, upscaled = [], storage = [];

      can.width = oWidth;
      can.height = input.height;

      ctx.drawImage(input, 0, 0);

      colors = ctx.getImageData(0, 0, can.width, can.height).data;

      len = colors.length;

      can.width *= sVal;
      can.height *= sVal;

      scale.style.display = "none";
      times.style.display = "none";
      br.style.display = "none";
      inElem.style.display = "none";
      message.style.display = "block";

      for(let i = 0, j = 1; i < len; i += 4, ++j){
        for(let k = 0; k < sVal; ++k){
          upscaled.push(colors[i], colors[i + 1], colors[i + 2], colors[i + 3]);
          storage.push(colors[i], colors[i + 1], colors[i + 2], colors[i + 3]);
        }

        if(j % oWidth === 0){
          for(let k = 1; k < sVal; ++k){
            upscaled.push(...storage);
          }

          storage = [];
        }
      }

      ctx.putImageData(new ImageData(Uint8ClampedArray.from(upscaled), can.width), 0, 0);

      message.style.display = "none";
      scale.style.display = "inline";
      times.style.display = "inline";
      br.style.display = "inline";
      can.style.display = "block";
    }
  }

  file.readAsDataURL(inElem.files[0]);

  scale.value = null;
  inElem.value = null;

  inElem.blur();
};
