

//-------------------------------------------------------------------------
// ChessPieceType
//-------------------------------------------------------------------------
function ChessPieceType(name, spriteWhite, spriteBlack)
{
    this.name = name;
    this.spriteWhite = spriteWhite;
    this.spriteBlack = spriteBlack;
}


//-------------------------------------------------------------------------
// ChessPiece
//-------------------------------------------------------------------------
function ChessPiece(pieceType, team)
{
	this.pieceType = pieceType;
    this.team = team;

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

