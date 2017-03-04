//=============================================================================
// Move Notation Format:
//
// piece, from, to, [O], [= promotion], [x capture], [+], [#]
// 
// standard move:  Bc2c4    (piece, move from, move to)
// castling:       Ke1c1O   (append a 'O')
// capture:        Qa1b2xP  (append a 'x' followed by the captured piece letter)
// promotion:      Pe7e8=Q  (append a '=' followed by the promoted piece letter)
// check:          Ra1b2+   (append a '+')
// checkmate:      Bf4e3#   (append a '#')
//
// Locations are in Standard Algebraic Notation (SAN):
//  * a1 is the bottom left square from white's perspective
//  * h8 is the top left square from white's perspective
// 
// Pieces have the following letters:
//  * pawn: P
//  * rook: R
//  * knight: N
//  * bishop: B
//  * king: K
//  * queen: Q
//
//=============================================================================
// Example:
// 
// Pc7c8=QxB+
// 
//   Pc7c8  Pawn moves from c7 to c8,
//   =Q     gets promoted to a queen,
//   xB     captures a bishop,
//   +      and causes check
// 
//=============================================================================


//-----------------------------------------------------------------------------
// Notation - has functions for converting to and from chess notation strings.
//-----------------------------------------------------------------------------
Notation = new Object();

//-----------------------------------------------------------------------------
// Get the string notation for a point on the chess board (ex: e6).
//-----------------------------------------------------------------------------
Notation.getLocationNotation = function(point) {
    var result = "";
    result += String.fromCharCode("a".charCodeAt(0) + point.x);
    result += (point.y + 1);
    return result;
};

//-----------------------------------------------------------------------------
// Parse a location string.
Notation.parseLocation = function(str) {
    var x = str.charCodeAt(0) - "a".charCodeAt(0);
    var y = str.charCodeAt(1) - "1".charCodeAt(0);
    return new Point(x, y);
};

//-----------------------------------------------------------------------------
// Return the string notation for a move. This omits the move number and team.
Notation.getMoveNotation = function(move) {
    var result = "";

    result += Pieces.getLetter(move.piece);
    result += Notation.getLocationNotation(move.from);
    result += Notation.getLocationNotation(move.to);

    if (move.castling)
        result += "O";
    if (move.promotePiece != Pieces.none)
        result += "=" + Pieces.getLetter(move.promotePiece);
    if (move.capturePiece != Pieces.none)
        result += "x" + Pieces.getLetter(move.capturePiece);
    if (move.checkmate)
        result += "#";
    else if (move.check)
        result += "+";
        
    return result;
};
//-----------------------------------------------------------------------------
// Parse a move notation string.
Notation.parseMove = function(str) {
    var move = new Move();
    move.moveNumber = 1;

    var fromOrTo = 0;

    for (var i = 0; i < str.length; i++) {
        var c = str[i];
        var charCode = str.charCodeAt(i);
            
        if (c == "+") {
            move.check = true;
        }
        else if (c == "#") {
            move.checkmate = true;
        }
        else if (c == "O") {
            move.castling = true;
        }
        else if (c == "K" || c == "Q" || c == "P" ||
            c == "R" || c == "N" || c == "B")
        {
            move.piece = Pieces.fromLetter(c);
        }
        else if (c == "x" && i + 1 < str.length) {
            move.capturePiece = Pieces.fromLetter(str[i + 1]);
            i++;
        }
        else if (c == "=" && i + 1 < str.length) {
            move.promotePiece = Pieces.fromLetter(str[i + 1]);
            i++;
        }
        else if (charCode >= "a".charCodeAt(0) &&
            charCode <= "h".charCodeAt(0) &&
            i + 1 < str.length)
        {
            var loc = Notation.parseLocation(str.substr(i, 2));
            if (fromOrTo == 0)
                move.from = loc;
            else if (fromOrTo == 1)
                move.to = loc;
            fromOrTo = 1;
            i++;
        }
    }

     return move;
};

