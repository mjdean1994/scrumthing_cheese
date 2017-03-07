

//-----------------------------------------------------------------------------
// Game - A game of chess.
//-----------------------------------------------------------------------------
function Game()
{
	// Set this to false for debugging purposes
    this.EnableTurnBasedMovement = false;

    //-------------------------------------------------------------------------
    // Initialize a new game.
    this.initialize = function (canvas) 
    {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");

        this.moveLog = new MoveLog();

        this.style = new ChessStyle();
        this.pieceSpritesWhite = [];
        this.pieceSpritesBlack = [];

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
        
        this.initializeBoard();

        this.mousePosition = new Point(0, 0);
        this.mouseBoardLocation = new Point(0, 0);

        this.validMoves = []; // Valid possible moves for selected chess piece.

        this.myTurn = false;
    }
    
    //-------------------------------------------------------------------------
    // Setup the board with pieces laid out for a new game.
    this.initializeBoard = function ()
    {
        this.board.clearBoard();
        this.getPlayer(Teams.white).reset();
        this.getPlayer(Teams.black).reset();

        // Place pieces onto the board for the black player.
        this.getPlayer(Teams.black).piecesInPlay =
        [
            this.board.placeNewPiece(0, 0, Teams.black, Pieces.rook),
            this.board.placeNewPiece(1, 0, Teams.black, Pieces.knight),
            this.board.placeNewPiece(2, 0, Teams.black, Pieces.bishop),
            this.board.placeNewPiece(3, 0, Teams.black, Pieces.queen),
            this.board.placeNewPiece(4, 0, Teams.black, Pieces.king),
            this.board.placeNewPiece(5, 0, Teams.black, Pieces.bishop),
            this.board.placeNewPiece(6, 0, Teams.black, Pieces.knight),
            this.board.placeNewPiece(7, 0, Teams.black, Pieces.rook),
            this.board.placeNewPiece(0, 1, Teams.black, Pieces.pawn),
            this.board.placeNewPiece(1, 1, Teams.black, Pieces.pawn),
            this.board.placeNewPiece(2, 1, Teams.black, Pieces.pawn),
            this.board.placeNewPiece(3, 1, Teams.black, Pieces.pawn),
            this.board.placeNewPiece(4, 1, Teams.black, Pieces.pawn),
            this.board.placeNewPiece(5, 1, Teams.black, Pieces.pawn),
            this.board.placeNewPiece(6, 1, Teams.black, Pieces.pawn),
            this.board.placeNewPiece(7, 1, Teams.black, Pieces.pawn)
        ];

        // Place pieces onto the board for the white player.
        this.getPlayer(Teams.white).piecesInPlay =
        [
            this.board.placeNewPiece(0, 7, Teams.white, Pieces.rook),
            this.board.placeNewPiece(1, 7, Teams.white, Pieces.knight),
            this.board.placeNewPiece(2, 7, Teams.white, Pieces.bishop),
            this.board.placeNewPiece(3, 7, Teams.white, Pieces.queen),
            this.board.placeNewPiece(4, 7, Teams.white, Pieces.king),
            this.board.placeNewPiece(5, 7, Teams.white, Pieces.bishop),
            this.board.placeNewPiece(6, 7, Teams.white, Pieces.knight),
            this.board.placeNewPiece(7, 7, Teams.white, Pieces.rook),
            this.board.placeNewPiece(0, 6, Teams.white, Pieces.pawn),
            this.board.placeNewPiece(1, 6, Teams.white, Pieces.pawn),
            this.board.placeNewPiece(2, 6, Teams.white, Pieces.pawn),
            this.board.placeNewPiece(3, 6, Teams.white, Pieces.pawn),
            this.board.placeNewPiece(4, 6, Teams.white, Pieces.pawn),
            this.board.placeNewPiece(5, 6, Teams.white, Pieces.pawn),
            this.board.placeNewPiece(6, 6, Teams.white, Pieces.pawn),
            this.board.placeNewPiece(7, 6, Teams.white, Pieces.pawn)
        ];
    }

    //-------------------------------------------------------------------------
    // Reconstruct the board state given a string containing a list of moves.
    this.updateBoard = function(boardState)
    {
        console.log("updateBoard: " + boardState);

        // Reset the board first.
        this.initializeBoard();

        // Parse each move and apply it to the board.
        var moveStrings = boardState.trim().split(" ");
        this.moveLog.clear();
        for (var i = 0; i < moveStrings.length; i++) {
            if (moveStrings[i].length == 0)
                continue;
            var move = Notation.parseMove(moveStrings[i]);
            this.moveLog.addMove(move);
            this.applyMove(move);

            // DEBUG: print the description for this move.
            //console.log(i + ". " + move.getDescription() + " (" + Notation.getMoveNotation(move) + ")");
        }
    }

    //-------------------------------------------------------------------------
    // Generate a board state string, composed of a list of move notations.
    this.generateBoardState = function()
    {
        return this.moveLog.toString();
    }
    
    //-------------------------------------------------------------------------
    // Apply a move, updating the board and game state.
    this.applyMove = function(move)
    {
        var fromSquare    = this.board.getSquare(move.from.x, move.from.y);
        var toSquare      = this.board.getSquare(move.to.x, move.to.y);
        var movedPiece    = (fromSquare != null ? fromSquare.piece : null);
        var capturedPiece = (toSquare != null ? toSquare.piece : null);
        
        // TODO: castling, check, checkmate

        // Piece capture.
        if (capturedPiece != null) {
            toSquare.pickupPiece();
            this.getPlayer(movedPiece.team).addCapturedPiece(capturedPiece.pieceType);
            this.getPlayer(capturedPiece.team).removePieceFromPlay(capturedPiece);
        }
        
        // Piece movement.
        if (movedPiece != null)
            toSquare.placePiece(fromSquare.pickupPiece());
    
        // Pawn promotion.
        if (move.promotePiece != Pieces.none)
            movedPiece.pieceType = move.promotePiece;
    }

    //-------------------------------------------------------------------------
    // Revert a move, updating the board and game state.
    this.revertMove = function(move)
    {
        var fromSquare = this.board.getSquare(move.from.x, move.from.y);
        var toSquare   = this.board.getSquare(move.to.x, move.to.y);
        var movedPiece = (toSquare != null ? toSquare.piece : null);
        
        // TODO: un-castling.
        
        // Piece un-movement.
        if (movedPiece != null)
            fromSquare.placePiece(toSquare.pickupPiece());
    
        // Pawn un-promotion.
        if (move.promotePiece != Pieces.none)
            movedPiece.pieceType = Pieces.pawn;

        // Piece un-capture.
        if (move.capturePiece != Pieces.none) {
            var opponentTeam = Teams.getOpponent(move.team);
            var uncapturedPiece = toSquare.placeNewPiece(opponentTeam, move.capturePiece);
            this.getPlayer(move.team).removeCapturedPiece(move.capturePiece);
            this.getPlayer(opponentTeam).addPieceIntoPlay(uncapturedPiece);
        }
    }

    //-------------------------------------------------------------------------
    // Get the player who's on the given team.
    this.getPlayer = function (team)
    {
        return this.players[team];
    }

    // Get whose turn it is currently.
    this.getPlayerTurn = function()
    {
        return $("#turn").val();
    }

    // Get which team I am on.
    this.getMyTeam = function()
    {
        if ($("#team").val() == "black")
            return Teams.black;
        return Teams.white;
    }

    // Get which team I am on.
    this.getOpponentTeam = function()
    {
        return Teams.getOpponent(this.getMyTeam());
    }

    // Get the board location after accouning for rotation. A player will
    // always see their board rotated such that their side is at the bottom.
    this.getRotatedBoardLocation = function(location)
    {
        if ($("#team").val() == "black")
            return new Point(this.board.width - 1 - location.x, this.board.height - 1 - location.y);
        else
            return new Point(location.x, location.y);
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
        if (!this.IsTurnToMove() && this.EnableTurnBasedMovement)
        {
            //if it isn't your turn to move...do nothing
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

            // Return the moved piece to its starting location.
            this.dragStartSquare.placePiece(this.dragPiece);

            // Perform the move if is valid.
            if (square != null && isValidMove)
            {
                // Create and send the move request to the server.
                this.sendMoveRequest(
                    new Point(this.dragPiece.x, this.dragPiece.y),
                    this.mouseBoardLocation);
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
                // Pickup and start dragging this piece.
                this.dragging = true;
                this.dragPiece = square.pickupPiece();
                this.dragStartSquare = square;
                this.validMoves = this.dragPiece.getValidMoves(this.board);
            }
        }
    }

    //-------------------------------------------------------------------------
    // Send a move request to the server, moving a piece from one
    // location to another. from and to are Points on the board.
    this.sendMoveRequest = function (from, to)
    {
        // Get the two squares involved.
        var fromSquare = game.board.getSquare(from.x, from.y);
        var toSquare = game.board.getSquare(to.x, to.y);
        if (fromSquare == null || toSquare == null)
            return;
        var fromPiece = fromSquare.piece;
        if (fromPiece == null)
            return;
        var toPiece = toSquare.piece;
        
        // Create the move object.
        var move = new Move();
        move.moveNumber = 1;
        move.team       = fromPiece.team;
        move.piece      = fromPiece.pieceType;
        move.from       = from;
        move.to         = to;
        move.capturePiece = (toPiece != null ? toPiece.pieceType : Pieces.none);
        move.promotePiece = Pieces.none;
        move.check        = false;
        move.checkmate    = false;
        move.castling     = false;

        // TODO: Check for pawn promotion (if pawn reaches top row)
        // For now, just automatically convert pawns to queens.
        //if (move.piece == Pieces.pawn)
            //move.promotePiece = Pieces.queen;
        
        // Update the board state with this move.
        this.applyMove(move);

        // Check if this move puts the opponent in check.
        if (this.isChecking(fromPiece.team))
            move.check = true;

        // TODO: Check if this move puts the opponent in checkmate.

        // Add the move the our move log.
        this.moveLog.addMove(move);
                
        console.log("Move: " + Notation.getMoveNotation(move));

        // Notify the server that a move was made.
        // TODO: this should be replaced with sending a vote for the given move.
        updateServerBoard(this.generateBoardState());
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
        // Update the mouse position and board-square location.
        var clientRect = canvas.getBoundingClientRect();
        this.mousePosition = new Point(
            Math.floor(event.clientX - clientRect.left),
            Math.floor(event.clientY - clientRect.top));
        this.mouseBoardLocation = new Point(
            Math.floor((this.mousePosition.x - this.boardPosX) / this.squareSize),
            Math.floor((this.mousePosition.y - this.boardPosY) / this.squareSize));
        this.mouseBoardLocation = this.getRotatedBoardLocation(this.mouseBoardLocation);

        // Change the cursor if the mouse is hovering over a movable piece.
        var square = game.board.getSquare(
            this.mouseBoardLocation.x,
            this.mouseBoardLocation.y);
        if (square != null && square.hasPiece() &&
            this.CanMovePiece(square.piece))
        {
            this.canvas.style.cursor = "pointer";
        }
        else
        {
            this.canvas.style.cursor = "default";
        }
    }

    //------------------------------------------------------------------------
    //Called to check if the player for team "team" has put the other player in check
    this.isChecking = function(team){
        teamPieces = this.getPlayer(team).piecesInPlay;
        moves = [];
        for (i = 0; i < teamPieces.length; i++) {
            moves = moves.concat(teamPieces[i].getValidMoves(this.board))
        }
        for (i = 0; i < moves.length; i++) {
            if (this.board.getSquare(moves[i].x, moves[i].y).piece != null) {
                if (this.board.getSquare(moves[i].x, moves[i].y).piece.pieceType == Pieces.king) {
                    console.log("CHECK");
                    console.log(moves[i].x);
                    console.log(moves[i].y);
                    return true;
                }
            }
        }
        return false;

    }



    //-------------------------------------------------------------------------
    // Update the game for a single frame.
    this.update = function ()
    {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;

        // Adjust board position and size based on canvas size.
        // Board is made to be centered in the canvas.
        this.squareSize = Math.floor((this.canvas.height / this.board.height) * 0.9);
        var boardWidth = this.squareSize * this.board.width;
        var boardHeight = this.squareSize * this.board.height;
        this.boardPosX = Math.floor((this.canvas.width - boardWidth) / 2);
        this.boardPosY = Math.floor((this.canvas.height - boardHeight) / 2);
    }



    //-------------------------------------------------------------------------
    // Draw the game to the canvas.
    this.draw = function ()
    {
        var border = this.squareSize * this.style.boardBorderScale;

        var backgroundRect = new Rect(0, 0,
            this.canvas.width, this.canvas.height);

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
                boardRectBorder.x + boardRectBorder.width + this.style.captureBoxOffset,
                boardRectBorder.y,
                this.style.captureBoxSize.x,
                this.style.captureBoxSize.y),
            new Rect(
                boardRectBorder.x + boardRectBorder.width + this.style.captureBoxOffset,
                boardRectBorder.y + boardRectBorder.height - this.style.captureBoxSize.y,
                this.style.captureBoxSize.x,
                this.style.captureBoxSize.y)
        ];
        
        //---------------------------------------------------------------------
        // Draw chess board.

        // Clear canvas background.
        this.fillRect(backgroundRect, this.style.backgroundColor);
        
        // Draw chess board background.
        this.fillRect(boardRectBorder, this.style.boardColorDark);

        // Draw each board square.
		for (var x = 0; x < this.board.width; x += 1)
        {
        	for (var y = 0; y < this.board.height; y += 1)
        	{
                var squareRect = new Rect(
                    this.boardPosX + (x * this.squareSize),
                    this.boardPosY + (y * this.squareSize),
                    this.squareSize, this.squareSize);
                var squareLocation = this.getRotatedBoardLocation(new Point(x, y));
                this.drawBoardSquare(squareLocation.x, squareLocation.y, squareRect);
        	}
        }

        // Draw chess board outlines.
        this.strokeRect(boardRect, this.style.boardOutlineColor);
        this.strokeRect(boardRectBorder, this.style.boardOutlineColor);

        //---------------------------------------------------------------------
        // Draw text for whose turn it is.

        var turnTextPos = new Point(
            captureBox[0].x + (captureBox[0].width / 2),
            boardRectBorder.y + (boardRectBorder.height / 2))
        turnTextPos.y = captureBox[0].y + captureBox[0].height + 40;

        var turnText = "Opponent's Turn";
        if (this.getPlayerTurn() == this.getMyTeam())
        {
            turnText = "Your Turn";
            turnTextPos.y = captureBox[1].y - 40;
        }

        this.context.font = this.style.turnTextFont;
        this.context.fillStyle = this.style.turnTextColor;
        this.context.textBaseline = "middle";
        this.context.textAlign = "center";
        this.context.fillText(turnText, turnTextPos.x, turnTextPos.y);
                
        //---------------------------------------------------------------------
        // Draw player boxes with captured pieces for each player.
        
        this.drawCaptureBox(captureBox[0], this.getOpponentTeam());
        this.drawCaptureBox(captureBox[1], this.getMyTeam());

        //---------------------------------------------------------------------
        // Draw dragged piece.

        if (this.dragPiece != null) {
            
            this.drawPiece(this.dragPiece,
                this.mousePosition.x - (this.squareSize / 2),
                this.mousePosition.y - (this.squareSize / 2));
        }
    }

    //-------------------------------------------------------------------------
    // Draw a capture box for the given player.
    this.drawCaptureBox = function(rect, team)
    {
        var player = this.getPlayer(team);

        // Draw capture box background & border.
        this.fillRect(rect, this.getPlayerTurn() == team ?
            this.style.captureBoxBorderColorOnTurn : this.style.captureBoxBorderColor);
        var innerRect = new Rect(
            rect.x + this.style.captureBoxBorder,
            rect.y + this.style.captureBoxTitleHeight,
            rect.width - (2 * this.style.captureBoxBorder),
            rect.height - this.style.captureBoxBorder - this.style.captureBoxTitleHeight);
        this.fillRect(innerRect, this.style.captureBoxBackgroundColor);
        this.strokeRect(rect, this.style.captureBoxOutlineColor);
        this.strokeRect(innerRect, this.style.captureBoxOutlineColor);
        
        // Draw team name.
        this.context.font = this.style.teamNameFont;
        this.context.fillStyle = this.style.teamNameColor;
        this.context.textBaseline = "middle";
        this.context.textAlign = "left";
        this.context.fillText(player.name,
            rect.x + this.style.captureBoxBorder,
            rect.y + (this.style.captureBoxTitleHeight / 2));

        // Draw captured pieces inside capture box.
        var drawPos = new Point(
            this.style.capturePieceSpacing / 2,
            this.style.capturePieceSpacing / 2);
        for (var i = 0; i < player.capturedPieceTypes.length; i++)
        {
            // Draw the piece sprite.
            var pieceType = player.capturedPieceTypes[i];
            var spr = this.style.getPieceSpriteFromType(Teams.getOpponent(team), pieceType);
            if (spr != null && spr.image != null)
            {
				this.context.drawImage(spr.image,
                    spr.sourceX, spr.sourceY,
					spr.sourceWidth, spr.sourceHeight,
                    innerRect.x + drawPos.x,
                    innerRect.y + drawPos.y,
                    this.style.capturePieceSize, this.style.capturePieceSize);
            }

            // Move to the next draw position.
            drawPos.x += this.style.capturePieceSize + this.style.capturePieceSpacing;
            if (drawPos.x + this.style.capturePieceSize +
                (this.style.capturePieceSpacing / 2) >= innerRect.width)
            {
                drawPos.x = 0;
                drawPos.y += this.style.capturePieceSize + this.style.capturePieceSpacing;
            }
        }
    }

    //-------------------------------------------------------------------------
    // Draw the board square at the given location.
    this.drawBoardSquare = function(x, y, squareRect)
    {
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
                this.fillRect(squareRect, this.style.squareCaptureMoveColor);
                this.strokeRect(squareRect, this.style.squareCaptureMoveOutlineColor);
            }
            else
            {
                this.fillRect(squareRect, this.style.squareMoveColor);
                this.strokeRect(squareRect, this.style.squareMoveOutlineColor);
            }
        }

		// Draw a chess piece that might be on this square.
		if (piece != null)
            this.drawPiece(piece, squareRect.x, squareRect.y);
    }

    //-------------------------------------------------------------------------
    // Draw a single chess piece at the given position.
    this.drawPiece = function(piece, x, y) {
        var spr = this.style.getPieceSprite(piece);
        if (spr != null && spr.image != null) {
			this.context.drawImage(spr.image, spr.sourceX, spr.sourceY,
				spr.sourceWidth, spr.sourceHeight, x, y,
                this.squareSize, this.squareSize);
        }
    }
    
    //-------------------------------------------------------------------------
    // Draw an outlined rectangle.
    this.strokeRect = function(rect, color) {
		this.context.strokeStyle = color;
        this.context.strokeRect(rect.x, rect.y, rect.width, rect.height);
    }

    //-------------------------------------------------------------------------
    // Draw an filled rectangle.
    this.fillRect = function(rect, color) {
		this.context.fillStyle = color;
        this.context.fillRect(rect.x, rect.y, rect.width, rect.height);
    }
}

