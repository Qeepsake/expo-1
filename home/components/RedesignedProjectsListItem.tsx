import { ChevronDownIcon } from '@expo/styleguide-native';
import { PressableOpacity } from 'components/PressableOpacity';
import { Row, Spacer, Text, useExpoTheme, View } from 'expo-dev-client-components';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';

import { AppIcon } from '../screens/HomeScreen/AppIcon';
import { useSDKExpired } from '../utils/useSDKExpired';

type Props = {
  imageURL?: string;
  name: string;
  subtitle?: string;
  sdkVersion?: string;
};

/**
 * This component is used to render a list item for the projects section on the homescreen and on
 * the projects list page for an account.
 */

export function RedesignedProjectsListItem({ imageURL, name, subtitle, sdkVersion }: Props) {
  const theme = useExpoTheme();
  const [isExpired, sdkVersionNumber] = useSDKExpired(sdkVersion);

  function onPress() {
    // TODO(fiberjw): navigate to the project page
    console.log('RedesignedProjectsListItem.onPress');
  }

  return (
    <PressableOpacity onPress={onPress}>
      <View padding="medium">
        <Row align="center" justify="between">
          <Row align="center">
            <AppIcon image={imageURL} />
            <View>
              <Text style={styles.titleText} ellipsizeMode="tail" numberOfLines={1}>
                {name}
              </Text>
              {subtitle ? (
                <>
                  <Spacer.Vertical size="tiny" />
                  <Text size="small" color="secondary" ellipsizeMode="tail" numberOfLines={1}>
                    {subtitle}
                  </Text>
                </>
              ) : null}
              {sdkVersionNumber ? (
                <>
                  <Spacer.Vertical size="tiny" />
                  <Text size="small" color="secondary" ellipsizeMode="tail" numberOfLines={1}>
                    SDK {sdkVersionNumber}
                    {isExpired ? ': Not supported' : ''}
                  </Text>
                </>
              ) : null}
            </View>
          </Row>
          <ChevronDownIcon
            style={{ transform: [{ rotate: '-90deg' }] }}
            color={theme.icon.secondary}
          />
        </Row>
      </View>
    </PressableOpacity>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 15,
    ...Platform.select({
      ios: {
        fontWeight: '500',
      },
      android: {
        fontWeight: '400',
        marginTop: 1,
      },
    }),
  },
});
