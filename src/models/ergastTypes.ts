interface Constructor {
    constructorId: string;
    url: string;
    name: string;
    nationality: string;
}

interface ConstructorStanding {
    Constructor: Constructor;
    points: string;
    position: string;
    positionText: string;
    wins: string;
}

type Driver = {
    driverId: string;
    permanentNumber: string;
    code: string;
    url: string;
    givenName: string;
};

type DriverStanding = {
    Constructors: any[]; // Ajusta este tipo según tus necesidades
    Driver: Driver;
    points: string;
    position: string;
    positionText: string;
    wins: string;
};

type StandingsList = {
    DriverStandings: DriverStanding[],
    ConstructorStandings: ConstructorStanding[]
    round: string;
    season: string;
};

type StandingsTable = {
    StandingsLists: StandingsList[];
    season: string;
};

type MRData = {
    StandingsTable: StandingsTable;
    limit: string;
    offset: string;
    series: string;
    total: string;
    url: string;
    xmlns: string;
};


export type { Constructor, ConstructorStanding, Driver, DriverStanding, StandingsList, StandingsTable, MRData, }