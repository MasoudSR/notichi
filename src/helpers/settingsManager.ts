type SettingsType = {
    animations: boolean;
    autoSync: boolean;
};

export function loadSettings() {
    const settings = localStorage.getItem("settings");
    if (settings === null) {
        const newSettings = { animations:true , autoSync:false };
        return newSettings;
    } else {
        return JSON.parse(settings);
    }
}


export function saveSettings(settings: SettingsType) {
	localStorage.setItem("settings", JSON.stringify(settings));
}
