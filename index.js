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

//AGREGAR LA OPERACION A LA SECCION BALANCE

const addOperationButton = document.querySelector("#agregar-operaciones-boton");
const addOperations = document.querySelector("#add-operations");
const noneOperations = document.querySelector("#none-operations");
const cancelOperation = document.querySelector(
  "#cancelar-agregar-operaciones-boton"
);
const inputDescription = document.querySelector("#description-input");
const inputMonto = document.querySelector("#monto-input");
const inputDate = document.querySelector("#date-input");
const selectCategories = document.querySelector("#categories-select");
const selectTypeOperation = document.querySelector("#tipo-operacion");

// Convertir newOperation a un JSON
const convertirAJSON = (objeto) => {
  return JSON.stringify(objeto);
};

// Guardar newOperation en localStorage
// nunca usas esta funcion
const guardarEnLocalStorage = (objetoJavascript, clave) => {
  return localStorage.setItem(clave, convertirAJSON(objetoJavascript));
};

// Leer localStorage
// nunca usas esta funcion 
const leerDesdeLocalStorage = (clave) => {
  return convertirDesdeJSON(localStorage.getItem(clave));
};

// Convertirlo a JS
const convertirDesdeJSON = (objetoJSON) => {
  return JSON.parse(objetoJSON);
};

cancelOperation.onclick = () => {
  sectionBalance.classList.remove("is-hidden");
  sectionOperation.classList.add("is-hidden");
};

// falta un const o let aca
operaciones = [];

const getOperations = () => {
  const operationsStored = localStorage.getItem("operaciones");
  if (operationsStored === null) {
    return operaciones;
  } else {
    noneOperations.classList.add("is-hidden");
    addOperations.classList.remove("is-hidden");
    return JSON.parse(operationsStored);
  }
};

// es muy confuso que ejecutes tu codigo en el medio de las funciones auxiliares - pone todas las ejecuciones al final
// falta un const o let
operacionesStored = getOperations();

const mostrarOperacionesEnHTML = (array) => {
  const html = array.reduce((acc, e, i) => {
    return (
      acc +
      `<div class="mb-3">
      <div class="columns is-multiline is-mobile is-vcentered">
        <div id="description" class="column is-3-tablet is-6-mobile">${e.descripcion}</div>
          <div class="column is-3-tablet is-6-mobile has-text-right-mobile">
            <span id="categories" class="tag is-primary is-light">${e.categoria}</span>
          </div>
          <div class="column is-2-tablet has-text-grey is-hidden-mobile has-text-right-tablet"
            id="date">
            ${e.fecha}</div>
          <div class="column is-2-tablet is-6-mobile has-text-weight-bold has-text-right-tablet is-size-4-mobile has-text-success"
            id="monto">
            ${e.monto}</div>
          <div class="column is-2-tablet is-6-mobile has-text-right">
            <p class="is-fullwidth">
                <a href="#" id="boton-editar-${i}" class="mr-3 is-size-7 edit-link">Editar</a>
                <a href="#" id="boton-eliminar-${i}" class="is-size-7 delete-link">Eliminar</a>
            </p>
          </div>
        </div>
      </div>`
    );
  }, "");
  const operations = document.querySelector("#operations");
  operations.innerHTML = html;
  // no dejes codigo comentado en una entrega
  // getDeleteButtons(array);
  // getEditButtons(array);
};

mostrarOperacionesEnHTML(operacionesStored);

