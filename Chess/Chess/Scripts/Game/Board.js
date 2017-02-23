

function BoardSquare(x, y)
{
	this.x = x;
	this.y = y;
    this.piece = null;
}


function ChessBoard()
{
    //-------------------------------------------------------------------------
    this.width = 8;
    this.height = 8;

	// Create an empty grid.
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
    // Setup the board with pieces layed out for a new game.
    this.setupBoard = function ()
    {
        // Load piece sprites.
        var s = 60;
	    this.image = new Image();
	    this.image.src = "ChessPieces.png";

        // Create piece types.
        this.queen  = new ChessPieceType("Queen",  new Sprite(this.image, 0 * s, 0 * s, s, s));
        this.king   = new ChessPieceType("King",   new Sprite(this.image, 1 * s, 0 * s, s, s));
        this.rook   = new ChessPieceType("Rook",   new Sprite(this.image, 2 * s, 0 * s, s, s));
        this.knight = new ChessPieceType("Knight", new Sprite(this.image, 3 * s, 0 * s, s, s));
        this.bishop = new ChessPieceType("Bishop", new Sprite(this.image, 4 * s, 0 * s, s, s));
        this.pawn   = new ChessPieceType("Pawn",   new Sprite(this.image, 5 * s, 0 * s, s, s));

        // Place pieces onto the board for player 1.
        this.placeNewPiece(this.rook,   0, 0);
        this.placeNewPiece(this.knight, 1, 0);
        this.placeNewPiece(this.bishop, 2, 0);
        this.placeNewPiece(this.queen,  3, 0);
        this.placeNewPiece(this.king,   4, 0);
        this.placeNewPiece(this.bishop, 5, 0);
        this.placeNewPiece(this.knight, 6, 0);
        this.placeNewPiece(this.rook,   7, 0);
        this.placeNewPiece(this.pawn,   0, 1);
        this.placeNewPiece(this.pawn,   1, 1);
        this.placeNewPiece(this.pawn,   2, 1);
        this.placeNewPiece(this.pawn,   3, 1);
        this.placeNewPiece(this.pawn,   4, 1);
        this.placeNewPiece(this.pawn,   5, 1);
        this.placeNewPiece(this.pawn,   6, 1);
        this.placeNewPiece(this.pawn,   7, 1);

        // Place pieces onto the board for player 2.
        this.placeNewPiece(this.rook,   0, 7);
        this.placeNewPiece(this.knight, 1, 7);
        this.placeNewPiece(this.bishop, 2, 7);
        this.placeNewPiece(this.queen,  3, 7);
        this.placeNewPiece(this.king,   4, 7);
        this.placeNewPiece(this.bishop, 5, 7);
        this.placeNewPiece(this.knight, 6, 7);
        this.placeNewPiece(this.rook,   7, 7);
        this.placeNewPiece(this.pawn,   0, 6);
        this.placeNewPiece(this.pawn,   1, 6);
        this.placeNewPiece(this.pawn,   2, 6);
        this.placeNewPiece(this.pawn,   3, 6);
        this.placeNewPiece(this.pawn,   4, 6);
        this.placeNewPiece(this.pawn,   5, 6);
        this.placeNewPiece(this.pawn,   6, 6);
        this.placeNewPiece(this.pawn,   7, 6);
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
    // Piece a chess piece at the given location
    this.placePiece = function (piece, x, y) 
    {
        this.grid[x][y].piece = piece;
    }
    
    //-------------------------------------------------------------------------
    // Piece a new piece of the given type at the given location.
    this.placeNewPiece = function (pieceType, x, y) 
    {
        this.grid[x][y].piece = new ChessPiece(pieceType, x, y);
    }
}