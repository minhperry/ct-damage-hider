import Settings from "../setting/setting";
import { chat, debug } from "../utils/chat";

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