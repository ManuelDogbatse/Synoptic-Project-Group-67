const mapDiv = document.querySelector("#map");
const customValuesDropdownMenu = document.querySelector("#custom-values");
const customValuesDropdownButton = document.querySelector("#custom-value-select-label");

let defaultValues, customValues;

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

const closeDropdownMenu = function(event)
{
    if (!event.target.matches(".custom-town") && !event.target.matches("#semi-layer"))
    {
        customValuesDropdownMenu.style.display = "none";
    }
};

const openDropdownMenu = function(event)
{
    customValuesDropdownMenu.style.display = "block";
    event.stopPropagation();
};

const popdownEvent = function(event)
{
    if (event.target.matches("#semi-layer") || event.target.matches("#pop-up-button-no"))
    {
        document.body.removeChild(document.body.children[document.body.children.length - 1]);
        document.body.removeEventListener("click", popdownEvent);
    }
};

const popupEvent = function(target)
{
    const popUpDiv = document.createElement("div"),
    semiLayerDiv = document.createElement("div"),
    popUpBoxWrapDiv = document.createElement("div"),
    popUpTownInfoDiv = document.createElement("div"),
    popUpMessageDiv = document.createElement("div"),
    popUpButtonWrapDiv = document.createElement("div"),
    yesButton = document.createElement("a"),
    noButton = document.createElement("div");
    
    popUpDiv.id = "pop-up";
    semiLayerDiv.id = "semi-layer";
    popUpBoxWrapDiv.id = "pop-up-box-wrap";
    popUpTownInfoDiv.id = "pop-up-town-info";
    popUpMessageDiv.id = "pop-up-message";
    popUpButtonWrapDiv.id = "pop-up-button-wrap"
    yesButton.id = "pop-up-button-yes";
    noButton.id = "pop-up-button-no";

    popUpMessageDiv.innerHTML = "Would you like to select this data?";
    yesButton.innerHTML = "YES";
    noButton.innerHTML = "NO";


    if (target.className == "town")
    {
        let townFound = false, count = 0;
        while (!townFound || count < defaultValues.length)
        {
            if (defaultValues[count].townName == capitaliseEachWord(target.getAttribute("town")))
            {
                townFound = true;
                popUpTownInfoDiv.innerHTML = defaultValues[count].townName+"<br>"
                                        +"Season: "+defaultValues[count].season+"<br>"
                                        +"Temperature: "+defaultValues[count].temperature+" °C<br>"
                                        +"Rainfall: "+defaultValues[count].rainfall+" mm<br>"
                                        +"pH: "+defaultValues[count].ph+"<br>"
                                        +"Produce: ";

                if (defaultValues[count].ph <= 7)
                {
                    yesButton.href = "/graph1";
                }
                else if (defaultValues[count].ph > 7 && defaultValues[count].ph <= 14)
                {
                    yesButton.href = "/graph2";
                }                                        

                if (defaultValues[count].produce.constructor === Array)
                {
                    defaultValues[count].produce.forEach(crop => {
                        popUpTownInfoDiv.innerHTML = popUpTownInfoDiv.innerHTML.concat(crop+" ");
                    });
                }
                else
                {
                    popUpTownInfoDiv.innerHTML = popUpTownInfoDiv.innerHTML.concat(defaultValues[count].produce);
                }
                
            }
            count++;
        }
    }
    else
    {
        let townFound = false, count = 0;
        while (!townFound || count < customValues.length)
        {
            if (customValues[count].townName == target.innerHTML)
            {
                townFound = true;
                popUpTownInfoDiv.innerHTML = customValues[count].townName+"<br>"
                                        +"Season: "+customValues[count].season+"<br>"
                                        +"Temperature: "+customValues[count].temperature+" °C<br>"
                                        +"Rainfall: "+customValues[count].rainfall+" mm<br>"
                                        +"pH: "+customValues[count].ph+"<br>"
                                        +"Produce: ";

                if (customValues[count].ph <= 7)
                {
                    yesButton.href = "/graph1";
                }
                else if (customValues[count].ph > 7 && customValues[count].ph <= 14)
                {
                    yesButton.href = "/graph2";
                }   
        
                if (customValues[count].produce.constructor === Array)
                {
                    customValues[count].produce.forEach(crop => {
                        popUpTownInfoDiv.innerHTML = popUpTownInfoDiv.innerHTML.concat(crop+" ");
                    });
                }
                else
                {
                    popUpTownInfoDiv.innerHTML = popUpTownInfoDiv.innerHTML.concat(customValues[count].produce);
                }
            }
            count++;
        }
    }

    noButton.addEventListener("click", popdownEvent);
    popUpButtonWrapDiv.appendChild(yesButton);
    popUpButtonWrapDiv.appendChild(noButton);

    popUpBoxWrapDiv.appendChild(popUpMessageDiv);
    popUpBoxWrapDiv.appendChild(popUpTownInfoDiv);
    popUpBoxWrapDiv.appendChild(popUpButtonWrapDiv);
    popUpDiv.appendChild(semiLayerDiv);
    popUpDiv.appendChild(popUpBoxWrapDiv);

    document.body.appendChild(popUpDiv);
};

const togglePopup = function(event)
{
    if (!document.querySelector("#semi-layer"))
    {
        if (event.currentTarget.className == "location-icon")
        {
            popupEvent(event.currentTarget.parentElement);
        }
        else
        {
            popupEvent(event.currentTarget);
        }
        
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
    locationIconDiv.addEventListener("click", togglePopup);

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

const createCustomTowns = function(customTowns)
{
    customTowns.forEach(town =>{
        const townDiv = document.createElement("div");

        townDiv.className = "custom-town";
        townDiv.innerHTML = town.townName;
        townDiv.addEventListener("click", togglePopup);

        customValuesDropdownMenu.appendChild(townDiv);
    });
};

fetch("../data/form.json")
.then(res => 
{
    return res.json();
})
.then(formFileDataJS => {
    defaultValues = formFileDataJS[0].defaultValues;
    customValues = formFileDataJS[0].customValues;
    createCustomTowns(customValues);
});

// Town index numbers:
// Bamaga = 0
createTown("Bamaga", 25, 133);
// Mapoon = 1
createTown("Mapoon", 102, 106);
// Weipa = 2
createTown("Weipa", 142, 99);
// Lockhart River = 3
createTown("Lockhart River", 152, 198);
// Aurukun = 4
createTown("Aurukun", 188, 90);
// Coen = 5
createTown("Coen", 225, 183);
// Pormpuraaw = 6
createTown("Pormpuraaw", 290, 85);
// Kowanyama = 7
createTown("Kowanyama", 328, 92);
// Cooktown = 8
createTown("Cooktown", 329, 325);
// Cairns = 9
createTown("Cairns", 422, 355);
// Dimbulah = 10
createTown("Dimbulah", 438, 313);
// Karumba = 11
createTown("Karumba", 466, 32);
// Normanton = 12
createTown("Normanton", 473, 46);

const towns = document.querySelectorAll(".town");

for (let i = 0; i < towns.length; i++)
{
    changeLocation(i);
}

customValuesDropdownButton.addEventListener("click", openDropdownMenu);
document.body.addEventListener("click", closeDropdownMenu);
