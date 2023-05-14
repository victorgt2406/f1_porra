import { ConstructorIndex, DriverIndex, PlayerIndex } from "./Indexes";

type Porra = {
    player: PlayerIndex;
    pilot: DriverIndex;
    constructor?: ConstructorIndex
    position: number;
    year: number;
}

export default Porra;