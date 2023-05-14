import { ConstructorIndex } from "./indexes"


type Constructor = {
    id: ConstructorIndex;
    name: string;
    points: number;
    position:number;
}

export default Constructor;