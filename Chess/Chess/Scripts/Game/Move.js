

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


    //-----------------------------------------------------------------------------
    // Return the string notation for this move.
    // This omits the move number and team.
    this.getNotation = function() {
        var result = "";
        
        result += this.piece;
        result += Notation.pointNotation(this.from);
        result += Notation.pointNotation(this.to);

        if (this.promotePiece != Pieces.none)
            result += "=" + this.promotePiece;
        if (this.capturePiece != Pieces.none)
            result += "x" + this.capturePiece;
        if (this.checkmate)
            result += "#";
        else if (this.check)
            result += "+";

        if (this.castling) {

        }
        
        return result;
    };
}


