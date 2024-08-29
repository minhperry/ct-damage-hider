import Settings from "../setting/setting"

export function chat(msg) {
    ChatLib.chat(Settings.prefix + msg);
}

export function debug(msg) {
    if (!Settings.debug) return;
    ChatLib.chat(Settings.debugPrefix + msg);
}

export function how2Use() {
    ChatLib.chat("§7Usage: /dhide <command> [option]");
    ChatLib.chat("§7Command: ");
    ChatLib.chat("§7  - §aget");
    ChatLib.chat("§7     Get the current status of the options.");
    ChatLib.chat("§7  - §atoggle [fa|venom|thunder|noncrit]");
    ChatLib.chat("§7     Toggle the specified option. All are on by default.");
    ChatLib.chat("§7  - §adebug:");
    ChatLib.chat("§7     Toggle debug mode.");
    ChatLib.chat("§7  - §aall [on|off]:");
    ChatLib.chat("§7     Turn all options on or off.");
    ChatLib.chat("§7  - §aand a secret command.");
}