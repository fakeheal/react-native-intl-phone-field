import * as React from 'react';
import {useState, useCallback} from 'react';

import {
  KeyboardAvoidingView,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  StatusBar,
  ScrollView,
} from 'react-native';
import IntlPhoneField from 'react-native-intl-phone-field';

const DEFAULT_STATE = {
  isValid: null,
  countryCode: null,
};

export default function App() {
  const [minimal, setMinimal] = useState(DEFAULT_STATE);
  const [defaultCountry, setDefaultCountry] = useState(DEFAULT_STATE);
  const [filled, setFilled] = useState(DEFAULT_STATE);
  const [realTimeValidation, setRealTimeValidation] = useState(false);
  const [trackingValue, setTrackingValue] = useState('');

  const onEndEditingMinimal = useCallback(
    ({isValid, countryCode, value, formatted, flag}) => {
      console.log(
        'onEndEditingMinimal',
        isValid,
        countryCode,
        value,
        formatted,
        flag,
      );

      setMinimal({isValid, countryCode});
    },
    [],
  );

  const onEndEditingDefaultCountry = useCallback(
    ({isValid, countryCode, value, formatted, flag}) => {
      console.log(
        'onEndEditingDefaultCountry',
        isValid,
        countryCode,
        value,
        formatted,
        flag,
      );
      setDefaultCountry({isValid, countryCode});
    },
    [],
  );

  const onEndEditingFilled = useCallback(
    ({isValid, countryCode, value, formatted, flag}) => {
      console.log(
        'onEndEditingFilled',
        isValid,
        countryCode,
        value,
        formatted,
        flag,
      );
      setFilled({isValid, countryCode});
    },
    [],
  );

  const onValidationFilled = useCallback(
    isValid => setRealTimeValidation(isValid),
    [],
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar barStyle="dark-content" />
      <ScrollView>
        <Pressable onPress={() => Keyboard.dismiss()} style={{flex: 1}}>
          <KeyboardAvoidingView style={{flex: 1}}>
            <View style={styles.container}>
              <View style={styles.example}>
                <Text style={styles.exampleTitle}>Minimal</Text>
                <IntlPhoneField onEndEditing={onEndEditingMinimal} />
                <View style={styles.output}>
                  <View style={styles.outputRow}>
                    <Text style={styles.outputLabel}>Valid?</Text>
                    <Text style={styles.outputText}>
                      {minimal.isValid ? 'Valid' : 'Invalid'}
                    </Text>
                  </View>
                  <View style={styles.outputRow}>
                    <Text style={styles.outputLabel}>Country Code</Text>
                    <Text style={styles.outputText}>
                      {minimal.countryCode ? minimal.countryCode : 'Undefined'}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.example}>
                <Text style={styles.exampleTitle}>
                  Default Country + Prefix
                </Text>
                <IntlPhoneField
                  onEndEditing={onEndEditingDefaultCountry}
                  defaultCountry="BG"
                  defaultPrefix="+359"
                  defaultFlag="🇧🇬"
                />
                <View style={styles.output}>
                  <View style={styles.outputRow}>
                    <Text style={styles.outputLabel}>Valid?</Text>
                    <Text style={styles.outputText}>
                      {defaultCountry.isValid ? 'Valid' : 'Invalid'}
                    </Text>
                  </View>
                  <View style={styles.outputRow}>
                    <Text style={styles.outputLabel}>Country Code</Text>
                    <Text style={styles.outputText}>
                      {defaultCountry.countryCode
                        ? defaultCountry.countryCode
                        : 'Undefined'}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.example}>
                <Text style={styles.exampleTitle}>Filled + Styles</Text>
                <IntlPhoneField
                  onEndEditing={onEndEditingFilled}
                  onValidation={onValidationFilled}
                  defaultValue="+359 88 888 8888"
                  defaultCountry="BG"
                  defaultPrefix="+359"
                  defaultFlag="🇧🇬"
                  containerStyle={
                    realTimeValidation ? styles.valid : styles.invalid
                  }
                />
                <View style={styles.output}>
                  <View style={styles.outputRow}>
                    <Text style={styles.outputLabel}>Valid?</Text>
                    <Text style={styles.outputText}>
                      {filled.isValid ? 'Valid' : 'Invalid'}
                    </Text>
                  </View>
                  <View style={styles.outputRow}>
                    <Text style={styles.outputLabel}>Country Code</Text>
                    <Text style={styles.outputText}>
                      {filled.countryCode ? filled.countryCode : 'Undefined'}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.example}>
                <Text style={styles.exampleTitle}>Tracking Value</Text>
                <IntlPhoneField
                  defaultValue={trackingValue}
                  onValueUpdate={setTrackingValue}
                  onEndEditing={result => {
                    setTrackingValue(result.formatted);
                  }}
                />
                <View style={styles.output}>
                  <View style={styles.outputRow}>
                    <Text style={styles.outputLabel}>Tracking Value:</Text>
                    <Text style={styles.outputText}>{trackingValue}</Text>
                  </View>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  example: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
  },
  exampleTitle: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  valid: {
    borderBottomColor: 'green',
  },
  invalid: {
    borderBottomColor: 'red',
  },
  output: {
    marginTop: 20,
  },
  outputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  outputLabel: {},
  outputText: {
    fontWeight: 'bold',
  },
});
