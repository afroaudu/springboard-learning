const imageFileInput = document.querySelector("#imageFileInput");
const topTextInput = document.querySelector('#topTextInput');
const bottomTextInput = document.querySelector('#bottomTextInput');
const canvas = document.querySelector('#meme');

let image;

imageFileInput.addEventListener("change", () => {
    const imageDataUrl = URL.createObjectURL(imageFileInput.files[0]);
    
    // <img>
    image = new Image();
    image.src = imageDataUrl;

    image.addEventListener("load", () => {
        updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
    }, { once: true });
});
topTextInput.addEventListener("change", () => {
    updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
});

bottomTextInput.addEventListener("change", () => {
    updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
});
function updateMemeCanvas(canvas, image, topText, bottomText) {
  const ctx = canvas.getContext('2d');
  const width = image.width;
  const height = image.height;
  const fontSize = Math.floor(width / 10);
  const yOffset = height / 25;

  // Updaye canvas background
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(image, 0, 0);

  // Prepare text
  ctx.strokeStyle = 'black';
  ctx.lineWidth = Math.floor(fontSize / 4);
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.lineJoin = 'round';
  ctx.font = `${fontSize}px san-serif`;

  //Add top text
  ctx.textBaseline = 'top';
  ctx.strokeText(topText, width / 2, yOffset);
  ctx.fillText(topText, width / 2, yOffset);

  //Add bottom text
  ctx.textBaseline = 'bottom';
  ctx.strokeText(bottomText, width / 2, height - yOffset);
  ctx.fillText(bottomText, width / 2, height- yOffset);
}

let save = document.getElementById('save')
save.addEventListener('click', function () {
    let data = canvas.toDataURL()
    let link = document.createElement('a')
    link.href = data
    link.download = 'image.png'
    link.click()

})
let remove = document.getElementById('delete')
remove.addEventListener(click, function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})
