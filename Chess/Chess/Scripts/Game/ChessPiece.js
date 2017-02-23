

//-------------------------------------------------------------------------
// ChessPieceType - A unique piece type that a chess piece can be.
//                  (Pawn, Rook, Bishop, Knight, King, Queen)
//-------------------------------------------------------------------------
function ChessPieceType(name, spriteWhite, spriteBlack)
{
    this.name = name;
    this.spriteWhite = spriteWhite;
    this.spriteBlack = spriteBlack;
}


//-------------------------------------------------------------------------
// ChessPiece - An instance of a chess piece in the game.
//-------------------------------------------------------------------------
function ChessPiece(pieceType, team, x, y)
{
	this.pieceType = pieceType;
    this.team = team;
    this.x = x;
    this.y = y;
    this.captured = false;

    //---------------------------------------------------------------------
    // Get the sprite for this chess piece.
    this.getSprite = function ()
    {
        if (this.team == Teams.white)
            return this.pieceType.spriteWhite;
        else if (this.team == Teams.black)
            return this.pieceType.spriteBlack;
        return null;
    }
}

