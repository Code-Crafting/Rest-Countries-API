// light-dark-mode
export const changeMode = () => {
    const body = document.querySelector("body");
    const darkMode = document.querySelector(".dark-mode");
    const lightMode = document.querySelector(".light-mode");

    lightMode.addEventListener("click", () => {
        darkMode.style.display = "flex";
        lightMode.style.display = "none";
        body.classList.remove("dark");
        body.classList.add("light");
    })
    darkMode.addEventListener("click", () => {
        lightMode.style.display = "flex";
        darkMode.style.display = "none";
        body.classList.remove("light");
        body.classList.add("dark");
    })
}
