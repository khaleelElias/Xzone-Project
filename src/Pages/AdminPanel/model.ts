// Import the types at the top of your file
type BetSlipGameStatus = "Preparing" | "Started" | "Running" | "Ended";
type GameResult = "home" | "draw" | "away";

// Define a new interface for individual games
export interface Game {
  id?: number;
  opponent1?: string;
  opponent2: string;
  GameDateTime: Date;
  gameLeague: string;
  GameResult: GameResult;
  finalResult: number;
}

// Define the ABetSlip interface to include a list of games and a common status
export interface ABetSlip {
  games: Game[];
  date: Date; // Date for the betslip, which might differ from individual game dates
  status: BetSlipGameStatus;
}
