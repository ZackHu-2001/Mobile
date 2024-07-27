import { View, Text, StyleSheet, Dimensions, useWindowDimensions } from 'react-native';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Header = ({ children, name }) => {
    const { width, height } = useWindowDimensions();
    return (
        <View>
            <Text style={[styles.headerStyle, { paddingVertical: height < 415 ? 0 : 5 }]}>Welcome to {name}</Text>
            {children}
        </View>
    )
}
const styles = StyleSheet.create({
    headerStyle: {
        borderColor: 'purple',
        borderWidth: 2,
        margin: 15,
        fontSize: 22,
        padding: 10,
    }
})

export default Header;