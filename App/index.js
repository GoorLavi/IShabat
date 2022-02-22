import React, {useEffect, useMemo} from 'react';
import {SafeAreaView, Text} from 'react-native';
import {useFonts} from 'expo-font';
import {AdsProvider} from '@ads';
import MasterView from './MasterView/MasterView';
import {AlertProvider} from '@commonComponents/Alert';
import useNextEvent from '@store/nextEvent/nextEvent';
import Notifications from './components/Notifications';
import getStyles from './styles';
import '../prototypes';

export default () => {
    const styles = useMemo(() => getStyles(), []);

    const {refreshNextEvent, waiting} = useNextEvent();

    const [fontsLoaded] = useFonts({
        'stam': require('@assets/fonts/StamAshkenazCLM.ttf'),
        'shofar': require('@assets/fonts/Shofar.ttf')
    });

    useEffect(() => {
        refreshNextEvent();
    }, []);

    return <>
        <SafeAreaView {...{style: styles.safeAreaTopView}}/>
        <SafeAreaView {...{style: styles.safeAreaBottomView}}>
            <AlertProvider>
                <AdsProvider>
                    <Notifications />
                    {
                        (waiting || !fontsLoaded) ?
                            <Text>{'Loading...'}</Text> :
                            <MasterView/>
                    }
                </AdsProvider>
            </AlertProvider>
        </SafeAreaView>
    </>

}
