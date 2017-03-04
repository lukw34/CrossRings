import React from 'react';
import {
    View,
    Text,
    Navigator,
    Button
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {START_PAGE, LOADING_PAGE} from '../Pages';

class ResultPage extends React.Component {
    constructor(props) {
        super(props);
        this.renderScene = this.renderScene.bind(this);
        this.goToPage = this.goToPage.bind(this);
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

    goToPage(page) {
        const {navigator} = this.props;
        navigator.push({
            name: page,
            id: page
        });
    }

    renderScene() {
        const {color, icon, information, againButtonText} = this.props;
        return (
            <View style={{
                backgroundColor: color,
                justifyContent: 'center',
                flex: 1
            }}>
                <Icon name={icon} size={200} style={{
                    alignSelf: 'center'
                }} color="white"/>
                <Text style={{
                    fontFamily: 'Verdana',
                    alignSelf: 'center',
                    fontSize: 20,
                    color: 'white'
                }}>{information.toUpperCase()}</Text>
                <View style={{
                    marginTop: 15,
                    justifyContent: 'center',
                    alignItems: 'stretch'
                }}>
                    <Button color="#FF5722" title={againButtonText} onPress={() => this.goToPage(LOADING_PAGE)}/>
                    <View style={{
                        marginTop: 10
                    }}>
                        <Button title="resign" onPress={() => this.goToPage(START_PAGE)}/>
                    </View>
                </View>
            </View>
        );
    }
}

export default ResultPage;