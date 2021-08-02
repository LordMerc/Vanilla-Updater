const fs = require('fs')
const path = require('path');
const getDirectories = source =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

const uploadImage = imageName => {
  const results = getDirectories(path.join(path.normalize(require('os').homedir()), 'AppData', 'Local', 'Roblox', 'Versions'))
  console.log(results)
  results.forEach(folder => {
    //console.log(folder.toString().substring(0,9))
    fs.readdirSync(path.join(path.normalize(require('os').homedir()), 'AppData', 'Local', 'Roblox', 'Versions', folder.toString())).forEach(file => {
      if (file.toString() === 'RobloxStudioBeta.exe') {
        console.log('Found studio folder, updating..')
        console.log('Current studio folder:', folder.toString())
        const makedr = path.join(path.normalize(require('os').homedir()), 'AppData', 'Local', 'Roblox', 'Versions', folder.toString(), '/content/textures/ClassImages.png')
        fs.copyFile(`./${imageName}.png`, makedr, err => {
          if (err) throw err
          console.log('File was updated in', makedr)
        })
      }
    })
  })
}
var inquirer = require('inquirer')
inquirer
  .prompt([
    {
      type: 'list',
      name: 'theme',
      message: 'What theme would you like?',
      choices: ['Platinum (light)', 'Graphite (dark)']
    },
    {
      type: 'list',
      name: 'style',
      message: 'What style would you like?',
      choices: ['Colourful', 'Mono']
    }
  ])
  .then(answers => {
    console.log('Adding to studio.')
    if (answers.theme == 'Platinum (light)' && answers.style == 'Colourful') {
      uploadImage('v1.1-ColourfulLight')
    }
    if (answers.theme == 'Platinum (light)' && answers.style == 'Mono') {
      uploadImage('v1.1-MonoLight')
    }
    if (answers.theme == 'Graphite (dark)' && answers.style == 'Colourful') {
      uploadImage('v1.1-ColourfulDark')
    }
    if (answers.theme == 'Graphite (dark)' && answers.style == 'Mono') {
      uploadImage('v1.1-MonoDark')
    }
  })
