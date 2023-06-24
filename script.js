async function fetchBundeslaender() {
  try {
    const response = await fetch('bundeslaender.json');
    const bundeslaender = await response.json();
    showBundeslaender(bundeslaender);

  } catch (error) {
    console.error('Fehler beim Laden der JSON-Daten:', error);
  }
}

let land = [];

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function showBundeslaender(bundeslaender) {
  let uniqueString = [];

  for (let i = 0; i < bundeslaender.length; i++) {

    let bundesland = bundeslaender[i];
    land.push(bundeslaender[i]);
    let bundeslandName = bundesland['name'];
    let bundeslandPopulation = bundesland['population'];
    let bundeslandLink = bundesland['url'];
    let firstLetter = bundeslandName.charAt(0);

    loadHtml(bundeslandName, bundeslandPopulation, bundeslandLink, firstLetter);
    if (!uniqueString.includes(firstLetter)) {
      uniqueString.push(firstLetter);
    }
  }

  loadFilter(bundeslaender, uniqueString);
}

function loadHtml(bundeslandName, bundeslandPopulation, bundeslandLink) {
  let mainContent = document.querySelector('.mainContent');
  mainContent.innerHTML += `
    <a href="${bundeslandLink}">
      <div class="bundesland">
        <div>
          <p class="landName">${capitalizeFirstLetter(bundeslandName)}</p>
          <p class="landPopulation">${bundeslandPopulation} Millionen</p>
        </div>
      </div>
    </a>
  `;
}

function loadFilter(bundeslaender, uniqueString) {
  let filterContainer = document.getElementById('filterContainer');
  filterContainer.innerHTML = '';

  for (let i = 0; i < uniqueString.length; i++) {
    const element = uniqueString[i];

    filterContainer.innerHTML += `<span class="letters" onclick="showFilteredBundesland('${element}')">${element}</span>`;
  }
}


function showFilteredBundesland(firstString) {
  let showFilteredBundeslander = [];
  let mainContent = document.querySelector('.mainContent');
  mainContent.innerHTML = '';

  for (let i = 0; i < land.length; i++) {
    const bundesland = land[i];
    if (bundesland['name'].startsWith(firstString)) {
      showFilteredBundeslander.push(bundesland);
    }
  }

  for (let j = 0; j < showFilteredBundeslander.length; j++) {
    const element = showFilteredBundeslander[j];
    let bundeslandName = element['name'];
    let bundeslandPopulation = element['population'];
    let bundeslandLink = element['url'];

    mainContent.innerHTML += `
    <a href="${bundeslandLink}">
      <div class="bundesland">
        <div>
          <p class="landName">${bundeslandName}</p>
          <p class="landPopulation">${bundeslandPopulation} Millionen</p>
        </div>
      </div>
    </a>
  `;
  }

}
