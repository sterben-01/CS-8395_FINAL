import { Authenticator } from '@aws-amplify/ui-react';
import { SelectField, Flex } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

const Premium = () =>{
    return(
        <Authenticator>
            {( {signOut} ) => ( 
                <div>
                    <h1>Authenticator online</h1>
                    <h1>Welcome to computational </h1>
                    <Flex direction="column">
                      <SelectField
                        label="Select the Algorithm"
                        options={['A1', 'A2', 'A3']}
                      ></SelectField>

                      <SelectField label="Select the Dataset"
                        options={['D1', 'D2', 'D3']}
                      ></SelectField>
                    </Flex>
                    <button onClick={signOut}>submit</button>

                    <button onClick={signOut}>Sign Out</button>
                </div>

            )}
        </Authenticator>
    )
};

export default Premium