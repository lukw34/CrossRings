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
                <Playground size={3}/>
            </View>
        )
    }
}

export default PlaygroundPage;