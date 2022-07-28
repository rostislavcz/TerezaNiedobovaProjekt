'use strict'


// const data = [
//     {
//         osobniUdaje:{
//             id: 1,
//             jmeno: "Tereza",
//             prijmeni: "Niedobová",
//             datumNarozeni: "1996-01-15",
//             mesto: "Třinec",
//             ulice:"Alešova",
//             cisloPopisne: "676",
//             psc: "73961",
//             stat: "Česká republika",
//             email: "TerkaNiedobova@seznam.cz",
//             telefon: "603914351"
//         },
//         pojisteni: [
//             {
//                 nazev:"Povinné ručení",
//                 predmet: "osobní automobil",
//                 kryti: 10000000,
//                 platnostOd: "2022-01-01",
//                 platnostDo: "2025-04-06"
//             },
//             {
//                 nazev:"Povinné ručení",
//                 predmet: "osobní automobil test",
//                 kryti: 5555555,
//                 platnostOd: "2022-01-01",
//                 platnostDo: "2021-04-06"
//             }
//         ]
//     },
//     {
//         osobniUdaje:{
//             id: 2,
//             jmeno: "Rostislav",
//             prijmeni: "Cibulka",
//             datumNarozeni: "1996-04-16",
//             mesto: "Třinec",
//             ulice:"Alešova",
//             cisloPopisne: "676",
//             psc: "73961",
//             stat: "Česká republika",
//             email: "cibulkarostisla@gmail.cz",
//             telefon: "558338338"
//         },
//         pojisteni: []
//     }
// ]

class Pojistovna{

    constructor(){
        this._nactiPojistence();
        this.obsah = document.getElementById("obsah");
    }

    _nactiPojistence(){
      this.pojistenci = []
        const pojistenci = localStorage.getItem("pojistenci")
        if (pojistenci !== null){
            this.pojistenci = JSON.parse(pojistenci)
        }
    }

    ulozPojistence(){
        localStorage.setItem("pojistenci", JSON.stringify(this.pojistenci))
    }

    pridejPojistence = (pojistenec) => {
        this.pojistenci.push(pojistenec);
        this.ulozPojistence();
        this.vykresliVsechnyPojistence();
    }

    odeberPojistence(pojistenec){
    
        this.pojistenci = this.pojistenci.filter((p) => {
            return p !== pojistenec
        })
       this.ulozPojistence();
       this.vykresliVsechnyPojistence();
    }

    upravPojistence(pojistenecData){
        this.ulozPojistence();
        this.vykresliDetailPojistence(pojistenecData);
    }

    vykresliVsechnyPojistence(){
        this.obsah.innerHTML= "";

        // nadpis
        const nadpis=document.createElement("h1")
        nadpis.innerText="Pojištěnci";
        this.obsah.appendChild(nadpis)
        
        // tlacitko novy poj.
        this.obsah.insertAdjacentHTML("beforeend", '<p class="text-center"><button id="novy-pojistenec" type="button" class="btn btn-info">Nový pojištěněc</button></p>')
        
        const novyPojistenec = document.getElementById("novy-pojistenec")
        novyPojistenec.onclick = ()=>{
            this.vykresliNovyPojistenec()
        }

        
        // vykresleni tabulky
        const tabulka = document.createElement ("table")
        tabulka.className = "table table-responsive-sm table-hover table-striped";
        tabulka.insertAdjacentHTML ("beforeend", `<thead>
            <tr>
                <th scope="col">Jméno</th>
                <th scope="col">Adresa</th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody></tbody>
        `)

        const tbody = tabulka.getElementsByTagName ("tbody")[0]
        for (let i = 0; i<this.pojistenci.length; i++){
            const pojistenec = this.pojistenci[i]
            const radek = document.createElement("tr");
            radek.innerHTML = `<td>` + pojistenec.osobniUdaje.jmeno + ` `+ pojistenec.osobniUdaje.prijmeni   + `</td>
            <td>`+pojistenec.osobniUdaje.mesto+ ", " +pojistenec.osobniUdaje.ulice+ " " +pojistenec.osobniUdaje.cisloPopisne+`</td>
            <td class="text-end">
                <button type="button" class="btn btn-danger">SMAZAT</button>
                <button type="button" class="btn btn-secondary">DETAIL</button>
            </td>`;
            
            const tlacitkoSmazat = radek.getElementsByClassName("btn")[0];
            tlacitkoSmazat.onclick = () =>{
                    this.odeberPojistence(pojistenec);
                    //tbody.removeChild(radek);
            }
            const tlacitkoEditovat = radek.getElementsByClassName("btn")[1]
            tlacitkoEditovat.onclick = () =>{
                this.vykresliDetailPojistence(pojistenec)    
            }
            


            tbody.insertAdjacentElement("beforeend",radek);
        }


        console.log (tbody)







        this.obsah.appendChild (tabulka)
    }

    vykresliJednohoPojistence (){

    }

    vykresliNovyPojistenec(){
        const pojistenecObsluha= new PojistenecObsluha(null, this.pridejPojistence, this.odeberPojistence.bind(this), this.vykresliVsechnyPojistence.bind(this))
        pojistenecObsluha.vykresliEditaciPojistence();
    }

    vykresliDetailPojistence(pojistenecData) {
        const pojistenecObsluha= new PojistenecObsluha(pojistenecData, this.upravPojistence.bind(this), this.odeberPojistence.bind(this), this.vykresliVsechnyPojistence.bind(this))
        pojistenecObsluha.vykresliDetailPojistence();
    }

    
    vykresliNovePojisteni(){

    }

}

//let pojistovna = new Pojistovna();
//pojistovna.pridejPojistence((new Pojistenec([], new OsobniUdaje("Rostislav", "cibulka", new Date(), "", "", ""))));