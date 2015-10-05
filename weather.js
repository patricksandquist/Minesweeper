var Clock = React.createClass( {
  render: function() {
    return (
      <div>
        {this.state.currentTime}
        <Weather/>
      </div>
    );
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
    return <div>Longitude: {this.state.loc[0]}<br/>Latitude: {this.state.loc[1]}<div>{this.state.weather}</div></div>
  },

  getWeather: function() {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://api.openweathermap.org/data/2.5/weather?lat=' +
                        this.state.loc[0] + '&lon=' + this.state.loc[1], true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        var resp = request.responseText;
        this.setState({weather: resp});
      } else {
        // We reached our target server, but it returned an error
      }
    }.bind(this);

    request.onerror = function() {
      // There was a connection error of some sort
    };

    request.send();
  },

  componentDidMount: function() {
    this.getWeather();
  },

  getInitialState: function() {
    // var geo = navigator.geolocation;
    // var loc;
    var that = this;
    navigator.geolocation.getCurrentPosition(function(pos) {
      var location = [pos.coords.latitude, pos.coords.longitude]
      // console.log(location);
      that.setState({loc: location});
      that.getWeather();
    });
    return {loc: "  "}
  }
});

React.render(<Clock/>, document.getElementById('weather'));
