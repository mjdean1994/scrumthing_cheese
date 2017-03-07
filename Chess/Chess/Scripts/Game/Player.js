

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
    this.piecesInPlay = []; // TODO: remove pieces from this list when captured!

    // List of piece types this player has captured.
    this.capturedPieceTypes = [];

    
    //-----------------------------------------------------------------------
    // Clear the piece lists for this player.
    this.reset = function() {
        this.piecesInPlay = [];
        this.capturedPieceTypes = [];
    };
    
    //-----------------------------------------------------------------------
    // Add a piece type to the list of pieces captured by this player.
    this.addCapturedPiece = function(pieceType) {
        this.capturedPieceTypes.push(pieceType);
    }

    //-----------------------------------------------------------------------
    // Remove a single piece from the list of captured pieces.
    this.removeCapturedPiece = function(pieceType) {
        for (var i = 0; i < this.capturedPieceTypes.length; i++) {
            if (this.capturedPieceTypes[i] == pieceType)
            {
                this.capturedPieceTypes.splice(i, 1);
                return;
            }
        }
    }

    //-----------------------------------------------------------------------
    // Add a piece into play for this player.
    this.addPieceIntoPlay = function(piece) {
        this.piecesInPlay.push(piece);
    }

    //-----------------------------------------------------------------------
    // Remove a piece from the player's list of pieces in play.
    this.removePieceFromPlay = function(piece) {
        for (var i = 0; i < this.piecesInPlay.length; i++) {
            if (this.piecesInPlay[i] == piece)
            {
                this.piecesInPlay.splice(i, 1);
                return;
            }
        }
    }
}
