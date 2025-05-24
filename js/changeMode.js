// light-dark-mode
export const changeMode = () => {
    const body = document.querySelector("body");
    const darkMode = document.querySelector(".dark-mode");
    const lightMode = document.querySelector(".light-mode");

    let theme = JSON.parse(localStorage.getItem("theme")) || "dark";
    localStorage.setItem("theme", JSON.stringify(theme));
    
    body.setAttribute("class", theme);

    if(theme === "light"){
        darkMode.style.display = "flex";
        lightMode.style.display = "none";
    }else{
        lightMode.style.display = "flex";
        darkMode.style.display = "none";
    }

    lightMode.addEventListener("click", () => {
        localStorage.setItem("theme", JSON.stringify("light"));
        theme = JSON.parse(localStorage.getItem("theme"));

        darkMode.style.display = "flex";
        lightMode.style.display = "none";
        body.setAttribute("class", theme);
    })
    darkMode.addEventListener("click", () => {
        localStorage.setItem("theme", JSON.stringify("dark"));
        theme = JSON.parse(localStorage.getItem("theme"));

        lightMode.style.display = "flex";
        darkMode.style.display = "none";
        body.setAttribute("class", theme);
    });

}
