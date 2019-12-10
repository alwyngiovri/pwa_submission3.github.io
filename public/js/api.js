const config = {
  token: "0abe87de18004696a32d4100919ff499",
  base_url: "https://api.football-data.org/v2",
  kode_liga: 2014, //liga spanyol
  get endpoint() {
    return {
      klasemen: `${this.base_url}/competitions/${this.kode_liga}/standings?standingType=TOTAL`,
      match: `${this.base_url}/competitions/${this.kode_liga}/matches?status=SCHEDULED`,
      club : `${this.base_url}/teams`,
    };
  }
};

const { token, endpoint } = config;

function fetchData(url) {
  return fetch(url, {
    method: "GET",
    headers: {
      "X-Auth-Token": token
    }
  });
}

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}
// Blok kode untuk melakukan request data json
function getKlasemen() {
  if ('caches' in window) {
    caches.match(endpoint.klasemen).then(function(response) {
      if (response) {
        response.json().then(function (data) {
        let klasemenHTML = "";
        let dataClubHTML = "";
        data.standings.forEach(d_klasemen => {
          d_klasemen.table.forEach(d_club => {
            dataClubHTML += `<tr>
            <td class="center-align">${d_club.position}</td>
            <td>
            <a href="../club.html?id=${d_club.team.id}">
            <p class="hide-on-small-only">
            <img class ="show-on-medium-and-up show-on-medium-and-down" alt=${d_club.team.name} src=${d_club.team.crestUrl} style="float:left;width:22px;height:22px;margin-right:20px">
            ${d_club.team.name}
            </p>
            <p class="hide-on-med-and-up">
            <img src=${d_club.team.crestUrl}  style="float:left;width:22px;height:22px;margin-right:20px">
            </p>
  
            </a>
            </td>
            <td class="center-align">${d_club.playedGames}</td>
            <td class="center-align">${d_club.won}</td>
            <td class="center-align">${d_club.draw}</td>
            <td class="center-align">${d_club.lost}</td>
            <td class="center-align">${d_club.points}</td>
            <td class="center-align">${d_club.goalsFor}</td>
            <td class="center-align">${d_club.goalsAgainst}</td>
            <td class="center-align">${d_club.goalDifference}</td>
          </tr>`;
          });
          klasemenHTML += `
          <div class="row">
            <div class="col s12 m12" id="tabelklasemen">
              <div class="card">
                <div class="card-content">
                  <table class="responsive-table striped ">
                    <thead>
                      <tr>
                        <th class="center-align">Position</th>
                        <th>Club</th>
                        <th class="center-align">Play</th>
                        <th class="center-align">Won</th>
                        <th class="center-align">Draw</th>
                        <th class="center-align">Lost</th>
                        <th class="center-align">Points</th>
                        <th class="center-align">GF</th>
                        <th class="center-align">GA</th>
                        <th class="center-align">GD</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${dataClubHTML}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
             
            `;
        });
        document.getElementById("klasemen").innerHTML = klasemenHTML;
        })
      }
    })
  }
  fetchData(endpoint.klasemen)
    .then(status)
    .then(json)
    .then(function(data) {
      // Isi disembunyikan agar lebih ringkas
      let klasemenHTML = "";
        let dataClubHTML = "";
        data.standings.forEach(d_klasemen => {
          d_klasemen.table.forEach(d_club => {
            dataClubHTML += `<tr>
            <td class="center-align">${d_club.position}</td>
            <td>
            <a href="../club.html?id=${d_club.team.id}">
            <p class="hide-on-small-only">
            <img class ="show-on-medium-and-up show-on-medium-and-down" alt=${d_club.team.name} src=${d_club.team.crestUrl} style="float:left;width:22px;height:22px;margin-right:20px">
            ${d_club.team.name}
            </p>
            <p class="hide-on-med-and-up">
            <img src=${d_club.team.crestUrl}  style="float:left;width:22px;height:22px;margin-right:20px">
            </p>
  
            </a>
            </td>
            <td class="center-align">${d_club.playedGames}</td>
            <td class="center-align">${d_club.won}</td>
            <td class="center-align">${d_club.draw}</td>
            <td class="center-align">${d_club.lost}</td>
            <td class="center-align">${d_club.points}</td>
            <td class="center-align">${d_club.goalsFor}</td>
            <td class="center-align">${d_club.goalsAgainst}</td>
            <td class="center-align">${d_club.goalDifference}</td>
          </tr>`;
          });
          klasemenHTML += `
          <div class="row">
            <div class="col s12 m12" id="tabelklasemen">
              <div class="card">
                <div class="card-content">
                  <table class="responsive-table striped ">
                    <thead>
                      <tr>
                        <th class="center-align">Position</th>
                        <th>Club</th>
                        <th class="center-align">Play</th>
                        <th class="center-align">Won</th>
                        <th class="center-align">Draw</th>
                        <th class="center-align">Lost</th>
                        <th class="center-align">Points</th>
                        <th class="center-align">GF</th>
                        <th class="center-align">GA</th>
                        <th class="center-align">GD</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${dataClubHTML}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
             
            `;
        });
        document.getElementById("klasemen").innerHTML = klasemenHTML;
  })
  .catch(error);
}

