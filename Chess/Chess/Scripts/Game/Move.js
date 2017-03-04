

//-----------------------------------------------------------------------------
// Move - description of a single move in chess.
//-----------------------------------------------------------------------------
function Move() {

    this.moveNumber   = 1;
    this.team         = Teams.white;
    this.piece        = Pieces.none;
    this.from         = new Point(0, 0);
    this.to           = new Point(0, 0);
    this.capturePiece = Pieces.none;
    this.promotePiece = Pieces.none;
    this.check        = false;
    this.checkmate    = false;
    this.castling     = false;


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

