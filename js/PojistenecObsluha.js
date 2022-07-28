'use strict'

class PojistenecObsluha {
    constructor(pojistenecData, ulozitCallback, odstranitCallback, zpetCallback) {
      this.obsah = document.getElementById("obsah");
        if (pojistenecData == null){
          this.editace = false;
          this.pojistenecData = {
              osobniUdaje:{
                  jmeno: "",
                  prijmeni: "",
                  datumNarozeni: "",
                  mesto: "",
                  ulice:"",
                  cisloPopisne: "",
                  psc: "",
                  stat: "",
                  email: "",
                  telefon: ""
              },
              pojisteni: []
          }
        }
        else {
          this.editace = true ;
            this.pojistenecData = pojistenecData;
        }
        
        this.ulozitCallback = ulozitCallback;
        this.odstranitCallback = odstranitCallback;
        this.zpetCallback = zpetCallback;
      
    }

    _vyplnEditacePojistenecDataFormular(sablona){
      sablona.querySelector("#jmeno").value = this.pojistenecData.osobniUdaje.jmeno
      sablona.querySelector("#prijmeni").value = this.pojistenecData.osobniUdaje.prijmeni
      sablona.querySelector("#datumNarozeni").value = this.pojistenecData.osobniUdaje.datumNarozeni
      sablona.querySelector("#email").value = this.pojistenecData.osobniUdaje.email
      sablona.querySelector("#stat").value = this.pojistenecData.osobniUdaje.stat
      sablona.querySelector("#mesto").value = this.pojistenecData.osobniUdaje.mesto
      sablona.querySelector("#ulice").value = this.pojistenecData.osobniUdaje.ulice
      sablona.querySelector("#psc").value = this.pojistenecData.osobniUdaje.psc
      sablona.querySelector("#cisloPopisne").value = this.pojistenecData.osobniUdaje.cisloPopisne
    }

    pridatPojisteni(pojisteniData){
      this.pojistenecData.pojisteni.push(pojisteniData)
      this.ulozitCallback(this.pojistenecData)
    }

    ulozPojisteni (pojisteniData) {
      this.ulozitCallback(this.pojistenecData)
    }


