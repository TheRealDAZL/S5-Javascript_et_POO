class Fruit {
    constructor(nom="", prix=0, quantite=0, sous_total=0) {
        this.nom = nom;
        this.prix = prix;
        this.quantite = quantite;
        this.sous_total = sous_total;
    }

    toString() {
        return this.sous_total + "$ pour " + this.quantite;
    }
}

class Panier {
    constructor(peches, poires, pommes, total=0, nbfruits=0) {
        this.peches = peches;
        this.poires = poires;
        this.pommes = pommes;
        this.total = total;
        this.nbfruits = nbfruits;
    }

    toString() {
        return this.peches + " pêche(s)<br>+<br>" + this.poires + " poire(s)<br>+<br>" + this.pommes + " pomme(s)<br>=<br>" + this.total  + "$ pour " + this.nbfruits + " fruit(s)";
    }
}

// Initialiser le panier avec les fruits et leurs prix respectifs, et avec une quantité de fruits et un coût de 0 par défaut
function Initialiser() {
    panier = new Panier(
             new Fruit("peches", document.getElementById("prixpeches").textContent, 0, 0),
             new Fruit("poires", document.getElementById("prixpoires").textContent, 0, 0),
             new Fruit("pommes", document.getElementById("prixpommes").textContent, 0, 0),
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

    const temppeches = document.querySelector("#erreurpeches");
    temppeches.classList.add('invisible');
    const temppoires = document.querySelector("#erreurpoires");
    temppoires.classList.add('invisible');
    const temppommes = document.querySelector("#erreurpommes");
    temppommes.classList.add('invisible');
    const temp = document.querySelector("#erreurfruits");
    temp.classList.add('invisible');
}

// Tout dépendamment de la catégorie pFruits, on évalue la quantité totale de fruits, et on affiche ou pas un message d'erreur en conséquence de cette évaluation
function Valider_et_Afficher(pFruits) {
    Mise_a_jour();

    switch (pFruits) { 
        case "peches":
            if (panier.nbfruits < 25) {
                ValiderCoutTotal();
                const temppeches = document.querySelector("#erreurpeches");
                temppeches.classList.add('invisible');
                const temppoires = document.querySelector("#erreurpoires");
                temppoires.classList.add('invisible');
                const temppommes = document.querySelector("#erreurpommes");
                temppommes.classList.add('invisible');
            } else {
                const temp = document.querySelector("#erreurpeches");
                temp.classList.remove('invisible');
            }
            break;

        case "poires":
            if (panier.nbfruits < 25) {
                ValiderCoutTotal();
                const temppeches = document.querySelector("#erreurpeches");
                temppeches.classList.add('invisible');
                const temppoires = document.querySelector("#erreurpoires");
                temppoires.classList.add('invisible');
                const temppommes = document.querySelector("#erreurpommes");
                temppommes.classList.add('invisible');
            } else {
                const temp = document.querySelector("#erreurpoires");
                temp.classList.remove('invisible');
            }
            break;

        case "pommes":
            if (panier.nbfruits < 25) {
                ValiderCoutTotal();
                const temppeches = document.querySelector("#erreurpeches");
                temppeches.classList.add('invisible');
                const temppoires = document.querySelector("#erreurpoires");
                temppoires.classList.add('invisible');
                const temppommes = document.querySelector("#erreurpommes");
                temppommes.classList.add('invisible');
            } else {
                const temp = document.querySelector("#erreurpommes");
                temp.classList.remove('invisible');
            }
            break;
    }
}

// Activer ou désactiver le bouton, tout dépendamment si la case est cochée ou pas
function Activer_Desactiver() {
    if (document.getElementById("conditions").checked) {
        Mise_a_jour();
        document.getElementById("submit").disabled = false;
    } else {
        document.getElementById("submit").disabled = true;
    }
}

// Valider, puis envoyer les valeurs du formulaire
function Envoyer() {
    if (panier.nbfruits < 25 && ValiderCoutTotal()) {
        sessionStorage.setItem("panier", panier); // Inscrire le panier dans la session pour y avoir accès sur la deuxième page.
        document.getElementById("conditions").checked = false;
        return true;
    } else {
        return false;
    }
}

// Mettre à jour les changements faits par l'utilisateur
function Mise_a_jour() {
    let prix_peches = parseInt(document.getElementById("prixpeches").textContent); // Obtenir le prix à partir du HTML
    let quantite_peches = parseInt(document.getElementById("nbpeches").value); // Obtenir la quantité à partir du HTML
    let sous_total_peches = quantite_peches * prix_peches; // Calculer le sous-total par catégorie pFruits
    let peches = new Fruit("peches", prix_peches, quantite_peches, sous_total_peches); // Créer un nouvel objet Fruit

    let prix_poires = parseInt(document.getElementById("prixpoires").textContent); // Obtenir le prix à partir du HTML
    let quantite_poires = parseInt(document.getElementById("nbpoires").value); // Obtenir la quantité à partir du HTML
    let sous_total_poires = quantite_poires * prix_poires; // Calculer le sous-total par catégorie pFruits
    let poires = new Fruit("poires", prix_poires, quantite_poires, sous_total_poires); // Créer un nouvel objet Fruit

    let prix_pommes = parseInt(document.getElementById("prixpommes").textContent); // Obtenir le prix à partir du HTML
    let quantite_pommes = parseInt(document.getElementById("nbpommes").value); // Obtenir la quantité à partir du HTML
    let sous_total_pommes = quantite_pommes * prix_pommes; // Calculer le sous-total par catégorie pFruits
    let pommes = new Fruit("pommes", prix_pommes, quantite_pommes, sous_total_pommes); // Créer un nouvel objet Fruit

    panier.peches = peches;
    panier.poires = poires;
    panier.pommes = pommes;
    panier.nbfruits = parseInt(panier.peches.quantite) + parseInt(panier.poires.quantite) + parseInt(panier.pommes.quantite); // On calcule le nombre de fruits
    panier.total = parseInt(panier.peches.sous_total) + parseInt(panier.poires.sous_total) + parseInt(panier.pommes.sous_total); // On calcule le coût total

    document.getElementById("totalpeches").textContent = parseInt(panier.peches.sous_total) + "$";
    document.getElementById("totalpoires").textContent = parseInt(panier.poires.sous_total) + "$";
    document.getElementById("totalpommes").textContent = parseInt(panier.pommes.sous_total) + "$";
    document.getElementById("totalfruits").textContent = panier.total + "$";
}

// Vérifier que le coût total est égal ou supérieur à 20$
function ValiderCoutTotal() {
    if (panier.total >= 20) {
        const temp = document.querySelector("#erreurfruits");
        temp.classList.add('invisible');
        return true;
    } else {
        const temp = document.querySelector("#erreurfruits");
        temp.classList.remove('invisible');
        return false;
    }
}