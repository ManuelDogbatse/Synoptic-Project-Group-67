const mapDiv = document.querySelector("#map");
const customValuesDropdownMenu = document.querySelector("#custom-values");
const customValuesDropdownButton = document.querySelector("#custom-value-select-label");

let defaultValues, customValues;

// Capitalises each word in a string
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

// Closes dropdown menu when clicking outside dropdown menu
const closeDropdownMenu = function(event)
{
    if (!event.target.matches(".custom-town") && !event.target.matches("#semi-layer"))
    {
        customValuesDropdownMenu.style.display = "none";
    }
};

// Opens dropdown menu when clicking dropdown menu label
const openDropdownMenu = function(event)
{
    customValuesDropdownMenu.style.display = "block";
    event.stopPropagation();
};

// Closes pop-up when clicking outside pop-up or on 'NO' button
const popdownEvent = function(event)
{
    if (event.target.matches("#semi-layer") || event.target.matches("#pop-up-button-no") || event.target.matches("#pop-up-button-no-text"))
    {
        document.body.removeChild(document.body.children[document.body.children.length - 1]);
        document.body.removeEventListener("click", popdownEvent);
    }
};

// Creates the pop-up element and appends it to the document body
const createPopUpElement = function(townValues, townName)
{
    // Elements that make up the pop-up element
    const popUpDiv = document.createElement("div"),
    semiLayerDiv = document.createElement("div"),
    popUpBoxWrapDiv = document.createElement("div"),
    popUpTownInfoDiv = document.createElement("div"),
    popUpMessageDiv = document.createElement("div"),
    popUpButtonWrapDiv = document.createElement("div"),
    yesButton = document.createElement("a"),
    noButton = document.createElement("div"),
    yesButtonText = document.createElement("div"),
    noButtonText = document.createElement("div");
    
    popUpDiv.id = "pop-up";
    semiLayerDiv.id = "semi-layer";
    popUpBoxWrapDiv.id = "pop-up-box-wrap";
    popUpTownInfoDiv.id = "pop-up-town-info";
    popUpMessageDiv.id = "pop-up-message";
    popUpButtonWrapDiv.id = "pop-up-button-wrap"
    yesButton.id = "pop-up-button-yes";
    noButton.id = "pop-up-button-no";
    noButtonText.id = "pop-up-button-no-text";

    popUpMessageDiv.innerHTML = "Would you like to select this data?";
    yesButtonText.innerHTML = "YES";
    noButtonText.innerHTML = "NO";

    let townFound = false, count = 0;
    // Finds the correct town data for the map button pressed
    while (!townFound || count < townValues.length)
    {
        if (townValues[count].townName == townName)
        {
            townFound = true;
            // Changes the inner HTML to display the town data
            popUpTownInfoDiv.innerHTML = townValues[count].townName+"<br>"
                                    +"Season: "+townValues[count].season+"<br>"
                                    +"Temperature: "+townValues[count].temperature+" °C<br>"
                                    +"Rainfall: "+townValues[count].rainfall+" mm<br>"
                                    +"pH: "+townValues[count].ph+"<br>"
                                    +"Produce: "+townValues[count].produce;

            // Sets up the anchor element to redirect the user to the correct graph
            if (townValues[count].produce == "Rice")
            {
                yesButton.href = "/rice";
            }
            else if (townValues[count].produce == "Yam")
            {
                yesButton.href = "/yam";
            }
            else
            {
                yesButton.href = "/subclover";
            }
        }
        count++;
    }
       
    yesButton.appendChild(yesButtonText);
    noButton.appendChild(noButtonText);
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

// Decides which data array in the JSON file to use for the pop-up element creation
const popupEvent = function(target)
{
    // If a button for a town on the map is clicked, retrieve the town data from the 'defaultValues' array in the JSON file.
    // Else, retrieve the town data from the 'customValues' array in the JSON file.
    if (target.className == "town")
    {
        createPopUpElement(defaultValues, capitaliseEachWord(target.getAttribute("town")));
    }
    else
    {
        createPopUpElement(customValues, target.children[0].innerHTML);
    }
};

// Handles the events related to the pop-up event
const togglePopup = function(event)
{
    // If the pop-up element doesn't exist, create pop-up element
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
    // Prevents the event from firing twice after a single click
    event.stopPropagation();
};

// Creating the town buttons on the map, along with their labels and their correct locations
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
};

// Changes the location of the map button elements after they have been created
const changeLocation = function(id)
{
    towns[id].style.top = towns[id].getAttribute("top")+"px";
    towns[id].style.left = towns[id].getAttribute("left")+"px";
};

const createCustomTowns = function(customTowns)
{
    customTowns.forEach(town =>{
        const townDiv = document.createElement("div"),
        townTextDiv = document.createElement("div");

        townDiv.className = "custom-town";
        townTextDiv.innerHTML = town.townName;
        townDiv.appendChild(townTextDiv);
        townDiv.addEventListener("click", togglePopup);

        customValuesDropdownMenu.appendChild(townDiv);
    });
};

// Fetches the data from the JSON file for usage on this webpage
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

// Change locations for map town button elements
for (let i = 0; i < towns.length; i++)
{
    changeLocation(i);
}

// Add event listeners for the dropdown menu 
customValuesDropdownButton.addEventListener("click", openDropdownMenu);
document.body.addEventListener("click", closeDropdownMenu);
