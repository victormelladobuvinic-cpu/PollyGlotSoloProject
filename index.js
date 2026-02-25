const translateBtn = document.getElementById("translate-btn")
const phrase = document.getElementById("text-area")




addEventListener("click", (e) => {

    if (e.target.id === "translate-btn") {
        e.preventDefault()
        console.log(phrase.value)

    }
 } )