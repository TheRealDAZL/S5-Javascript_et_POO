class Fruit {
    constructor(nom, prix, quantite= 0, sous_total= 0) {
        this.nom = nom;
        this.prix = prix;
        this.quantite = quantite;
        this.sous_total = sous_total;
    }

    toString() {
        return this.sous_total + "$ pour " + this.quantite + " " + this.nom + "(s) " + " à un prix de " + this.prix + "$ chaque <br>+<br>"
    }
}

class Panier {
    constructor(peches, poires, pommes, total = 0, nbfruits = 0) {
        this.peches = peches;
        this.poires = poires;
        this.pommes = pommes;
        this.total = total;
        this.nbfruits = nbfruits;
    }

    ajouterFruit(nomFruit) {
        switch (nomFruit) {
            case "peche":
                this.peches.prix = parseInt(document.getElementById("prixpeches").textContent); // Obtenir le prix à partir du HTML
                this.peches.quantite = parseInt(document.getElementById("nbpeches").value)
                this.peches.sous_total = this.peches.quantite * this.peches.prix

                break
            case "poire":
                this.poires.prix = parseInt(document.getElementById("prixpoires").textContent)
                this.poires.quantite = parseInt(document.getElementById("nbpoires").value)
                this.poires.sous_total = this.poires.quantite * this.poires.prix
                break
            case "pomme":
                this.pommes.prix = parseInt(document.getElementById("prixpommes").textContent)
                this.pommes.quantite = parseInt(document.getElementById("nbpommes").value)
                this.pommes.sous_total = this.pommes.quantite * this.pommes.prix
                break
        }

        this.total = this.peches.sous_total + this.poires.sous_total + this.pommes.sous_total
        this.nbfruits = this.peches.quantite + this.poires.quantite + this.pommes.quantite
    }

    toString() {
        return this.peches + this.poires + this.pommes + this.total  + "$ pour " + this.nbfruits + " fruit(s)";
    }
}

// Initialiser le panier avec les fruits et leurs prix respectifs, et avec une quantité de fruits et un coût de 0 par défaut
function Initialiser() {
    panier = new Panier(
             new Fruit("peche", document.getElementById("prixpeches").textContent, 0, 0),
             new Fruit("poire", document.getElementById("prixpoires").textContent, 0, 0),
             new Fruit("pomme", document.getElementById("prixpommes").textContent, 0, 0),
             0,
             0);  // Seul le panier va être global. On l'initialise au chargement de la page.

    document.getElementById("submit").disabled = true;
    document.getElementById("nbpeches").value = 0;
    document.getElementById("nbpoires").value = 0;
    document.getElementById("nbpommes").value = 0;
    document.getElementById("totalpeches").textContent = "0$";
    document.getElementById("totalpoires").textContent = "0$";
    document.getElementById("totalpommes").textContent = "0$";
    document.getElementById("totalfruits").textContent = "0$";

    document.querySelector("#erreurpeches").classList.add('invisible');
    document.querySelector("#erreurpoires").classList.add('invisible');
    document.querySelector("#erreurpommes").classList.add('invisible');
    document.querySelector("#erreurfruits").classList.add('invisible');
}

// Tout dépendamment de la catégorie pFruits, on évalue la quantité totale de fruits, et on affiche ou pas un message d'erreur en conséquence de cette évaluation
function Valider_et_Afficher(pFruits) {
    panier.ajouterFruit(pFruits)

    document.getElementById("totalpeches").textContent = parseInt(panier.peches.sous_total) + "$";
    document.getElementById("totalpoires").textContent = parseInt(panier.poires.sous_total) + "$";
    document.getElementById("totalpommes").textContent = parseInt(panier.pommes.sous_total) + "$";
    document.getElementById("totalfruits").textContent = panier.total + "$";

    switch (pFruits) { 
        case "peche":
            if (panier.nbfruits < 25) {
                ValiderCoutTotal();

                document.querySelector("#erreurpeches").classList.add('invisible');
                document.querySelector("#erreurpoires").classList.add('invisible');
                document.querySelector("#erreurpommes").classList.add('invisible');
            } else {
                document.querySelector("#erreurpeches").classList.remove('invisible');
            }
            break;

        case "poire":
            if (panier.nbfruits < 25) {
                ValiderCoutTotal();

                document.querySelector("#erreurpeches").classList.add('invisible');
                document.querySelector("#erreurpoires").classList.add('invisible');
                document.querySelector("#erreurpommes").classList.add('invisible');
            } else {
                document.querySelector("#erreurpoires").classList.remove('invisible');
            }
            break;

        case "pomme":
            if (panier.nbfruits < 25) {
                ValiderCoutTotal();

                document.querySelector("#erreurpeches").classList.add('invisible');
                document.querySelector("#erreurpoires").classList.add('invisible');
                document.querySelector("#erreurpommes").classList.add('invisible');
            } else {
                document.querySelector("#erreurpommes").classList.remove('invisible');
            }
            break;
    }
}

// Vérifier que le coût total est égal ou supérieur à 20$
function ValiderCoutTotal() {
    if (panier.total >= 20) {
        document.querySelector("#erreurfruits").classList.add('invisible');

        return true;
    } else {
        document.querySelector("#erreurfruits").classList.remove('invisible');

        return false;
    }
}

// Activer ou désactiver le bouton, tout dépendamment si la case est cochée ou pas
function Activer_Desactiver() {
    if (document.getElementById("conditions").checked) {
        document.getElementById("submit").disabled = false;
    } else {
        document.getElementById("submit").disabled = true;
    }
}

// Valider, puis envoyer les valeurs du formulaire
function Envoyer() {
    if (panier.nbfruits < 25 && ValiderCoutTotal()) {
        sessionStorage.setItem("panier", panier.toString()); // Inscrire le panier dans la session pour y avoir accès sur la deuxième page.
        document.getElementById("conditions").checked = false;

        return true;
    } else {
        return false;
    }
}