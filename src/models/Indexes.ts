type PlayerIndex = "bic" | "dax" | "square";
const PLAYERS = ["bic", "dax", "square"];

type DriverIndex = "max_verstappen" | "perez" | "alonso" | "sainz" | "hamilton" | "stroll" | "russell" | "bottas" | "gasly" | "albon" | "tsunoda" | "sargeant" | "kevin_magnussen" | "de_vries" | "hulkenberg" | "zhou" | "norris" | "ocon" | "leclerc" | "piastri";
const PILOTS = ["max_verstappen", "perez", "alonso", "sainz", "hamilton", "stroll", "russell", "bottas", "gasly", "albon", "tsunoda", "sargeant", "kevin_magnussen", "de_vries", "hulkenberg", "zhou", "norris", "ocon", "leclerc", "piastri"];

type ConstructorIndex = "red_bull" | "aston_martin" | "ferrari" | "mercedes" | "alfa" | "alpine" | "williams" | "alphatauri" | "haas" | "mclaren";

const CONSTRUCTORS = ["red_bull", "aston_martin", "ferrari", "mercedes", "alfa", "alpine", "williams", "alphatauri", "haas", "mclaren"];


export {PLAYERS, PILOTS, CONSTRUCTORS};
export type { PlayerIndex, DriverIndex, ConstructorIndex };