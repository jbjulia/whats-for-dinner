class SelectBox {
    constructor() {
        this.getNodes();
        this.addEventListeners();
    }

    getNodes() {
        this.title = document.querySelector(".selectbox-title");
        this.links = Array.from(document.querySelectorAll(".selectbox-link"));
        this.resultNodes = Array.from(document.querySelectorAll(".selectbox-result"));
    }

    addEventListeners() {
        this.links.map(link => link.addEventListener("click", this.changeContent.bind(this)));
    }

    changeContent(event) {
        event.preventDefault();

        const closestLink = event.target.closest("a");
        const closestLinkClone = closestLink.cloneNode(true);
        closestLinkClone.querySelector("span").remove();

        const iconNode = this.title.lastChild.cloneNode(true);

        this.title.innerHTML = closestLinkClone.textContent;
        this.title.appendChild(iconNode);

        this.title.click();

        const resultIndex = this.links.indexOf(closestLink);
        this.showResult(resultIndex);
    }

    showResult(index) {
        this.resultNodes.map(resultNode => resultNode.classList.remove("selectbox-result-show"));
        this.resultNodes[index].classList.add("selectbox-result-show");
    }
}

const selectBox = new SelectBox();

function generateMeal() {
    const meals = {
        "beef": {
            1: "beef stew",
            2: "beef and broccoli",
            3: "burgers"
        },
        "chicken": {
            1: "fried chicken",
            2: "chicky nuggies",
            3: "chicken pot pie"
        },
        "fish": {
            1: "grilled fish",
            2: "baked fish",
            3: "fish stew"
        },
        "steak": {
            1: "steak and eggs",
            2: "steak and greens",
            3: "grilled steak"
        }
    }
    const food = document.getElementById("selectbox").textContent.toLowerCase();

    if (food in meals) {
        const randInt = Math.floor((Math.random() * 3) + 1);

        document.getElementById("meal").textContent = meals[food][randInt];
        document.getElementById("meal").style.textTransform = "capitalize";
        document.getElementById("highlight-clean").style.visibility = "visible";

        // window.scrollTo(0,document.body.scrollHeight);
        const elem = document.getElementById("highlight-clean");
        elem.scrollIntoView();
    }
}

function viewRecipes() {
    location = "http://www.google.com/search?q=" + encodeURIComponent(document.getElementById("meal").textContent) +
        " recipes";
}

function startOver() {
    window.location.reload();
}