var React = require('react');
var ReactDOM = require('react-dom');


var ReactClass = React.createClass({
    getInitialState: function () {
        return {
            isHeaderHidden: false,
            title: 'Stateful React Component'
        }
    },
    handleClick: function () {
        this.setState({
            isHeaderHidden: !this.state.isHeaderHidden
        });
    },
    render: function () {
        var btn = <button className="btn btn-default" onClick={this.handleClick}>Toggle</button>,
            header = <h1 className="header">{this.state.title}</h1>;
        if (this.state.isHeaderHidden) {
            return <div>{btn}</div>;
        }

        return <div>{btn header}</div>;
    }
});

var ReactComponentElement = React.createElement(ReactClass);

ReactDOM.render(ReactComponentElement, document.getElementById('react-application'));