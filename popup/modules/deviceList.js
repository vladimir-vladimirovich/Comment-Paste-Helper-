// Place to keep device list
let deviceListStorage = 'deviceListStorage';

let addDeviceButton = document.getElementById('addDeviceButton');
let addDeviceInput = document.getElementById('addDeviceInput');

/**
 * Add device string to deviceList pool
 * @param {String} newDeviceString
 */
let addDeviceToPool = (newDeviceString) => {
    let deviceList = [];
    chrome.storage.local.get([deviceListStorage], function (result) {

        // ---
        console.log(">>> result.deviceListStorage below");
        console.log(result.deviceListStorage);
        // ---

        if (result.deviceListStorage !== undefined) {
            deviceList = result.deviceListStorage;
            // ---
            console.log(">>> result.deviceListStorage IF BLOCK - TRUE");
            // ---
        }

        // Add new string at the beginning of the array
        deviceList.unshift(newDeviceString);

        chrome.storage.local.set({[deviceListStorage]: deviceList});
        buildDeviceList(deviceList);
    })
};

/**
 * Recreate DOM list of saved devices
 */
let rebuildDeviceList = () => {
    // ---
    console.log("=== reBuilding device list...");
    // ---
    chrome.storage.local.get([deviceListStorage], function (result) {
        // ---
        console.log("=== .rebuildDeviceList - result.deviceListStorage: ");
        console.log(result.deviceListStorage);
        // ---

        buildDeviceList(result.deviceListStorage);
    })
};

/**
 * Create DOM list of devices based on device pool
 * Create event listeners for this new elements
 * @param {Array} deviceList
 */
let buildDeviceList = function (deviceList) {
    let deviceListJQobject = $('#deviceList');
    deviceListJQobject.html('');
    // ---
    console.log("=== Building device list...");
    // ---

    if (deviceList !== undefined) {
        for (let i = 0; i < deviceList.length; i++) {
            // HTML element to be added
            let deviceListItem = `<div class="btn-group my-1" id="${deviceList[i]}">` +
                '<span class="list-group-item list-group-item-action"></span>' +
                '<button class="btn btn-outline-danger">-</button>' +
                '</div>';

            // Add new line
            deviceListJQobject.append(deviceListItem);
            // Add correct text to display
            let listItem = document.getElementById(`${deviceList[i]}`);
            let listItemSpan = $(listItem).find('span');
            listItemSpan[0].innerText = deviceList[i];

            // Add event click for span element
            listItemSpan.click(function () {
                if (listItemSpan.hasClass('list-group-item-success')) {
                    listItemSpan.removeClass('list-group-item-success')
                } else listItemSpan.addClass('list-group-item-success');
            });

            // Add event for '-' remove button
            $(listItem).find('button').click(function () {
                listItem.remove();
                chrome.storage.local.get([deviceListStorage], function (result) {
                    let updatedArray = result.deviceListStorage.filter(filterArray => filterArray !== deviceList[i]);
                    // console.log("*** updatedArray: ");
                    // console.log(updatedArray);
                    chrome.storage.local.set({[deviceListStorage]: updatedArray});
                })
            });
        }
    }
};

/**
 * Setup deviceList module
 */
let setupDeviceList = function () {
    // Setup click event for 'addDeviceButton' button
    $(addDeviceButton).click(function () {
        let newDevice = $(addDeviceInput)[0].value;
        console.log(">>> newDevice: " + newDevice);
        if (newDevice !== undefined && newDevice !== null && newDevice !== "") {
            addDeviceToPool(newDevice);
        }
    });

    // Rebuild device list
    rebuildDeviceList();
};

export {setupDeviceList}

// chrome.storage.local.remove('deviceListStorage')

// chrome.storage.local.get(['deviceListStorage'], function(result) {
//     console.log(result.deviceListStorage);
// });