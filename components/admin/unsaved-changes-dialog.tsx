"use client";

import {useEffect,useRef} from 'react';

export default function UnsavedChangesDialog({onKeepEditing,onDiscard}:{onKeepEditing:()=>void;onDiscard:()=>void}){
 const dialog=useRef<HTMLDialogElement>(null);
 useEffect(()=>{dialog.current?.showModal();},[]);
 const keepEditing=()=>{dialog.current?.close();onKeepEditing();};
 const discard=()=>{dialog.current?.close();onDiscard();};
 return <dialog ref={dialog} className="cms-discard-dialog" aria-labelledby="discard-title" aria-describedby="discard-description" onCancel={event=>{event.preventDefault();keepEditing();}}>
  <h2 id="discard-title">Keep your changes?</h2>
  <p id="discard-description">You have unsaved changes. Keep editing to save them, or discard them to continue.</p>
  <div className="cms-discard-actions">
   <button type="button" className="cms-primary" onClick={keepEditing}>Keep editing</button>
   <button type="button" onClick={discard}>Discard changes</button>
  </div>
 </dialog>;
}
