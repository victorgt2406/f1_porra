import { ConstructorIndex, DriverIndex } from "./Indexes"


type Driver = {
    id: DriverIndex;
    name: string;
    constructor: ConstructorIndex;
    number: number;
    position: number;
    points: number;
}

export default Driver;