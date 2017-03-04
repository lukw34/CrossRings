import React from 'react';
import SocketIOClient from 'socket.io-client';
import {
    ActivityIndicator,
    Navigator,
    StyleSheet,
    View,
    Text
} from 'react-native';
import {PLAYGROUND_PAGE} from  '../Pages';
import {API} from '../config';

const styles = StyleSheet.create({
    centering: {alignItems: 'center', justifyContent: 'center', padding: 8,}
});

class LoadingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };

        this.socket = SocketIOClient(API);

        this.findPlayer = this.findPlayer.bind(this);
        this.renderScene = this.renderScene.bind(this);
    }

    componentDidMount() {
        this.findPlayer();
    }

    findPlayer() {
        const {navigator, userName} = this.props;
        setTimeout(() => this.socket.emit('get-game', {name: userName}), 1000);
        this.socket.on('game-ready', gameData => {
            this.setState({
                isLoading: false
            });
            navigator.push({
                id: PLAYGROUND_PAGE,
                name: PLAYGROUND_PAGE,
                socket: this.socket,
                gameData
            });
        });
        setTimeout(() => {

        }, 10000)
    }

    render() {
        const {navigator} = this.props;
        return (
            <Navigator
                renderScene={this.renderScene}
                navigator={navigator}
            />
        );
    }

    renderScene() {
        const {isLoading} = this.state;
        return (
            <View style={{
                flex: 10,
                justifyContent: 'center'
            }}>
                <Text style={{
                    fontSize: 18,
                    color: 'black',
                    alignSelf: 'center'
                }}>
                    We try to find brave enough opponent!
                </Text>
                <ActivityIndicator
                    animating={isLoading}
                    style={[styles.centering, {height: 200}]}
                    size={120}
                />
            </View>
        );
    }
}

export default LoadingPage;