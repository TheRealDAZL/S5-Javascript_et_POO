// Lire, puis afficher le panier rempli sur la page précédente
function Afficher() {
    let panier = sessionStorage.getItem("panier");
    
    document.getElementById("panier").innerHTML = panier;
}