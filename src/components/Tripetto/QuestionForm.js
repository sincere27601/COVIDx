import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Collector } from "tripetto-collector-rolling";
import Services from "tripetto-services";

const token = process.env.REACT_APP_TRIPETTO_TOKEN

const FormContainer = styled.div`
  height: 80vh;
`

export const QuestionForm = () => {
  const [ formDefinition, setFormDefinition] = useState();
  const [ formStyle, setFormStyle ] = useState();
  const [ loading, setLoading ] = useState(true)
  const [ error, setError ] = useState(false)
  useEffect(() => {
    Services.init({ token });
    Services.style.then(res => { setFormStyle(res) });
    Services.definition.then(res => {
      setLoading(false)
      setFormDefinition(res);
    }
    ).catch( err => {
      setLoading(false);
      setError(true);
    });
  },[])
  return (
    <FormContainer>
      { loading && <div>form is loading...</div>}
      { error && !loading && <div>There is a problem with the form</div>}
      { formDefinition && (
        <Collector
          definition={formDefinition}
          style={formStyle}
          onFinish={(instance) => {
            console.log(instance);
          }}
        />
      )}
    </FormContainer>
  );
}
