// keeps track of current selections
var datasetVar = "dynamic";
var sequenceVar = "none";
var dataResultVar = "none";
var selectionType = "dynamic-menu";
var showDropBool = false; // for dynamic and canonical
var showStaticClass = false; // for static dropdown categories
var showStaticInstance = false; // for static instance categories
var showStaticPos = false; // for static position catgories
var staticClass = "none";
var staticInstance = "none";
var staticPos = "none";

// ----------------------------- Dataset Toggle ----------------------------- //
var dynamic = document.getElementById("dynamic");
var static = document.getElementById("static");
var canonical = document.getElementById("canonical");

dynamic.onclick = function () { datasetClick(dynamic.id) };
static.onclick = function () { datasetClick(static.id) };
canonical.onclick = function () { datasetClick(canonical.id) };

function datasetClick(id) {
    var options = document.getElementsByClassName("dataset-option");
    for (var i = 0; i < options.length; i++) {
        if (options[i].id == id && !options[i].classList.contains("selected")) {
            options[i].classList.add("selected");
        } else if (options[i].id != id && options[i].classList.contains("selected")) {
            options[i].classList.remove("selected");
        }
    }

    if (sequenceVar != "none") { // if the sequence is set, reset
        selectDropdownOption("none");
    }
    if (staticClass != "none") { // if static sequence is set, reset
        selectStaticDropdownOption("none", "static-class");
        selectStaticDropdownOption("none", "static-instance");
        selectStaticDropdownOption("none", "static-pos");
    }

    datasetVar = id;
    changeDatasetSelection();

    changeCommand();
}

function changeDatasetSelection() {
    var options = document.getElementsByClassName("sequence-options");

    if (datasetVar == "dynamic") {
        selectionType = "dynamic-menu";
    } else if (datasetVar == "static") {
        selectionType = "static-menu";
    } else {
        selectionType = "canonical-menu"
    }

    // shows the different drop down menus based on the dataset
    for (var i = 0; i < options.length; i++) {
        if (options[i].id == selectionType && !options[i].classList.contains("show-dropdown")) {
            options[i].classList.add("show-dropdown");
        } else if (options[i].id != selectionType && options[i].classList.contains("show-dropdown")) {
            options[i].classList.remove("show-dropdown");
        }
    }
}

// ----------- Dynamic and Canonical ----------- //
function clickDropdown() {
    if (showDropBool) {
        showDropBool = false;
    } else {
        showDropBool = true;
    }
    showDropdown();
}

function showDropdown() {
    var option = document.getElementById(selectionType).getElementsByClassName("dropdown-content")[0];

    if (showDropBool) {
        option.classList.toggle("show");
    } else {
        option.classList.remove("show");
    }
}

function selectDropdownOption(id) {
    // closes the dropdown menu
    if (showDropBool) {
        showDropBool = false;
        showDropdown();
    }

    // gets the selected element
    var elementSelection = "#" + selectionType + " #" + id;
    element = document.querySelector(elementSelection);

    // sets the sequence dropdown header
    var sequenceSelection = "#" + selectionType + " .sequence-button";
    var sequence = document.querySelector(sequenceSelection);
    var headerSelection = "#" + selectionType + " .sequence-header";
    var seqHeader = document.querySelector(headerSelection);
    seqHeader.innerHTML = element.innerHTML;
    if (!sequence.classList.contains("selected")) {
        sequence.classList.add("selected");
    }

    // sets the sequence variable
    sequenceVar = id;

    if (id == "none") {
        if (sequence.classList.contains("selected")) {
            sequence.classList.remove("selected");
        }

        // unselection sequence also removes data/result options
        var options = document.getElementsByClassName("data-results-option");
        for (var i = 0; i < options.length; i++) {
            if (options[i].classList.contains("selected")) {
                options[i].classList.remove("selected");
                dataResultVar = "none";
            }
        }
    }

    changeCommand();
}

// ----------- Static ----------- //
var classInstances = new Map();
classInstances.set("cabinet", 9);
classInstances.set("car", 12);
classInstances.set("chair", 4);
classInstances.set("couch", 9);
classInstances.set("fruit", 3);
classInstances.set("keyboard", 3);
classInstances.set("mouse", 5);
classInstances.set("mug", 8);
classInstances.set("plane", 9);
classInstances.set("scene", 4);
classInstances.set("table", 8);
classInstances.set("utensil", 14);

function clickStaticDropdown(type) {
    if (type == "static-class") {
        if (showStaticClass) {
            showStaticClass = false;
        } else {
            showStaticClass = true;
        }
        showStaticInstance = false;
        showStaticPos = false;
    } else if (type == "static-instance") {
        if (showStaticInstance) {
            showStaticInstance = false;
        } else {
            showStaticInstance = true;
        }
        showStaticClass = false;
        showStaticPos = false;
    } else {
        if (showStaticPos) {
            showStaticPos = false;
        } else {
            showStaticPos = true;
        }
        showStaticClass = false;
        showStaticInstance = false;
    }

    showStaticDropdown();
}

function showStaticDropdown() {
    var classOption = document.getElementById("static-class");
    var instanceOption = document.getElementById("static-instance");
    var posOption = document.getElementById("static-pos");

    if (showStaticClass) {
        classOption.classList.toggle("show");
    } else {
        classOption.classList.remove("show");
    }

    if (showStaticInstance) {
        instanceOption.classList.toggle("show");
    } else {
        instanceOption.classList.remove("show");
    }

    if (showStaticPos) {
        posOption.classList.toggle("show");
    } else {
        posOption.classList.remove("show");
    }
}

