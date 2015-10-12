var Tabs = React.createClass({
  render: function () {
    var selectedIdx = this.state.selectedIdx;
    return (
      <div>
        <ul>
          {Object.keys(this.props.tabsObject).map(function (title, idx) {
            var bold;
            idx === selectedIdx ? bold = 'bold' : bold = '';
            return <li onClick={this.handleClick}
                       key={idx} data-idx={idx}
                       style={{fontWeight:bold}}> {title} </li>;
          }.bind(this))}
        </ul>

        <p> {tabsObject[Object.keys(this.props.tabsObject)[selectedIdx]]} </p>
      </div>
    )
  },

  getInitialState: function () {
    return {selectedIdx: 0}
  },

  handleClick: function (e) {
    this.setState({
      selectedIdx: parseInt(e.target.attributes[0].value)
    });
  }
});

var tabsObject =  {"hound": "friend of foxes", "retriever": "gets things", "sheep dog": "herds all the sheep"}
React.render(<Tabs tabsObject={tabsObject}/>, document.getElementById('tabs'));
