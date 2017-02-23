

function Game()
{
			
    //-------------------------------------------------------------------------
    // Initialize a new game.
    this.initialize = function (canvas) 
    {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");

        this.board = new ChessBoard();
        this.board.setupBoard();

        this.squareSize = 64;

        this.dragging = false;
        this.dragPiece = null;
        this.dragStartSquare = null;
    }

    //-------------------------------------------------------------------------
    // Called when a mouse button presses on the canvas.
    this.onMouseDown = function (event)
    {
        // Get the square location that was clicked on.
        var clientRect = canvas.getBoundingClientRect();
        var mouseX = Math.floor(event.clientX - clientRect.left);
        var mouseY = Math.floor(event.clientY - clientRect.top);
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
            console.log("clicked on a " + square.piece.pieceType.name + "!");
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

    }

    //-------------------------------------------------------------------------
    // Draw the game to the canvas.
    this.draw = function (context)
    {
        this.context = context;

        this.squareSize = Math.floor(context.canvas.height / this.board.height);

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
		// Draw the grid square background.
		var isBlack = (y % 2 == 0 ? x % 2 == 0 : x % 2 == 1);
		if (isBlack)
			this.context.fillStyle = "gray";
		else
			this.context.fillStyle = "white";
        this.context.fillRect(x * this.squareSize, y * this.squareSize,
			this.squareSize, this.squareSize);
		
        var square = this.board.grid[x][y];
		var piece = square.piece;

		// Draw a chess piece that might be on this square.
		if (piece != null)
		{
            var spr = piece.pieceType.sprite;
                            
            if (spr != null && spr.image != null)
            {
				this.context.drawImage(spr.image, spr.sourceX, spr.sourceY,
					spr.sourceWidth, spr.sourceHeight,
					x * this.squareSize, y * this.squareSize,
                    this.squareSize, this.squareSize);
            }
            else
            {
                // Error: image not found! Draw a yellow square instead.
				this.context.fillStyle = "yellow";
        		this.context.fillRect(x * this.squareSize, y * this.squareSize,
					this.squareSize, this.squareSize);
            }
		}
    }

}

