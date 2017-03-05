import React from 'react';
import {
    Dimensions,
    View,
    StyleSheet
} from 'react-native';

import Cell from './Cell';

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
            {width} = Dimensions.get('window'),
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

            <View>
                <View style={[styleSheet.lineX, {
                    transform:[
                        {translateX: 125}]}
                        ]
                    }
                />
                <View style={[styleSheet.lineX, {
                    transform:[
                        {translateX: 250}]}
                        ]
                    }
                />
                <View style={[styleSheet.lineY, {
                    transform:[
                        {translateY: 130}]}
                        ]
                    }
                />
                <View style={[styleSheet.lineY, {
                    transform:[
                        {translateY: 265}]}
                        ]
                    }
                />
                <View style={{flex: 0, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', top: 11}}>
                    {cells}
                </View>
            </View>

        )
    }
}

const styleSheet = StyleSheet.create({
    lineX: {
        backgroundColor:"#000",
        height:400,
        width:10,
        position:'absolute',
        top:3,
        borderRadius: 10
    },
    lineY: {
        backgroundColor:"#000",
        height:10,
        width:375,
        position:'absolute',
        borderRadius: 10,
        left:4
    }
});


export default Playground;