const fs = require('fs')
const replace = require('replace-in-file')
const getDirectories = source =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

const results = getDirectories("../Roblox/Versions")
results.forEach(folder => {
    //console.log(folder.toString().substring(0,9))
    fs.readdirSync("../Roblox/Versions/"+folder.toString()).forEach(file => {
      if (file.toString() === "RobloxStudioBeta.exe") {
        console.log('Found studio folder, updating..')
        console.log('Current studio folder:',folder.toString())
        const makedr = "../Roblox/Versions/"+folder.toString()+"/content/textures/ClassImages.png"
        fs.copyFile('./ClassImages.png', makedr, (err) => {
            if (err) throw err;
            console.log('File was updated in',makedr);
          })
      }
    });
})