function db(idb) {
	let dbPromise = idb.open("myclub", 1, function(upgradeDb) {
		if (!upgradeDb.objectStoreNames.contains("favouriteStore")) {
			let idxFavStore = upgradeDb.createObjectStore("favouriteStore", {
				keyPath : "id"
			});
			idxFavStore.createIndex("namaClub", "namaClub", {
				unique: false
			});
		}
	});

	return dbPromise;
}

