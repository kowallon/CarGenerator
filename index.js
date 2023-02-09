const baseURL = `https://cdn.imagin.studio/getImage?customer=plmateuszkowalczykcompany&`
const nextBtn = document.getElementById("next")
const prevBtn = document.getElementById("prev")
const circles = document.querySelectorAll(".circle")
const progess = document.getElementById("progress")
const form = document.getElementById("form")
let make
let model
let color

let currentActive = 0

if(currentActive > 0){
    prevBtn.disabled = false
}

if(currentActive == 3){
    nextBtn.disabled = true
}

nextBtn.addEventListener("click", function(){
    if(currentActive == 0){
        make = document.getElementById("select").value
    }
    if(currentActive == 1){
        model = document.querySelector('input[name="model"]:checked').value;
    }
    if(currentActive == 2){
        color = document.querySelector('input[name="carcolor"]:checked').value;
        console.log(color)
    }
    currentActive += 1
    console.log(currentActive)
    let widthPercentage = currentActive * 30
    progess.style.width = `${widthPercentage}%`
    circles[currentActive].classList.add("active")
    if(currentActive > 0){
        prevBtn.disabled = false
    }
    if(currentActive == 3){
        nextBtn.disabled = true
    }
    renderQuestions()
})

prevBtn.addEventListener("click", function(){
        circles[currentActive].classList.remove("active")
        currentActive -= 1
        let widthPercentage = currentActive * 30
        progess.style.width = `${widthPercentage}%`
        if(currentActive <= 3){
            nextBtn.disabled = false
        }
        if(currentActive < 1){
            prevBtn.disabled = true
        }
        renderQuestions()
    }) 


function renderQuestions(){
    if(currentActive == 0){
    form.innerHTML = `<label for="select">Select car: </label>
    <select name="select" id="select">
        <option value="toyota">Toyota</option>
        <option value="tesla">Tesla</option>
    </select>`

    } 
    else if(currentActive == 1 && make == "toyota"){
        form.innerHTML = `<form class="details">
        <p>Select model:</p>
        <input type="radio" name="model" value="supra">
        <label for="tra1">Supra</label><br>

        <input type="radio" name="model" value="landcruiser">
        <label for="tra1">Landcruiser</label><br>

        <input type="radio" name="model" value="mirai">
        <label for="tra1">Mirai</label><br>
    </form>`
    } 
    else if(currentActive == 1 && make == "tesla"){
        form.innerHTML = `<form class="details">
        <p>Select model:</p>
        <input type="radio" name="model" value="model3">
        <label for="tra1">Model 3</label><br>

        <input type="radio" name="model" value="roadster">
        <label for="tra1">Roadster</label><br>

        <input type="radio" name="model" value="modely">
        <label for="tra1">Model y</label><br>
    </form>`
    } else if (currentActive == 2 && model != "landcruiser" && model != "roadster"){
        form.innerHTML = `<form class="details">
        <p>Select color:</p>
        <div class="singleColor">
        <input type="radio" name="carcolor" value="pspc0064"><div class="colorBox" style="background-color: black;"></div>
        </div><br>

        <div class="singleColor">
            <input type="radio" name="carcolor" value="pspc0039"><div class="colorBox" style="background-color: white;"></div>
        </div><br>

        <div class="singleColor">
            <input type="radio" name="carcolor" value="pspc0007"><div class="colorBox" style="background-color: blue;"></div>
        </div><br>    
    </form>`
    }
    else if (currentActive == 2 && model === "landcruiser"){
        form.innerHTML = `<form class="details">
        <p>Select color:</p>
        <div class="singleColor">
        <input type="radio" name="carcolor" value="pspc0064"><div class="colorBox" style="background-color: black;"></div>
        </div><br>

        <div class="singleColor">
            <input type="radio" name="carcolor" value="pspc0003"><div class="colorBox" style="background-color: #9a8f7a;"></div>
        </div><br>

        <div class="singleColor">
            <input type="radio" name="carcolor" value="pspc0010sspc0041"><div class="colorBox" style="background-color: silver;"></div>
        </div><br>    
    </form>`
    }
    else if (currentActive == 2 && model === "roadster"){
        form.innerHTML = `<form class="details">
        <p>Select color:</p>
        <div class="singleColor">
        <input type="radio" name="carcolor" value="pspc0064"><div class="colorBox" style="background-color: black;"></div>
        </div><br>

        <div class="singleColor">
            <input type="radio" name="carcolor" value="pspc0034"><div class="colorBox" style="background-color: #f75e5e;"></div>
        </div><br>

        <div class="singleColor">
            <input type="radio" name="carcolor" value="pspc0010sspc0041"><div class="colorBox" style="background-color: silver;"></div>
        </div><br>    
    </form>`
    }
    else if(currentActive == 3){
        fetch(`https://cdn-01.imagin.studio/getImage?customer=plmateuszkowalczykcompany&make=${make}&modelFamily=${model}&paintId=${color}`)
            .then(img => {
                console.log(img)
                // document.getElementById("container").innerHTML =  ``
                form.innerHTML = `<img class="carImg" src="${img.url}"> `
            })
            
    }
}





// Response {type: 'cors', url: 'https://cdn.imagin.studio/getImage?customer=plmateuszkowalczykcompany&?make=toyota?modelFamily=supra', redirected: false, status: 200, ok: true, …}
// body
// : 
// (...)
// bodyUsed
// : 
// false
// headers
// : 
// Headers {}
// ok
// : 
// true
// redirected
// : 
// false
// status
// : 
// 200
// statusText
// : 
// ""
// type
// : 
// "cors"
// url
// : 
// "https://cdn.imagin.studio/getImage?customer=plmateuszkowalczykcompany&?make=toyota?modelFamily=supra"
// [[Prototype]]
// : 
// Response