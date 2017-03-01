

//-----------------------------------------------------------------------------
// Game
//-----------------------------------------------------------------------------
function Game()
{
	// Set this to false for debugging purposes
    this.EnableTurnBasedMovement = true;

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
            new Player(Teams.white, "Player White"),
            new Player(Teams.black, "Player Black")
        ];

        this.board = new ChessBoard();
        
        this.initializePieceTypes();
        this.initializeBoard();

        this.mousePosition = new Point(0, 0);
        this.mouseBoardLocation = new Point(0, 0);

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

    this.updateBoard = function(boardState)
    {
        for (var i = 0; i < 64; i++) {
            var x = i % 8;
            var y = Math.floor(i / 8);
            console.log(x + "," + y);
            var team;
            if (boardState[i] == boardState[i].toUpperCase())
            {
                team = Teams.black;
            }
            else
            {
                team = Teams.white;
            }

            if (boardState[i] == "P" || boardState[i] == "p") {
                this.board.placeNewPiece(x, y, team, this.pawn)
            }
            else if (boardState[i] == "K" || boardState[i] == "k") {
                this.board.placeNewPiece(x, y, team, this.king)
            }
            else if (boardState[i] == "Q" || boardState[i] == "q") {
                this.board.placeNewPiece(x, y, team, this.queen)
            }
            else if (boardState[i] == "N" || boardState[i] == "n") {
                this.board.placeNewPiece(x, y, team, this.knight)
            }
            else if (boardState[i] == "R" || boardState[i] == "r") {
                this.board.placeNewPiece(x, y, team, this.rook)
            }
            else if (boardState[i] == "B" || boardState[i] == "b") {
                this.board.placeNewPiece(x, y, team, this.bishop)
            }
            else {
                this.board.getSquare(x,y).pickupPiece();
            }
        }
    }

    //-------------------------------------------------------------------------
    // Get the player who's on the given team.
    this.getPlayer = function (team)
    {
        return this.players[team];
    }

    this.IsTurnToMove = function()
    {
        return ($("#turn").val() == 1 && $("#team").val() == "black") || ($("#turn").val() == 0 && $("#team").val() == "white");
    }

    this.CanMovePiece = function(piece)
    {
        return ($("#team").val() == "white" && piece.team == 0) || ($("#team").val() == "black" && piece.team == 1);
    }

    //-------------------------------------------------------------------------
    // Called when a mouse button presses on the canvas.
    this.onMouseDown = function (event)
    {
        if (this.IsTurnToMove() && this.EnableTurnBasedMovement)
        {
            //if it isn't your turn to moved...do nothing
            return;
        }

        // Get the square that the mouse is hovering over.
        var square = game.board.getSquare(
            this.mouseBoardLocation.x,
            this.mouseBoardLocation.y);

        // Check if we are picking up or placing down.
        if (this.dragging)
        {
            // Check if this square is in our list of valid moves.
            var isValidMove = false;
            for (var i = 0; i < this.validMoves.length; i++)
            {
                if (this.validMoves[i].x == this.mouseBoardLocation.x &&
                    this.validMoves[i].y == this.mouseBoardLocation.y)
                {
                    isValidMove = true;
                    break;
                }
            }

            // Place the piece down.
            if (square != null && isValidMove)
            {
                if (square.hasPiece())
                {
                    // Capture!!!!
                    var opponentTeam = this.getPlayer(1 - this.dragPiece.team);
                    opponentTeam.piecesCaptured.push(square.pickupPiece());
                }

                square.placePiece(this.dragPiece);

                updateServerBoard(this.generateBoardState());
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
            if (this.CanMovePiece(square.piece))
            {
                // Start dragging this piece.
                this.dragging = true;
                this.dragPiece = square.pickupPiece();
                this.dragStartSquare = square;

                this.validMoves = this.dragPiece.getValidMoves(this.board);
            }
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
        // Update the mouse position and grid location.
        var clientRect = canvas.getBoundingClientRect();
        this.mousePosition = new Point(
            Math.floor(event.clientX - clientRect.left),
            Math.floor(event.clientY - clientRect.top));
        this.mouseBoardLocation = new Point(
            Math.floor((this.mousePosition.x - this.boardPosX) / this.squareSize),
            Math.floor((this.mousePosition.y - this.boardPosY) / this.squareSize));

        // Check if the mouse is hovering over a movable piece.
        var square = game.board.getSquare(this.mouseBoardLocation.x, this.mouseBoardLocation.y);
        if (square != null && square.hasPiece() && this.CanMovePiece(square.piece)) {
            this.canvas.style.cursor = "pointer";
        }
        else {
            this.canvas.style.cursor = "default";
        }
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
        var border = this.squareSize * 0.25;
        var captureBoxSize = new Point(240, 140);
        var captureBoxOffset = 20;
        var captureBoxBorder = 6;
        var captureBoxTitleHeight = 20;
        var capturePieceSize = 30;
        var capturePieceSpacing = 2;
        var captureBoxBorderColor = "#f4d6b7";
        var captureBoxBackgroundColor = "white";

        var backgroundRect = new Rect(0, 0, this.canvas.width, this.canvas.height);

        var boardRect = new Rect(
            this.boardPosX,
            this.boardPosY,
            this.board.width * this.squareSize,
            this.board.height * this.squareSize);
        var boardRectBorder = new Rect(
            boardRect.x - border, boardRect.y - border,
            boardRect.width + 2*border, boardRect.height + 2*border);

        var captureBox = [
            new Rect(
                boardRectBorder.x + boardRectBorder.width + captureBoxOffset,
                boardRectBorder.y,
                captureBoxSize.x,
                captureBoxSize.y),
            new Rect(
                boardRectBorder.x + boardRectBorder.width + captureBoxOffset,
                boardRectBorder.y + boardRectBorder.height - captureBoxSize.y,
                captureBoxSize.x,
                captureBoxSize.y)
        ];
        
        // Draw canvas background.
        var backgroundColor = "white";
        this.fillRect(backgroundRect, backgroundColor);
        
        // Draw chess board border and background.
		this.context.fillStyle = "#a06f3e";
        this.context.fillRect(boardRect.x - border, boardRect.y - border,
            boardRect.width + 2*border, boardRect.height + 2*border);
		this.context.strokeStyle = "black";

        // Draw each board square.
		for (var x = 0; x < this.board.width; x += 1)
        {
        	for (var y = 0; y < this.board.height; y += 1)
        	{
                this.drawBoardSquare(x, y);
        	}
        }

        // Draw chess board outlines.
        this.strokeRect(boardRect, "black");
        this.strokeRect(boardRectBorder, "black");
        
        // Draw captured pieces for each player.
        for (var p = 0; p < 2; p++)
        {
            var player = this.getPlayer(p);
            var numCapturePiecesPerRow = Math.floor(captureBox[p].width / this.squareSize);

            // Determine draw position of the first capture piece.
            var captureDrawPosBegin = new Point(0, 0);
            captureDrawPosBegin.x = captureBox[p].x + captureBox[p].width - this.squareSize;
            captureDrawPosBegin.y = captureBox[p].y;
            if (p == 1)
            {
                captureDrawPosBegin.x = captureBox[p].x;
                captureDrawPosBegin.y = boardRect.y + captureBox[p].height - this.squareSize;
            }

            // Draw capture box background & border.
            this.fillRect(captureBox[p], captureBoxBorderColor);
            var captureBoxInsideRect = new Rect(
                captureBox[p].x + captureBoxBorder,
                captureBox[p].y + captureBoxTitleHeight,
                captureBox[p].width - (2 * captureBoxBorder),
                captureBox[p].height - captureBoxBorder - captureBoxTitleHeight);
            this.fillRect(captureBoxInsideRect, captureBoxBackgroundColor);
            this.strokeRect(captureBox[p], "black");
            this.strokeRect(captureBoxInsideRect, "black");
        
            // Draw player name.
            this.context.font = "16px Arial";
            this.context.fillStyle = "black";
            this.context.textBaseline = "middle";
            this.context.fillText(player.name,
                captureBox[p].x + captureBoxBorder,
                captureBox[p].y + (captureBoxTitleHeight / 2));

            // Draw captured pieces inside capture box.
            var drawPos = new Point(capturePieceSpacing / 2, capturePieceSpacing / 2);
            for (var i = 0; i < player.piecesCaptured.length; i++)
            {
                // Draw the piece sprite.
                var piece = player.piecesCaptured[i];
                var spr = piece.getSprite(player.team);
                if (spr != null && spr.image != null)
                {
				    this.context.drawImage(spr.image, spr.sourceX, spr.sourceY,
					    spr.sourceWidth, spr.sourceHeight,
                        captureBoxInsideRect.x + drawPos.x, captureBoxInsideRect.y + drawPos.y,
                        capturePieceSize, capturePieceSize);
                }

                // Move to the draw next position.
                drawPos.x += capturePieceSize + capturePieceSpacing;
                if (drawPos.x + capturePieceSize + (capturePieceSpacing / 2) >= captureBoxInsideRect.width)
                {
                    drawPos.x = 0;
                    drawPos.y += capturePieceSize + capturePieceSpacing;
                }
            }
        }

        // Draw dragged piece.
        if (this.dragPiece != null) {
            
            this.drawPiece(this.dragPiece,
                this.mousePosition.x - (this.squareSize / 2),
                this.mousePosition.y - (this.squareSize / 2));
        }
    }

    //-------------------------------------------------------------------------
    // Draw the board square at the given location.
    this.drawBoardSquare = function (x, y)
    {
        var drawPosX = this.boardPosX + (x * this.squareSize);
        var drawPosY = this.boardPosY + (y * this.squareSize);
        var squareRect = new Rect(drawPosX, drawPosY, this.squareSize, this.squareSize);
        		
        var square = this.board.grid[x][y];
		var piece = square.piece;
        var isValidMove = false;

        var squareColors = ["#f4d6b7", "#a06f3e"];
        var squareMoveColors = ["#FFFF00", "#888800"];


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
		var colorIndex = (y % 2 == 0 ? (x % 2) : (1 - (x % 2)));
        this.fillRect(squareRect, squareColors[colorIndex]);

        // Highlight valid move squares.
        if (isValidMove) {
            if (piece != null) {
                this.fillRect(squareRect, "rgba(255, 0, 0, 0.5)"); // capture move
                this.strokeRect(squareRect, "rgba(128, 0, 0, 1.0)");
            }
            else
            {
                this.fillRect(squareRect, "rgba(0, 255, 0, 0.5)");
                this.strokeRect(squareRect, "rgba(0, 255, 0, 1.0)");
            }
        }

		// Draw a chess piece that might be on this square.
		if (piece != null)
            this.drawPiece(piece, drawPosX, drawPosY);
    }

    //-------------------------------------------------------------------------
    // Draw a single chess piece at the given position.
    this.drawPiece = function(piece, x, y) {
        var spr = piece.getSprite();
        if (spr != null && spr.image != null) {
			this.context.drawImage(spr.image, spr.sourceX, spr.sourceY,
				spr.sourceWidth, spr.sourceHeight, x, y,
                this.squareSize, this.squareSize);
        }
    }
    
    //-------------------------------------------------------------------------
    this.strokeRect = function(rect, color) {
		this.context.strokeStyle = color;
        this.context.strokeRect(rect.x, rect.y, rect.width, rect.height);
    }

    this.fillRect = function(rect, color) {
		this.context.fillStyle = color;
        this.context.fillRect(rect.x, rect.y, rect.width, rect.height);
    }

    this.generateBoardState = function()
    {
        var boardState = "";

        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                var square = game.board.getSquare(j, i);
                var piece = square.piece;

                if (!piece) {
                    boardState += "0";
                    continue;
                }

                var pieceName = piece.pieceType.name;
                var pieceTeam = piece.team;

                if (pieceName == "Pawn") {
                    if (pieceTeam == 1) {
                        boardState += "P";
                    }
                    else {
                        boardState += "p";
                    }
                }

                if (pieceName == "Knight") {
                    if (pieceTeam == 1) {
                        boardState += "N";
                    }
                    else {
                        boardState += "n";
                    }
                }

                if (pieceName == "Queen") {
                    if (pieceTeam == 1) {
                        boardState += "Q";
                    }
                    else {
                        boardState += "q";
                    }
                }

                if (pieceName == "King") {
                    if (pieceTeam == 1) {
                        boardState += "K";
                    }
                    else {
                        boardState += "k";
                    }
                }

                if (pieceName == "Bishop") {
                    if (pieceTeam == 1) {
                        boardState += "B";
                    }
                    else {
                        boardState += "b";
                    }
                }

                if (pieceName == "Rook") {
                    if (pieceTeam == 1) {
                        boardState += "R";
                    }
                    else {
                        boardState += "r";
                    }
                }
            }
        }

        return boardState;
    }

}

