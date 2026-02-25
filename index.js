import dotenv from "dotenv"
dotenv.config()



import Groq from "https://cdn.jsdelivr.net/npm/groq-sdk/+esm";
const client = new Groq({
    apiKey: process.env.GROQ_API_KEY,
    /* baseURL: "https://api.groq.com/openai/v1", */
    dangerouslyAllowBrowser: true
});



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

function toggleHidden() {
        translateBtn.classList.toggle("hidden")
        document.getElementById("hidden-section").classList.toggle("hidden")
        document.getElementById("select-language").classList.toggle("hidden")
}

phrase.addEventListener("input", checkForm);


langForm.addEventListener("change", checkForm);


addEventListener("click", (e) => {

    if (e.target.id === "translate-btn") {
        e.preventDefault();
        const selectedLanguage = document.querySelector('input[name="leng"]:checked');
                

       /*  console.log(phrase.value) */

        if (!selectedLanguage) {
           /*  console.log(selectedLanguage.value) */
           alert("...select a language please")
        };

        toggleHidden()

        translateAnswer(phrase.value,selectedLanguage.value)
        

    }

    if (e.target.id === "start-over") {

        renderMainScreen()
    }
 });

async function translateAnswer(phrase, language) {
    
    divForAnswer.innerHTML = `<p class="section-title">Translating... 🦜</p>`;

    try {
        const messages = [
            {
                role: "system",
                content: `You are a professional translator. Translate the user's text to ${language}. Return only the translation and how it's pronunciate, write the pronunciation in english no extra text.`,
            },
            {
                role: "user",
                content: phrase,
            }
        ];

        
        const response = await client.chat.completions.create({
            model: "openai/gpt-oss-20b",
            messages: messages,
        });

        
        const phraseTranslated = response.choices[0].message.content;

        
        renderAnswer(phraseTranslated);

    } catch (error) {
        console.error("Error con la IA:", error);
        divForAnswer.innerHTML = `<p>Error al traducir. Intenta de nuevo.</p>`;
    }
}


 function renderAnswer(phrase) {
    divForAnswer.innerHTML = ` 
    
    <div class="result-card">
            <h2  class="section-title">Your translation 👇</h2>
            <textarea id="answer-area">${phrase}</textarea>  
            <button id="start-over" class="btn-translate">Start Over</button>
        </div>
        `
 }

 function renderMainScreen() {
        divForAnswer.innerHTML = "";
        translateBtn.disabled = true;
        phrase.value = ""
        toggleHidden()
 }

