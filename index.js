import PogObject from "../PogData"

export let hideSettings = new PogObject("DHider", {
    "hider": {
        "fa": true,
        "venom": true,
        "thunder": true,
        "nonCrit": true
    }
}, "hider.json")

export class Settings {
    static prefix = "§1§l[§9DHIDE§1§l] §r§7";

    static debug = false;

    static debugPrefix = "§1§l[§9DHIDE-Debug§1§l] §r§c";
}

function chat(msg) {
    ChatLib.chat(Settings.prefix + msg);
}

function debug(msg) {
    if (!Settings.debug) return;
    ChatLib.chat(Settings.debugPrefix + msg);
}

function how2Use() {
    ChatLib.chat("§7Usage: /dhide <command> [option]");
    ChatLib.chat("§7Command: ");
    ChatLib.chat("§7  - §aget");
    ChatLib.chat("§7     Get the current status of the options.");
    ChatLib.chat("§7  - §atoggle [fa / venom / thunder / noncrit]");
    ChatLib.chat("§7     Toggle the specified option. All are on by default.");
    ChatLib.chat("§7  - §adebug:");
    ChatLib.chat("§7     Toggle debug mode.");
    ChatLib.chat("§7  - §aall [on|off]:");
    ChatLib.chat("§7     Turn all options on or off.");
    ChatLib.chat("§7  - §aand a secret command.");
}

function inverse(name) {
    hideSettings.hider[name] = !hideSettings.hider[name];
}

const commandActions = {
    "fa": {
        action: () => {
            inverse("fa");
            return `Fire Aspect hiding is now ${Settings.hideFireAspect ? "ON" : "OFF"}.`;
        }
    },
    "venom": {
        action: () => {
            inverse("venom");
            return `Venomous hiding is now ${Settings.hideVenomous ? "ON" : "OFF"}.`;
        }
    },
    "thunder": {
        action: () => {
            inverse("thunder");
            return `Thunderlord hiding is now ${Settings.hideThunderlord ? "ON" : "OFF"}.`;
        }
    },
    "noncrit": {
        action: () => {
            inverse("nonCrit");
            return `Non-crit hiding is now ${Settings.hideNonCrit ? "ON" : "OFF"}.`;
        }
    }
};

function setAll(value) {
    for (let key in hideSettings.hider) {
        hideSettings.hider[key] = value;
    }
}

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
            chat("§aCurrent settings: (true = on, false = off)");
            chat("Fire Aspect: " + hideSettings.hider.fa);
            chat("Venomous: " + hideSettings.hider.venom);
            chat("Thunderlord: " + hideSettings.hider.thunder);
            chat("Non-crit: " + hideSettings.hider.nonCrit);
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
                setAll(true);
                chat("All options are now ON.");
            } else if (subsub == "off") {
                setAll(false);
                chat("All options are now OFF.");
            } else chat("Invalid option: " + subsub);
            break;
        default:
            chat("Unknown command: " + subCmd);
            break;
    }

    hideSettings.save();

}).setName("dhide")

const ArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");
function getAllEntities5x5() {
    let armorstands = World.getAllEntitiesOfType(ArmorStand.class);
    let i = 0;
    armorstands.forEach((entity) => {
        if (entity.getName().includes("Armor Stand")) return;
        if (entity.getName().includes("[Lv")) return;

        debug("Entity " + i++ + ": " + entity.getName() + " -> type: " + isType(entity.getName()));
    });
}

const DamageType = { Fire: "fire", Venom: "venom", Thunder: "thunder", Noncrit: "noncrit", Other: "other" };
const isType = (damageStr) => {
    if (damageStr.startsWith("§6")) return DamageType.Fire;
    else if (damageStr.startsWith("§2")) return DamageType.Venom;
    else if (damageStr.startsWith("§9")) return DamageType.Thunder;
    else if (damageStr.startsWith("§7")) return DamageType.Noncrit;
    else return DamageType.Other;
}

register("renderEntity", (entity, pos, partialTick, event) => {
    switch (isType(entity.getName())) {
        case DamageType.Fire:
            if (Settings.hideFireAspect) cancel(event);
            debug("Fire Aspect entity found: " + entity.getName());
            break;
        case DamageType.Venom:
            if (Settings.hideVenomous) cancel(event);
            debug("Venomous entity found: " + entity.getName());
            break;
        case DamageType.Thunder:
            if (Settings.hideThunderlord) cancel(event);
            debug("Thunderlord entity found: " + entity.getName());
            break;
        case DamageType.Noncrit:
            if (Settings.hideNonCrit) cancel(event);
            debug("Non-crit entity found: " + entity.getName());
            break;
    }
})

ChatLib.chat(Settings.prefix + "Damage Hider loaded! Run /dhide for more info.");