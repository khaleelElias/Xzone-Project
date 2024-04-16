export interface IBetSlip {
    homeTeam: string;
    awayTeam: string;
    date: string;
    league: string;
    homePicked: boolean;
    drawPicked: boolean;
    awayPicked: boolean;
    homeBet: number;
    drawBet: number;
    awayBet: number;
}