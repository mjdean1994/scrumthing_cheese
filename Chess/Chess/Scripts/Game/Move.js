

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
}



//-----------------------------------------------------------------------------
// MoveLog - stores a list of all moves for a single chess game.
//-----------------------------------------------------------------------------
function MoveLog()
{
    this.moves = [];

    //-------------------------------------------------------------------------
    // Add a move to the log.
    this.addMove = function (move) {
        this.moves.push(move);
    }

    
}


// Convert a move log to a string, with move notations.
MoveLog.prototype.toString = function () {
    var str = "";
    for (var i = 0; i < this.moves.length; i++) {
        str += Notation.getMoveNotation(this.moves[i]) + " ";
    }
    return str;
}

