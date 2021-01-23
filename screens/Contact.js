import React,{Component}from 'react';
import {
    View,
    Text,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView,
    Image} from 'react-native';

import db from '../config';
import firebase from 'firebase';
import { RFValue } from "react-native-responsive-fontsize";

export default class Contact extends Component{
    render(){
        return(
            <View>
                <Text>
                    Contact
                </Text>
            </View>
        )
    }
}
