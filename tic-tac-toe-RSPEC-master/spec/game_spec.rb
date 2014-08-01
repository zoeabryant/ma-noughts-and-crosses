require 'game'

describe Game do 
	let(:p1) {double :player, name: "Bob"}
	let(:p2) {double :player, name: "Karen"}
	let(:game){Game.new(p1,p2)}

	it 'starts empty' do 
		expect(game.grid.count).to eq 9
	end

	it "has two players" do 
		expect(game.players.count).to eq 2
	end

	it "can take turns from a player" do 
		game.go(1)
		expect(game.grid).to eq(["x",nil,nil,nil,nil,nil,nil,nil,nil])
	end

	it "should know whos turn it is starting with player 1" do
	 expect(game.turn).to eq(p1)
	end

	it "should switch turns after player1 has had a go" do
		game.go(1)
		expect(game.turn).to eq(p2) 
	end

	it 'should plot an "o" for player 2' do 
		game.go(1)
		game.go(2)
		expect(game.grid[1]).to eq("o")
	end

	it "should know if there is a winner" do
		_win_for_player_one
		expect(game.winner).to eq(p1)
	end

	it "raises error if someones won" do
	_win_for_player_one
	expect(lambda{game.go(7)}).to raise_error "Too late, Bob won" 
	end

	def _win_for_player_one
		[1,4,2,5,3].each{|plot|game.go(plot)}
	end
end