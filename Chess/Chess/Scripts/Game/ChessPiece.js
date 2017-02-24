

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
// Move - Represents a move to a specific location.
//-------------------------------------------------------------------------
function Move(x, y)
{
    this.x = x;
    this.y = y;
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

    //---------------------------------------------------------------------
    // Get a list of valid moves this piece can make given the board state.
    this.getValidMoves = function(board)
    {
        var moves = [];
        
        // TODO: use actual move rules.
        if (this.x < board.width - 1)
            moves.push(new Move(this.x + 1, this.y));
        if (this.x > 0)
            moves.push(new Move(this.x - 1, this.y));
        if (this.y < board.height - 1)
            moves.push(new Move(this.x, this.y + 1));
        if (this.y > 0)
            moves.push(new Move(this.x, this.y - 1));

        return moves;
    }

    //---------------------------------------------------------------------
    // Check if move is valid.
    this.validMove = function (targetX, targetY) {
        var x = this.x;
        var y = this.y;
        switch(this.pieceType.name){
            case "Pawn":
                if (this.team == Teams.black) {
                    if (y == 1) {
                        if (targetY - y <= 2 && targetY > y && targetX == x)
                            return true;
                        else
                            return false;
                    }
                    else if (targetY - y == 1 && targetX == x)
                        return true;
                    else
                        return false;
                }
                else if (this.team == Teams.white) {
                    if (y == 6) {
                        if (targetY - y >= -2 && targetY < y && targetX == x)
                            return true;
                        else
                            return false;
                    }
                    else if (targetY - y == -1 && targetX == x)
                        return true;
                    else
                        return false;
                }
                return true;
                    break;
            case "Knight":
                if (Math.abs(targetX - x) == 2 && Math.abs(targetY - y) == 1)
                    return true;
                else if (Math.abs(targetX - x) == 1 && Math.abs(targetY - y) == 2)
                    return true;
                else
                    return false;
                break;
            case "Bishop":
                if (Math.abs(targetX - x) == Math.abs(targetY - y) && targetX - x != 0)
                    return true;
                else
                    return false;
                break;
            case "Rook":
                if (targetX - x != 0 && targetY - y == 0)
                    return true;
                else if (targetX - x == 0 && targetY - y != 0)
                    return true;
                else
                    return false;
                break;
            case "Queen":
                if (Math.abs(targetX - x) == Math.abs(targetY - y) && targetX - x != 0)
                    return true;
                else if (targetX - x != 0 && targetY - y == 0)
                    return true;
                else if (targetX - x == 0 && targetY - y != 0)
                    return true;
                else
                    return false;
                break;
            case "King":
                if (Math.abs(targetX - x) <= 1 && Math.abs(targetY - y) <= 1)
                    if (targetX - x != 0 || targetY - y != 0)
                        return true;
                    else
                        return false;
                break;
            default:
                return true;

        }
    }
}

