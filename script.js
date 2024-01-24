// Classe Fruit avec une méthode toString()
class Fruit {
    constructor(nom, prix, quantite = 0, sous_total = 0) {
        this.nom = nom
        this.prix = prix
        this.quantite = quantite
        this.sous_total = sous_total
    }

    toString() {
        return this.sous_total + "$ pour " + this.quantite + " de sac(s) de " + this.nom + "s à un prix de " + parseInt(this.prix) + "$ chaque <br>"
    }
}

// Classe Panier avec deux méthodes : modifierFruit(nomFruit) et toString()
class Panier {
    constructor(peches, poires, pommes, total = 0, nbfruits = 0) {
        this.peches = peches
        this.poires = poires
        this.pommes = pommes
        this.total = total
        this.nbfruits = nbfruits
    }

    // Méthode de la classe Panier, qui met à jour les éléments du panier et les affichages
    modifierFruit(nomFruit) {
        switch (nomFruit) {
            case "peche":
                this.peches.quantite = parseInt(document.getElementById("nbpeches").value)
                this.peches.sous_total = this.peches.quantite * this.peches.prix

                break
            case "poire":
                this.poires.quantite = parseInt(document.getElementById("nbpoires").value)
                this.poires.sous_total = this.poires.quantite * this.poires.prix

                break
            case "pomme":
                this.pommes.quantite = parseInt(document.getElementById("nbpommes").value)
                this.pommes.sous_total = this.pommes.quantite * this.pommes.prix

                break
        }

        this.total = this.peches.sous_total + this.poires.sous_total + this.pommes.sous_total
        this.nbfruits = this.peches.quantite + this.poires.quantite + this.pommes.quantite

        document.getElementById("totalpeches").textContent = parseInt(panier.peches.sous_total) + "$"
        document.getElementById("totalpoires").textContent = parseInt(panier.poires.sous_total) + "$"
        document.getElementById("totalpommes").textContent = parseInt(panier.pommes.sous_total) + "$"
        document.getElementById("totalfruits").textContent = panier.total + "$"
    }

    toString() {
        return this.peches.toString() + "+<br>" + this.poires.toString() + "+<br>" + this.pommes.toString() + "=<br>" + this.total  + "$ pour " + this.nbfruits + " sac(s) de fruits"
    }
}

// Méthode pour initialiser ou réinitialiser le panier avec trois objets de la classe Fruit, en utilisant le constructeur de Fruit avec les noms des fruits
// et leurs prix respectifs, et avec une quantité et un sous-total de 0 pour chaque fruit (par défaut)
// Aussi, mettre à jour tous les affichages
function Initialiser() {
    peches = new Fruit("peche", parseInt(document.getElementById("prixpeches").textContent))
    poires = new Fruit("poire", parseInt(document.getElementById("prixpoires").textContent))
    pommes = new Fruit("pomme", parseInt(document.getElementById("prixpommes").textContent))
    panier = new Panier(peches, poires, pommes)

    document.getElementById("submit").disabled = true
    document.getElementById("nbpeches").value = 0
    document.getElementById("nbpoires").value = 0
    document.getElementById("nbpommes").value = 0
    document.getElementById("totalpeches").textContent = "0$"
    document.getElementById("totalpoires").textContent = "0$"
    document.getElementById("totalpommes").textContent = "0$"
    document.getElementById("totalfruits").textContent = "0$"

    ajouterInvisible()
    document.querySelector("#erreurfruits").classList.add('invisible')
}

// Méthode pour activer ou désactiver le bouton Envoyer, tout dépendamment si la case est cochée ou pas
function Activer_Desactiver() {
    if (document.getElementById("conditions").checked) {
        document.getElementById("submit").disabled = false
    } else {
        document.getElementById("submit").disabled = true
    }
}

// Méthode qui valide, puis qui envoie les valeurs du formulaire si le formulaire est valide
function Envoyer() {
    if (panier.nbfruits < 25 && ValiderCoutTotal()) {
        sessionStorage.setItem("panier", panier.toString()) // Inscrire le panier dans la session pour y avoir accès sur la deuxième page.
        document.getElementById("conditions").checked = false

        return true
    } else {
        return false
    }
}

// Méthode qui appelle la méthode modifierFruit(nomFruit) de l'objet panier, puis qui affiche ou pas un message d'erreur tout
// dépendamment de la validation des valeurs fournies
function Valider_et_Afficher(pFruits) {
    panier.modifierFruit(pFruits)

    switch (pFruits) { 
        case "peche":
            if (panier.nbfruits < 25) {
                ValiderCoutTotal()

                ajouterInvisible()
            } else {
                document.querySelector("#erreurpeches").classList.remove('invisible');
            }
            break

        case "poire":
            if (panier.nbfruits < 25) {
                ValiderCoutTotal()

                ajouterInvisible()
            } else {
                document.querySelector("#erreurpoires").classList.remove('invisible');
            }
            break

        case "pomme":
            if (panier.nbfruits < 25) {
                ValiderCoutTotal()

                ajouterInvisible()
            } else {
                document.querySelector("#erreurpommes").classList.remove('invisible');
            }
            break
    }
}

// Méthode pour vérifier que le coût total est égal ou supérieur à 20$
function ValiderCoutTotal() {
    if (panier.total >= 20) {
        document.querySelector("#erreurfruits").classList.add('invisible')

        return true
    } else {
        document.querySelector("#erreurfruits").classList.remove('invisible')

        return false
    }
}

// Méthode pour rendre invisible les messages d'erreur
function ajouterInvisible() {
    document.querySelector("#erreurpeches").classList.add('invisible')
    document.querySelector("#erreurpoires").classList.add('invisible')
    document.querySelector("#erreurpommes").classList.add('invisible')
}