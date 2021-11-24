// MOSTRAR U OCULTAR SECCIONES

const showBalance = document.querySelector("#show-balance");
const showCategories = document.querySelector("#show-categories");
const showReports = document.querySelector("#show-reports");
const showOperation = document.querySelector("#show-operation");

const sectionBalance = document.querySelector("#section-balance");
const sectionCategories = document.querySelector("#section-categories");
const sectionReports = document.querySelector("#section-reports");
const sectionOperation = document.querySelector("#section-operation");

const showSection = (section) => {
  if (section.classList.contains("is-hidden")) {
    return section.classList.remove("is-hidden");
  }
};

const hideSection = (section) => {
  if (section.classList.contains("is-hidden")) {
    return section;
  } else {
    return section.classList.add("is-hidden");
  }
};

showBalance.onclick = () => {
  showSection(sectionBalance);
  hideSection(sectionCategories);
  hideSection(sectionReports);
  hideSection(sectionOperation);
};

showCategories.onclick = () => {
  showSection(sectionCategories);
  hideSection(sectionBalance);
  hideSection(sectionReports);
  hideSection(sectionOperation);
};

showReports.onclick = () => {
  showSection(sectionReports);
  hideSection(sectionCategories);
  hideSection(sectionBalance);
  hideSection(sectionOperation);
};

showOperation.onclick = () => {
  showSection(sectionOperation);
  hideSection(sectionCategories);
  hideSection(sectionBalance);
  hideSection(sectionReports);
};

// MOSTRAR U OCULTAR FILTROS

const filterLabel = document.querySelector("#filter-label");

const filters = document.querySelector("#filters");

filterLabel.onclick = () => {
  filters.classList.toggle("is-hidden");
  if (filters.classList.contains("is-hidden")) {
    return (filterLabel.innerHTML = "Mostrar filtros");
  } else {
    return (filterLabel.innerHTML = "Ocultar filtros");
  }
};

//AGREGAR LA OPERACION A LA SECCION BALANCE

const addOperationButton = document.querySelector("#agregar-operaciones-boton");
const aggregateOperations = document.querySelector("#aggregate-operations");
const noneOperations = document.querySelector("#none-operations");
const cancelOperation = document.querySelector("#cancelar-agregar-operaciones-boton") 
const inputDescription = document.querySelector("#description-input")
const inputMonto = document.querySelector("#monto-input")
const inputDate = document.querySelector("#date-input")
const selectCategories = document.querySelector("#categories-select")
const selectTypeOperation = document.querySelector("#tipo-operacion")

cancelOperation.onclick = () => {
  sectionBalance.classList.remove("is-hidden")
  sectionOperation.classList.add("is-hidden")
}

const newOperation = []

addOperationButton.onclick = () => {
  sectionOperation.classList.add("is-hidden");
  sectionBalance.classList.remove("is-hidden");
  aggregateOperations.classList.remove("is-hidden");
  noneOperations.classList.add("is-hidden");

  const description = inputDescription.value 
  const monto = inputMonto.value
  const tipo = selectTypeOperation.options[selectTypeOperation.selectedIndex].value
  const categoria = selectCategories.options[selectCategories.selectedIndex].value
  const fecha = inputDate.value

  const elementosForm = {
    descripcion: description,
    monto: monto,
    tipo: tipo,
    categoria: categoria,
    fecha: fecha,
  }

  newOperation.push(elementosForm)
}; 

// Convertir newOperation a un JSON

const convertirAJSON = (objeto) => {
  return JSON.stringify(objeto)
}

const newOperationJSON = convertirAJSON(newOperation)


// Guardar newOperation en localStorage


const guardarEnLocalStorage = (objetoJavascript, clave) => {
  return localStorage.setItem(clave, convertirAJSON(objetoJavascript))
  }

  guardarEnLocalStorage(newOperation, operaciones)

// Leer localStorage 

const leerDesdeLocalStorage = (clave) => {
  return convertirDesdeJSON(localStorage.getItem(clave))
}

leerDesdeLocalStorage(operaciones)

// Convertirlo a JS

const convertirDesdeJSON = (objetoJSON) => {
  return JSON.parse(objetoJSON)
}

convertirDesdeJSON(newOperationJSON)

// Convertirlo a HTML 

