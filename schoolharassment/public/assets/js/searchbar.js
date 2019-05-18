document.addEventListener(
  "DOMContentLoaded",
  () => {
    var liste_html = document.getElementById("liste");
    var search = document.getElementById("search");
    var liste_users;

    search.addEventListener("keyup", searchHandler);

    function searchHandler() {
      let searchValue = document.getElementById("search").value;

      axios
        .post("/principal/:id/liste_utilisateur", { search: searchValue })
        .then(response => {
          liste_html.innerHTML = "";
          console.log(response);
          liste_users = response.data.liste;
          for (let user of response.data.liste) {
            liste_html.innerHTML += `<li>
            
            <h4>${user.nom} ${user.prenom}</h4>
            <h5>Statut : ${user.role}</h5>
            <p>
          ${user.username}<br>
        ${user.telephone}<br>
        </p>
  
        <div style="display: flex;">
        <h5 style="border: 2px solid white; padding: 10px; width: 133px; text-align: center; text-transform: uppercase; height:40px">
            <a href="/principal/${user._id}/profile_user">Détail</a>
          </h5>
          &nbsp;
          <h5 style="border: 2px solid white; padding: 10px; width: 133px; text-align: center; text-transform: uppercase; height:40px">
            <a href="/principal/${user._id}/update_user">Modifier</a>
          </h5>
          &nbsp;
          <form action="/principal/${user._id}/delete_user" method="POST">
            <button type="submit">Supprimer</button>
          </form>
        </div>
            <hr>
            
            </li>`;
          }
        });
    }

    searchHandler();
  },
  false
);

// var listeEtablissement_html = document.getElementById("listeEtablissement");
//     var searchEtablissement = document.getElementById("searchEtablissement");
//     var liste_Etablissement;

//     searchEtablissement.addEventListener("keyup", searchHandlerEtablissement);

//     function searchHandlerEtablissement() {
//       let searchValueEtablissement = document.getElementById(
//         "searchEtablissement"
//       ).value;

// axios
//         .post("/principal/:id/liste_etablissement", {
//           searchEtablissement: searchValueEtablissement
//         })
//         .then(response => {
//           listeEtablissement_html.innerHTML = "";
//           console.log(response);
//           liste_Etablissement = response.data.liste;
//           for (let etab of response.data.liste) {
//             listeEtablissement_html.innerHTML += `<li>

//             <h4>${etab.nom} ${etab.prenom}</h4>
//             <h5>Statut : ${user.role}</h5>
//             <p>
//           ${user.username}<br>
//         ${user.telephone}<br>
//         </p>

//         <div style="display: flex;">
//           <h5 style="border: 2px solid white; padding: 10px; width: 133px; text-align: center; text-transform: uppercase; height:40px">
//             <a href="/principal/${user._id}/update_user">Modifier</a>
//           </h5>
//           &nbsp;
//           <form action="/principal/${user._id}/delete_user" method="POST">
//             <button type="submit">Supprimer</button>
//           </form>
//         </div>
//             <hr></hr>

//             </li>`;
//           }
//         });
//     }
