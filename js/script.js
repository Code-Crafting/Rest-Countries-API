import { changeMode } from "./changeMode.js";

const allCountriesDiv = document.querySelector(".all-countries");
const input = document.querySelector("#search-area");

let allCountriesData = [];

const setInnerHtml = (d) => {
    allCountriesDiv.innerHTML = "";

    d.sort((a, b) =>{
        return a.name.common.localeCompare(b.name.common);
    })

    d.forEach((el) => {

        const { name, population, region, capital, numericCode, flags } = el;

        const ancher = document.createElement("a");
        ancher.href = `country-info.html?name=${name.common}`;

        ancher.innerHTML = `
            <div class="country-div" id="${numericCode}">
                <div class="country-image-div">
                    <img src="${flags.png}" alt="country image" class="country-image">
                </div>


                <div class="country-details">
                    <h3 class="country-name">${name.common}</h3>
                    <p><b>Population:</b><span class="population">${population.toLocaleString("en-IN")}</span></p>
                    <p><b>Region:</b><span class="region">${region}</span></p>
                    <p><b>Capital:</b><span class="capital">${capital ? capital : "N/A"}</span></p>
                </div>
            <div>
        `
        allCountriesDiv.append(ancher);
    })
}

// dark-light-mode
changeMode();

// showing all countries
async function getData() {
    const res = await fetch("https://restcountries.com/v3.1/all");
    const data = await res.json();
    allCountriesData = data;

    setInnerHtml(data);
}
getData();

// search country
input.addEventListener("input", (e) => {
    const filteredData = allCountriesData.filter((data) => data.name.common.toLowerCase().includes(input.value.toLowerCase()));
    setInnerHtml(filteredData);
})

// custon dowpdown
const dropdownTrigger = document.querySelector('.dropdown-trigger');
const dropdownTriggerPara = document.querySelector('.dropdown-trigger-para');
const dropdownOptions = document.querySelector('.dropdown-options');

dropdownTrigger.addEventListener('click', () => {
    dropdownOptions.style.display = dropdownOptions.style.display === 'block' ? 'none' : 'block';
});

dropdownOptions.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
        dropdownTriggerPara.textContent = event.target.textContent;
        dropdownOptions.style.display = 'none';

        // filter by region
        const regionName = event.target.innerText;
        if (regionName === "All") {
            dropdownTriggerPara.textContent = "Flter by Region";

            fetch("https://restcountries.com/v3.1/all")
                .then(res => res.json())
                .then(data => {
                    setInnerHtml(data);
                })
        } else {
            fetch(`https://restcountries.com/v3.1/region/${regionName}`)
                .then(res => res.json())
                .then(data => {
                    setInnerHtml(data);
                })
        }

    }
});

// close the dropdown if clicked outside
document.addEventListener('click', (event) => {
    if (!event.target.closest('.custom-dropdown')) {
        dropdownOptions.style.display = 'none';
    }
});
// end custom dropdown


