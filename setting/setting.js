import "../utils/chat";

export class Settings {
    static prefix = "§1§l[§9DHIDE§1§l] §r§7";

    static debug = false;
    static debugPrefix = "§1§l[§9DHIDE-Debug§1§l] §r§c";

    static hideFireAspect = true;
    static hideVenomous = true;
    static hideThunderlord = true;
    static hideNonCrit = true;
}

const commandActions = {
    "fa": {
        action: () => {
            Settings.hideFireAspect = !Settings.hideFireAspect;
            return `Fire Aspect hiding is now ${Settings.hideFireAspect ? "ON" : "OFF"}.`;
        }
    },
    "venom": {
        action: () => {
            Settings.hideVenomous = !Settings.hideVenomous;
            return `Venomous hiding is now ${Settings.hideVenomous ? "ON" : "OFF"}.`;
        }
    },
    "thunder": {
        action: () => {
            Settings.hideThunderlord = !Settings.hideThunderlord;
            return `Thunderlord hiding is now ${Settings.hideThunderlord ? "ON" : "OFF"}.`;
        }
    },
    "noncrit": {
        action: () => {
            Settings.hideNonCrit = !Settings.hideNonCrit;
            return `Non-crit hiding is now ${Settings.hideNonCrit ? "ON" : "OFF"}.`;
        }
    }
};

register("command", (...args) => {
    const subCmd = args[0] == undefined ? undefined : args[0].toLowerCase();
    const subsub = args[1] == undefined ? undefined : args[1].toLowerCase();

    switch (subCmd) {
        case undefined:
            how2Use();
            break;
        case "debug":
            Settings.debug = !Settings.debug;
            chat("Debug mode is now " + (Settings.debug ? "ON" : "OFF"));
            break;
        case "sex":
            chat(" https://www.youtube.com/watch?v=pc0UaLsCUm0")
            break;
        case "get":
            chat("Fire Aspect: " + Settings.hideFireAspect);
            chat("Venomous: " + Settings.hideVenomous);
            chat("Thunderlord: " + Settings.hideThunderlord);
            chat("Non-crit: " + Settings.hideNonCrit);
            break;
        case "toggle":
            if (commandActions[subsub]) {
                chat(commandActions[subsub].action());
            } else chat(subsub + " is not a valid option.");
            break;
        case "test":
            if (debug) getAllEntities5x5();
            break;
        case "all":
            if (subsub == "on") {
                Settings.hideFireAspect = true;
                Settings.hideVenomous = true;
                Settings.hideThunderlord = true;
                Settings.hideNonCrit = true;
                chat("All options are now ON.");
            } else if (subsub == "off") {
                Settings.hideFireAspect = false;
                Settings.hideVenomous = false;
                Settings.hideThunderlord = false;
                Settings.hideNonCrit = false;
                chat("All options are now OFF.");
            } else chat("Invalid option: " + subsub);
            break;
        default:
            chat("Unknown command: " + subCmd);
            break;
    }
}).setName("dhide")