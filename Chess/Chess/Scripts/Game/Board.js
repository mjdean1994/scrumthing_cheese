

//-----------------------------------------------------------------------------
// BoardSquare - A single square in a chess board, that can have a piece
//               located on it.
//-----------------------------------------------------------------------------
function BoardSquare(x, y)
{
	this.x = x;
	this.y = y;
    this.piece = null;

    
    //-------------------------------------------------------------------------
    // Return true if there is a chess piece on this square.
    this.hasPiece = function (piece)
    {
        return (this.piece != null);
    }

    //-------------------------------------------------------------------------
    // Place a chess piece on this square.
    this.placePiece = function (piece) 
    {
        this.piece = piece;
        piece.x = this.x;
        piece.y = this.y;
    }

    //-------------------------------------------------------------------------
    // Pickup and return the chess piece on this square.
    this.pickupPiece = function ()
    {
        var temp = this.piece;
        this.piece = null;
        return temp;
    }
}


//-----------------------------------------------------------------------------
// ChessBoard - A grid of chess board squares.
//-----------------------------------------------------------------------------
function ChessBoard()
{
    this.width = 8;
    this.height = 8;

	// Create an empty grid of squares.
    this.grid = new Array(this.width);
    for (var x = 0; x < this.width; x += 1)
    {
        this.grid[x] = Array(this.height);
        for (var y = 0; y < this.height; y += 1)
        {
			this.grid[x][y] = new BoardSquare(x, y);
        }
    }
    
    //-------------------------------------------------------------------------
    // Get a board square at the given location. Returns null if the
    // location is out of bounds.
    this.getSquare = function (x, y)
    {
        if (x < 0 || y < 0 || x >= this.width || y >= this.height)
            return null;
        return this.grid[x][y];
    }
    
    //-------------------------------------------------------------------------
    // Piece an extisting chess piece at the given location
    this.placePiece = function (piece, x, y) 
    {
        this.grid[x][y].piece = piece;
        piece.x = x;
        piece.y = y;
    }
    
    //-------------------------------------------------------------------------
    // Piece a new piece of the given type at the given location.
    this.placeNewPiece = function (x, y, team, pieceType) 
    {
        var piece = new ChessPiece(pieceType, team, x, y);
        this.grid[x][y].piece = piece;
        return piece;
    }
}

