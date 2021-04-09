import React, { useEffect } from 'react';

import DatasetInputs from 'components/DatasetInputs/DatasetInputs';


function CompareDatasets() {

  useEffect(() => inputsRef.current.firstChild.querySelector('textarea').focus())

  const inputsRef = React.createRef();
  const referencesRef = React.createRef();

  function onSubmit() {
    const formState = {inputs: [], references: []}
    inputsRef.current.querySelectorAll('.dataset').forEach(input=> {
      const title = input.querySelector('input').value;
      const list = input.querySelector('textarea').value.split('\n');
      formState.inputs.push({title, list, date: Date.now()});
    })
    referencesRef.current.querySelectorAll('.dataset').forEach(ref => {
      const title = ref.querySelector('input').value;
      const list = ref.querySelector('textarea').value.split('\n');
      formState.references.push({title, list, date: Date.now()});
    })
    console.log(formState);
  }

  function handleShortcuts(e) {
    if(e.key === "ArrowUp" && e.ctrlKey) inputsRef.current.querySelector('.dataset textarea').focus();
    if(e.key === "ArrowDown" && e.ctrlKey) referencesRef.current.querySelector('.dataset textarea').focus();
  };

  return (
    <div onKeyDown={handleShortcuts}>
      <h2>Input datasets</h2>
      <DatasetInputs ref={inputsRef}/>
      <h2>Reference datasets</h2>
      <DatasetInputs ref={referencesRef}/>

      <button onClick={onSubmit}>SUBMIT</button>
    </div>
  )
  
}

export default CompareDatasets;