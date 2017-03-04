import React from 'react';
import {
    View,
    Text,
    Navigator
} from 'react-native';

import Playground from './Playground';
import {RESULT_PAGE} from '../Pages';

class PlaygroundPage extends React.Component {
    constructor(props) {
        super(props);
        this.renderScene = this.renderScene.bind(this);
        this.goToResultPage = this.goToResultPage.bind(this);
    }

    componentDidMount() {
        const {socket} = this.props;
        socket.on('result-winner', () => {
            this.goToResultPage({
                color: '#388E3C',
                information: 'You are the winner!',
                againButtonText: 'Ready for new challenge ?',
                icon: 'smile-o'
            });
        });

        socket.on('result-draw', () => {
            this.goToResultPage({
                color: '#536DFE',
                information: 'It\'s draw!',
                againButtonText: 'Try again!',
                icon: 'handshake-o'
            });
        });

        socket.on('result-looser', () => {
            this.goToResultPage({
                color: '#F44336',
                information: 'You are too weak!',
                againButtonText: 'Ready for revenge?',
                icon: 'frown-o'
            });
        });

        socket.on('player-disconnect', () => {
            this.goToResultPage({
                color: '#9E9E9E',
                information: 'Your opponent are too weak!',
                againButtonText: 'Try to find another one',
                icon: 'thumbs-up'
            });
        });
    }

    goToResultPage(props) {
        const {navigator, socket} = this.props;
        navigator.push({
            id: RESULT_PAGE,
            name: RESULT_PAGE,
            ...props
        });
    }

    render() {
        const {navigator} = this.props;
        return (
            <Navigator
                renderScene={this.renderScene}
                navigator={navigator}
            />
        )
    }

    renderScene() {
        const {gameData} = this.props,
            {me} = gameData;
        return (
            <View>
                <Playground size={3}/>
                <Text>{me.name}</Text>
            </View>
        );
    }
}

export default PlaygroundPage;