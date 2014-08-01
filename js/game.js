var game = new function(){

	players = ["o", "x"];
	next_player = players[0];

	grid = ["","","","","","","","",""]; // better way?
	winning_combos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[2,5,8],[0,4,8],[2,4,6]]; //winning combos - dynamically?

	status = '#status';
	game_cells = '#game td';

	this.init = function(){
		$(status).text(next_player + ', start the game!');

		$(game_cells).click(function(){
			position = $(this).attr('data-position'); // jQuery data methods

			if(position != null){
				game.takeATurn($(this), position);
			}
		});
	}

	this.takeATurn = function(cell, position){
		game.markCell(cell, position);
		game.switchTurns();
		game.isGameOver();
	}

	this.markCell = function(cell, position){
		$(cell).text(next_player).removeAttr('data-position');
		grid[position] = next_player;
	}

	this.switchTurns = function(){
		next_player = players.reverse()[0];
		// turn = players[0];
		$(status).text(next_player + "'s turn");
	}

	this.isGameOver = function(){
		var winner = game.won();
		if (!winner) {
			game.draw();
		}
	}

	this.won = function(){
		var winner = false;
		$(winning_combos).each(function(combo_index, combo){
			// can we refactor 2 lines below
			winner = grid[combo[0]] == grid[combo[1]] && grid[combo[1]] == grid[combo[2]] && grid[combo[0]];
			if(winner == players[0] || winner == players[1]){
				game.winner(winner);
				winner = true
			}
		});

		return winner;
	}

	this.winner = function(winner){
		$(status).text(winner + ' won the game!');
		$(game_cells).removeAttr('data-position');
		return false;
	}

	this.draw = function(){
		is_draw = $.inArray("", grid) == -1; // ??
		if(is_draw){
			$(status).text('It was a draw!');
			$(game_cells).removeAttr('data-position');
		};
	}

}

$(document).ready(function(){
	game.init();
});