export const searchCountry = (value, countryData, div) =>{
        countryData.forEach((el) => {
            const { name, population, region, capital, numericCode, flags } = el;

            if (name.common.toLowerCase() === value.toLowerCase()) {
                
                div.innerHTML = `
                <a href = "country-info.html?name=${name.common}">
                    <div class="country-div" id="${numericCode}">

                        <div class="country-image-div">
                            <img src="${flags.png}" alt="country image" class="country-image">
                        </div>


                        <div class="country-details">
                            <h3 class="country-name">${name.common}</h3>
                            <p><b>Population:</b><span class="population">${population.toLocaleString("en-IN")}</span></p>
                            <p><b>Region:</b><span class="region">${region}</span></p>
                            <p><b>Capital:</b><span class="capital">${capital}</span></p>
                        </div>
                
                    </div>
                <a>
                `
            }
        })
}