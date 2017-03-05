import React from 'react';
import {
    Dimensions,
    View,
    StyleSheet
} from 'react-native';

import Cell from './Cell';

const {width, height} = Dimensions.get('window');

class Playground extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cells: []
        };
    }

    componentWillMount() {
        const {size} = this.props,
            cells = [],
            cellSize = width / size,
            boardSize = size * size;
        console.log(size);
        console.log(width);
        for (let index = 0; index < boardSize; index++) {
            console.log('push');
            cells.push(<Cell key={index} cellSize={cellSize}/>)
        }

        this.setState({
            cells
        })
    }

    render() {
        const {cells} = this.state;
        return (

                <View style={{flex: 0, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', top: 11}}>
                    {cells}
                    <View style={[styleSheet.lineX, { height: height/1.6,
                    transform:[
                        {translateX: height/5}]}
                        ]}
                    />
                    <View style={[styleSheet.lineX, { height: height/1.6,
                    transform:[
                        {translateX: height/2.45}]}
                        ]}
                    />
                    <View style={[styleSheet.lineY, { width: width/1.05,
                    transform:[
                        {translateY: width/3.25}]}
                        ]}
                    />
                    <View style={[styleSheet.lineY, { width: width/1.05,
                    transform:[
                        {translateY: width/1.52}]}
                        ]}
                    />
                </View>

        )
    }
}

const styleSheet = StyleSheet.create({
    lineX: {
        backgroundColor: "#000",
        width: 10,
        position: 'absolute',
        borderRadius: 10
    },
    lineY: {
        backgroundColor: "#000",
        height: 10,
        position: 'absolute',
        borderRadius: 10
    }
});


export default Playground;