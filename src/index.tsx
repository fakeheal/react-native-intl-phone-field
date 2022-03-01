import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import parsePhoneNumber, { CountryCode, PhoneNumber } from 'libphonenumber-js';
import { getEmojiFlag } from 'countries-list';

const INTL_SYMBOL = '+';

type IntlPhoneFieldProps = {
  flagUndetermined: string;
  placeholder: string;
  defaultCountry?: CountryCode;
  defaultPrefix?: string;
  defaultValue?: string;
  defaultFlag?: string;
  onChange?: Function;
  containerStyle?: object;
  flagContainerStyle?: object;
  flagTextStyle?: object;
  textInputStyle?: object;
  textInputProps?: object;
};

let resolveFlagTimeoutId: NodeJS.Timeout;

export default function IntlPhoneField({
  flagUndetermined = '❓',
  onChange,
  defaultCountry,
  defaultPrefix,
  defaultValue,
  defaultFlag,
  containerStyle,
  flagContainerStyle,
  flagTextStyle,
  textInputStyle,
  textInputProps,
}: IntlPhoneFieldProps) {
  console.log('test');
  const [flag, setFlag] = useState<string>(defaultFlag ?? flagUndetermined);

  const [value, setValue] = useState<string>(
    defaultValue ? defaultValue : defaultPrefix ?? ''
  );
  const [formatted, setFormatted] = useState<string>(defaultFlag ?? '');

  const [parsedNumber, setParsedNumber] = useState<PhoneNumber | null>(null);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [countryCode, setCountryCode] = useState<CountryCode | undefined>();

  const onChangeText = (text: string) => {
    setValue(`${INTL_SYMBOL}${text.replaceAll(INTL_SYMBOL, '')}`);
  };

  useEffect(() => {
    if (onChange) {
      onChange(parsedNumber, isValid, countryCode, value, formatted, flag);
    }
  }, [parsedNumber, isValid, countryCode, value, flag, formatted, onChange]);

  // Attempt parsing the value using Google liphonenumber
  useEffect(() => {
    try {
      const parsed = parsePhoneNumber(value, defaultCountry);
      if (parsed) {
        setParsedNumber(parsed);
      }
    } catch (e) {
      setParsedNumber(null);
    }
  }, [value, defaultCountry]);

  useEffect(() => {
    if (parsedNumber?.isValid()) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [parsedNumber]);

  useEffect(() => {
    if (isValid) {
      setCountryCode(parsedNumber?.country);
    } else {
      setCountryCode(undefined);
    }
  }, [parsedNumber, isValid]);

  useEffect(() => {
    if (resolveFlagTimeoutId) {
      clearTimeout(resolveFlagTimeoutId);
    }
    resolveFlagTimeoutId = setTimeout(() => {
      if (countryCode) {
        setFlag(getEmojiFlag(countryCode));
      } else if (value === defaultPrefix && defaultFlag) {
        setFlag(defaultFlag);
      } else {
        setFlag(flagUndetermined);
      }
    }, 300);

    return () => clearTimeout(resolveFlagTimeoutId);
  }, [countryCode, flagUndetermined, defaultFlag, value, defaultPrefix]);

  useEffect(() => {
    if (isValid) {
      setFormatted(parsedNumber?.formatInternational() ?? value);
    } else {
      setFormatted(value);
    }
  }, [isValid, parsedNumber, value]);

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.flag, flagContainerStyle]}>
        <Text style={[styles.flagText, flagTextStyle]}>{flag}</Text>
      </View>
      <TextInput
        value={formatted}
        onChangeText={onChangeText}
        style={[styles.input, textInputStyle]}
        keyboardType="phone-pad"
        {...textInputProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  input: {
    flex: 1,
    flexGrow: 1,
    flexShrink: 1,
    paddingVertical: 10,
  },
  flag: {
    marginRight: 5,
  },
  flagText: {
    fontSize: 24,
  },
});
