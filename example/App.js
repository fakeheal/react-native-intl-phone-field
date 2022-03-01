import * as React from 'react';
import {useState} from 'react';

import {
  KeyboardAvoidingView,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  StatusBar,
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

  const onChangeMinimal = (_, isValid, countryCode, value, formatted, flag) => {
    console.log(
      'onChangeMinimal',
      isValid,
      countryCode,
      value,
      formatted,
      flag,
    );

    setMinimal({isValid, countryCode});
  };

  const onChangeDefaultCountry = (
    _,
    isValid,
    countryCode,
    value,
    formatted,
    flag,
  ) => {
    console.log(
      'onChangeDefaultCountry',
      isValid,
      countryCode,
      value,
      formatted,
      flag,
    );
    setDefaultCountry({isValid, countryCode});
  };
  const onChangeFilled = (_, isValid, countryCode, value, formatted, flag) => {
    console.log('onChangeFilled', isValid, countryCode, value, formatted, flag);
    setFilled({isValid, countryCode});
  };

  console.log('test');

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar barStyle="dark-content" />
      <Pressable onPress={() => Keyboard.dismiss()} style={{flex: 1}}>
        <KeyboardAvoidingView style={{flex: 1}}>
          <View style={styles.container}>
            <View style={styles.example}>
              <Text style={styles.exampleTitle}>Minimal</Text>
              <IntlPhoneField />
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
            {/*<View style={styles.example}>*/}
            {/*  <Text style={styles.exampleTitle}>Default Country + Prefix</Text>*/}
            {/*  <IntlPhoneField*/}
            {/*    onChange={onChangeDefaultCountry}*/}
            {/*    defaultCountry="BG"*/}
            {/*    defaultPrefix="+359"*/}
            {/*    defaultFlag="🇧🇬"*/}
            {/*  />*/}
            {/*  <View style={styles.output}>*/}
            {/*    <View style={styles.outputRow}>*/}
            {/*      <Text style={styles.outputLabel}>Valid?</Text>*/}
            {/*      <Text style={styles.outputText}>*/}
            {/*        {defaultCountry.isValid ? 'Valid' : 'Invalid'}*/}
            {/*      </Text>*/}
            {/*    </View>*/}
            {/*    <View style={styles.outputRow}>*/}
            {/*      <Text style={styles.outputLabel}>Country Code</Text>*/}
            {/*      <Text style={styles.outputText}>*/}
            {/*        {defaultCountry.countryCode*/}
            {/*          ? defaultCountry.countryCode*/}
            {/*          : 'Undefined'}*/}
            {/*      </Text>*/}
            {/*    </View>*/}
            {/*  </View>*/}
            {/*</View>*/}
            {/*<View style={styles.example}>*/}
            {/*  <Text style={styles.exampleTitle}>Filled + Styles</Text>*/}
            {/*  <IntlPhoneField*/}
            {/*    onChange={onChangeFilled}*/}
            {/*    defaultCountry="BG"*/}
            {/*    defaultPrefix="+359"*/}
            {/*    defaultFlag="🇧🇬"*/}
            {/*    containerStyle={filled.isValid ? styles.valid : styles.invalid}*/}
            {/*  />*/}
            {/*  <View style={styles.output}>*/}
            {/*    <View style={styles.outputRow}>*/}
            {/*      <Text style={styles.outputLabel}>Valid?</Text>*/}
            {/*      <Text style={styles.outputText}>*/}
            {/*        {filled.isValid ? 'Valid' : 'Invalid'}*/}
            {/*      </Text>*/}
            {/*    </View>*/}
            {/*    <View style={styles.outputRow}>*/}
            {/*      <Text style={styles.outputLabel}>Country Code</Text>*/}
            {/*      <Text style={styles.outputText}>*/}
            {/*        {filled.countryCode ? filled.countryCode : 'Undefined'}*/}
            {/*      </Text>*/}
            {/*    </View>*/}
            {/*  </View>*/}
            {/*</View>*/}
          </View>
        </KeyboardAvoidingView>
      </Pressable>
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
