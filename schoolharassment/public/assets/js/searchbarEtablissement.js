document.addEventListener(
  "DOMContentLoaded",
  () => {
    var liste_html = document.getElementById("liste");
    var search = document.getElementById("search");
    var liste_etablissements;

    search.addEventListener("keyup", searchHandler);

    function searchHandler() {
      let searchValue = document.getElementById("search").value;

      axios
        .post("/principal/:id/liste_etablissement", { search: searchValue })
        .then(response => {
          liste_html.innerHTML = "";
          console.log(response);
          liste_etablissements = response.data.liste;
          for (let etab of response.data.liste) {
            liste_html.innerHTML += `<li>
              
              <h4>${etab.nom} 
             
    		<h5>${etab.adresse}</h5>
    		<h5>${etab.cp}  ${etab.ville}</h5>
            
            <p>${etab.departement}<br>
			${etab.telephone}<br>
    	</p>
              
    
          <div style="display: flex;">
            <h5 style="border: 2px solid white; padding: 10px; width: 133px; text-align: center; text-transform: uppercase; height:40px">
              <a href="/principal/${etab._id}/update_etablissement">Modifier</a>
            </h5>
            &nbsp;
            <form action="/principal/${
              etab._id
            }/delete_etablissement" method="POST">
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
