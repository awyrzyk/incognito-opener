window.addEventListener("DOMContentLoaded", function () {
    var createLinkButton = document.getElementById("createLink");
    var deleteLinkButton = document.getElementById("deleteLink");
    var goToIncognitoButton = document.getElementById("goToIncognito");


    createLinkButton.addEventListener("click", createNewElement);
    deleteLinkButton.addEventListener("click", deleteNewElement);
    goToIncognitoButton.addEventListener("click", goToIncognito);
});


window.onload = function () {
    var storedPages = JSON.parse(localStorage.getItem("pagesNames"));
    if (storedPages) {
        storedPages.forEach(createInput);
    }
};

function createInput(item, index) {
    var inputDiv = document.createElement("div");

    inputDiv.innerHTML = "<input type='text' value=" + item + " id='pageInput" + index + "'>";
    document.getElementById("pagesContainer").appendChild(inputDiv);
}

function createNewElement() {
    var pagesContainer = document.getElementById("pagesContainer");
    var childNodesAmount = pagesContainer.childNodes.length;
    var inputDiv = document.createElement("div");

    inputDiv.innerHTML = "<input type='text' id='pageInput" + childNodesAmount + "'>";
    pagesContainer.appendChild(inputDiv);

}

function deleteNewElement() {
    var pagesContainer = document.getElementById("pagesContainer");

    pagesContainer.removeChild(pagesContainer.lastChild);
}

function goToIncognito() {
    var pages = [];
    var inputsAmount = document.getElementById("pagesContainer").childNodes.length;

    for (var i = 0; i < inputsAmount; i++) {
        var pageName = document.getElementById("pageInput" + i).value;
        if (pageName) {
            pages.push(pageName);
        }
    }

    localStorage.setItem('pagesNames', JSON.stringify(pages));

    chrome.windows.create({focused: true, state: 'maximized', incognito: true, url: pages});
}
