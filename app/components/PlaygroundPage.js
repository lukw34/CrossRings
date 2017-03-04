import React from 'react';
import {
    View,
    Text,
    Navigator
} from 'react-native';

import Playground from './Playground';

class PlaygroundPage extends React.Component {
    constructor(props) {
        super(props);
        this.renderScene = this.renderScene.bind(this);
    }

    componentDidMount() {
        const {socket} = this.props;
        socket.on('result-winner', () => {

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