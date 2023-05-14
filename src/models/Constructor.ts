import { ConstructorIndex } from "./Indexes"


type Constructor = {
    id: ConstructorIndex;
    name: string;
    points: number;
    position:number;
}

export default Constructor;