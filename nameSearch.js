var NameSearch = React.createClass({
  render: function() {
    var userInput = this.state.userInput;
    console.log(this.state.userInput);
    return (
      <div>
        <input type={'text'} onKeyUp={this.handleKeypress}>{this.state.userInput}</input>
        <ul>
          {libraries.map(function(value, idx) {
            if (value.indexOf(userInput) !== -1 && userInput !== "") {
              return <li key={idx}>{value}</li>
            }
          })}
        </ul>
      </div>
    );
  },

  handleKeypress: function(e) {
    // do stuff
    this.setState({userInput: e.currentTarget.value});
    // console.log(e.currentTarget.value);
  },

  getInitialState: function() {
    return {userInput: " "};
  }
});

var libraries = [
  'Backbone.js', 'AngularJS',
  'https://angularjs.org/','jQuery',
  'http://jquery.com/','Prototype',
  'http://www.prototypejs.org/','React',
  'http://facebook.github.io/react/','Ember',
  'http://emberjs.com/','Knockout.js',
  'http://knockoutjs.com/','Dojo',
  'http://dojotoolkit.org/','Mootools',
  'http://mootools.net/','Underscore',
  'http://documentcloud.github.io/underscore/','Lodash',
  'http://lodash.com/','Moment',
  'http://momentjs.com/','Express',
  'http://expressjs.com/','Koa',
  'http://koajs.com/'
];

React.render(<NameSearch/>, document.getElementById('name-search'))
