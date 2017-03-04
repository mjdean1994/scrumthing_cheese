

//-------------------------------------------------------------------------
// Pieces - has the string representations of all chess pieces.
//-------------------------------------------------------------------------
Pieces = {

    none: -1,
    pawn: 0,
    rook: 1,
    knight: 2,
    bishop: 3,
    king: 4,
    queen: 5,
    count: 6,

    letters: ["P", "R", "N", "B", "K", "Q"],
    names: ["Pawn", "Rook", "King", "Bishop", "King", "Queen"],
    
    //-----------------------------------------------------------------------
    // Get the letter for the given piece index (ex: Pieces.bishop --> "B")
    getLetter: function(pieceIndex) {
        if (pieceIndex == Pieces.none)
            return "";
        return Pieces.letters[pieceIndex];
    },

    //-----------------------------------------------------------------------
    // Get the piece index from the given piecce letter (ex: "P" --> Pieces.pawn)
    fromLetter: function(pieceLetter) {
        for (var i = 0; i < Pieces.count; i++) {
            if (Pieces.letters[i] == pieceLetter)
                return i;
        }
        return pieces.none;
    },

    //-----------------------------------------------------------------------
    // Get the name for the given piece index (ex: Pieces.pawn --> "Pawn")
    getName: function(pieceIndex) {
        if (pieceIndex == Pieces.none)
            return "";
        return Pieces.names[pieceIndex];
    }
};


//-------------------------------------------------------------------------
// PieceLetters - has the letter representations for all chess pieces.
//-------------------------------------------------------------------------
PieceLetters = {
    none: "",
    pawn: "P",
    rook: "R",
    knight: "N",
    bishop: "B",
    king: "K",
    queen: "Q",
}

