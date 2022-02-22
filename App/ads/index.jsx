import React, {useCallback, useEffect, useState, useRef} from 'react';
import {View} from 'react-native';
import {AdMobRewarded, setTestDeviceIDAsync} from 'expo-ads-admob';
import {alert} from '@commonComponents/Alert';
import {texts} from './constants';
import * as Device from 'expo-device';
import {pickByPlatform} from '@globals/utils';
import * as constants from '@ads/constants';

export const AdsContext = React.createContext();

const useAdListeners = ref => {
    useEffect(() => {
        AdMobRewarded.addEventListener('rewardedVideoDidRewardUser', () => ref.current({
            eventName: 'Rewarded',
            isSucceeded: true
        }));
        AdMobRewarded.addEventListener('rewardedVideoDidFailToLoad', () => ref.current({
            eventName: 'FailedToLoad',
            isSucceeded: false
        }));
        AdMobRewarded.addEventListener('rewardedVideoDidClose', () => ref.current({
            eventName: 'Closed',
            isSucceeded: false
        }));

        return () => AdMobRewarded.removeAllListeners();
    }, []);
}

export const AdsProvider = ({children}) => {

    // adData
    // {callback, hideFailAlert = false}
    const [adData, setAdData] = useState();
    const ref = useRef();
    ref.current = ({eventName, isSucceeded}) => {
        if (eventName === 'FailedToLoad' && !adData?.hideFailAlert)
            alert.show({
                title: texts.FAILED_TO_LOAD_ALERT_TITLE,
                message: texts.FAILED_TO_LOAD_ALERT_MESSAGE,
                skin: 'danger'
            });

        adData?.callback({eventName, isSucceeded});
        setAdData();
    };

    useAdListeners(ref);

    const displayRewardedAd = useCallback(async ({callback, hideFailAlert = false}) => {

        // Comment to show ad on development
        if (__DEV__) {
            callback({eventName: 'Rewarded', isSucceeded: true})
            console.info('Ads is invisible in dev mode')
            return;
        }

        if (!callback) {
            console.error('Please provide a callback');
            return;
        }

        setAdData({callback, hideFailAlert});

        try {
            let unitId;
            if (!Device.isDevice || __DEV__) {
                // unitId that should be used if we want to test ads.
                await setTestDeviceIDAsync('EMULATOR');
                unitId = Platform.select({
                    ios: constants.IOS_REWARDED_TEST_UNIT_ID,
                    android: constants.ANDROID_REWARDED_TEST_UNIT_ID,
                });
            } else {
                // We should run it to display the ad on an real phone app.
                unitId = pickByPlatform({
                    android: constants.ANDROID_REWARDED_UNIT_ID,
                    ios: constants.IOS_REWARDED_UNIT_ID
                });
            }

            await AdMobRewarded.setAdUnitID(unitId);
            await AdMobRewarded.requestAdAsync();
            await AdMobRewarded.showAdAsync();
        } catch (error) {
            console.error(error)
        }
    }, [setAdData]);

    return <View>
        <AdsContext.Provider {...{value: {displayRewardedAd}}}>
            {children}
        </AdsContext.Provider>
    </View>
}
