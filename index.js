


const translateBtn = document.getElementById("translate-btn")
const phrase = document.getElementById("text-area")
const langForm = document.getElementById("language-form")
const divForAnswer = document.getElementById("answer-section")

function checkForm() {

     const selectedLanguage = document.querySelector('input[name="leng"]:checked');
        if (phrase.value.trim() !== "" && selectedLanguage.value) {
            translateBtn.disabled = false;
        } else {
            translateBtn.disabled = true;
        }
}

phrase.addEventListener("input", checkForm);


langForm.addEventListener("change", checkForm);


addEventListener("click", (e) => {

    if (e.target.id === "translate-btn") {
        e.preventDefault();
        const selectedLanguage = document.querySelector('input[name="leng"]:checked');
                

        console.log(phrase.value)

        if (selectedLanguage) {
            console.log(selectedLanguage.value)
        } else {
            alert("...select a language please")
        };

        translateBtn.classList.add("hidden")
        document.querySelector(".option-row").classList.add("hidden")
        document.getElementById("select-language").classList.add("hidden")

        renderAnswer(phrase.value,selectedLanguage.value)
        

    }
 });

 function renderAnswer(phrase, language) {
    divForAnswer.innerHTML = ` 
    
    <div class="result-card">
            <p><strong>Original:</strong> ${phrase}</p>
            <p><strong>Idioma:</strong> ${language}</p>
            <p><em>Traducción en camino...</em> 🦜</p>
        </div>
        `
 }