//-------------------------------------------------------------------------
// ChessPiece - An instance of a chess piece in the game.
//-------------------------------------------------------------------------
function ChessPiece(pieceType, team, x, y) {
    this.pieceType = pieceType;
    this.team = team;
    this.x = x;
    this.y = y;
    this.captured = false;

    //---------------------------------------------------------------------
    // Get the sprite for this chess piece.
    /*this.getSprite = function () {
        if (this.team == Teams.white)
            return this.pieceType.spriteWhite;
        else if (this.team == Teams.black)
            return this.pieceType.spriteBlack;
        return null;
    }*/

    //---------------------------------------------------------------------
    // Get a list of valid moves this piece can make given the board state.
    this.getValidMoves = function (board) {
        var moves = [];
        switch (this.pieceType) {
            case Pieces.pawn:
                moves = this.pawnMove(board);
                break;
            case Pieces.knight:
                moves = this.knightMove(board);
                break;
            case Pieces.bishop:
                moves = this.bishopMove(board);
                break;
            case Pieces.rook:
                moves = this.rookMove(board);
                break;
            case Pieces.queen:
                moves = this.rookMove(board).concat(this.bishopMove(board));
                break;
            case Pieces.king:
                moves = this.kingMove(board);
            default:
                return moves;
        }
        return moves;
    }

    //---------------------------------------------------------------------
    // Check if move is valid.
    this.validMove = function (targetX, targetY) {
        var x = this.x;
        var y = this.y;
        switch (this.pieceType) {
            case Pieces.pawn:
                if (this.team == Teams.black) {
                    if (y == 1) {
                        if (targetY - y <= 2 && targetY > y && targetX == x)
                            return true;
                        else
                            return false;
                    }
                    else if (targetY - y == 1 && targetX == x)
                        return true;
                    else
                        return false;
                }
                else if (this.team == Teams.white) {
                    if (y == 6) {
                        if (targetY - y >= -2 && targetY < y && targetX == x)
                            return true;
                        else
                            return false;
                    }
                    else if (targetY - y == -1 && targetX == x)
                        return true;
                    else
                        return false;
                }
                return true;
                break;
            case Pieces.knight:
                if (Math.abs(targetX - x) == 2 && Math.abs(targetY - y) == 1)
                    return true;
                else if (Math.abs(targetX - x) == 1 && Math.abs(targetY - y) == 2)
                    return true;
                else
                    return false;
                break;
            case Pieces.bishop:
                if (Math.abs(targetX - x) == Math.abs(targetY - y) && targetX - x != 0)
                    return true;
                else
                    return false;
                break;
            case Pieces.rook:
                if (targetX - x != 0 && targetY - y == 0)
                    return true;
                else if (targetX - x == 0 && targetY - y != 0)
                    return true;
                else
                    return false;
                break;
            case Pieces.queen:
                if (Math.abs(targetX - x) == Math.abs(targetY - y) && targetX - x != 0)
                    return true;
                else if (targetX - x != 0 && targetY - y == 0)
                    return true;
                else if (targetX - x == 0 && targetY - y != 0)
                    return true;
                else
                    return false;
                break;
            case Pieces.king:
                if (Math.abs(targetX - x) <= 1 && Math.abs(targetY - y) <= 1)
                    if (targetX - x != 0 || targetY - y != 0)
                        return true;
                    else
                        return false;
                break;
            default:
                return true;

        }
    }

    this.rookMove = function (board) {
        var x = this.x;
        var y = this.y;
        var moves = [];
        //set when rook encounters a piece in the marked quadrant
        var q1 = false;
        var q2 = false;
        var q3 = false;
        var q4 = false;
        for (var i = 1; i <= 7; i++) {
            if (!q1 && x + i < 8) {
                if (board.getSquare(x + i, y) == null) { }

                else if (board.getSquare(x + i, y).hasPiece()) {
                    q1 = true;
                    if (board.getSquare(x + i, y).piece.team != this.team)
                        moves.push(new Point(x + i, y));
                }
                else
                    moves.push(new Point(x + i, y));
            }
            if (!q2 && x - i > -1) {
                if (board.getSquare(x - i, y) == null) { }

                else if (board.getSquare(x - i, y).hasPiece()) {
                    q2 = true;
                    if (board.getSquare(x - i, y).piece.team != this.team)
                        moves.push(new Point(x - i, y));
                }
                else
                    moves.push(new Point(x - i, y));
            }
            if (!q3 && y - i > -1) {
                if (board.getSquare(x, y - i) == null) { }

                else if (board.getSquare(x, y - i).hasPiece()) {
                    q3 = true;
                    if (board.getSquare(x, y - i).piece.team != this.team)
                        moves.push(new Point(x, y - i));
                }
                else
                    moves.push(new Point(x, y - i));
            }
            if (!q4 && y + i < 8) {
                if (board.getSquare(x, y + i) == null) { }

                else if (board.getSquare(x, y + i).hasPiece()) {
                    q4 = true;
                    if (board.getSquare(x, y + i).piece.team != this.team)
                        moves.push(new Point(x, y + i));
                }
                else
                    moves.push(new Point(x, y + i));
            }
        }
        return moves;
    }

    this.bishopMove = function (board) {
        var x = this.x;
        var y = this.y;
        var moves = [];
        //set when bishop encounters a piece in the marked quadrant
        var q1 = false;
        var q2 = false;
        var q3 = false;
        var q4 = false;
        for (var i = 1; i < 7; i++) {
            if (!q1 && x + i < 8 && y + i < 8) {
                if (board.getSquare(x + i, y + i) == null) { }

                else if (board.getSquare(x + i, y + i).hasPiece()) {
                    q1 = true;
                    if (board.getSquare(x + i, y + i).piece.team != this.team)
                        moves.push(new Point(x + i, y + i));
                }
                else
                    moves.push(new Point(x + i, y + i));
            }
            if (!q2 && x - i > -1 && y + i < 8) {
                if (board.getSquare(x - i, y + i) == null) { }

                else if (board.getSquare(x - i, y + i).hasPiece()) {
                    q2 = true;
                    if (board.getSquare(x - i, y + i).piece.team != this.team)
                        moves.push(new Point(x - i, y + i));
                }
                else
                    moves.push(new Point(x - i, y + i));
            }
            if (!q3 && x - i > -1 && y - i > -1) {
                if (board.getSquare(x - i, y - i) == null) { }

                else if (board.getSquare(x - i, y - i).hasPiece()) {
                    q3 = true;
                    if (board.getSquare(x - i, y - i).piece.team != this.team)
                        moves.push(new Point(x - i, y - i));
                }
                else
                    moves.push(new Point(x - i, y - i));
            }
            if (!q4 && x + i < 8 && y - i > -1) {
                if (board.getSquare(x + i, y - i) == null) { }

                else if (board.getSquare(x + i, y - i).hasPiece()) {
                    q4 = true;
                    if (board.getSquare(x + i, y - i).piece.team != this.team)
                        moves.push(new Point(x + i, y - i));
                }
                else
                    moves.push(new Point(x + i, y - i));
            }
        }
        return moves;
    }

    this.knightMove = function (board) {
        var x = this.x;
        var y = this.y;
        moves = [];
        for (var i = x - 2; i <= x + 2; i++) {
            for (var j = y - 2; j <= y + 2; j++) {
                if (board.getSquare(i, j) == null) { }
                else if (this.validMove(i, j)) {
                    if (!board.getSquare(i, j).hasPiece() || board.getSquare(i, j).piece.team != this.team)
                        moves.push(new Point(i, j));
                }
            }
        }
        return moves;
    }

    this.pawnMove = function (board) {
        var x = this.x;
        var y = this.y;
        var moves = [];
        if (this.team == Teams.black) {

            if (board.getSquare(x, y + 1) != null && !board.getSquare(x, y + 1).hasPiece()) {
                moves.push(new Point(x, y + 1));
            }

            if (board.getSquare(x, y + 2) != null && !board.getSquare(x, y + 2).hasPiece() && !board.getSquare(x, y + 1).hasPiece() && this.validMove(x, y + 2)) {
                moves.push(new Point(x, y + 2));
            }

            if (board.getSquare(x - 1, y + 1) != null && board.getSquare(x - 1, y + 1).hasPiece() && board.getSquare(x - 1, y + 1).piece.team != this.team) {
                moves.push(new Point(x - 1, y + 1));
            }

            if (board.getSquare(x + 1, y + 1) != null && board.getSquare(x + 1, y + 1).hasPiece() && board.getSquare(x + 1, y + 1).piece.team != this.team) {
                moves.push(new Point(x + 1, y + 1));
            }
        }
        else if (this.team == Teams.white) {
            if (board.getSquare(x, y - 1) != null && !board.getSquare(x, y - 1).hasPiece()) {
                moves.push(new Point(x, y - 1));
            }

            if (board.getSquare(x, y - 2) != null && !board.getSquare(x, y - 2).hasPiece() && !board.getSquare(x, y - 1).hasPiece() && this.validMove(x, y - 2)) {
                moves.push(new Point(x, y - 2));
            }

            if (board.getSquare(x - 1, y - 1) != null && board.getSquare(x - 1, y - 1).hasPiece() && board.getSquare(x - 1, y - 1).piece.team != this.team) {
                moves.push(new Point(x - 1, y - 1));
            }

            if (board.getSquare(x + 1, y - 1) != null && board.getSquare(x + 1, y - 1).hasPiece() && board.getSquare(x + 1, y - 1).piece.team != this.team) {
                moves.push(new Point(x + 1, y - 1));
            }
        }
        return moves;
    }

    this.kingMove = function (board) {
        var moves = [];
        var x = this.x;
        var y = this.y;
        for (var i = -1; i <= 1 + 1; i++) {
            for (var j = -1; j <= 1; j++) {
                if (board.getSquare(x + i, y + j) == null)
                    continue;
                if (board.getSquare(x + i, y + j).hasPiece()) {
                    if (this.validMove(x + i, y + j) && board.getSquare(x + i, y + j).piece.team != this.team)
                        moves.push(new Point(x + i, y + j));
                }
                else if (this.validMove(x + i, y + j))
                    moves.push(new Point(x + i, y + j));
            }
        }
        return moves;
    }
}