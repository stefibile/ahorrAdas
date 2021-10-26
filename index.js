const sectionBalance = document.querySelector (".section-balance")
const sectionCategories = document.querySelector (".section-categories")
const sectionReports = document.querySelector (".section-reports")
const showBalance = document.getElementById ("show-balance")
const showCategories = document.getElementById ("show-categories")

showBalance.onclick = () => {
    sectionBalance.classList.toggle("is-hidden")

}

showCategories.onclick = () => {
    sectionCategories.classList.toggle("is-inline")
    sectionBalance.classList.toggle("is-hidden")
}



