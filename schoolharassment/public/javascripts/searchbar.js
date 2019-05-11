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

{
  /* <h5>Statut : {{user.role}}</h5>
        <p>
          {{user.username}}<br>
        {{user.telephone}}<br>
        </p>
  
        <div style="display: flex;">
          <h5 style="border: 2px solid white; padding: 10px; width: 133px; text-align: center; text-transform: uppercase; height:40px">
            <a href="/principal/{{user._id}}/update_user">Modifier</a>
          </h5>
          &nbsp;
          <form action="/principal/{{user._id}}/delete_user" method="POST">
            <button type="submit">Supprimer</button>
          </form>
        </div></li>; */
}
