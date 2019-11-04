let fs = require('fs');

function removeComments(str) {
  let regexp = /\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm;
  return str.replace(regexp, '');
}

let args = process.argv.slice(2);
let fileName = args[0];

let content = '';
let isRead = false;
if (fileName) {
  try {
    content = fs.readFileSync(fileName, 'utf8');  // decided to do in a sync way just for the matter of simplicity
    isRead = true;
  } catch (e) {   // in case there is no such file
  	console.error(e.message);
  }
} else {

  console.log('No file specified, using test string\n');

  content = `Here is  
  a text /* first line of comment
     second line of comment */
  to test this
  
  function
  // some new comment 
  which
  removes
  all the comments //another comment
  
  /* comment */ from a string or a file`;
  isRead = true;
}

if (isRead) {
  console.log('Input data:');
  console.log(content + '\n');
  
  let contentWithoutComments = removeComments(content);
  
  console.log('Output data:');
  console.log(contentWithoutComments + '\n');
  
  if (fileName) {
    let outputFileName = 'testOutput.js';
    console.log('File is save in ' + outputFileName);
    fs.writeFileSync(outputFileName, contentWithoutComments);
  }
}




