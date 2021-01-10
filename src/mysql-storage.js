function storeGetNames(context) {
  
  console.log('start storeGetNames');

  fetch('/cwords')
  .then(
    response => {
      return response.json();
    }
  )
  .then(
    data => {
      console.log('in fetch : data = ...'+JSON.stringify(data)+'...');
      var names = [];
      for (var i=0; i<data.length; i++) {
        var row = data[i];
        var name = row.name;
        names.push(name);
      }
      console.log('in fetch : names = ...'+JSON.stringify(names)+'...');
      resultGetNames(names, true, context);
    }
  )
  .catch(
    err => {
      console.log('in fetch err = ...'+JSON.stringify(err)+'...');
      resultGetNames([], false, context);
    }
  )
  console.log('in storeGetNames after fetch');
 
}

function storeGet(name) {

  console.log('start storeGet '+name);

  fetch('/cwords/name/'+name)
  .then(
    response => {
      return response.json();
    }
  )
  .then(
    data => {
      console.log('in fetch : data = ...'+JSON.stringify(data)+'...');
      var cwObj = JSON.parse(data.contents)
      resultGet(cwObj, true, name);
    }
  )
  .catch(
    err => {
      console.log('in fetch err = ...'+JSON.stringify(err)+'...');
      resultGet(null, false, name);
    }
  )
  console.log('in storeGet after fetch');

}

function storeDelete(name) {

  console.log('start storeDelete '+name);

  fetch('/cwords/name/'+name, {
    method: 'DELETE',
  })
  .then(
    response => {
      return response.json();
    }
  )
  .then(
    data => {
      console.log('in fetch : data = ...'+JSON.stringify(data)+'...');
      resultDelete(true, name);
    }
  )
  .catch(
    err => {
      console.log('in fetch err = ...'+JSON.stringify(err)+'...');
      resultDelete(false, name);
    }
  )

  console.log('end storeDelete '+name);

}

function storeSave(cwObj, context) {

  console.log('start storeSave '+cwObj);

  // for play and update - assume the cword exists
  // for other cases, (new, new-example, import) check first

  if (context == CTX_PLAY) {
    storeUpdate(cwObj, context);
  } else if (context == CTX_UPDATE) {
    storeUpdate(cwObj, context);
  } else {

    fetch('/cwords')
    .then(
      response => {
        return response.json();
      }
    )
    .then(
      data => {
        console.log('in fetch : data = ...'+JSON.stringify(data)+'...');
        var names = [];
        for (var i=0; i<data.length; i++) {
          var row = data[i];
          var name = row.name;
          names.push(name);
        }
        console.log('in fetch : names = ...'+JSON.stringify(names)+'...');
        if (names.includes(cwObj.name)) {
          storeUpdate(cwObj, context);
        } else {
          storeInsert(cwObj, context);
        }
      }
    )
    .catch(
      err => {
        console.log('in fetch err = ...'+JSON.stringify(err)+'...');
        resultSave(false, context);
      }
    )

  }

}

function storeInsert(cwObj, context) {

  console.log('start storeInsert '+cwObj.name);

  fetch('/cwords', {
    method: 'POST', 
    headers: {
     'Content-type': 'application/json; charset=UTF-8' 
    },
    body: JSON.stringify(cwObj)  
   })
  .then(
    response => {
      return response.json();
    }
  )
  .then(
    data => {
      console.log('in fetch : data = ...'+JSON.stringify(data)+'...');
      resultSave(true, context);
    }
  )
  .catch(
    err => {
      console.log('in fetch err = ...'+JSON.stringify(err)+'...');
      resultSave(false, context);
    }
  )

  console.log('end storeSave '+cwObj);

}

function storeUpdate(cwObj, context) {

  console.log('start storeUpdate '+cwObj.name);

  fetch('/cwords/name/'+cwObj.name, {
    method: 'PUT', 
    headers: {
     'Content-type': 'application/json; charset=UTF-8' 
    },
    body: JSON.stringify(cwObj)  
   })
  .then(
    response => {
      return response.json();
    }
  )
  .then(
    data => {
      console.log('in fetch : data = ...'+JSON.stringify(data)+'...');
      resultSave(true, context);
    }
  )
  .catch(
    err => {
      console.log('in fetch err = ...'+JSON.stringify(err)+'...');
      resultSave(false, context);
    }
  )

  console.log('end storeUpdate '+cwObj);

}


