

//-----------------------------------------------------------------------------
// Teams - An enumeration of the possible chess teams a player can be
//         (white or black)
//-----------------------------------------------------------------------------
Teams = {

    white: 0,
    black: 1,


    //-----------------------------------------------------------------------
    // Get the team name for the given team index
    getName: function(teamIndex) {
        if (teamIndex == Teams.white)
            return "White";
        if (teamIndex == Teams.black)
            return "Black";
        return "Unknown";
    },

    //-----------------------------------------------------------------------
    // Get the given team's opponent team index.
    getOpponent: function(teamIndex) {
        return (1 - teamIndex);
    }
}


//-----------------------------------------------------------------------------
// Player
//-----------------------------------------------------------------------------
function Player(team, name)
{
    this.team = team;
    this.name = name;

    // List of ChessPiece objects which are currently in play for this player.
    this.piecesInPlay = [];

    // List of piece types this player has captured.
    this.capturedPieceTypes = [];

    
    //-----------------------------------------------------------------------
    // Clear the piece lists for this player.
    this.reset = function() {
        this.piecesInPlay = [];
        this.capturedPieceTypes = [];
    };
    
    //-----------------------------------------------------------------------
    // Called when a piece is captured by this player.
    this.onCapturePiece = function(piece) {
        this.capturedPieceTypes.push(piece.pieceType);
    }
}