    vykresliDetailPojistence(){
      console.log(this.pojistenecData);
      this.obsah.innerHTML = "";
      const sablonaDetail=document.createElement("div")
    
        sablonaDetail.innerHTML = `<article class="container mt-3">

        <div class="row align-items-center">
            <div class="col-auto"><i class="bi-person-square detail-ikona" ></i></div>
            <div class="col mt-5"> <h2 class="text-start mb-2 m-0"  >`+ this.pojistenecData.osobniUdaje.jmeno + " " + this.pojistenecData.osobniUdaje.prijmeni+`</h2>
                <p>`+this.pojistenecData.osobniUdaje.ulice+ " " +this.pojistenecData.osobniUdaje.cisloPopisne +`</p>
                <p>`+this.pojistenecData.osobniUdaje.mesto+`</p>
                <p>`+this.pojistenecData.osobniUdaje.psc+`</p></div>
            <div class="col mt-5"><p>`+this.pojistenecData.osobniUdaje.email+`</p>
                <p>`+this.pojistenecData.osobniUdaje.telefon+`</p></div>
            </div>
        
        <div>
            <h2>
                Sjednaná pojištění
            </h2>
            <table class="table table-responsive-sm table-hover table-striped">
                <thead>
                    <tr>
                        <th scope="col">Pojištění</th>
                        <th scope="col">Čátka</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody></tbody>
                
            </table> 
        </div>
        <div class="text-center">
            <button type="button" class="btn btn-warning">Přidat pojištění</button>
            <button type="button" class="btn btn-info">Editovat pojištěnce</button>
            <button type="button" class="btn btn-danger">Odstranit pojištěnce</button>
            <button type="button" class="btn btn-outline-secondary">Zpět na výpis</button>
        </div>
        
    </article>`
    const pridatPojisteniTl = sablonaDetail.getElementsByTagName("button")[0]
    pridatPojisteniTl.onclick = () => {
          const pojisteniObsuha = new PojisteniObsuha (null, this.pridatPojisteni.bind(this), this.vykresliDetailPojistence.bind(this))
          pojisteniObsuha.vykresliPojisteni()
      }
      const editovatPojistenceTl = sablonaDetail.getElementsByTagName("button")[1]
      editovatPojistenceTl.onclick = () => {
        this.vykresliEditaciPojistence()

      }
      const odstranitTl = sablonaDetail.getElementsByTagName("button")[2]
      odstranitTl.onclick = () => {
        this.odstranitCallback(this.pojistenecData)
      }

      const zpetTl = sablonaDetail.getElementsByTagName("button")[3]
      zpetTl.onclick = () => {
        this.zpetCallback();
      }

     const tbody = sablonaDetail.getElementsByTagName("tbody")[0]
      for (let i=0; i<this.pojistenecData.pojisteni.length; i++){
        const pojisteni = this.pojistenecData.pojisteni[i];
        const radekPojisteni = document.createElement ("tr")
        radekPojisteni.innerHTML = `<td>`+pojisteni.nazev + `</td>
        <td>`+pojisteni.kryti + `</td>
        <td class="text-end">
            <button type="button" class="btn btn-danger">SMAZAT</button>
            <button type="button" class="btn btn-info">EDITOVAT</button>
        </td>`

        const smazatPojisteniTl = radekPojisteni.getElementsByTagName("button")[0]
          smazatPojisteniTl.onclick = () => {
            this.pojistenecData.pojisteni=this.pojistenecData.pojisteni.filter((p) => {
              return pojisteni !== p;
              
            })
      
            this.ulozitCallback(this.pojistenecData);
        }
        const editovatPojisteniTl = radekPojisteni.getElementsByTagName("button")[1]
         editovatPojisteniTl.onclick = () => {
          const pojisteniObsluha = new PojisteniObsuha (pojisteni, this.ulozPojisteni.bind(this), this.vykresliDetailPojistence.bind(this))
          pojisteniObsluha.vykresliPojisteni()
         }
  

        tbody.appendChild(radekPojisteni)
      }

      




    
    this.obsah.appendChild(sablonaDetail);

    }

