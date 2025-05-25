import { changeMode } from "./changeMode.js";

const name = new URLSearchParams(location.search).get("name");

const countryCon = document.querySelector(".country-con");
const countryFlag = document.querySelector(".country-flag");
const countryName = document.querySelector(".country-name");
const nativeName = document.querySelector(".native-name");
const countryPopulation = document.querySelector(".population");
const countryRegion = document.querySelector(".region");
const countrySubRegion = document.querySelector(".subregion");
const countryCapital = document.querySelector(".capital");
const countryDomain = document.querySelector(".country-domain");
const countryCurrencies = document.querySelector(".country-currencies");
const countryLanguages = document.querySelector(".country-languages");
const borderCoutriesDiv = document.querySelector(".border-countries-div");

// dark-light-mode
changeMode();


const setInnerHtml = (d) => {
    const { name, population, region, subregion, capital, currencies, languages, borders, flags, tld, cca3 } = d;


    countryFlag.src = flags.png;
    countryName.innerText = name.common;
    nativeName.innerText = name.official;
    countryPopulation.innerText = population.toLocaleString("en-US");
    countryRegion.innerText = region;
    countrySubRegion.innerText = subregion;
    countryCapital.innerText = capital ? capital : "N/A";
    countryDomain.innerText = tld[0];
    countryCurrencies.innerText = currencies ? Object.entries(currencies)[0][1]?.name : "N/A";

    if (languages) {
        countryLanguages.innerText = Object.values(languages).join(", ");
    } else {
        countryLanguages.innerText = "N/A";
    }

    if (borders) {
        borders.forEach((border) => {
            fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                .then(res => res.json())
                .then(data => {
                    data.forEach((el) => {
                        const a = document.createElement("a");
                        a.innerText = el.name.common
                        a.href = `country-info.html?name=${el.name.common}`
                        borderCoutriesDiv.append(a);
                    })

                })

        })
    } else {
        const p = document.createElement("p");
        p.innerText = "N/A";
        borderCoutriesDiv.append(p);
    }

}

fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
    .then((res) => res.json())
    .then((data) => {
        setInnerHtml(data[0]);
    });