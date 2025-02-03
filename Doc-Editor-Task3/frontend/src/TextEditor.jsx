import React, { useCallback, useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css";
import Quill from "quill";
import { io } from "socket.io-client";
import {useParams} from 'react-router-dom'

const SAVE_INTERVAL_MS = 2000
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

const TextEditor = () => {
  const {id: documentId} = useParams()
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();
  const wrapperRef = useRef(null);

  //Initialize Socket.io
  useEffect(() => {
    const s = io("http://localhost:3001",{
      withCredentials: true,
      transports: ["websocket"],
    })
    setSocket(s);
    return () => s.disconnect();
  }, []);

  //Load Document & Setup Collaboration
  useEffect(()=>{
    if(!socket || !quill) return;

    const loadHandler = (document) => {
      quill.setContents(document?.data?.ops ? document : { ops: [] });
      quill.enable();
    };

    socket.emit("get-document", documentId);
    socket.once("load-document", loadHandler);

    return () => socket.off("load-document", loadHandler);
  },[socket, quill, documentId])

  //Auto save document
  useEffect(()=>{
    if(!socket || !quill) return;

    const interval = setInterval(()=>{
      socket.emit('save-document', quill.getContents())
    }, SAVE_INTERVAL_MS)

    return()=>clearInterval(interval);
  },[socket,quill])

  //Receive Changes from Others
  useEffect(() => {
    if(!socket|| !quill) return;
    
    const changeHandler = (delta) => {
      quill.updateContents(delta, "api");
    };

    socket.on("received-changes", changeHandler);
    return () => socket.off("received-changes", changeHandler);
  }, [socket, quill])

  //Send Changes to Server
  useEffect(() => {
    if(!socket|| !quill) return;
    
    const textChangeHandler = (delta, _oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };

    quill.on("text-change", textChangeHandler);
    return () => quill.off("text-change", textChangeHandler);
  }, [socket, quill])
  

  const initQuill = useCallback((wrapper)=>{
    if(!wrapper) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);

    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });

    q.disable();
    q.setText("Loading document...");
    setQuill(q);
  }, []);

  return <div className="container" ref={initQuill} />;
};

export default TextEditor;
