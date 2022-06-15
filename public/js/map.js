const mapDiv = document.querySelector("#map");

const capitaliseEachWord = function(str)
{
    let words = str.split(" ");
    let capitalisedWords = [];
    words.forEach(word =>
    {
        capitalisedWords.push(word[0].toUpperCase() + word.slice(1, word.length));
    });
    return capitalisedWords.join(" ");
};

const popdownEvent = function()
{
    document.body.removeChild(document.body.children[1]);
    document.body.removeEventListener("click", popdownEvent);
};

const popupEvent = function(target)
{
    const popUpDiv = document.createElement("div"),
    semiLayerDiv = document.createElement("div"),
    popUpBoxWrapDiv = document.createElement("div"),
    popUpBoxDiv = document.createElement("div");
    
    popUpDiv.id = "pop-up";
    semiLayerDiv.id = "semi-layer";
    popUpBoxWrapDiv.id = "pop-up-box-wrapper";
    popUpBoxDiv.id = "pop-up-box";

    popUpBoxDiv.innerHTML = capitaliseEachWord(target.getAttribute("town"));
    popUpBoxWrapDiv.appendChild(popUpBoxDiv);
    popUpDiv.appendChild(semiLayerDiv);
    popUpDiv.appendChild(popUpBoxWrapDiv);

    document.body.appendChild(popUpDiv);
};

const clickEvent = function(event)
{
    if (!document.querySelector("#semi-layer"))
    {
        popupEvent(event.currentTarget.parentElement);
        document.body.addEventListener("click", popdownEvent);
    }
    event.stopPropagation();
};

const createTown = function(townName, top, left)
{
    const townDiv = document.createElement("div"),
    locationIconDiv = document.createElement("div"),
    labelDiv = document.createElement("div"),
    townAtt = document.createAttribute("town"),
    topAtt = document.createAttribute("top"),
    leftAtt = document.createAttribute("left");

    townDiv.className = "town";
    locationIconDiv.className = "location-icon";
    labelDiv.className = "label";
    labelDiv.innerHTML = townName;

    townAtt.value = townName.toLowerCase();
    townDiv.setAttributeNode(townAtt);
    locationIconDiv.addEventListener("click", clickEvent);

    topAtt.value = top.toString();
    leftAtt.value = left.toString();
    townDiv.setAttributeNode(topAtt);
    townDiv.setAttributeNode(leftAtt);
    townDiv.appendChild(locationIconDiv);
    townDiv.appendChild(labelDiv);

    mapDiv.appendChild(townDiv);
},

changeLocation = function(id)
{
    towns[id].style.top = towns[id].getAttribute("top")+"px";
    towns[id].style.left = towns[id].getAttribute("left")+"px";
};

createTown("Bamaga", 25, 133);
createTown("Mapoon", 102, 106);
createTown("Weipa", 142, 99);
createTown("Lockhart River", 152, 198);
createTown("Aurukun", 188, 90);
createTown("Coen", 225, 183);
createTown("Pormpuraaw", 290, 85);
createTown("Kowanyama", 328, 92);
createTown("Cooktown", 329, 325);
createTown("Cairns", 422, 355);
createTown("Dimbulah", 438, 313);
createTown("Karumba", 466, 32);
createTown("Normanton", 473, 46);

const towns = document.querySelectorAll(".town");

for (let i = 0; i < towns.length; i++)
{
    changeLocation(i);
}