import React from 'react';
import {
    StyleSheet,
    TouchableWithoutFeedback,
    Text,
    Animated,
    Easing,
    View
} from 'react-native';

const styles = StyleSheet.create({
    button: {
        width: 100,
        height: 100,
        backgroundColor: '#40b3ff'
    },
    active: {
        transform: [
            {scale: 2}
        ],
    }
});

class DotButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            active: true,
            slide: new Animated.ValueXY({x: 0, y: 0}),
            rotateValue: new Animated.Value(0)
        };

        this.slideUp = Animated.decay(
            this.state.slide, {
                toValue: {x: 0, y: 200},
                Deceleration: 2
            }
        );

        this.slideDown = Animated.timing(
            this.state.slide, {
                toValue: {x: 0, y: 0},
                duration: 1000,
                easing: Easing.in(Easing.ease)
            }
        );
        this.handlePress = this.handlePress.bind(this);
        this.runAnimation = this.runAnimation.bind(this);
    }

    componentDidMount() {
        this.slideDown.start();
        this.runAnimation();
    }

    runAnimation() {
        const {rotateValue} = this.state;
        rotateValue.setValue(0);
        Animated.timing(rotateValue, {
            toValue: 160,
            duration: 500,
        }).start(() => this.runAnimation());
    }

    handlePress() {
        const {onPressActive, onPressInActive} = this.props,
            {active} = this.state;
        if (active) {
            this.slideDown.start();
            this.setState({
                active: false
            })
        } else {

            this.slideUp.start();
            this.setState({
                active: true
            })
        }
    }

    render() {
        const {active, slide} = this.state,
            slideStyle = slide.getTranslateTransform();

        return (
            <Animated.View style={slideStyle}>
                <TouchableWithoutFeedback
                    onPress={this.handlePress}
                >
                    <View style={styles.button}/>
                </TouchableWithoutFeedback>
            </Animated.View>

        );
    }
}
export default DotButton;