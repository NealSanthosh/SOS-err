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


export default class LoginScreen extends Component{
  constructor(){
    super();
    this.state={
      emailId:'',
      password:'',
      firstName:'',
      lastName:'',
      address:'',
      contact:'',
      confirmPassword:'',
      age:'',
      isModalVisible:'false'
    }
  }

  userSignUp = (emailId, password,confirmPassword) =>{
   if(password !== confirmPassword){
       return Alert.alert("password doesn't match\nCheck your password.")
   }else{
     firebase.auth().createUserWithEmailAndPassword(emailId, password)
     .then(()=>{
       db.collection('users').add({
         first_name:this.state.firstName,
         last_name:this.state.lastName,
         contact:this.state.contact,
         email_id:this.state.emailId,
         address:this.state.address,
         password:password,
         IsBookRequestActive : false
       })
       return  Alert.alert(
            'User Added Successfully',
            '',
            [
              {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})},
            ]
        );
     })
     .catch((error)=> {
       // Handle Errors here.
       var errorCode = error.code;
       var errorMessage = error.message;
       return Alert.alert(errorMessage)
     });
   }
 }

userLogin = (emailId, password)=>{
   firebase.auth().signInWithEmailAndPassword(emailId, password)
   .then(()=>{
     this.props.navigation.navigate('DonateBooks')
   })
   .catch((error)=> {
     var errorCode = error.code;
     var errorMessage = error.message;
     return Alert.alert(errorMessage)
   })
 }

