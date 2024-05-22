type Game = {
    betSlipId: string;
    matches: Match[];
    status: GameStatus;
}

enum GameStatus {
    Preparing,
    Started,
    Running,
    Ended,
}

type Match = {
    opponent1: string;
    opponent2: string;
    homeTeamLogo: string;
    awayTeamLogo: string;
    startDate: Date;
    league: string;
    homePicked: boolean;
    drawPicked: boolean;
    awayPicked: boolean;
}

export type { Match, Game, GameStatus }