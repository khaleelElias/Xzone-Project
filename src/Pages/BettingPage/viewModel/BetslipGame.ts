export type Game = {
    betSlipId: string;
    matches: Match[];
    status: GameStatus;
}

export enum GameStatus {
    NotFound = -1,
    Preparing,
    Started,
    Running,
    Ended,
}

export enum MatchResult {
    First = 1,
    Equal = 2,
    Second = 3
}

export type Match = {
    matchId: string;
    opponent1: string;
    opponent2: string;
    homeTeamLogo: string;
    awayTeamLogo: string;
    startDate: Date;
    league: string;
    homePicked: boolean;
    drawPicked: boolean;
    awayPicked: boolean;
    result: MatchResult;
}