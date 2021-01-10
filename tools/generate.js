// Generates frontend code for these cases:
// - local : a single file that can be run offline in browser
// - mysql : client code for a server with express/mysql 

const fs = require('fs');
var path = require('path');

mergeFiles('local', "local-storage.js", "local", "cword-local.html");
    
mergeFiles('mysql', "mysql-storage.js", "public", "cword-mysql.html");

function mergeFiles(name, storageName, outDirName, outName) {

  var parentPath = path.dirname(__dirname);

  const PLUGIN_COMMENT = "/* __PLUGIN_STORAGE__ */";
  const GENERATED_COMMENT = "<!-- __GENERATED_COMMENT__ -->";
  const IN_FILE_NAME = "cword-main-template.html";
  const IN_DIR = "src";

  var storFile = parentPath + '/' + IN_DIR +'/'+storageName;
  var stor = fs.readFileSync(storFile, 'utf-8');
  var storLines = stor.split('\n');
  var inFile = parentPath + '/' + IN_DIR +'/'+IN_FILE_NAME;
  var outDir = parentPath + '/' + outDirName;
  if (!fs.existsSync(outDir)){
    fs.mkdirSync(outDir);
  }
  var outFile =  outDir +'/'+ outName;

  fs.open(outFile, 'w', (err, file) => {
    if (err) throw err;
  });

  var stream = fs.createWriteStream(outFile);

  var data = fs.readFileSync(inFile, 'utf-8');
  var lines = data.split('\n');
  var numLinesWrote = 0;
  for (var i=0; i<lines.length; i++) {
    var line = lines[i];
    if (line.includes(PLUGIN_COMMENT)) {
      stream.write('/* Start '+name+' storage plugin */\n\n');
      stream.write(stor+"\n\n");
      stream.write('/* End '+name+' storage plugin */\n\n');
      numLinesWrote = numLinesWrote + storLines.length + 3;
    } else if (line.includes(GENERATED_COMMENT)) {
      stream.write('<!-- This code was generated at '+(new Date())+". Do not edit. -->\n\n");
      numLinesWrote = numLinesWrote + 1;
    } else {
      stream.write(line + "\n");
      numLinesWrote++;
    }
  }
  stream.end();
  console.log(name+' : found '+lines.length+' lines from ...'+inFile+'...');
  console.log(name+' : added '+storLines.length+' lines from ...'+storFile+'...');
  console.log(name+' : wrote '+numLinesWrote+' lines to ...'+outFile+'...');

}