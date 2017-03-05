import React from 'react';
import {
    TouchableWithoutFeedback,
    View
} from 'react-native';

class Cell extends React.Component {
    render() {
        const {cellSize} = this.props;
        console.log(cellSize);
        return (

            <View style={{height: cellSize, width: cellSize - 10, left:7, margin:3}}>
                <TouchableWithoutFeedback >
                    <View style={{
                    height: cellSize - 20,
                    width: cellSize - 25,
                    backgroundColor: 'blue',
                    borderColor: '#000000',
                    borderRadius: 10,
                    borderWidth: 2
                }}/>
                </TouchableWithoutFeedback>
            </View>

        )
    }
}

export default Cell;