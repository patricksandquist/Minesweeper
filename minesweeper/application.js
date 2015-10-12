var Game = React.createClass( {
  getInitialState: function () {
    var board = new Minesweeper.Board(10, 9);
    return {board: board, over: false, won: false };
  },

  updateGame: function (pos, flagging) {
    var tile = this.state.board.grid[pos[0]][pos[1]];
    if (flagging) {
      this.setState(function () {
        this.state.board.grid[pos[0]][pos[1]].toggleFlag();
        return {board: this.state.board};
      }.bind(this));
    } else {
      this.setState(function () {
        this.state.board.grid[pos[0]][pos[1]].explore();
        var over = this.state.board.lost() || this.state.board.won();
        var won = this.state.board.won();
        return {board: this.state.board, over: over, won: won};
      }.bind(this));
    }
    if (this.state.over) {
      console.log("you suck");
    }
  },

  render: function () {
    return (
      <div>
        <Board className="board"
               board={this.state.board}
               updateGame={this.updateGame}>
        </Board>
      </div>
    )
  }
});

var Board = React.createClass({
  render: function () {
    return (
      <div>
        {this.props.board.grid.map(function (row, rowIdx) {
          return (
            <div className="row" key={rowIdx} data-row-idx={rowIdx}>
              {row.map(function (tile, colIdx) {
                return <Tile tile={tile}
                             pos={[rowIdx, colIdx]}
                             key={rowIdx + "" + colIdx}
                             updateGame={this.props.updateGame}></Tile>
              }.bind(this))}
            </div>
          )
        }.bind(this))}
      </div>
    )
  }
});

var Tile = React.createClass( {
  render: function () {

    return <center onClick={this.handleClick} className="tile">{this.findState()}</center>
  },

  findState: function () {
    if (this.props.tile.flagged) {
      return '⚑';
    } else if (this.props.tile.explored) {
      if (this.props.tile.bombed) {
        return '☢';
      } else {
        if (this.props.tile.adjacentBombCount() === 0) {
          return ' ';
        } else {
          return this.props.tile.adjacentBombCount();
        }
      }
    } else {
      return '☮';
    }
  },

  handleClick: function (e) {
    this.props.updateGame(this.props.pos, e.altKey);
  }
});


React.render( <Game/>, document.getElementById('minesweeper'));
