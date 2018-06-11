require.config({
    baseUrl: chrome.runtime.getURL("backgroundScripts/")
});

require([
        'contextMenus',
        'config/menuCollection',
        'core/contextMenusEvents'
    ],
    function (contextMenus, menuCollection, contextMenusEvents) {

        /**
         * Call all required method to:
         * - create context menus
         * - add onClicked event listeners to created context menus
         */
        var setup = function () {
            // Add all menu items to context menu
            contextMenus.addMultipleItems(menuCollection);

            //  Initialize onClicked event handler for all context menus
            contextMenusEvents.multipleOnClickedSetup();
        };

        setup();

});