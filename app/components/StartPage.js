import React from 'react';
import {
    View,
    Button,
    Navigator,
    Text,
    Title
} from 'react-native';

import {LOADING_PAGE} from '../Pages';

class StartPage extends React.Component {
    constructor(props) {
        super(props);
        this.renderScene = this.renderScene.bind(this);
        this.goToLoadingPage = this.goToLoadingPage.bind(this);
    }

    render() {
        return (
            <Navigator
                renderScene={this.renderScene}
                navigator={this.props.navigator}
            />
        );
    }

    goToLoadingPage() {
        const {navigator}  = this.props;
        navigator.push({
            id: LOADING_PAGE,
            name: LOADING_PAGE
        })
    }

    renderScene(route, navigator) {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Button title="Let's play" onPress={this.goToLoadingPage.bind(this)}/>
            </View>
        );
    }
}


export default StartPage;