function getMatch() {
  if ('caches' in window) {
    caches.match(endpoint.match).then(function(response) {
      if (response) {
        response.json().then(function (data) {
        let matchesHTML = "";
        // let just showing 10 data on page
        data.matches.slice(0, 10).forEach(data => {
          matchesHTML += `
          <div class="col s12 m6 l6">
            <div class="card">
            <div class="card-content">
            <div center-align>
                <h5 class="center-align">Matchday: ${data.matchday}</h5>
                <div class="center-align">Kick Off: ${new Date(
                  data.utcDate
                ).toLocaleString("en-id", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
                })}</div>
        
              <div class="row" style="margin:20px">
                <div class="col s5 truncate right-align">
                <span class="blue-text text-darken-2">  ${
                  data.homeTeam.name
                }</span>
                </div>
                <div class="col s2 ">
                  VS
                </div>
                <div class="col s5 truncate left-align">
                <span class="blue-text text-darken-2">  ${
                  data.awayTeam.name
                }</span>
                </div>
              </div>
            </div>
            </div>
            </div>
          </div>
              `;
        });
        document.getElementById("match").innerHTML = matchesHTML;
        })
      }
    })
  }
  fetchData(endpoint.match)
    .then(status)
    .then(json)
    .then(function(data) {
      // Isi disembunyikan agar lebih ringkas
      let matchesHTML = "";
    // let just showing 10 data on page
    data.matches.slice(0, 10).forEach(data => {
      matchesHTML += `
        <div class="col s12 m6 l6">
          <div class="card">
          <div class="card-content">
          <div center-align>
              <h5 class="center-align">Matchday: ${data.matchday}</h5>
              <div class="center-align">Kick Off: ${new Date(
                data.utcDate
              ).toLocaleString("en-id", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              })}</div>
  
            <div class="row" style="margin:20px">
              <div class="col s5 truncate right-align">
                (Home)
                <span class="blue-text text-darken-2">  ${
                  data.homeTeam.name
                }</span>
              </div>
              <div class="col s2 ">
                VS
              </div>
              <div class="col s5 truncate left-align">
              <span class="blue-text text-darken-2">  ${
                data.awayTeam.name
              }</span>
              (Away)
              </div>
            </div>
          </div>
          </div>
          </div>
        </div>
            `;
    });
    document.getElementById("match").innerHTML = matchesHTML;
  })
  .catch(error);
}

async function getClubById() {
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get("id");

  if ("caches" in window) {
    const res = await caches.match(`${endpoint.club}/${idParam}`);
    if (res) {
      const data = await res.json();
      console.log(`Data JSON : ${data}`);
      let detailClubHTML = `
      <div>
        <table>
          <tr>
           <td>Nama Team </td>
            <td>: ${data.name}</td>
          </tr>
          <tr>
            <td>Nama Pendek </td>
            <td>: ${data.shortName}</td>
          </tr>
          <tr>
            <td>Alamat </td>
            <td>: ${data.address}</td>
          </tr>
          <tr>
            <td>Phone </td>
            <td>: ${data.phone}</td>
          </tr>
          <tr>
            <td>Website </td>
            <td>: <a href='${data.website}'>${data.website}</a></td>
          </tr>
        </table>
      </div>
      <div class="center-align" style=padding-top:30px>
        <div  id="addFav" class="btn red darken-4">Favorite</div>
      </div>
      `;
      document.getElementById("body-content").innerHTML = detailClubHTML;
    }
  }

  const res = await fetchData(`${endpoint.club}/${idParam}`);
  const data = await res.json();
      let detailClubHTML = `
      <div>
        <table>
          <tr>
           <td>Nama Team </td>
            <td>: ${data.name}</td>
          </tr>
          <tr>
            <td>Nama Pendek </td>
            <td>: ${data.shortName}</td>
          </tr>
          <tr>
            <td>Alamat </td>
            <td>: ${data.address}</td>
          </tr>
          <tr>
            <td>Phone </td>
            <td>: ${data.phone}</td>
          </tr>
          <tr>
            <td>Website </td>
            <td>: <a href='${data.website}'>${data.website}</a></td>
          </tr>
        </table>
      </div>
      <div class="center-align" style=padding-top:30px>
        <div  id="addFav" class="btn red darken-4">Favorite</div>
      </div>
      `;
      document.getElementById("body-content").innerHTML = detailClubHTML;
}

async function dataClubIDB() {
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get("id");
  try {
    const res = await fetchData(`${endpoint.club}/${idParam}`);
    const data = await res.json();
    return data;
  } catch {
    throw new Error();
  }
}
