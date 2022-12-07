import { SelectField, Flex, TextField, Button,Text, ThemeProvider, Theme } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
// import { Container, Button, FormSelect } from 'react-bootstrap';
// import Form from 'react-bootstrap/Form';
import { Amplify } from 'aws-amplify';
import { API } from 'aws-amplify';
import awsExports from "../aws-exports";
import React, { useEffect, useState } from 'react'; 
import '../App.css'
Amplify.configure(awsExports)
const AWS = require('aws-sdk')
AWS.config.update({ region : 'us-east-2',
accessKeyId: '',
secretAccessKey: '',
})
AWS.config.update({ AWS_SDK_LOAD_CONFIG:1 })
async function submission(){
    let regexp = new RegExp(/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/);
    if (regexp.test(formState.email)){
        const data = {
            body:{
                DataID: formState.dataname,
                AlgoID: formState.algoname,
                Email:  formState.email
            }
        };
        console.log(data);
        const apiData = await API.post('missionfunc', '/mission/selection', data);
        console.log({ apiData });
        alert('Mail sent');
    } else {
        alert('Invalid Email');
    }


}

const formState = { dataname: '', algoname: '', email: ''};
function updateFormState(key, value) {
    formState[key] = value;
}

const dynamodb = new AWS.DynamoDB.DocumentClient()
const DataTableName = 'DataItem'
const AlgoTableName = 'AlgoItem'
//const [myFinalData, setMyFinalData] = useState([]);
var params = {
    TableName: DataTableName
};
var params1 = {
    TableName: AlgoTableName
};

var count = 0;
var myData = new Array();
var myAlgo = new Array();
// function onScan(err, data) {
//     myData.push("Avd");
//     if (err) {
//         console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
//     } else {        
//         console.log("Scan succeeded.");
//         data.Items.forEach(function(itemdata) {
//            console.log("Item :", ++count,JSON.stringify(itemdata));
//            console.log(itemdata.AlgoName)
           
//            console.log(typeof itemdata.AlgoName)
//         });

//         // continue scanning if we have more items
//         if (typeof data.LastEvaluatedKey != "undefined") {
//             console.log("Scanning for more...");
//             params.ExclusiveStartKey = data.LastEvaluatedKey;
//             dynamodb.scan(params, onScan);
//         }
//     }
// }


const Selection = () =>{
    const [myFinalData, setMyFinalData] = useState([]);
    const [myFinalAlgo, setMyFinalAlgo] = useState([]);
    useEffect(()=>{

        dynamodb.scan(params).promise().then((value) => {
            value.Items.forEach(function(itemdata) {
                myData.push(itemdata.DataName)
            })
            setMyFinalData(myData);
        })

        dynamodb.scan(params1).promise().then((value) => {
            value.Items.forEach(function(itemdata) {
                myAlgo.push(itemdata.AlgoName)
            }) 
            setMyFinalAlgo(myAlgo);
        })

        // (async() => {
            // const resultDB = await dynamodb.scan(params).promise();
            // console.log('DB Items:', JSON.stringify(resultDB.Items));
            // resultDB.Items.forEach(function(itemdata) {
            //     myData.push(itemdata.DataName)
            // })
            // setMyFinalData(myData);
            // console.log(myData);
        //   })() 
    })
    // useEffect(()=>{
    //     (async() => {
    //         const resultDB = await dynamodb.scan(params1).promise();
    //         console.log('DB Items:', JSON.stringify(resultDB.Items));
    //         resultDB.Items.forEach(function(itemdata) {
    //             myAlgo.push(itemdata.AlgoName)
    //         })
    //         setMyFinalAlgo(myAlgo);
    //         console.log(myAlgo);
    //       })() 
    // })
    
    return(
    <Flex direction="column" alignContent = "middle">
        <SelectField
            className = "upperSelect"
            label="Data List"
            options={myFinalData}
            placeholder = 'choose one'
            onChange={e => updateFormState('dataname', e.target.value)}
        ></SelectField>
        <SelectField
            label="Algorithm List"
            options={myFinalAlgo}
            placeholder = 'choose one'
            onChange={e => updateFormState('algoname', e.target.value)}
        ></SelectField>
        <TextField
            label={
            <Text>
                Email
                <Text as="span" fontSize="0.8rem" color="red">
                    {' '}
                    (required)
                </Text>
            </Text>
            }
            type="email"
            isRequired={true}
            onChange={e => updateFormState('email', e.target.value)}
        />
        <Button onClick={submission} type="submit">Submit</Button>
        <h1>
            {myData[0]}
        </h1>
    </Flex>

        
    )
};

export default Selection