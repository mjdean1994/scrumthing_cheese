
//-------------------------------------------------------------------------
// BoardSquare - A single square in a chess board, that can have a piece
//               located on it.
//-------------------------------------------------------------------------
function BoardSquare(x, y)
{
	this.x = x;
	this.y = y;
    this.piece = null;
}


//-------------------------------------------------------------------------
// ChessBoard
//-------------------------------------------------------------------------
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
        this.queen  = new ChessPieceType("Queen",  new Sprite(this.image, 0 * s, 1 * s, s, s), new Sprite(this.image, 0 * s, 0 * s, s, s));
        this.king   = new ChessPieceType("King",   new Sprite(this.image, 1 * s, 1 * s, s, s), new Sprite(this.image, 1 * s, 0 * s, s, s));
        this.rook   = new ChessPieceType("Rook",   new Sprite(this.image, 2 * s, 1 * s, s, s), new Sprite(this.image, 2 * s, 0 * s, s, s));
        this.knight = new ChessPieceType("Knight", new Sprite(this.image, 3 * s, 1 * s, s, s), new Sprite(this.image, 3 * s, 0 * s, s, s));
        this.bishop = new ChessPieceType("Bishop", new Sprite(this.image, 4 * s, 1 * s, s, s), new Sprite(this.image, 4 * s, 0 * s, s, s));
        this.pawn   = new ChessPieceType("Pawn",   new Sprite(this.image, 5 * s, 1 * s, s, s), new Sprite(this.image, 5 * s, 0 * s, s, s));

        // Place pieces onto the board for the white player.
        this.placeNewPiece(0, 0, Teams.black, this.rook);
        this.placeNewPiece(1, 0, Teams.black, this.knight);
        this.placeNewPiece(2, 0, Teams.black, this.bishop);
        this.placeNewPiece(3, 0, Teams.black, this.queen);
        this.placeNewPiece(4, 0, Teams.black, this.king);
        this.placeNewPiece(5, 0, Teams.black, this.bishop);
        this.placeNewPiece(6, 0, Teams.black, this.knight);
        this.placeNewPiece(7, 0, Teams.black, this.rook);
        this.placeNewPiece(0, 1, Teams.black, this.pawn);
        this.placeNewPiece(1, 1, Teams.black, this.pawn);
        this.placeNewPiece(2, 1, Teams.black, this.pawn);
        this.placeNewPiece(3, 1, Teams.black, this.pawn);
        this.placeNewPiece(4, 1, Teams.black, this.pawn);
        this.placeNewPiece(5, 1, Teams.black, this.pawn);
        this.placeNewPiece(6, 1, Teams.black, this.pawn);
        this.placeNewPiece(7, 1, Teams.black, this.pawn);

        // Place pieces onto the board for the black player.
        this.placeNewPiece(0, 7, Teams.white, this.rook);
        this.placeNewPiece(1, 7, Teams.white, this.knight);
        this.placeNewPiece(2, 7, Teams.white, this.bishop);
        this.placeNewPiece(3, 7, Teams.white, this.queen);
        this.placeNewPiece(4, 7, Teams.white, this.king);
        this.placeNewPiece(5, 7, Teams.white, this.bishop);
        this.placeNewPiece(6, 7, Teams.white, this.knight);
        this.placeNewPiece(7, 7, Teams.white, this.rook);
        this.placeNewPiece(0, 6, Teams.white, this.pawn);
        this.placeNewPiece(1, 6, Teams.white, this.pawn);
        this.placeNewPiece(2, 6, Teams.white, this.pawn);
        this.placeNewPiece(3, 6, Teams.white, this.pawn);
        this.placeNewPiece(4, 6, Teams.white, this.pawn);
        this.placeNewPiece(5, 6, Teams.white, this.pawn);
        this.placeNewPiece(6, 6, Teams.white, this.pawn);
        this.placeNewPiece(7, 6, Teams.white, this.pawn);
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
    this.placeNewPiece = function (x, y, team, pieceType) 
    {
        this.grid[x][y].piece = new ChessPiece(pieceType, team);
    }
}