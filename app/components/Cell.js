import React from 'react';
import {
    TouchableWithoutFeedback,
    View,
    StyleSheet
} from 'react-native';

class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            element: ''
        };
    }

    renderCross(){
        const {cellSize} = this.props;
        return (
                <View style={{height: cellSize, width: cellSize - 10, left:7, margin:3}}>
                    <View style={[styleSheet.cross,{
                        height: cellSize - 120,
                        width: cellSize - 25,
                        top: 55,
                        transform:[
                        {rotate: '45deg'}]}]}
                    />
                    <View style={[styleSheet.cross,{
                        height: cellSize - 120,
                        width: cellSize - 25,
                        top: 48,
                        transform:[
                        {rotate: '135deg'}]}]}
                    />
                </View>

        );
    }

    renderCircle(){
        const {cellSize} = this.props;
        return(

            <View style={{height: cellSize, width: cellSize - 10, left:7, margin:3}}>
                <View style={[styleSheet.circle,
                    {height: cellSize - 25,
                    width: cellSize - 25}]}
                />
            </View>

        );
    }

    whichObject(element){
        const {cellSize} = this.props;
        if (element === 'X'){
            return this.renderCross();
        }if (element === 'O'){
            return this.renderCircle();
        }
        return (<View style={{height: cellSize, width: cellSize - 10, left:7, margin:3}}/>);
    }

    render() {
        const {cellSize} = this.props;
        console.log(cellSize);

        return (
            <View style={{height: cellSize, width: cellSize - 10, left:7, margin:3}}/>,
            <TouchableWithoutFeedback onPressIn={() => this.state.element='X'}>
                {this.whichObject(this.state.element)}
            </TouchableWithoutFeedback>
        )
    }
}

const styleSheet = StyleSheet.create({
    circle: {
        alignItems: 'center',
        borderColor: 'blue',
        borderRadius: 100,
        borderWidth: 8
    },
    cross: {
        backgroundColor: 'red',
        borderRadius: 5,
    }
});

export default Cell;