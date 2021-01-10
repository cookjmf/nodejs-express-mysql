var LOCAL_CWORD_STORE = 'cathy_cook_hotmail_com_crosswords';

function storeGetNames(context) {
  var getOK = false;
  var names = [];
  var cwArr = [];
  var cwArrStr = window.localStorage.getItem(LOCAL_CWORD_STORE);
  console.log('cwArrStr = ['+cwArrStr+']');
  if (cwArrStr == null) {
    console.log('NOT_FOUND '+LOCAL_CWORD_STORE);
    getOK = true;
  } else {

    console.log('FOUND '+LOCAL_CWORD_STORE);
    cwArr = JSON.parse(cwArrStr);
    if (cwArr == null) {
      console.log('Failed to parse JSON : ['+cwArrStr+']');
    } else {     
      getOK = true;
      for (var i=0; i<cwArr.length; i++) {
        var exCwObj = cwArr[i];
        console.log('Found obj#'+(i+1)+' ['+exCwObj+']');
        var exName = exCwObj.name;
        if (exName != null) {
          names.push(exName);
          console.log('Found '+exName);
          
        } else {
          // store is corrupt ??
        }
      }
    }
  }
  resultGetNames(names, getOK, context);

}

function storeGet(name) {
  var cwObj = null;
  var cwArrStr = window.localStorage.getItem(LOCAL_CWORD_STORE);
  if (cwArrStr != null) {
    cwArr = JSON.parse(cwArrStr);
    if (cwArr == null) {
      console.log('Failed to parse JSON : ['+cwArrStr+']');
    } else {
      for (var i=0; i<cwArr.length; i++) {
        var cwArrObj = cwArr[i];
        console.log('Found obj#'+(i+1)+' ['+cwArrObj+']');
        var exName = cwArrObj.name;
        if (name === exName) {
          cwObj = cwArrObj;
          break;
        }
      }
    }
  }
  if (cwObj != null) {
    resultGet(cwObj, true, name);
  } else {
    resultGet(null, false, name);
  }
}

function storeDelete(name) {
  var deletedOK = false;
  var cwArrStr = window.localStorage.getItem(LOCAL_CWORD_STORE);
  console.log('cwArrStr = ['+cwArrStr+']');
  if (cwArrStr == null) {
    console.log('NOT_FOUND '+LOCAL_CWORD_STORE);
  } else {
    console.log('FOUND '+LOCAL_CWORD_STORE);
    cwArr = JSON.parse(cwArrStr);
    var arrNew = [];
    if (cwArr == null) {
      console.log('Failed to parse json string : '+cwArrStr);
    } else {
      for (var i=0; i<cwArr.length; i++) {
        var exCwObj = cwArr[i];
        var exName = exCwObj.name;
        if (exName != name) {
          arrNew.push(exCwObj);
        } else {
          console.log('deleted : '+exName);
        }
      }
      console.log('UPDATED arrNew = ['+arrNew+']');
      window.localStorage.removeItem(LOCAL_CWORD_STORE);
      console.log('REMOVED ITEM : '+LOCAL_CWORD_STORE);

      var cwArrStr = JSON.stringify(arrNew);
      console.log('NEW cwArrStr =['+cwArrStr+"]");

      window.localStorage.setItem(LOCAL_CWORD_STORE, cwArrStr);
      console.log('SAVED AS REPLACED '+LOCAL_CWORD_STORE);
      deletedOK = true;
    }
  }

  resultDelete(deletedOK, name);

}

function storeSave(cwObj, context) {
  var savedOK = false;
  var saveAction = 'Saved';
  var cwArr = [];
  var cwArrStr = window.localStorage.getItem(LOCAL_CWORD_STORE);
  console.log('cwArrStr = ['+cwArrStr+']');
  if (cwArrStr == null) {
    console.log('NOT_FOUND '+LOCAL_CWORD_STORE);
    cwArr.push(cwObj);
    console.log('NEW cwArr = ['+cwArr+']');

    cwArrStr = JSON.stringify(cwArr);
    console.log('NEW cwArrStr =['+cwArrStr+"]");

    window.localStorage.setItem(LOCAL_CWORD_STORE, cwArrStr);
    console.log('SAVED AS NEW '+LOCAL_CWORD_STORE);
    savedOK = true;
  } else {
    console.log('FOUND '+LOCAL_CWORD_STORE);
    cwArr = JSON.parse(cwArrStr);
    var arrNew = [];
    if (cwArr == null) {
      console.log('Failed to parse json string : '+cwArrStr);
      arrNew.push(exCwObj);
    } else {

      for (var i=0; i<cwArr.length; i++) {
        var exCwObj = cwArr[i];
        var exName = exCwObj.name;
        if (exName === cwObj.name) {
          arrNew.push(cwObj);
          console.log('replaced existing cword with name : '+exName);
          saveAction = 'Replaced';
        } else {
          arrNew.push(exCwObj);
          console.log('copied existing cword with name : '+exName);
        }
      }
      if (saveAction != 'Replaced') {
        arrNew.push(cwObj);
        console.log('added new cword with name : '+name);
      }
    }
    console.log('UPDATED arrNew = ['+arrNew+']');
    window.localStorage.removeItem(LOCAL_CWORD_STORE);
    console.log('REMOVED ITEM : '+LOCAL_CWORD_STORE);

    var cwArrStr = JSON.stringify(arrNew);
    console.log('NEW cwArrStr =['+cwArrStr+"]");

    window.localStorage.setItem(LOCAL_CWORD_STORE, cwArrStr);
    console.log('SAVED AS REPLACED '+LOCAL_CWORD_STORE);
    savedOK = true;
  }

  resultSave(savedOK, context);
  
}