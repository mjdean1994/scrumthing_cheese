using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Chess.ViewModels;
using Chess.Hubs;

namespace Chess.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            IndexViewModel vm = new IndexViewModel();
            vm.Username = GenerateUsername();
            return View(vm);
        }

        private string GenerateUsername()
        {
            string[] prefix = { "Angry", "Happy", "Sad", "Mad", "Joyous", "Depressed", "Anxious", "Upset", "Excited", "Surprised", "Sleepy", "Lit" };
            string[] suffix = { "Dog", "Cat", "Horse", "Zebra", "Cow", "Pig", "Chicken", "Turtle", "Sheep", "Fish", "Raccoon", "Bird", "Bat", "Gopher", "Lizard" };

            Random rng = new Random();
            return prefix[rng.Next(prefix.Length - 1)] + " " + suffix[rng.Next(suffix.Length - 1)];
        }

        [HttpGet]
        public JsonResult getBoardState()
        {
            return Json(ChatHub.BoardState, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult getTurn()
        {
            return Json(ChatHub.Turn, JsonRequestBehavior.AllowGet);
        }
    }
}