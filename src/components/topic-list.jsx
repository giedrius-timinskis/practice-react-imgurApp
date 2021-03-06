var React = require('react');
var Reflux = require('reflux');
var ReactRouter = require('react-router');
var TopicStore = require('../stores/topic-store');
var Actions = require('../actions');
var Link = ReactRouter.Link;


module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(TopicStore, 'onChange')
    ],
    getInitialState: function () {
        return {
            topics: []
        }
    },
    // componentWillMount is always run just before component is rendered
    componentWillMount: function() {
        // Get data for topics/defaults, set state to the topics we retrieve
        Actions.getTopics();
    },
    render: function () {
        return (
            <div className="list-group">
                {this.renderTopics()}
            </div>
        )
    },
    renderTopics: function () {
        return this.state.topics.map(function(topic) {
            return (
                <Link to={"topics/" + topic.id} className="list-group-item" key={topic.id}>
                    <h4>{topic.name}</h4>
                    <p>{topic.description}</p>
                </Link>)
        });
    },
    onChange: function (event, topics) {
        this.setState({
            topics: topics
        })
    }
});