    vykresliEditaciPojistence (){
        this.obsah.innerHTML = "";
        const sablona=document.createElement("div")
    
        sablona.innerHTML = `<article class="container mt-3">

           
            
        <h1>`+(this.editace ? (this.pojistenecData.osobniUdaje.jmeno+ " " + this.pojistenecData.osobniUdaje.prijmeni) : "Nový pojištěněc")+`</h1>

        <form class="row g-3 needs-validation" novalidate>
            <div class="col-md-6">
              <label for="jmeno" class="form-label">Jméno</label>
              <input type="text" class="form-control" id="jmeno" value="" required>
              <div class="valid-feedback">
                Platné
              </div>
            </div>
            <div class="col-md-6">
              <label for="prijmeni" class="form-label">Příjmení</label>
              <input type="text" class="form-control" id="prijmeni" value="" required>
              <div class="valid-feedback">
                Platné
              </div>
            </div>
            <div class="col-md-4">
                <label for="datumNarozeni" class="form-label">Datum narození</label>
                <input type="date" class="form-control" id="datumNarozeni" required>
                <div class="invalid-feedback">
                  Prosím, zadejte své datum narození.
                </div>
            </div>
            <div class="col-md-4">
              <label for="email" class="form-label">Vyplňte svůj e-mail</label>
              <div class="input-group has-validation">
                <span class="input-group-text" id="inputGroupPrepend">@</span>
                <input type="text" class="form-control" id="email" aria-describedby="inputGroupPrepend" required>
                <div class="invalid-feedback">
                  Prosím, vyplňte e-mail.
                </div>
              </div>
            </div>
            <div class="col-md-4">
                <label for="stat" class="form-label">Stát</label>
                <input type="text" class="form-control" id="stat" required>
                <div class="invalid-feedback">
                  Prosím, zadejte zemi.
                </div>
            </div>
            <div class="col-md-3">
              <label for="mesto" class="form-label">Město</label>
              <input type="text" class="form-control" id="mesto" required>
              <div class="invalid-feedback">
                Prosím, zadejte město.
              </div>
            </div>
            <div class="col-md-3">
                <label for="ulice" class="form-label">Ulice</label>
                <input type="text" class="form-control" id="ulice" required>
                <div class="invalid-feedback">
                  Prosím, zadejte ulici.
                </div>
            </div>
            <div class="col-md-3">
                <label for="cisloPopisne" class="form-label">Číslo popisné</label>
                <input type="text" class="form-control" id="cisloPopisne" required>
                <div class="invalid-feedback">
                  Prosím, zadejte číslo popisné.
                </div>
            </div>
            <div class="col-md-3">
              <label for="psc" class="form-label">PSČ</label>
              <input type="text" class="form-control" id="psc" required>
              <div class="invalid-feedback">
                Prosím, zadejte poštovní směrovací číslo.
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
              <button class="btn btn-info"  id="ulozit-pojistence" type="button">Odeslat</button>
              <button type="button" id="zpet" class="btn btn-outline-secondary">Zpět</button>
            </div>
        </form>
    </article>`;
    const zpet = sablona.querySelector("#zpet");
    zpet.onclick = () => {
      if(this.editace) {
        this.vykresliDetailPojistence();
      } else {
        this.zpetCallback();
      }
    };
    const ulozitPojistence = sablona.querySelector("#ulozit-pojistence")
    ulozitPojistence.onclick = () => {
            this.pojistenecData.osobniUdaje.jmeno= sablona.querySelector("#jmeno").value;
            console.log(this.pojistenecData);
            this.pojistenecData.osobniUdaje.prijmeni= sablona.querySelector("#prijmeni").value;
            this.pojistenecData.osobniUdaje.datumNarozeni= sablona.querySelector("#datumNarozeni").value;
            this.pojistenecData.osobniUdaje.email= sablona.querySelector("#email").value;
            this.pojistenecData.osobniUdaje.stat= sablona.querySelector("#stat").value;
            this.pojistenecData.osobniUdaje.mesto= sablona.querySelector("#mesto").value;
            this.pojistenecData.osobniUdaje.ulice= sablona.querySelector("#ulice").value;
            this.pojistenecData.osobniUdaje.cisloPopisne= sablona.querySelector("#cisloPopisne").value;
            this.pojistenecData.osobniUdaje.psc= sablona.querySelector("#psc").value;

            if(this.pojistenecData.osobniUdaje.jmeno === ""){
              alert("vyplňte všechny údaje")
              return;
            }
            if(this.pojistenecData.osobniUdaje.prijmeni === ""){
              alert("vyplňte všechny údaje")
              return;
            }
            if(this.pojistenecData.osobniUdaje.datumNarozeni === ""){
              alert("vyplňte všechny údaje")
              return;
            }
            if(this.pojistenecData.osobniUdaje.email === ""){
              alert("vyplňte všechny údaje")
              return;
            }
            if(this.pojistenecData.osobniUdaje.stat === ""){
              alert("vyplňte všechny údaje")
              return;
            }
            if(this.pojistenecData.osobniUdaje.mesto === ""){
              alert("vyplňte všechny údaje")
              return;
            }
            if(this.pojistenecData.osobniUdaje.ulice === ""){
              alert("vyplňte všechny údaje")
              return;
            }
            if(this.pojistenecData.osobniUdaje.cisloPopisne === ""){
              alert("vyplňte všechny údaje")
              return;
            }
            if(this.pojistenecData.osobniUdaje.psc === ""){
              alert("vyplňte všechny údaje")
              return;
            }
            this.ulozitCallback(this.pojistenecData)
    }

    this._vyplnEditacePojistenecDataFormular(sablona);
    this.obsah.appendChild(sablona);

}

}
// let pojistenec = new Pojistenec ();
