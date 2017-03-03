

//-------------------------------------------------------------------------
// Pieces - has the string representations of all chess pieces.
//-------------------------------------------------------------------------
Pieces = {
    none: "",
    pawn: "P",
    rook: "R",
    knight: "N",
    bishop: "B",
    king: "K",
    queen: "Q",
};


//-------------------------------------------------------------------------
// ChessPieceType - A unique piece type that a chess piece can be.
//                  (Pawn, Rook, Bishop, Knight, King, Queen)
//-------------------------------------------------------------------------
function ChessPieceType(name, spriteWhite, spriteBlack) {
    this.name = name;
    this.spriteWhite = spriteWhite;
    this.spriteBlack = spriteBlack;
}

//-------------------------------------------------------------------------
// Move - Represents a move to a specific location.
//-------------------------------------------------------------------------
//function Move(x, y) {
    //this.x = x;
    //this.y = y;
//}

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
    this.getSprite = function () {
        if (this.team == Teams.white)
            return this.pieceType.spriteWhite;
        else if (this.team == Teams.black)
            return this.pieceType.spriteBlack;
        return null;
    }

    //---------------------------------------------------------------------
    // Get a list of valid moves this piece can make given the board state.
    this.getValidMoves = function (board) {
        var moves = [];
        switch (this.pieceType.name) {
            case "Pawn":
                moves = this.pawnMove(board);
                break;
            case "Knight":
                moves = this.knightMove(board);
                break;
            case "Bishop":
                moves = this.bishopMove(board);
                break;
            case "Rook":
                moves = this.rookMove(board);
                break;
            case "Queen":
                moves = this.rookMove(board).concat(this.bishopMove(board));
                break;
            case "King":
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
        switch (this.pieceType.name) {
            case "Pawn":
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
            case "Knight":
                if (Math.abs(targetX - x) == 2 && Math.abs(targetY - y) == 1)
                    return true;
                else if (Math.abs(targetX - x) == 1 && Math.abs(targetY - y) == 2)
                    return true;
                else
                    return false;
                break;
            case "Bishop":
                if (Math.abs(targetX - x) == Math.abs(targetY - y) && targetX - x != 0)
                    return true;
                else
                    return false;
                break;
            case "Rook":
                if (targetX - x != 0 && targetY - y == 0)
                    return true;
                else if (targetX - x == 0 && targetY - y != 0)
                    return true;
                else
                    return false;
                break;
            case "Queen":
                if (Math.abs(targetX - x) == Math.abs(targetY - y) && targetX - x != 0)
                    return true;
                else if (targetX - x != 0 && targetY - y == 0)
                    return true;
                else if (targetX - x == 0 && targetY - y != 0)
                    return true;
                else
                    return false;
                break;
            case "King":
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
        for (var i = 1; i < 7; i++) {
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