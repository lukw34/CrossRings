import React, {Component} from 'react';
import {
    Navigator
} from 'react-native';

import {START_PAGE, LOADING_PAGE, PLAYGROUND_PAGE, RANKING_PAGE, RESULT_PAGE} from './Pages';
import StartPage from './components/StartPage'
import LoadingPage from './components/LoadingPage';
import PlaygroundPage from './components/PlaygroundPage';
import RankingPage from './components/RankingPage';
import ResultPage from './components/ResultPage';

class App extends Component {
    constructor(props) {
        super(props);
        this.renderScene = this.renderScene.bind(this);
    }

    render() {
        return (
            <Navigator
                initialRoute={{id: START_PAGE, name: START_PAGE}}
                renderScene={this.renderScene}
                configureScene={() => ({...Navigator.SceneConfigs.HorizontalSwipeJumpFromRight, gestures: {pop: {}}})}
            />
        );
    }

    renderScene(route, navigator) {
        const {id} = route,
            props = {
                ...route,
                navigator
            };

        switch (id) {
            case START_PAGE:
                return <StartPage {...props}/>;
            case LOADING_PAGE:
                return <LoadingPage {...props}/>;
            case PLAYGROUND_PAGE:
                return <PlaygroundPage {...props}/>;
            case RANKING_PAGE:
                return <RankingPage {...props}/>;
            case RESULT_PAGE:
                return <ResultPage {...props}/>;
            default:
                return <StartPage {...props}/>;
        }
    }
}
export default App;