class PojisteniObsuha {
    constructor (pojisteniData, ulozCallback, zpetCallback){
        this.obsah = document.getElementById("obsah");
        this.pojisteniData = pojisteniData;
        this.ulozCallback = ulozCallback;
        this.zpetCallback = zpetCallback;
        this.editace = true;
        if (pojisteniData==null){
            this.editace = false;
            this.pojisteniData = {
                nazev:"",
                predmet: "",
                kryti: 0,
                platnostOd: "",
                platnostDo: ""
            }
            
        
        }
    }

    vykresliPojisteni() {
        
        this.obsah.innerHTML = "";
        this.obsah.innerHTML = `<article class="container mt-3">
        <h1>`+(this.editace ? "Upravit pojištění" : "Přidat pojištění")+`</h1>
       <div>

           <form class="row g-3 needs-validation" novalidate>
               <div class="form-group">
                   <label for="nazev">Druh pojištění</label>
                   <select class="form-select" id="nazev">
                       <option>Pojištění majetku</option>
                       <option>Povinné ručení</option>
                       <option>Cestovní pojištění</option>
                       <option>Pojištění domácích mazlíčků</option>
                   </select>
               </div>
               <div class="col-md-6">
                 <label for="kryti" class="form-label">Částka krytí</label>
                 <input type="number" class="form-control" id="kryti" value="" required>
                 <div class="valid-feedback">
                   Platné
                 </div>
               </div>
               
               <div class="col-md-6">
                 <label for="predmet" class="form-label">Předmět pojištění</label>
                 <input type="text" class="form-control" id="predmet" required>
                 <div class="invalid-feedback">
                   Prosím, napište, co chcete pojistit.
                 </div>
               </div>
               <div class="col-md-6">
                   <label for="platnostOd" class="form-label">Začátek pojištění</label>
                   <input type="date" class="form-control" id="platnostOd" required>
                   <div class="invalid-feedback">
                     Prosím, zadejte od kdy chcete, aby pojištění platilo.
                   </div>
               </div>
               <div class="col-md-6">
                   <label for="platnostDo" class="form-label">Konec pojištění</label>
                   <input type="date" class="form-control" id="platnostDo" required>
                   <div class="invalid-feedback">
                     Prosím, zadejte do kdy chcete, aby pojištění platilo.
                   </div>
               </div>
               <div class="col-12">
                 <div class="form-check">
                   <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required>
                   <label class="form-check-label" for="invalidCheck">
                     Souhlasím s podmínkama
                   </label>
                   <div class="invalid-feedback">
                     Před odesláním musíte souhlasit.
                   </div>
                 </div>
               </div>
               <div class="col-12">
                 <button class="btn btn-info" type="button">Odeslat</button>
                 <button type="button" class="btn btn-outline-secondary">Zpět</button>
               </div>
           </form>

           
           
           
       </div>
   </article>`

   this.obsah.querySelector("#kryti").value = this.pojisteniData.kryti
   this.obsah.querySelector("#nazev").value = this.pojisteniData.nazev
   this.obsah.querySelector("#predmet").value = this.pojisteniData.predmet
   this.obsah.querySelector("#platnostOd").value = this.pojisteniData.platnostOd
   this.obsah.querySelector("#platnostDo").value = this.pojisteniData.platnostDo


       const odeslatTlacitko = this.obsah.getElementsByTagName("button")[0]
       odeslatTlacitko.onclick = () => {
        this.pojisteniData.kryti = this.obsah.querySelector("#kryti").value
        this.pojisteniData.nazev = this.obsah.querySelector("#nazev").value
        this.pojisteniData.predmet = this.obsah.querySelector("#predmet").value
        this.pojisteniData.platnostDo = this.obsah.querySelector("#platnostDo").value
        this.pojisteniData.platnostOd = this.obsah.querySelector("#platnostOd").value
        this.ulozCallback(this.pojisteniData);
       } 

       const zpetTlacitko = this.obsah.getElementsByTagName("button")[1];
       zpetTlacitko.onclick = () => {
        this.zpetCallback();
       }




    }




    // constructor(nazev, predmet, kryti, platnnostOd, platnnostDo) {
    //     this.nazev = nazev ;
    //     this.predmet = predmet ;
    //     this.kryti = kryti;
    //     this.platnnostOd = platnnostOd ;
    //     this.platnnostDo = platnnostDo;
    // }

    
}
// let pojisteni = new Pojisteni("Pojištění majetku", "byt","4 000 000", new Date("2022-08-01"), new Date("2030-08-01");
