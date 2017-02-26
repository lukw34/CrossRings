import React from 'react';
import {
    View,
    Text,
    Navigator
} from 'react-native';

class PlaygroundPage extends React.Component {
    constructor(props) {
        super(props);
        this.renderScene = this.renderScene.bind(this);
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
        return (
            <View>
                <Text>Playground</Text>
            </View>
        )
    }
}

export default PlaygroundPage;