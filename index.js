// MOSTRAR U OCULTAR SECCIONES

const showBalance = document.querySelector ("#show-balance")
const showCategories = document.querySelector ("#show-categories")
const showReports = document.querySelector ("#show-reports")
const showOperation = document.querySelector ("#show-operation")

const sectionBalance = document.querySelector ("#section-balance")
const sectionCategories = document.querySelector ("#section-categories")
const sectionReports = document.querySelector ("#section-reports")
const sectionOperation = document.querySelector ("#section-operation")

const showSection = (section) => {
    if (section.classList.contains("is-hidden")) {
       return section.classList.remove("is-hidden")
    }
}

const hideSection = (section) => {
    if (section.classList.contains("is-hidden")) {
       return section
    }
    else {
        return section.classList.add("is-hidden")
    }
}

showBalance.onclick = () => {
    showSection(sectionBalance)
    hideSection(sectionCategories)
    hideSection(sectionReports)
    hideSection(sectionOperation)
}

showCategories.onclick = () => {
    showSection(sectionCategories)
    hideSection(sectionBalance)
    hideSection(sectionReports)
    hideSection(sectionOperation)
}

showReports.onclick = () => {
    showSection(sectionReports)
    hideSection(sectionCategories)
    hideSection(sectionBalance)
    hideSection(sectionOperation)
}

showOperation.onclick = () => {
    showSection(sectionOperation)
    hideSection(sectionCategories)
    hideSection(sectionBalance)
    hideSection(sectionReports)
}





