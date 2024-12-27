import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';

export default function App() {
    const [displayValue, setDisplayValue] = useState('0');
    const [operator, setOperator] = useState(null);
    const [firstValue, setFirstValue] = useState('');
    const [equation, setEquation] = useState('');

    const handleNumberInput = (num) => {
        if (displayValue === '0') {
            setDisplayValue(num.toString());
            setEquation(equation + num.toString());
        } else {
            setDisplayValue(displayValue + num);
            setEquation(equation + num.toString());
        }
    };

    const handleOperatorInput = (operator) => {
        setOperator(operator);
        setFirstValue(displayValue);
        setDisplayValue('0');
        setEquation(equation + ' ' + operator + ' ');
    };

    const handleEqual = () => {
        const num1 = parseFloat(firstValue);
        const num2 = parseFloat(displayValue);

        let result = 0;
        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                result = num1 / num2;
                break;
        }

        setDisplayValue(result.toString());
        setEquation(equation + ' = ' + result);
        setOperator(null);
        setFirstValue('');
    };

    const handleClear = () => {
        setDisplayValue('0');
        setOperator(null);
        setFirstValue('');
        setEquation('');
    };

    const renderButton = (content, onPress, buttonStyle = null, textStyle = null) => (
        <TouchableOpacity
            style={[styles.button, buttonStyle]}
            onPress={onPress}
        >
            <Text style={[styles.buttonText, textStyle]}>{content}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.calculatorBody}>
                <Text style={styles.header}>Om's Calculator</Text>
                <View style={styles.displayContainer}>
                    <Text style={styles.equationText} numberOfLines={1} adjustsFontSizeToFit>
                        {equation}
                    </Text>
                    <Text style={styles.displayText} numberOfLines={1} adjustsFontSizeToFit>
                        {displayValue}
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <View style={styles.row}>
                        {renderButton('AC', handleClear, styles.specialButton, styles.specialButtonText)}
                        {renderButton('+/-', () => {}, styles.specialButton, styles.specialButtonText)}
                        {renderButton('%', () => {}, styles.specialButton, styles.specialButtonText)}
                        {renderButton('/', () => handleOperatorInput('/'), styles.operatorButton)}
                    </View>
                    <View style={styles.row}>
                        {renderButton('7', () => handleNumberInput(7))}
                        {renderButton('8', () => handleNumberInput(8))}
                        {renderButton('9', () => handleNumberInput(9))}
                        {renderButton('x', () => handleOperatorInput('*'), styles.operatorButton)}
                    </View>
                    <View style={styles.row}>
                        {renderButton('4', () => handleNumberInput(4))}
                        {renderButton('5', () => handleNumberInput(5))}
                        {renderButton('6', () => handleNumberInput(6))}
                        {renderButton('-', () => handleOperatorInput('-'), styles.operatorButton)}
                    </View>
                    <View style={styles.row}>
                        {renderButton('1', () => handleNumberInput(1))}
                        {renderButton('2', () => handleNumberInput(2))}
                        {renderButton('3', () => handleNumberInput(3))}
                        {renderButton('+', () => handleOperatorInput('+'), styles.operatorButton)}
                    </View>
                    <View style={styles.row}>
                        {renderButton('0', () => handleNumberInput(0), styles.zeroButton)}
                        {renderButton('.', () => {})}
                        {renderButton('=', handleEqual, styles.equalButton)}
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
        justifyContent: 'center',
    },
    calculatorBody: {
        width: 340,
        backgroundColor: '#1E1E1E',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 10,
    },
    header: {
        fontSize: 24,
        color: '#FFD700',
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    displayContainer: {
        height: 140,
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: 10,
        backgroundColor: '#292929',
        borderRadius: 10,
        marginBottom: 20,
    },
    equationText: {
        fontSize: 18,
        color: '#BBBBBB',
    },
    displayText: {
        fontSize: 48,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'column',
        gap: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    button: {
        width: 70,
        height: 70,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#333333',
    },
    buttonText: {
        fontSize: 26,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    specialButton: {
        backgroundColor: '#505050',
    },
    specialButtonText: {
        color: '#FF4500',
    },
    operatorButton: {
        backgroundColor: '#6A5ACD',
    },
    equalButton: {
        backgroundColor: '#32CD32',
    },
    zeroButton: {
        width: 150,
        alignItems: 'flex-start',
        paddingLeft: 20,
    },
});
