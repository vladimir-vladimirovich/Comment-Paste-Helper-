let environmentManagerData = {
    selectors: {
        environmentRadioGroup: "environmentRadioGroup",
        environmentSelector: "[id='environmentSelector']",
        environmentInput: "[id='addEnvironmentLinkInput']",
        environmentAddButton: "[id='addEnvironment']",
        environmentExpandButton: "[id='expandEnvironmentLinkButton']",
        environmentRemoveButton: "[id='deleteSelectedEnvButton']",
        versionSelector: "[id='versionPathSelector']",
        versionInput: "[id='addVersionLinkInput']",
        versionAddButton: "[id='addVersion']",
        versionExpandButton: "[id='expandVersionLinkButton']",
        versionRemoveButton: "[id='deleteSelectedVersionButton']"
    },
    storage: {
        activeGroup: "activeGroup",
        activeEnvironment: "activeEnvironment",
        environments: "environments",
        activeVersion: "activeVersion",
        versions: "versions",
        test: "testUrlStorage",
        stg: "stgUrlStorage",
        prod: "prodUrlStorage"
    }
};

export default environmentManagerData;