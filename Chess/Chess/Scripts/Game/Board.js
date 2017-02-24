

//-----------------------------------------------------------------------------
// BoardSquare - A single square in a chess board, that can have a piece
//               located on it.
//-----------------------------------------------------------------------------
function BoardSquare(x, y)
{
	this.x = x;
	this.y = y;
	this.size = 64;
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
    //--------------------------------------------------------------------------
    // Animate the motion of a piece from its current location to this square
    this.movePiece = function (piece, startSquare) {
        var targetX = this.x;
        var targetY = this.y;
        var xDist = targetX - sourceX;
        xDist = xDist * this.size;
        var yDist = targetY - sourceY;
        yDist = yDist * this.size;
        var frames = Math.floor(Math.sqrt(xDist * xDist + yDist * yDist)));
        var xRatio = xDist / yDist;
        var yRation = yDist / xDist;
        var xDisplace = xDist / (frames * xRatio);
        var yDisplace = yDist / (frames * yRatio);
        var pos = 0;
        var id = setInterval(frame, 5);
        var spr = piece.getSprite;
        startSquare.piece = null;
        function frame() {
            if (pos == frames) {
                clearInterval(id);
            } 
            else {
                pos++;
                spriteX += xDsiplace;
                spriteY += yDisplace;
                $("canvas").getContext("2d").draw(spr.image, spr.sourceX, spr.sourceY,
					spr.sourceWidth, spr.sourceHeight, spriteX, spriteY,
                    this.squareSize, this.squareSize)
            }
        }
        this.piece = piece;
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

