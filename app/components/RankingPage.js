import React from 'react';
import {
    ActivityIndicator,
    TouchableOpacity,
    Navigator,
    StyleSheet,
    View,
    Text,
    ListView,
    Button
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {API} from '../config';

const styles = StyleSheet.create({
    centering: {alignItems: 'center', justifyContent: 'center', alignSelf: 'center', padding: 8, margin: 0}
});

class RankingPage extends React.Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            isLoading: true,
            ranking: this.ds.cloneWithRows([])
        };

        this.renderScene = this.renderScene.bind(this);
        this._renderSeparator = this._renderSeparator.bind(this);
        this._renderRow = this._renderRow.bind(this);
        this._noEffect = this._noEffect.bind(this);
    }

    componentDidMount() {
        setTimeout(() => {
            fetch(`${API}/api/leaderboard`)
                .then(response => response.json())
                .then(json => {
                    this.setState({
                        isLoading: false,
                        ranking: this.state.ranking.cloneWithRows(json)
                    });
                });
        }, 1000);
    }

    render() {
        const {navigator} = this.props;
        return (
            <Navigator
                renderScene={this.renderScene}
                navigator={navigator}
                navigationBar={ <Navigator.NavigationBar routeMapper={{
                    LeftButton(route, navigator) {
                        return (
                            <TouchableOpacity style={{flex: 1, justifyContent: 'center', marginLeft: 8}}
                                              onPress={() => navigator.parentNavigator.pop()}>
                                <Icon name="close" size={30} color="#ff0000"/>
                            </TouchableOpacity>
                        );
                    },
                    RightButton() {
                        return null;
                    },
                    Title() {
                        return (
                            <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
                                <Text style={{color: 'white', fontSize: 20, fontFamily: 'sans-serif'}}>
                                    TOP 10
                                </Text>
                            </TouchableOpacity>
                        );
                    }
                }} style={{backgroundColor: 'gray', alignItems: 'center', justifyContent: 'center', height: 60}}/> }
            />
        );
    }

    renderScene() {
        const {isLoading, ranking} = this.state;
        return (
            <View style={{marginTop: 60}}>
                <View style={{
                    marginTop: -50,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    position: 'absolute'
                }}>
                    <ActivityIndicator
                        animating={isLoading}
                        style={[styles.centering, {height: 200}]}
                        size={30}
                    />
                </View>
                <ListView dataSource={ranking}
                          enableEmptySections
                          renderRow={this._renderRow}
                          renderSeparator={this._renderSeparator}
                />
            </View>
        );
    }

    _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        return (<View key={`${sectionID}-${rowID}`} style={{
            height: adjacentRowHighlighted ? 4 : 1,
            backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
        }}/> );
    }

    _renderRow(rowData) {
        return (
            <View style={{
                flexWrap: 'wrap', flexDirection: 'row'
            }}>
                <Button onPress={this._noEffect} disabled={true} color="#fff" title={`${rowData.position.toString()}`}/>
                <View style={{
                    flex: 10,
                    alignItems: 'stretch',
                    justifyContent: 'center',
                    padding: 10
                }}>
                    <Button onPress={this._noEffect} title={rowData.name || '(Unknown)'}/>
                    <Button onPress={this._noEffect} title={`Points: ${rowData.points.toString()}`}/>
                </View>
            </View>
        );
    }

    _noEffect() {

    }
}

export default RankingPage;