function checkData(storeName, id) {
  return new Promise(function(resolve, reject) {
    db(idb)
      .then(function(db) {
        var tx = db.transaction(storeName, "readonly");
        var store = tx.objectStore(storeName);
        return store.get(id);
      })
      .then(function(data) {
        if (data !== undefined) {
          resolve("Data favourite");
        } else {
          reject("Bukan data favourite");
        }
      });
  });
}

function createData(dataType, data) {
  var storeName = "";
  var dataToCreate = {};

  if (dataType === "team") {
    storeName = "favouriteStore";
    dataToCreate = {
      id: data.id,
      name: data.name,
      shortName: data.shortName,
      address: data.address,
      phone: data.phone,
      website: data.website,
      email: data.email,
      founded: data.founded,
      clubColors: data.clubColors
    };
  }

  console.log("data " + dataToCreate);
  db(idb)
    .then(db => {
      let tx = db.transaction(storeName, "readwrite");
      let store = tx.objectStore(storeName);
      store.put(dataToCreate);

      return tx.complete;
    })
    .then(function() {
      M.toast({
        html: "Club berhasil tambah ke favourite!"
      });
    })
    .catch(function() {
      M.toast({
        html: "Error"
      });
    });
}

function deleteData(storeName, data) {
  db(idb)
    .then(function(db) {
      var tx = db.transaction(storeName, "readwrite");
      var store = tx.objectStore(storeName);
      //console.log("deleteDataPlayerfav: cek id= " + data);
      store.delete(data);
      return tx.complete;
    })
    .then(function() {
      console.log("Item deleted");

      M.toast({
        html: "Club berhasil dihapus dari favourite!"
      });
    })
    .catch(function() {
      M.toast({
        html: "Error"
      });
    });
}

async function getData() {
  let dataFav = "";
  try {
    const dbase = await db(idb);
    const tx = await dbase.transaction("favouriteStore", "readonly");
    const store = await tx.objectStore("favouriteStore");
    const data = await store.getAll();

    if (data.length) {
      data.map((datas, i) => {
        return (dataFav += `
        <div class="col s12 m6 l6">
          <div class="card">
            <div class="card-content">
              <div center-align>
                <h5 class="center-align">
                  <span class="blue-text text-darken-2">
                    <a href="../club.html?id=${datas.id}">${datas.name}</a>
                  </span>
                </h5>
              </div>
            </div>
          </div>
        </div>
        `);
      });
    } else {
      return (dataFav += `<h1>Kamu Tidak Memiliki Team Favorite</h1>`);
    }

    return (document.getElementById("favourite").innerHTML = dataFav);
  } catch (e) {
    return new Error(e);
  }
}
