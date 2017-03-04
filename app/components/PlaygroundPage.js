import React from 'react';
import {
    View,
    Text,
    Navigator,
    Vibration,
    Button
} from 'react-native';

import Playground from './Playground';
import TurnInfo from './TurnInfo';

import {RESULT_PAGE, START_PAGE} from '../Pages';

class PlaygroundPage extends React.Component {
    constructor(props) {
        super(props);
        this.renderScene = this.renderScene.bind(this);
        this.goToResultPage = this.goToResultPage.bind(this);
        this.handleResign = this.handleResign.bind(this);
        this.state = {
            fields: [],
            actualPlayerId: -1
        };
    }

    componentDidMount() {
        const {socket, firstPlayer} = this.props;
        this.setState({
            actualPlayerId: firstPlayer
        });
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

        socket.on('next-turn', ({fields, playerId}) => {
            const {me} = this.props;
            if(me.id === playerId) {
                Vibration.vibrate();
            }

            this.setState({
                fields,
                actualPlayerId: playerId
            })
        });
    }

    goToResultPage(props) {
        const {navigator} = this.props;
        navigator.push({
            id: RESULT_PAGE,
            name: RESULT_PAGE,
            ...props
        });
    }

    handleResign() {
        const {socket, navigator} = this.props;
        socket.disconnect();
        navigator.push({
            id: START_PAGE,
            name: START_PAGE
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
        const {me, opponents} = this.props,
            {actualPlayerId} = this.state;

        return (
            <View>
                <View>
                    <Playground size={3}/>
                </View>
                <View style={{
                    marginBottom: 20,
                    marginTop: 30
                }}>
                    <TurnInfo me={me} opponent={opponents[0]} playerId={actualPlayerId}/>
                </View>
                <Button color="#C62828" title="Resign" onPress={this.handleResign}/>
            </View>
        );
    }
}

export default PlaygroundPage;