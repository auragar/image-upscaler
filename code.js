//Created by Aurange

let prev = press = 0;

document.getElementById("scale").onkeypress = function(e){
  e.preventDefault();
};

document.getElementById("scale").oninput = function(){
  if(document.getElementById("in").style.display !== "inline") document.getElementById("in").style.display = "inline";
  if(document.getElementById("canvas").style.display !== "none") document.getElementById("canvas").style.display = "none";

  if(Number(this.value) > prev){
        if(Number(this.value) ===  6) this.value = 8;

        ++press;
    }
    else{
        if(Number(this.value) === 6) this.value = 4;

        --press;
    }

    prev = Number(this.value);
}

document.getElementById("in").onchange = function(){
  let can = document.getElementById("canvas"), scale = document.getElementById("scale"), ctx = can.getContext("2d"), file = new FileReader();

  file.onload = function(){
    let input = new Image();

    input.src = file.result;

    input.onchange = input.onload = function(){
      let colors, len, times = document.getElementById("times"), br = document.getElementsByTagName("br")[0], message = document.getElementById("message"), oWidth = input.width, upscaled = [], storage = [];

      can.width = oWidth;
      can.height = input.height;

      ctx.drawImage(input, 0, 0);

      colors = ctx.getImageData(0, 0, can.width, can.height).data;

      len = colors.length;

      can.width *= 2;
      can.height *= 2;

      scale.style.display = "none";
      times.style.display = "none";
      br.style.display = "none";
      document.getElementById("in").style.display = "none";
      message.style.display = "block";

      for(let i = 0, j = 1; i < len; i += 4, ++j){
        upscaled.push(colors[i], colors[i + 1], colors[i + 2], colors[i + 3], colors[i], colors[i + 1], colors[i + 2], colors[i + 3]);

        storage.push(colors[i], colors[i + 1], colors[i + 2], colors[i + 3], colors[i], colors[i + 1], colors[i + 2], colors[i + 3]);

        if(j % oWidth === 0){
          upscaled.push(...storage);

          storage = [];
        }
      }

      ctx.putImageData(new ImageData(Uint8ClampedArray.from(upscaled), can.width), 0, 0);

      if(press !== 1){
        input.src = can.toDataURL();

        --press;
      }
      else{
        message.style.display = "none";
        scale.style.display = "inline";
        times.style.display = "inline";
        br.style.display = "inline";
        can.style.display = "block";
      }
    }
  }

  file.readAsDataURL(this.files[0]);

  document.getElementById("scale").value = null;
  this.value = null;
  this.blur();
};