showModal = ()=>{
  return(
  <Modal
    animationType="fade"
    transparent={true}
    visible={this.state.isModalVisible}
    >
   
      <ScrollView style={styles.scrollView}>
       <View styles = {styles.signupView}>

        <Text
          style={styles.signupText}
          >Sign Up</Text>
          </View>
          <View style={{ flex: 0.95 }}>
          <Text style={styles.label}>First Name </Text>
        <TextInput
          style={styles.formTextInput}
          placeholder ={"First Name"}
          maxLength ={8}
          onChangeText={(text)=>{
            this.setState({
              firstName: text
            })
          }}
        />
           <Text style={styles.label}>Last Name </Text>
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Last Name"}
          maxLength ={8}
          onChangeText={(text)=>{
            this.setState({
              lastName: text
            })
          }}
        />
         <Text style={styles.label}>Contact </Text>
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Contact"}
          maxLength ={10}
          keyboardType={'numeric'}
          onChangeText={(text)=>{
            this.setState({
              contact: text
            })
          }}
        />
          <Text style={styles.label}> Address </Text>
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Address"}
          multiline = {true}
          onChangeText={(text)=>{
            this.setState({
              address: text
            })
          }}
        />
           <Text style={styles.label}> Age </Text>
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Age"}
          maxLength ={6}
          keyboardType={'numeric'}
          onChangeText={(text)=>{
            this.setState({
              age: text
            })
          }}
        />
           <Text style={styles.label}>Email </Text>
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Email"}
          keyboardType ={'email-address'}
          onChangeText={(text)=>{
            this.setState({
              emailId: text
            })
          }}
        />

<Text style={styles.label}> Password </Text>
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Password"}
          secureTextEntry = {true}
          onChangeText={(text)=>{
            this.setState({
              password: text
            })
          }}
        />
          <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Confrim Password"}
          secureTextEntry = {true}
          onChangeText={(text)=>{
            this.setState({
              confirmPassword: text
            })
          }}
        />
        </View>
        <View style={{ flex: 0.2, alignItems: "center" }}>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={()=>
              this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
            }
          >
          <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
        
      
         
           
          <Text
              style={styles.cancelButtonText}
              onPress={() => {
                this.setState({ isModalVisible: false });
              }}
            >
              Cancel
            </Text>
       
        </View>
        
      </ScrollView>

  </Modal>
)
}
  render(){
    return(
      <View style={styles.container}>
          {
            this.showModal()
          }
        <View style={{flex : 0.25}}>
          <View style ={{flex:0.15}}/>
          <View style = {styles.santaView}>
            <Image source={require("../assets/santa.png")}
              style={styles.santaImage}/>
          <Text style={styles.title}>Book Santa</Text>
          </View>
        </View>
        <View style = {{flex:0.45}}>
          <View Style = {styles.textInput}>
            <TextInput
            style={styles.loginBox}
            placeholder="abc@example.com"
            keyboardType ='email-address'
            onChangeText={(text)=>{
              this.setState({
                emailId: text
              })
            }}
          />
          <TextInput
          style={styles.loginBox}
          secureTextEntry = {true}
          placeholder="enter Password"
          onChangeText={(text)=>{
            this.setState({
              password: text
            })
          }}
        />
        </View>
        <View style={{ flex: 0.5, alignItems: "center" }}>
         <TouchableOpacity
           style={styles.button}
           onPress = {()=>{
             this.userLogin(this.state.emailId, this.state.password)
           }}
           >
           <Text style={styles.buttonText}>Login</Text>
         </TouchableOpacity>

         <TouchableOpacity
           style={styles.button}
           onPress={()=>this.setState({ isModalVisible:true})}
           >
           <Text style={styles.buttonText}>SignUp</Text>
         </TouchableOpacity>
        </View>
      </View> 
      <View style ={{flex:0.3}}>
      <Image source={require("../assets/book.png")}
            style={styles.bookImage}
            resizeMode={"stretch"}
      />
      </View>

    </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
   flex:1,
   backgroundColor:'#6fc0b8',
 },
 loginBox: {
  width: "80%",
  height: RFValue(50),
  borderWidth: 1.5,
  borderColor: "#ffffff",
  fontSize: RFValue(20),
  paddingLeft: RFValue(10)
},
 profileContainer:{
   flex:1,
   justifyContent:'center',
   alignItems:'center',
 },
 title :{
   fontSize:65,
   fontWeight:'300',
   paddingBottom:30,
   color : '#ff3d00'
 },
 loginBox:{
   width: 300,
   height: 40,
   borderBottomWidth: 1.5,
   borderColor : '#ff8a65',
   fontSize: 20,
   margin:10,
   paddingLeft:10
 },
 KeyboardAvoidingView:{
   flex:1,
   justifyContent:'center',
   alignItems:'center'
 },
 modalTitle :{
   justifyContent:'center',
   alignSelf:'center',
   fontSize:30,
   color:'#ff5722',
   margin:50
 },
 modalContainer:{
   flex:1,
   borderRadius:20,
   justifyContent:'center',
   alignItems:'center',
   backgroundColor:"#ffff",
   marginRight:30,
   marginLeft : 30,
   marginTop:80,
   marginBottom:80,
 },
 formTextInput:{
   width:"75%",
   height:35,
   alignSelf:'center',
   borderColor:'#ffab91',
   borderRadius:10,
   borderWidth:1,
   marginTop:20,
   padding:10
 },
 registerButton:{
   width:200,
   height:40,
   alignItems:'center',
   justifyContent:'center',
   borderWidth:1,
   borderRadius:10,
   marginTop:30
 },
 registerButtonText:{
   color:'#ff5722',
   fontSize:15,
   fontWeight:'bold'
 },
 cancelButton:{
   width:200,
   height:30,
   justifyContent:'center',
   alignItems:'center',
   marginTop:5,
 },

 button:{
  width: "80%",
  height: RFValue(50),
  justifyContent: "center",
  alignItems: "center",
  borderRadius: RFValue(25),
  backgroundColor: "#ffff",
  shadowColor: "#000",
  marginBottom: RFValue(10),
  shadowOffset: {
    width: 0,
    height: 8
  },
  shadowOpacity: 0.3,
  shadowRadius: 10.32,
  elevation: 16
 },
 buttonText:{
  color: "#32867d",
  fontWeight: "200",
  fontSize: RFValue(20)
 },
 label: {
  fontSize: RFValue(13),
  color: "#717D7E",
  fontWeight: "bold",
  paddingLeft: RFValue(10),
  marginLeft: RFValue(20)
},
formInput: {
  width: "90%",
  height: RFValue(45),
  padding: RFValue(10),
  borderWidth: 1,
  borderRadius: 2,
  borderColor: "grey",
  paddingBottom: RFValue(10),
  marginLeft: RFValue(20),
  marginBottom: RFValue(14)
},
registerButton: {
  width: "75%",
  height: RFValue(50),
  marginTop: RFValue(20),
  justifyContent: "center",
  alignItems: "center",
  borderRadius: RFValue(3),
  backgroundColor: "#32867d",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 8
  },
  shadowOpacity: 0.44,
  shadowRadius: 10.32,
  elevation: 16,
  marginTop: RFValue(10)
},
registerButtonText: {
  fontSize: RFValue(23),
  fontWeight: "bold",
  color: "#fff"
},
cancelButtonText: {
  fontSize: RFValue(20),
  fontWeight: "bold",
  color: "#32867d",
  marginTop: RFValue(10)
},
scrollview: {
  flex: 1,
  backgroundColor: "#fff"
},
signupView: {
  flex: 0.05,
  justifyContent: "center",
  alignItems: "center"
},
signupText: {
  fontSize: RFValue(20),
  fontWeight: "bold",
  color: "#32867d"
},
santaView: {
  flex: 0.85,
  justifyContent: "center",
  alignItems: "center",
  padding: RFValue(10)
},
 textInput: {
  flex: 0.5,
  alignItems: "center",
  justifyContent: "center"
},
santaView: {
  flex: 0.85,
  justifyContent: "center",
  alignItems: "center",
  padding: RFValue(10)
},
santaImage: {
  width: "70%",
  height: "100%",
  resizeMode: "stretch"
},
bookImage: {
  width: "100%",
  height: RFValue(220)
}
})
