const wrapper = document.querySelector(".wrapper"),
    searchInput = wrapper.querySelector("input"),
    synonyms = wrapper.querySelector(".synonyms .list"),

    infoText = wrapper.querySelector(".info-text");
removeInputText = wrapper.querySelector(".search span")



// data function
function data(result, word) {
    if (result.title) {
        infoText.innerHTML = `<b>Not Found </b> Check Another <br> `
    }
    else {
        console.log(result);
        infoText.innerHTML = ""
        wrapper.classList.add("active");
        phonetics = `${result[0].meanings[0].partOfSpeech} /${result[0].phonetics[0].text}/`;
        let definitions = result[0].meanings[0].definitions[0]

        document.querySelector(".word p").innerHTML = result[0].word;
        document.querySelector(".word span").innerHTML = phonetics;
        document.querySelector(".meaning span").innerText = definitions.definition;


        if (definitions.example == undefined) {
            document.querySelector(".example").style.display = "none";
        }
        else {
            document.querySelector(".example span").innerText = definitions.example;
        }

        syn = result[0].meanings[0]
        // console.log(syn);

        if (syn.synonyms[0] == undefined) {
            // console.log('object');
            synonyms.parentElement.style.display = "none";
        } else {
            synonyms.parentElement.style.display = "block";
            synonyms.innerHTML = "";

            for (let i = 0; i < 5; i++) {
                // console.log(syn.synonyms);
                let tag = `<span>${syn.synonyms[i]},<span>`;
                synonyms.insertAdjacentHTML("beforeend", tag);

            }
        }
    }
}

console.log('HI');
// Fetch API 
function fetchApi(word) {
    wrapper.classList.remove("active")
    infoText.innerHTML = `Search the meaning of <span>${word}</span><br><div class="spinner-border text-primary" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>`
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    try {
        fetch(url).then(
            res => res.json())  
            .then(result => data(result, word));
    }
    catch(error) {
        console.log("Error")
        document.querySelector(".example span").innerText = 'SomeThing Went Wrong , Check Your Internet';
    }
}


searchInput.addEventListener("keyup", e => {
    if (e.key === "Enter" && e.target.value) {
        console.log(e.target.value);
        fetchApi(e.target.value)
    }
})

removeInputText.addEventListener("click", () => {
    searchInput.value = "";
    searchInput.focus();
    infoText.innerHTML = "Enter any Word and Get <b style='color:black'>Meaning,Example,Synonyms </b>";
    wrapper.classList.remove("active");
    infoText.style.color = "#000";
})
