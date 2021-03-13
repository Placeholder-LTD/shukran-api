
var Jimp = require('jimp');



// console.log(jimp_reading_images); // array of promises

/**
 * 
 * @param {*} str 
 * @param {*} index 
 * @param {*} chr 
 * @returns str
 * 
 * from https://stackoverflow.com/a/1431110/9259701
 */
 function setCharAt(str,index,chr) {
  if (index > str.length - 1) return str;
  return str.substring(0,index) + chr + str.substring(index+1);
}

function printableText(text) {
  return text.split(' ').map((w, i) => {
    return w.length > 15 ? setCharAt(w, 16, w.charAt(16) + '- ') : w
  }).join(' ');
}


exports.creatorProfilePreview = (req, reply) => {
  let images = ['helpers/4.png', 'helpers/Ola.jpeg', 'helpers/my_pic.jpg'];

  let jimp_reading_images = []
  
  images.forEach((img_path, i, imgs) => {
    jimp_reading_images.push(Jimp.read(img_path));
  })
  Promise.all(jimp_reading_images).then((images) => {
    // images[1].autocrop()

    images[1].resize(600, 600); // resize to fit the image frame
    images[0].composite(images[1], 447, 80); // 2nd img, starting x cordinate, starting y cordinate
  
    Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then(font => {
      images[0].print(font, 80, 220, printableText(`Alignment modes are supported by replacing the str argument with an object containing text, alignmentX and alignmentY. alignmentX defaults to Jimp.HORIZONTAL_ALIGN_LEFT and alignmentY defaults to Jimp.VERTICAL_ALIGN_TOP`), 330); // print creator summary
  
      images[0].print(font, 650, 750, 'YouTuber, Blogger, Poet, Enthutiast', 350);
  
      Jimp.loadFont(Jimp.FONT_SANS_32_WHITE).then(font => {
        images[0].print(font, 100, 1000, 'useshukran.com/obakam'.toUpperCase());
        
        images[0]
        /* .write('final-image.png', () => {
          console.log('check it');
        }) */
        .getBufferAsync(Jimp.MIME_PNG)
        .then((img) => {
          reply.code(200).type('image/png').send(img)
        })
      })
    })
    
  
  }).catch((err) => {
    console.error('Oops', err); // make default img, maybe with just text!
    // reply.send(200).type('image/png').send('helpers/logo.png')
  })
  
}