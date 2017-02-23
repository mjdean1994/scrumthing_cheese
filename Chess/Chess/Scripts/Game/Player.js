

//-------------------------------------------------------------------------
// Teams - An enumeration of the possible chess teams a player can be
//         (white or black)
//-------------------------------------------------------------------------
Teams = {
    white: 0,
    black:  1,
}


//-------------------------------------------------------------------------
// Player
//-------------------------------------------------------------------------
function Player(team)
{
    this.team = team;

    // List of my pieces which are currently in play.
    this.piecesInPlay = [];

    // List of my opponent's pieces that I have captured.
    this.piecesCaptured = [];

}
