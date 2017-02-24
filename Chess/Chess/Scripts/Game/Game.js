

//-----------------------------------------------------------------------------
// Game
//-----------------------------------------------------------------------------
function Game()
{
	
    //-------------------------------------------------------------------------
    // Initialize a new game.
    this.initialize = function (canvas) 
    {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");

        this.squareSize = 64;
        this.boardPosX = 0;
        this.boardPosY = 0;
        this.dragging = false;
        this.dragPiece = null;
        this.dragStartSquare = null;

        this.players = [
            new Player(Teams.white),
            new Player(Teams.black)
        ];

        this.board = new ChessBoard();
        
        this.initializePieceTypes();
        this.initializeBoard();

        this.validMoves = []; // Valid possible moves for selected chess piece.
    }
    
    //-------------------------------------------------------------------------
    // Initialize the possible chess piece types.
    this.initializePieceTypes = function ()
    {
        // Load piece sprite sheet image.
        var s = 60;
	    var image = new Image();
	    image.src = "ChessPieces.png";

        // Create piece types.
        this.queen  = new ChessPieceType("Queen",  new Sprite(image, 0 * s, 1 * s, s, s), new Sprite(image, 0 * s, 0 * s, s, s));
        this.king   = new ChessPieceType("King",   new Sprite(image, 1 * s, 1 * s, s, s), new Sprite(image, 1 * s, 0 * s, s, s));
        this.rook   = new ChessPieceType("Rook",   new Sprite(image, 2 * s, 1 * s, s, s), new Sprite(image, 2 * s, 0 * s, s, s));
        this.knight = new ChessPieceType("Knight", new Sprite(image, 3 * s, 1 * s, s, s), new Sprite(image, 3 * s, 0 * s, s, s));
        this.bishop = new ChessPieceType("Bishop", new Sprite(image, 4 * s, 1 * s, s, s), new Sprite(image, 4 * s, 0 * s, s, s));
        this.pawn   = new ChessPieceType("Pawn",   new Sprite(image, 5 * s, 1 * s, s, s), new Sprite(image, 5 * s, 0 * s, s, s));
    }
    
    //-------------------------------------------------------------------------
    // Setup the board with pieces laid out for a new game.
    this.initializeBoard = function ()
    {
        // Place pieces onto the board for the black player.
        this.getPlayer(Teams.black).piecesInPlay =
        [
            this.board.placeNewPiece(0, 0, Teams.black, this.rook),
            this.board.placeNewPiece(1, 0, Teams.black, this.knight),
            this.board.placeNewPiece(2, 0, Teams.black, this.bishop),
            this.board.placeNewPiece(3, 0, Teams.black, this.queen),
            this.board.placeNewPiece(4, 0, Teams.black, this.king),
            this.board.placeNewPiece(5, 0, Teams.black, this.bishop),
            this.board.placeNewPiece(6, 0, Teams.black, this.knight),
            this.board.placeNewPiece(7, 0, Teams.black, this.rook),
            this.board.placeNewPiece(0, 1, Teams.black, this.pawn),
            this.board.placeNewPiece(1, 1, Teams.black, this.pawn),
            this.board.placeNewPiece(2, 1, Teams.black, this.pawn),
            this.board.placeNewPiece(3, 1, Teams.black, this.pawn),
            this.board.placeNewPiece(4, 1, Teams.black, this.pawn),
            this.board.placeNewPiece(5, 1, Teams.black, this.pawn),
            this.board.placeNewPiece(6, 1, Teams.black, this.pawn),
            this.board.placeNewPiece(7, 1, Teams.black, this.pawn)
        ];

        // Place pieces onto the board for the white player.
        this.getPlayer(Teams.white).piecesInPlay =
        [
            this.board.placeNewPiece(0, 7, Teams.white, this.rook),
            this.board.placeNewPiece(1, 7, Teams.white, this.knight),
            this.board.placeNewPiece(2, 7, Teams.white, this.bishop),
            this.board.placeNewPiece(3, 7, Teams.white, this.queen),
            this.board.placeNewPiece(4, 7, Teams.white, this.king),
            this.board.placeNewPiece(5, 7, Teams.white, this.bishop),
            this.board.placeNewPiece(6, 7, Teams.white, this.knight),
            this.board.placeNewPiece(7, 7, Teams.white, this.rook),
            this.board.placeNewPiece(0, 6, Teams.white, this.pawn),
            this.board.placeNewPiece(1, 6, Teams.white, this.pawn),
            this.board.placeNewPiece(2, 6, Teams.white, this.pawn),
            this.board.placeNewPiece(3, 6, Teams.white, this.pawn),
            this.board.placeNewPiece(4, 6, Teams.white, this.pawn),
            this.board.placeNewPiece(5, 6, Teams.white, this.pawn),
            this.board.placeNewPiece(6, 6, Teams.white, this.pawn),
            this.board.placeNewPiece(7, 6, Teams.white, this.pawn)
        ];
    }

    //-------------------------------------------------------------------------
    // Get the player who's on the given team.
    this.getPlayer = function (team)
    {
        return this.players[team];
    }

    //-------------------------------------------------------------------------
    // Called when a mouse button presses on the canvas.
    this.onMouseDown = function (event)
    {
        // Get the square location that was clicked on.
        var clientRect = canvas.getBoundingClientRect();
        var mouseX = Math.floor(event.clientX - clientRect.left) - this.boardPosX;
        var mouseY = Math.floor(event.clientY - clientRect.top) - this.boardPosY;
        var squareX = Math.floor(mouseX / this.squareSize);
        var squareY = Math.floor(mouseY / this.squareSize);

        // Check if there is a piece in this square.
        var square = game.board.getSquare(squareX, squareY);

        // Check if we are picking up or placing down.
        if (this.dragging)
        {
            // Check if this square is in our list of valid moves.
            var isValidMove = false;
            for (var i = 0; i < this.validMoves.length; i++)
            {
                if (this.validMoves[i].x == squareX &&
                    this.validMoves[i].y == squareY)
                {
                    isValidMove = true;
                    break;
                }
            }

            // Place the piece down.
            if (square != null && !square.hasPiece() && isValidMove)//this.dragPiece.validMove(squareX, squareY))
            {
                square.placePiece(this.dragPiece);
            }
            else
            {
                // Invalid placement! Return it to its original position.
                this.dragStartSquare.placePiece(this.dragPiece);
            }

            this.dragging = false;
            this.dragPiece = null;
            this.dragStartSquare = null;
            this.validMoves = [];
        }
        else if (square != null && square.hasPiece())
        {
            // Start dragging this piece.
            this.dragging = true;
            this.dragPiece = square.pickupPiece();
            this.dragStartSquare = square;
            
            this.validMoves = this.dragPiece.getValidMoves(this.board);
        }
    }

    //-------------------------------------------------------------------------
    // Called when a mouse button releases on the canvas.
    this.onMouseUp = function (event)
    {
    }

    //-------------------------------------------------------------------------
    // Called when the mouse is moved over the canvas.
    this.onMouseMove = function (event)
    {
    }

    //-------------------------------------------------------------------------
    // Update the game for a single frame.
    this.update = function ()
    {
        // Adjust board position and size based on canvas size.
        // Board is made to be centered in the canvas.
        this.squareSize = Math.floor((context.canvas.height / this.board.height) * 0.9);
        var boardWidth = this.squareSize * this.board.width;
        var boardHeight = this.squareSize * this.board.height;
        this.boardPosX = Math.floor((context.canvas.width - boardWidth) / 2);
        this.boardPosY = Math.floor((context.canvas.height - boardHeight) / 2);
    }

    //-------------------------------------------------------------------------
    // Draw the game to the canvas.
    this.draw = function ()
    {
        // Draw each grid square.
		for (var x = 0; x < this.board.width; x += 1)
        {
        	for (var y = 0; y < this.board.height; y += 1)
        	{
                this.drawBoardSquare(x, y);
        	}
        }
    }

    //-------------------------------------------------------------------------
    // Draw the board square at the given location.
    this.drawBoardSquare = function (x, y)
    {
        var drawPosX = this.boardPosX + (x * this.squareSize);
        var drawPosY = this.boardPosY + (y * this.squareSize);
        		
        var square = this.board.grid[x][y];
		var piece = square.piece;
        var isValidMove = false;

        // Check if this square is in our list of valid moves.
        for (var i = 0; i < this.validMoves.length; i++)
        {
            if (this.validMoves[i].x == x &&
                this.validMoves[i].y == y)
            {
                isValidMove = true;
                break;
            }
        }

		// Draw the grid square background.
		var isBlack = (y % 2 == 0 ? (x % 2 == 1) : (x % 2 == 0));
        if (isValidMove)
        {
            if (piece != null)
			    this.context.fillStyle = "red"; // capture move
            else
			    this.context.fillStyle = "yellow";
        }
		else if (isBlack)
			this.context.fillStyle = "gray";
		else
			this.context.fillStyle = "white";
        this.context.fillRect(drawPosX, drawPosY,
			this.squareSize, this.squareSize);

		// Draw a chess piece that might be on this square.
		if (piece != null)
		{
            var spr = piece.getSprite();
            
            // Draw the piece sprite.
            if (spr != null && spr.image != null)
            {
				this.context.drawImage(spr.image, spr.sourceX, spr.sourceY,
					spr.sourceWidth, spr.sourceHeight, drawPosX, drawPosY,
                    this.squareSize, this.squareSize);
            }
            else
            {
                // Error: image not found! Draw a yellow square instead.
				this.context.fillStyle = "yellow";
        		this.context.fillRect(drawPosX, drawPosY,
					this.squareSize, this.squareSize);
            }
		}
    }

}