function setStaticInstances(id) {
    var selector = "#static-menu #static-instance";
    var dropdownOptions = document.querySelector(selector);
    dropdownOptions.innerHTML = "";

    if (id == "none") {
        dropdownOptions.innerHTML += `<div class="dropdown-option" id="none" onclick="selectStaticDropdownOption(this.id, 'static-instance')">None</div>`;
        selectStaticDropdownOption("none", "static-instance");
    } else {
        var numInstances = classInstances.get(id);

        // sets the dropdown options
        for (var i = 0; i <= numInstances; i++) {
            var instanceStr = String(i).padStart(2, '0');
            var id = "instance_" + instanceStr;
            dropdownOptions.innerHTML += `<div class="dropdown-option" id=${id} onclick="selectStaticDropdownOption(this.id, 'static-instance')">${instanceStr}</div>`;
        }

        // sets the default option
        selectStaticDropdownOption("instance_00", "static-instance");
    }
}

function setStaticPos(id) {
    var selector = "#static-menu #static-pos";
    var dropdownOptions = document.querySelector(selector);
    dropdownOptions.innerHTML = "";

    if (id == "none") {
        dropdownOptions.innerHTML += `<div class="dropdown-option" id="none" onclick="selectStaticDropdownOption(this.id, 'static-pos')">None</div>`;
        selectStaticDropdownOption("none", "static-pos");
    } else {
        var posList;
        if (id == "scene") {
            posList = ["clean", "messy1", "messy2", "messy3", "messy4", "messy5"];
        } else {
            posList = ["canonical", "random"];
        }

        // sets the dropdown options
        for (var i = 0; i < posList.length; i++) {
            var instanceStr = posList[i];
            dropdownOptions.innerHTML += `<div class="dropdown-option" id=${instanceStr} onclick="selectStaticDropdownOption(this.id, 'static-pos')">${instanceStr}</div>`
        }

        // sets the default option
        if (id == "scene") {
            selectStaticDropdownOption("clean", "static-pos");

        } else {
            selectStaticDropdownOption("canonical", "static-pos");
        }
    }
}

function selectStaticDropdownOption(id, dropdownMenu) {
    // gets the selected element
    var elementSelection = "#" + selectionType + " #" + id;
    element = document.querySelector(elementSelection);

    // sets the sequence dropdown headers
    var sequenceButtonSelection = "." + dropdownMenu + " .sequence-button"
    var sequence = document.querySelector(sequenceButtonSelection);
    var headerSelection = sequenceButtonSelection + " .sequence-header";
    var seqHeader = document.querySelector(headerSelection);
    seqHeader.innerHTML = element.innerHTML;
    if (!sequence.classList.contains("selected")) {
        sequence.classList.add("selected");
    }

    if (id == "none") {
        if (sequence.classList.contains("selected")) {
            sequence.classList.remove("selected");
        }

        // unselection sequence also removes data/result options
        var options = document.getElementsByClassName("data-results-option");
        for (var i = 0; i < options.length; i++) {
            if (options[i].classList.contains("selected")) {
                options[i].classList.remove("selected");
                dataResultVar = "none";
            }
        }
    }

    if (dropdownMenu == "static-class") {
        staticClass = id;
        setStaticInstances(id);
        setStaticPos(id);
        showStaticClass = false;
    } else if (dropdownMenu == "static-instance") {
        staticInstance = id.slice(-2);
        showStaticInstance = false;
    } else {
        staticPos = id;
        showStaticPos = false;
    }
    setSequenceVar();
    changeCommand();
    showStaticDropdown();
}

function setSequenceVar() {
    if (staticClass == "none") {
        sequenceVar = "none";
    } else {
        sequenceVar = staticClass + staticInstance + "_" + staticPos;
    }
}

// ----------------------------- Data/Results Toggle ----------------------------- //

// commands for data/results section
var data = document.getElementById("data");
var result = document.getElementById("results");

data.onclick = function () { dataResultClick(data.id) };
result.onclick = function () { dataResultClick(result.id) };

function dataResultClick(id) {
    var options = document.getElementsByClassName("data-results-option");
    for (var i = 0; i < options.length; i++) {
        if (options[i].id == id) {
            if (!options[i].classList.contains("selected")) { // if the option is not selected
                options[i].classList.add("selected");
                dataResultVar = id;

                // ensures that the sequence option is also selected 
                if (sequenceVar == "none") {
                    if (datasetVar == "dynamic") { // dynamic
                        selectDropdownOption("battery");
                    } else if (datasetVar == "static") { // static
                        selectStaticDropdownOption("cabinet", "static-class");
                    } else { // canonical
                        selectDropdownOption("cabinet");
                    }
                }
            } else { // if the option is selected
                options[i].classList.remove("selected");
                dataResultVar = "none";
            }
        } else if (options[i].id != id && options[i].classList.contains("selected")) {
            options[i].classList.remove("selected");
        }
    }

    changeCommand();
}

// ----------------------------- Command Output ----------------------------- //

// handles changing the resulting command
function changeCommand() {
    var command = "aws s3 cp s3://diva360/";

    // checks the dataset
    if (datasetVar == "dynamic") {
        command += "dynamic/";
    } else if (datasetVar == "static") {
        command += "static/";
    } else {
        command += "canonical/";
    }

    // checks the sequence
    if (sequenceVar != "none") {
        command += (sequenceVar + "/");
    }

    // checks the data/results
    if (dataResultVar == "data") {
        command += "data/";
    } else if (dataResultVar == "results") {
        command += "results/";
    }

    command += " &lt;path-to-destination&gt; --recursive --no-sign-request";
    document.getElementById("command").innerHTML = command;
}