addOperationButton.onclick = () => {
  const newOperation = getOperations();

  sectionOperation.classList.add("is-hidden");
  sectionBalance.classList.remove("is-hidden");
  addOperations.classList.remove("is-hidden");
  noneOperations.classList.add("is-hidden");

  const description = inputDescription.value;
  const monto = inputMonto.value;
  const tipo =
    selectTypeOperation.options[selectTypeOperation.selectedIndex].value;
  const categoria =
    selectCategories.options[selectCategories.selectedIndex].value;
  const fecha = inputDate.value;

  const elementosForm = {
    descripcion: description,
    monto: Number(monto),
    tipo: tipo,
    categoria: categoria,
    fecha: fecha,
  };

  newOperation.push(elementosForm);

  mostrarOperacionesEnHTML(newOperation);

  const operationsToJSON = JSON.stringify(newOperation);
  localStorage.setItem("operaciones", operationsToJSON);
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

// AGREGAR O QUITAR UNA CATEGORIA

const addCategoryButton = document.querySelector("#add-category-button");
const categoryInput = document.querySelector("#category-input");
const categories = [
  "Comida",
  "Servicios",
  "Salidas",
  "Educacion",
  "Transporte",
  "Trabajo",
];

const getCategories = () => {
  const categoriesStored = localStorage.getItem("categories");
  if (categoriesStored === null) {
    return categories;
  } else {
    return JSON.parse(categoriesStored);
  }
};

const getEditCategory = (id) => {
  const sectionCategoryEdition = document.querySelector(
    "#edit-category-section"
  );
  const categories = getCategories();
  const item = categories[id];

  showSection(sectionCategoryEdition);
  hideSection(sectionCategories);

  sectionCategoryEdition.innerHTML = `
    <section class="section mt-5 vista" id="edit-category">
      <div class="container">
        <div class="columns is-multiline">
          <div class="column is-8-widescreen is-10-desktop is-offset-2-widescreen is-offset-1-desktop">
            <div class="box">
              <h2 class="title is-size-2 has-text-weight-bold">
                Editar categoría
              </h2>
              <label class="label mt-6" for="edit-category-input">Nombre</label>
              <div class="field is-grouped">
                <div class="control is-expanded">
                  <input class="input" value="${item}" type="text" name="" id="edit-category-input">
                </div>
              </div>
              <div class="buttons mt-6">
                <button class="button is-light" id="cancel-category-button">
                  Cancelar
                </button>
                <button class="button is-success" id="edit-category-button">
                  Editar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  const confirmCategoryButton = document.querySelector("#edit-category-button");
  const inputCategory = document.querySelector("#edit-category-input");
  const cancelCategoryButton = document.querySelector(
    "#cancel-category-button"
  );

  cancelCategoryButton.onclick = () => {
    showSection(sectionCategories);
    hideSection(sectionCategoryEdition);
  };

  confirmCategoryButton.onclick = () => {
    const categoryValue = inputCategory.value;
    categories[id] = categoryValue;

    const categoriesToJSON = JSON.stringify(categories);
    localStorage.setItem("categories", categoriesToJSON);

    addCategoriesToHTML(categories);
    showSection(sectionCategories);
    hideSection(sectionCategoryEdition);
  };
};

const getEditButtons = () => {
  const editCategoryButtons = document.querySelectorAll(".edit-button");
  for (let i = 0; i < editCategoryButtons.length; i++) {
    editCategoryButtons[i].onclick = () => {
      const idSliced = editCategoryButtons[i].id.slice(5);
      idButton = Number(idSliced);
      // falta const o let
      getEditCategory(idButton);
    };
  }
};

const getDeleteButtons = (array) => {
  const deleteCategoryButtons = document.querySelectorAll(".delete-button");
  for (let i = 0; i < deleteCategoryButtons.length; i++) {
    deleteCategoryButtons[i].onclick = () => {
      const idSliced = deleteCategoryButtons[i].id.slice(7);
      // falta const o let
      idButton = Number(idSliced);
      const filteredArray = array.filter((elemento, index) => {
        return index !== idButton;
      });
      array = filteredArray;
      addCategoriesToHTML(filteredArray);

      const categoriesToJSON = JSON.stringify(filteredArray);
      localStorage.setItem("categories", categoriesToJSON);
    };
  }
};

const addCategoriesToHTML = (array) => {
  const html = array.reduce((acc, e, i) => {
    return (
      acc +
      `<div class="mb-3">
            <div class="columns is-vcentered is-mobile">
            <div class="column">
            <span class="tag is-primary is-light">${e}</span>
            </div>
            <div class="column is-narrow has-text">
            <p>
            <a class="mr-4 is-size-7 edit-button" id="edit-${i}">Editar</a>
            <a class="is-size-7 delete-button" id="delete-${i}">Eliminar</a>
            </p>
            </div>
            </div>
        </div>`
    );
  }, "");

  const list = document.querySelector("#list-categories");
  list.innerHTML = html;
  getDeleteButtons(array);
  getEditButtons(array);
};

addCategoryButton.onclick = () => {
  const newCategory = categoryInput.value;
  const categories = getCategories();
  categories.push(newCategory);
  categoryInput.value = "";

  const categoriesToJSON = JSON.stringify(categories);
  localStorage.setItem("categories", categoriesToJSON);

  addCategoriesToHTML(categories);
};

addCategoriesToHTML(getCategories(categories));

// BALANCE

const ganancias = document.querySelector("#ganancias");
const gastos = document.querySelector("#gastos");
const balanceTotal = document.querySelector("#balance-total");

// suma ganancias
const mostrarGanancias = (array) => {
  const filtroGanancias = array.filter((elemento) => {
    return elemento.tipo === "ganancia";
  });

  const sumaDeGanancias = filtroGanancias.reduce((acc, elemento) => {
    // no entiendo que trataste de hacer aca con los signos +
    return +acc + +elemento.monto;
  }, 0);

  return (ganancias.textContent = `$${sumaDeGanancias}`);
};
mostrarGanancias(operacionesStored);

// suma gastos
const mostrarGastos = (array) => {
  const filtroGastos = array.filter((elemento) => {
    return elemento.tipo === "gasto";
  });

  const sumaDeGastos = filtroGastos.reduce((acc, elemento) => {
    // no entiendo los signos + acá
    return +acc + +elemento.monto;
  }, 0);

  return (gastos.textContent = `$${sumaDeGastos}`);
};
mostrarGastos(operacionesStored);

// total
const mostrarBalanceTotal = (array) => {
  const totalGanancias = mostrarGanancias(array).slice(1);
  const totalGastos = mostrarGastos(array).slice(1);
  const totalFinal = totalGanancias - totalGastos;
  return (balanceTotal.textContent = `$${totalFinal}`);
};

mostrarBalanceTotal(operacionesStored);

// FILTROS
const filtrosOrdenarPor = document.querySelector("#order-filter");
const tipoFiltro = document.querySelector("#type-filter");
const categoriaFiltro = document.querySelector("#filter-category");
const fechaFiltro = document.querySelector("#date-filter");

const ordenarPorFechaMasReciente = (array) => {
  return array.sort((a, b) => {
    return new Date(a.fecha) - new Date(b.fecha);
  });
};

const ordenarPorFechaMenosReciente = (array) => {
  return array.sort((a, b) => {
    return new Date(b.fecha) - new Date(a.fecha);
  });
};
const ordenarPorMayorMonto = (array) => {
  return array.sort((a, b) => {
    return a.monto - b.monto;
  });
};

const ordenarPorMenorMonto = (array) => {
  return array.sort((a, b) => {
    return b.monto - a.monto;
  });
};

const ordenarAZ = (array) => {
  return array.sort();
};

const ordenarZA = (array) => {
  return array.sort().reverse();
};

// esto esta demasiado parecido al modelo de ada
const filtroOrdenarPor = (array) => {
  if (filtrosOrdenarPor.value === "mas-recientes") {
    return ordenarPorFechaMasReciente(array);
  } else if (filtrosOrdenarPor === "menos-recientes") {
    return ordenarPorFechaMenosReciente(array);
  } else if (filtrosOrdenarPor === "mayor-monto") {
    return ordenarPorMayorMonto(array);
  } else if (filtrosOrdenarPor === "menor-monto") {
    return ordenarPorMenorMonto(array);
  } else if (filtrosOrdenarPor === "a-z") {
    return ordenarAZ(array);
  } else {
    return ordenarZA(array);
  }
};

const aplicarFiltros = () => {
  const filtroTipo = tipoFiltro.value;
  const filtroPorTipo = operacionesStored.filter((operacion) => {
    if (filtroTipo === "todos") {
      return operacion;
    }
    return operacion.tipo === filtroTipo;
  });

  const filtroCategoria = categoriaFiltro.value;
  const filtrarPorCategoria = filtroPorTipo.filter((operacion) => {
    if (filtroCategoria === "todas") {
      return operacion;
    }
    return operacion.categoria === filtroCategoria;
  });

  const arrayFiltrarPorFechas = filtrarPorCategoria.map((operacion) => {
    const newElement = { ...operacion };
    // aca estas asignando una nueva fecha, no filtrando
    newElement.fecha = new Date(operacion.fecha).toLocaleDateString();
    return newElement;
  });
  return filtroOrdenarPor(arrayFiltrarPorFechas);
};

tipoFiltro.onchange = () => {
  const filtrarArray = aplicarFiltros();
  mostrarOperacionesEnHTML(filtrarArray);
};

categoriaFiltro.onchange = () => {
  const filtrarArray = aplicarFiltros();
  mostrarOperacionesEnHTML(filtrarArray);
};

fechaFiltro.oninput = () => {
  const filtrarArray = aplicarFiltros();
  mostrarOperacionesEnHTML(filtrarArray);
};

filtrosOrdenarPor.onchange = () => {
  const filtrarArray = aplicarFiltros();
  mostrarOperacionesEnHTML(filtrarArray);
};
