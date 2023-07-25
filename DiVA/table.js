// keeps track of current selections
var datasetVar = "dynamic";
var sequenceVar = "none";
var dataResultVar = "none";
var showDropBool = false;

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
    datasetVar = id;

    showDropdown();
    if (sequenceVar != "none") {
        selectDropdownOption("none");
    }

    changeCommand();
}

// ----------------------------- Selection Toggle ----------------------------- //

// handles the dropdown selection menu content
function clickDropdown() {
    if (showDropBool) {
        showDropBool = false;
    } else {
        showDropBool = true;
    }
    showDropdown();
}

function showDropdown() {
    var options = document.getElementsByClassName("dropdown-content");

    for (var i = 0; i < options.length; i++) {
        if (showDropBool) {
            if ((options[i].id != datasetVar) && options[i].classList.contains("show")) {
                options[i].classList.remove("show");
            } else if ((options[i].id == datasetVar) && !options[i].classList.contains("show")) {
                options[i].classList.toggle("show");
            }
        } else {
            if (options[i].classList.contains("show")) {
                options[i].classList.toggle("show");
            }
        }
    }
}

function selectDropdownOption(id) {
    // closes the dropdown menu
    if (showDropBool) {
        showDropBool = false;
        showDropdown();
    }

    var sequence = document.getElementById("sequence-button");
    sequenceVar = id;
    element = document.getElementById(id);

    // sets the sequence dropdown header
    var seqHeader = document.getElementById("sequence-header");
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

    changeCommand();
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
                    if (datasetVar == "dynamic") {
                        selectDropdownOption("battery");
                    } else if (datasetVar == "static") {
                        selectDropdownOption("cabinet00_canonical");
                    } else {
                        selectDropdownOption("cabinet");
                    }
                }
            } else { // if the option is selected
                options[i].classList.remove("selected");
                dataResultVar = "none";

                // removes the sequence option
                selectDropdownOption("none");
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