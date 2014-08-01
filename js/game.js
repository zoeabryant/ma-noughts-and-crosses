var game = new function(){

	players = ["o", "x"];
	turn = players[0];

	grid = ["","","","","","","","",""];
	winning_combos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[2,5,8],[0,4,8],[2,4,6]];

	status = '#status';
	game_cells = '#game td';

	this.init = function(){
		$(status).text(turn + ', start the game!');

		$(game_cells).click(function(){
			cell = $(this);
			position = $(this).attr('data-position');

			if(position != null){
				game.take_a_turn(cell, position);
			}
		});
	}

	this.take_a_turn = function(cell, position){
		game.mark_cell(cell, position);
		game.switch_turns();
		game.is_game_over();
	}

	this.mark_cell = function(cell, position){
		$(cell).text(turn).removeAttr('data-position');
		grid[position] = turn;
	}

	this.switch_turns = function(){
		players = players.reverse();
		turn = players[0];
		$(status).text(turn + '\'s turn');
	}

	this.is_game_over = function(){
		var winner = game.won();
		if (!winner) {
			game.draw();
		}
	}

	this.won = function(){
		var winner = false;
		$(winning_combos).each(function(combo_index, combo){
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
		is_draw = $.inArray("", grid) == -1;
		if(is_draw){
			$(status).text('It was a draw!');
			$(game_cells).removeAttr('data-position');
		};
	}

}

$(document).ready(function(){
	game.init();
});