import P from "../../models/porra";

type Player = "bic" | "dax" | "square";
const PLAYERS = ["bic", "dax", "square"];

type Pilot = "max_verstappen" | "perez" | "alonso" | "sainz" | "hamilton" | "stroll" | "russell" | "bottas" | "gasly" | "albon" | "tsunoda" | "sargeant" | "kevin_magnussen" | "de_vries" | "hulkenberg" | "zhou" | "norris" | "ocon" | "leclerc" | "piastri";
const PILOTS = ["max_verstappen", "perez", "alonso", "sainz", "hamilton", "stroll", "russell", "bottas", "gasly", "albon", "tsunoda", "sargeant", "kevin_magnussen", "de_vries", "hulkenberg", "zhou", "norris", "ocon", "leclerc", "piastri"];

type Constructor = "red_bull" | "aston_martin" | "ferrari" | "mercedes" | "alfa" | "alpine" | "williams" | "alphatauri" | "haas" | "mclaren";

const CONSTRUCTORS = ["red_bull", "aston_martin", "ferrari", "mercedes", "alfa", "alpine", "williams", "alphatauri", "haas", "mclaren"];

// interface Porra extends P<Player, Pilot, Constructor> {};
interface Porra extends P<string, string, string> {};

export {PLAYERS, PILOTS, CONSTRUCTORS};
export type { Player, Pilot, Constructor, Porra };