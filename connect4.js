/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

import Game from "./dependencies/Game.js";

// Get the start button
document.querySelector("#start-button").addEventListener("click", () => {
  /*
        Game object takes an object containing four optional keys: width, height, player1color, 
        and player2color. Each of these arguments have default values in the Game object.
        By making the argument an object, the keys can be listed in any order.
    */
  new Game({
    width: 6,
    height: 7,
    player1color: document.querySelector("#player1color").value,
    player2color: document.querySelector("#player2color").value,
  });
});