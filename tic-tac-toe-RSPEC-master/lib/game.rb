class Game
	attr_accessor :grid
	attr_reader :players, :player2, :player1,:turn
	WINNING_COMBOS = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[2,5,8],[0,4,8],[2,4,6]]

	def initialize(player1, player2)
		@grid = Array.new(9)
		@players = [player1,player2]
		@player1 = player1
		@player2 = player2
		@turn = player1
	end

	def go(position)
		raise "Too late, #{winner.name} won" if winner
		mark = @turn == player1  ? "x" : "o"
		@turn == player1 ? @turn = player2 : @turn = player1
		grid[position -1] = mark
	end

	def winner
		winner = WINNING_COMBOS.select do |combo|
			grid[combo[0]] == grid[combo[1]] && grid[combo[1]] == grid[combo[2]] && grid[combo[0]]
		end
		grid[winner.first.first] == "x" ? player1 : player2 if winner.any?		
	end

end