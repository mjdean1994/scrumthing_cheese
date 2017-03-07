using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace Chess.Hubs
{
    public class ChatHub : Hub
    {
        public static Dictionary<string, int> ProposedMoves;
        public static int WhiteTeamCount;
        public static int BlackTeamCount;
        public static string BoardState;
        public static int Turn;
        public void Send(string name, string message, string team)
        {
            // Call the broadcastMessage method to update clients.
            Clients.All.broadcastMessage(name, message, team);
        }

        public void UpdateVotes()
        {
            Clients.All.updateVotes(ProposedMoves.Keys.ToArray(), ProposedMoves.Values.ToArray());
        }

        public void UpdateBoard(string boardState)
        {
            BoardState = boardState;
            if(Turn == 1)
            {
                Turn = 0;
            }
            else
            {
                Turn = 1;
            }
            Clients.All.updateBoard(boardState, Turn);
        }
    }
}