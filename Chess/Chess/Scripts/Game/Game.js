

//-------------------------------------------------------------------------
// Game
//-------------------------------------------------------------------------
function Game()
{
	
    //-------------------------------------------------------------------------
    // Initialize a new game.
    this.initialize = function (canvas) 
    {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");

        this.players = [
            new Player(Teams.white),
            new Player(Teams.black)
        ];

        this.board = new ChessBoard();
        this.board.setupBoard();

        this.squareSize = 64;
        this.boardPosX = 0;
        this.boardPosY = 0;
        
        this.dragging = false;
        this.dragPiece = null;
        this.dragStartSquare = null;
    }

    //-------------------------------------------------------------------------
    // Get the player who's on the given team.
    this.getPlayer = function (team)
    {
        return this.players(team)
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
            // Place this piece down.
            if (square != null && square.piece == null)
            {
                square.piece = this.dragPiece;
            }
            else
            {
                // Invalid placement! Return it to its original position.
                this.dragStartSquare.piece = this.dragPiece;
            }

            this.dragging = false;
            this.dragPiece = null;
            this.dragStartSquare = null;
        }
        else if (square != null && square.piece != null)
        {
            // Start dragging this piece.
            this.dragging = true;
            this.dragPiece = square.piece;
            this.dragStartSquare = square;
            square.piece = null;
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

		// Draw the grid square background.
		var isBlack = (y % 2 == 0 ? (x % 2 == 1) : (x % 2 == 0));
		if (isBlack)
			this.context.fillStyle = "gray";
		else
			this.context.fillStyle = "white";
        this.context.fillRect(drawPosX, drawPosY,
			this.squareSize, this.squareSize);
		
        var square = this.board.grid[x][y];
		var piece = square.piece;

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

