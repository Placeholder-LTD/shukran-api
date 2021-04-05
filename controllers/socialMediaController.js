
const Jimp = require('jimp');
const User = require('../models/User');
const fs = require('fs');
const ggle = require('../helpers/uploadgdrive');

// SSR
// Step 1.0: Create a Vue instance
const Vue = require('vue')


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

  return text
  .replace(/”/ig, '"')
  .replace(/“/ig, '"')
  .replace(/’/ig, "'")
    .split(' ').map((w, i) => {
      return w.length > 15 ? setCharAt(w, 16, w.charAt(16) + '- ') : w
    }).join(' ');
}

// colored text https://github.com/oliver-moran/jimp/issues/537

exports.creatorProfilePreview = (req, reply) => {

  User.find({username: req.params.username}, {_id: 0}).select("username picture_id summary country craft_type")
    .exec((err, _user) => {
        if (_user.length == 1) {

            console.log('who the user? :\n', _user);

            ggle.drive.files.get({ // https://stackoverflow.com/a/62479889
              fileId: _user[0].picture_id,
              alt: 'media'
            }, { responseType: 'stream' })
            .then((img_buffer) => {
              let _buffer = [];
              img_buffer.data.on("data", (e) => _buffer.push(e));
              img_buffer.data.on("end", () => {
                const buffer = Buffer.concat(_buffer);
                    
                    
                Promise.all(
                  [Jimp.read('helpers/4.png'), Jimp.read(buffer)]
                ).then((images) => {
                  // images[1].autocrop()

                  images[1].resize(600, 600); // resize to fit the placeholder image frame
                  images[0].composite(images[1], 447, 80); // 2nd img, starting x cordinate, starting y cordinate
                
                  Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then(font => {
                    images[0].print(font, 80, 220, printableText(_user[0].summary), 330); // print creator summary
                
                    images[0].print(font, 650, 750, _user[0].craft_type, 350);
                
                    Jimp.loadFont(Jimp.FONT_SANS_32_WHITE).then(font => {
                      images[0].print(font, 100, 1000, `useshukran.com/${_user[0].username}`.toUpperCase());
                      
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

              });
              
            })

        } else {
          fs.readFile('helpers/logo.png', (err, imgBuffer) => { // should we read the buffer when the server is started and just keep it in a variable then send it whenever we're here, instead of reading from fs with every request
            reply.code(200).type('image/png').send(imgBuffer)
          })
          
        }
    })
}

exports.creatorProfileSSR = (req, reply) => {
  
fs.readFile('./vue-templates/support.template.html', 'utf-8', (err, template) => {
  if (err) {
    console.error(err)
  } else {
    // console.log('visited url', req)

    // Step 2: Create a renderer
    const renderer = require('vue-server-renderer').createRenderer({
      template,
    })

    // step 1.1 Create a Vue instance
    const app = new Vue({
      data: {
        url: req.raw.url,
        username: req.params.username
      },
      template: `<div>{{ username }} visited URL {{ url }}</div>`,
    });

    const context = {
      title: 'Support chuks?',
      meta: `
        <meta ...>
        <meta ...>
      `
    }
  
    // Step 3: Render the Vue instance to HTML
    renderer.renderToString(app, context, (err, html) => {
      if (err) {
        console.error('err rendering', err)
        reply.code(500).send('Internal Server Error')
        // return
      } else {
        reply.code(200)
        .type('text/html') // as html?
        .send(html)
      }
      
    })


  }
  
})
}

/**
 * JIMP:
 * 
 * http://ns.adobe.com/xap/1.0/<?xpacket begin='﻿' id='W5M0MpCehiHzreSzNTczkc9d'?>
<x:xmpmeta xmlns:x="adobe:ns:meta/"><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><rdf:Description rdf:about="uuid:faf5bdd5-ba3d-11da-ad31-d33d75182f1b" xmlns:xmp="http://ns.adobe.com/xap/1.0/"><xmp:CreatorTool>Windows Photo Editor 10.0.10011.16384</xmp:CreatorTool><xmp:CreateDate>2020-07-13T06:48:40.519</xmp:CreateDate></rdf:Description></rdf:RDF></x:xmpmeta>
 */