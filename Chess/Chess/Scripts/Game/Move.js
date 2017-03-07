

//-----------------------------------------------------------------------------
// Move - description of a single move in chess.
//-----------------------------------------------------------------------------
function Move() {

    this.moveNumber   = 1;               // The squence number of this move.
    this.team         = Teams.white;     // The team which the moved piece belongs to.
    this.piece        = Pieces.none;     // The piece type that is moved.
    this.from         = new Point(0, 0); // The location the piece moves from.
    this.to           = new Point(0, 0); // The location the piece moves to.
    this.capturePiece = Pieces.none;     // The type of the captured piece.
    this.promotePiece = Pieces.none;     // The piece type that a pawn would get promoted to.
    this.check        = false;           // Does this move put the opponent in check?
    this.checkmate    = false;           // Does this move put the opponent in checkmate?
    this.castling     = false;           // Is this a special castling move?


    //-------------------------------------------------------------------------
    // Get a description of what happings during this move.
    this.getDescription = function() {
        var description = "Moving " + Teams.getName(this.team) +
            " " + Pieces.getName(this.piece) +
            " from " + Notation.getLocationNotation(this.from) +
            " to " + Notation.getLocationNotation(this.to);
        if (this.capturePiece != Pieces.none)
            description += ", capturing a " + Pieces.getName(this.capturePiece);
        return description;
    }
}



//-----------------------------------------------------------------------------
// MoveLog - stores a list of all moves for a single chess game.
//-----------------------------------------------------------------------------
function MoveLog()
{
    this.moves = [];

    //-------------------------------------------------------------------------
    // Add a move to the log.
    this.addMove = function(move) {
        this.moves.push(move);
    };

    //-------------------------------------------------------------------------
    // Clear the log of all moves.
    this.clear = function() {
        this.moves = [];
    };
    
    //-------------------------------------------------------------------------
    // Get the last made move or null.
    this.getLastMove = function() {
        if (this.moves.length > 0)
            return this.moves[this.moves.length - 1];
        return null
    }
}


//-----------------------------------------------------------------------------
// Convert a move log to a string, with a list move notations, delimeted by
// spaces. Example: Pc7c5 Nb8c6 Pf7f5 Ke8f7 Pb7b5 Pa7a5 Nc6d4
MoveLog.prototype.toString = function () {
    var str = "";
    for (var i = 0; i < this.moves.length; i++) {
        if (i > 0)
            str += " ";
        str += Notation.getMoveNotation(this.moves[i]);
    }
    return str;
}

