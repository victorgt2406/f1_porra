import { ConstructorIndex, DriverIndex, PlayerIndex } from "./Indexes";

interface DriverPoints {
    driver: DriverIndex;
    points: number;
}
interface ConstructorPoints {
    constructor: ConstructorIndex;
    points: number;
}

interface Result {
    player: PlayerIndex;
    pointsPerDriver: DriverPoints[];
    pointsPerConstructor: ConstructorPoints[];
    pointsTotalDrivers: number;
    pointsTotalConstructor: number;
}

export default Result;

export type { DriverPoints, ConstructorPoints };
