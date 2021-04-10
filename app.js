//Selectors
let inputValue = document.querySelector('.input')
let btn = document.querySelector('.btn')
let listOfValues = document.querySelector('.listOfValues')
let addli = document.querySelector('.li')
let btnRef = document.querySelector('.btn-ref')

//This is the refresh button which onclick remove the previous result
btnRef.onclick = ()=>{
listOfValues.innerHTML = ""
}

//This is the search button which will onclick , 
// bring the speicefied data from the api of the list of the holy Qura'an Soura
let nameOfS;
let inputSearch ;
btn.onclick = ()=>{
    listOfValues.innerHTML = "" //This is to remove previous result

    inputSearch = inputValue.value //This is to empty the search box after clicking on the button of استخراج
    inputValue.value = ""

   


    let url = "https://api.quran.sutanlab.id/surah" // This is the api for the Holy Qura'an Sour
    fetch(url)
    .then(getData=>{
        return getData.json()  
    })
    .then(printData=>{
        
        let i,
            number,
            numOfVer,
            revelationPlace;

        for ( i = 0; i < printData.data.length; i++) {

            if(inputSearch == printData.data[i].name.short){
                nameOfS = printData.data[i].name.short
                number  = printData.data[i].number
                numOfVer = printData.data[i].numberOfVerses
                revelationPlace = printData.data[i].revelation.arab

                let liCreate = document.createElement('li')
                let liCreate2 = document.createElement('li')
                let liCreate3 = document.createElement('li')
                let liCreate4 = document.createElement('li')
                liCreate.setAttribute("class", "licreate")
                liCreate2.setAttribute("class", "licreate")
                liCreate3.setAttribute("class", "licreate")
                liCreate4.setAttribute("class", "licreate")

                listOfValues.appendChild(liCreate)
                listOfValues.appendChild(liCreate2)
                listOfValues.appendChild(liCreate3)
                listOfValues.appendChild(liCreate4)

                liCreate.textContent = `سورة : ${nameOfS} `
                liCreate2.textContent = ` ترتيب السورة في المصحف:  ${number}`
                liCreate3.textContent = `عددآياتها :  ${numOfVer}`
                liCreate4.textContent = ` من حيث مكان نزول الوحي، فالسورة نزلت في: ${revelationPlace}`

            }
        } 
        if(inputSearch == '' || inputSearch != nameOfS){ //This is for falsey entery 

            let liCreate5 = document.createElement('li')
            liCreate5.setAttribute("class", "li-danger")
            listOfValues.insertBefore(liCreate5, listOfValues.firstElementChild)
            liCreate5.textContent = `الرجاء كتابة اسم سورة صحيح`
            setTimeout(()=>{
            listOfValues.removeChild(liCreate5)
            },2000)
    
        } 
    })
}
