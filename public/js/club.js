// REGISTER SERVICE WORKER
if (!('serviceWorker' in navigator)) {
  console.log("Service worker tidak didukung browser ini.");
} else {
  registerServiceWorker();
}
// Register service worker
function registerServiceWorker() {
  return navigator.serviceWorker.register('service-worker.js')
    .then(function (registration) {
      console.log('Registrasi service worker berhasil.');
      return registration;
    })
    .catch(function (err) {
      console.error('Registrasi service worker gagal.', err);
    });
}

document.addEventListener("DOMContentLoaded", async function() {
  console.log(window.location);
  await getClubById();

  let btnFav = document.querySelector("#addFav");
  let urlParams = new URLSearchParams(window.location.search);
  let id = Number(urlParams.get("id"));
  let isFav = false;
  checkData("favouriteStore", id)
    .then(msg => {
      btnFav.classList.remove("red");
      btnFav.classList.add("blue-grey");
      isFav = true;
    })
    .catch(msg => {
      btnFav.classList.remove("blue-grey");
      btnFav.classList.add("red");
      isFav = false;
    });

  btnFav.addEventListener("click", async function() {
    if (isFav) {
      deleteData("favouriteStore", id);
      btnFav.classList.remove("blue-grey");
      btnFav.classList.add("red");
      isFav = false;
    } else {
      const res = await dataClubIDB();
      const data = await res;
      createData("team", data);
      btnFav.classList.remove("red");
      btnFav.classList.add("blue-grey");
      isFav = true;
    }
  });
});