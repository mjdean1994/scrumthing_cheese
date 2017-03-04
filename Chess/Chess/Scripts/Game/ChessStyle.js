

//-----------------------------------------------------------------------------
// ChessStyle - contains style and layout information for the Chess game.
//-----------------------------------------------------------------------------
function ChessStyle()
{
    this.backgroundColor              = "white";

    this.boardBorderScale             = 0.25;
    this.boardColorDark               = "#a06f3e";
    this.boardColorLight              = "#f4d6b7";
    this.boardOutlineColor            = "black";

    this.squareColors                 = ["#f4d6b7", "#a06f3e"];
    this.squareMoveColors             = ["#FFFF00", "#888800"];
    
    this.squareCaptureMoveColor        = "rgba(255, 0, 0, 0.5)";
    this.squareCaptureMoveOutlineColor = "rgba(128, 0, 0, 1.0)";
    this.squareMoveColor               = "rgba(0, 255, 0, 0.5)";
    this.squareMoveOutlineColor        = "rgba(0, 255, 0, 1.0)";

    this.captureBoxSize               = new Point(240, 140);
    this.captureBoxOffset             = 20;
    this.captureBoxBorder             = 6;
    this.captureBoxTitleHeight        = 20;
    this.capturePieceSize             = 30;
    this.capturePieceSpacing          = 2;
    this.captureBoxBorderColor        = "#f4d6b7";
    this.captureBoxBorderColorOnTurn  = "#aaffaa";
    this.captureBoxOutlineColor       = "black";
    this.captureBoxBackgroundColor    = "white";
    this.teamNameFont                 = "16px Arial";
    this.teamNameColor                = "black";
                                    
    this.turnTextFont                 = "24px Arial";
    this.turnTextColor                = "black";

    // Load piece sprite sheet image.
    var s = 60;
	var image = new Image();
	image.src = "ChessPieces.png";

    // Create piece sprites.
    this.pieceSpritesWhite = new Array(Pieces.count);
    this.pieceSpritesWhite[Pieces.queen]  = new Sprite(image, 0 * s, 1 * s, s, s);
    this.pieceSpritesWhite[Pieces.king]   = new Sprite(image, 1 * s, 1 * s, s, s);
    this.pieceSpritesWhite[Pieces.rook]   = new Sprite(image, 2 * s, 1 * s, s, s);
    this.pieceSpritesWhite[Pieces.knight] = new Sprite(image, 3 * s, 1 * s, s, s);
    this.pieceSpritesWhite[Pieces.bishop] = new Sprite(image, 4 * s, 1 * s, s, s);
    this.pieceSpritesWhite[Pieces.pawn]   = new Sprite(image, 5 * s, 1 * s, s, s);
    this.pieceSpritesBlack = new Array(Pieces.count);
    this.pieceSpritesBlack[Pieces.queen]  = new Sprite(image, 0 * s, 0 * s, s, s);
    this.pieceSpritesBlack[Pieces.king]   = new Sprite(image, 1 * s, 0 * s, s, s);
    this.pieceSpritesBlack[Pieces.rook]   = new Sprite(image, 2 * s, 0 * s, s, s);
    this.pieceSpritesBlack[Pieces.knight] = new Sprite(image, 3 * s, 0 * s, s, s);
    this.pieceSpritesBlack[Pieces.bishop] = new Sprite(image, 4 * s, 0 * s, s, s);
    this.pieceSpritesBlack[Pieces.pawn]   = new Sprite(image, 5 * s, 0 * s, s, s);


    //-------------------------------------------------------------------------
    // Get the sprite for the given ChessPiece.
    this.getPieceSprite = function(piece) {
        return this.getPieceSpriteFromType(piece.team, piece.pieceType);
    }

    //-------------------------------------------------------------------------
    // Get the sprite for a given team and piece type.
    this.getPieceSpriteFromType = function(team, pieceType) {
        if (team == Teams.white)
            return this.pieceSpritesWhite[pieceType];
        return this.pieceSpritesBlack[pieceType];
    }
}


