const baseURL = `https://cdn.imagin.studio/getImage?customer=plmateuszkowalczykcompany&`
const nextBtn = document.getElementById("next")
const prevBtn = document.getElementById("prev")
const circles = document.querySelectorAll(".circle")
const progess = document.getElementById("progress")
const form = document.getElementById("form")
const select = document.getElementById("select")
const label = document.getElementById("label")
const carDiv = document.getElementById("carDiv")
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
        model = document.getElementById("select").value;
    }
    if(currentActive == 2){
        color = document.getElementById("select").value;
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
        if(currentActive === 2){
            form.classList.remove("hidden")
            carDiv.innerHTML = ""
        }
            renderQuestions()
        
    }) 


function renderQuestions(){
    
    if(currentActive == 0){
        label.textContent = "Select make: "
        select.innerHTML = ''
        fetch("https://cdn.imagin.studio/getCarListing?customer=plmateuszkowalczykcompany")
        .then(res => res.json())
        .then(data => {
            data.make.map(function(carMake){
                select.innerHTML += `<option value="${carMake}">${carMake.toUpperCase()}</option>`
            })
        })
    } 
    else if(currentActive == 1){
        label.textContent = "Select model: "
        select.innerHTML = ''
        fetch(`https://cdn.imagin.studio/getCarListing?customer=plmateuszkowalczykcompany&make=${make}`)
            .then(res => res.json())
            .then(data =>{
                data.modelFamily.map(function(carModel){
                    select.innerHTML += `<option value="${carModel}">${carModel.toUpperCase()}</option>`                    
                })
            })
    } 
    else if (currentActive == 2){

        label.textContent = "Select color: "
        select.innerHTML = `
        <option name="carcolor" value="pspc0064"><div class="colorBox" style="background-color: black;">black<i class="fa-regular fa-square" style="background-color: black;"></i></option>

        <option name="carcolor" value="pspc0039"><div class="colorBox" style="background-color: white;">white</option>

        <option name="carcolor" value="pspc0007"><div class="colorBox" style="background-color: blue;">blue</option>`
    }
    else if(currentActive == 3){
        form.classList.add("hidden")
        fetch(`https://cdn-01.imagin.studio/getImage?customer=plmateuszkowalczykcompany&make=${make}&modelFamily=${model}&paintId=${color}`)
            .then(img => {
                console.log(img)
                // document.getElementById("container").innerHTML =  ``
                carDiv.innerHTML = `<img class="carImg" src="${img.url}"> `
            })
            
    }
}

renderQuestions()