

function Game()
{
			
    // Initialize a new game.
    this.initialize = function (canvas) 
    {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");

        this.board = new ChessBoard();
        this.board.setupBoard();

        this.squareSize = 64;

        this.dragging = false;
        this.draggedPiece = null;
    }

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
        if (square != null)
        {
            if (square.piece != null)
                console.log("clicked on a " + square.piece.pieceType.name + "!");
            else
                console.log("clicked on an empty square!");
        }
    }

    // Called when a mouse button releases on the canvas.
    this.onMouseUp = function (event)
    {

    }

    // Called when the mouse is moved over the canvas.
    this.onMouseMove = function (event)
    {
        // Get the square location that the mouse is hovering over.
        var clientRect = canvas.getBoundingClientRect();
        var mouseX = Math.floor(event.clientX - clientRect.left);
        var mouseY = Math.floor(event.clientY - clientRect.top);
        var squareX = Math.floor(mouseX / this.squareSize);
        var squareY = Math.floor(mouseY / this.squareSize);
    }

    // Update the game for a single frame.
    this.update = function ()
    {

    }

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
			
		var piece = this.board.grid[x][y].piece;

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

