var Clock = React.createClass( {
  render: function() {
    return (<div>
                {this.state.currentTime}
                <Weather/>
            </div>);
  },

  getInitialState: function() {
    date = new Date();
    var time = date.getHours() + ":" +
               date.getMinutes() + ":" +
               date.getSeconds();
    return {currentTime: time}
  },

  componentDidMount: function() {
    setInterval(this.changeTime, 1000);
  },

  changeTime: function() {
    date = new Date();
    var time = date.getHours() + ":" +
               date.getMinutes() + ":" +
               date.getSeconds();
    this.setState({currentTime: time});
  }
});

var Weather = React.createClass({
  render: function() {
    return <div>Longitude: {this.state.loc[0]}<br/>Latitude: {this.state.loc[1]}</div>
  },

  getInitialState: function() {
    // var geo = navigator.geolocation;
    // var loc;
    var that = this;
    navigator.geolocation.getCurrentPosition(function(pos) {
      var locat = [pos.coords.latitude, pos.coords.longitude]
      // console.log(locat);
      that.setState({loc: locat});
    });
    return {loc: "  "}
  }
});

React.render(<Clock/>, document.getElementById('weather'));
