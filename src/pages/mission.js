import { TextField } from '@aws-amplify/ui-react';
import { SelectField, Flex } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Container, Button, Form, FormSelect } from 'react-bootstrap';
import { Amplify } from 'aws-amplify';
import { API } from 'aws-amplify';
import awsExports from "../aws-exports";
Amplify.configure(awsExports)
async function submission(){
    const data = {
        body:{
            DataID: formState.dataid,
            AlgoID: formState.algoid,
            DataPath: formState.datapath,
            AlgoPath: formState.algopath
        }
    };
    console.log(data);
    const apiData = await API.post('backendServer', '/mission', data);
    console.log({ apiData });
    alert('Mail sent');
}

const formState = { dataid: '', algoid: '', datapath: '', algopath:''};
function updateFormState(key, value) {
    formState[key] = value;
}
const Add = () =>{
    return(
        <Container>
            <div>
            <br/>
            <Form>
                <Form.Group>
                    <Form.Label>DataID</Form.Label>
                    <Form.Control placeholder="DataID" onChange={e => updateFormState('dataid', e.target.value)} />
                    <Form.Label>DataPath</Form.Label>
                    <Form.Control placeholder="DataPath" onChange={e => updateFormState('datapath', e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>AlgoID</Form.Label>
                    <Form.Control placeholder="AlgoID" onChange={e => updateFormState('algoid', e.target.value)} />
                    <Form.Label>AlgoPath</Form.Label>
                    <Form.Control placeholder="AlgoPath" onChange={e => updateFormState('algopath', e.target.value)} />
                </Form.Group>
            </Form>
            <Button onClick={submission}>submit</Button>
        </div>
        </Container>


        
    )
};

export default Add