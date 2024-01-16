import React from "react";
import { useState } from "react";
import './FileUploader.css'
export default function FileUploader(){
    const [file,setFile]=useState()
    const [loading,setLoading]=useState(false)
    const [queue,setQueue]=useState([])
    const goto=(e)=>{
		const name=String(e.target.value);
		// console.log(name);
		var arg=queue.map((e)=>{
            return(e.bookshelf)
        })
		console.log(arg);
        arg+=';';
        var arg2=queue.map((e)=>{
            return(e.name)
        })
        arg+=arg2
		const data = new FormData();
        data.append("id", localStorage.getItem('bookId'));
        data.append("command", "Go_queue");
		data.append("args", arg);

		const requestOptions = {
            method: 'POST',
            // headers: { 'Content-Type': 'application/json' },
            body: data
        };
        fetch('/DoSomething', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));

	}

    const submitFile=()=>{
        setLoading(true)
        setQueue([])
        const data = new FormData();
        data.append("file",file)
        const requestOptions = {
            method: 'POST',
            // headers: { 'Content-Type': "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" },
            body: data
        };
        fetch('/uploadFile', requestOptions)
            .then(response => response.json())
            .then(data => {
                // alert("上傳完成!");
                console.log(data);
                setLoading(false)
                Object.values(data).map((e)=>{
                    setQueue((oldArray)=>[...oldArray,e])
                })
                console.log(queue)
            });
        console.log(file)
    }
    return(
        <>
            <div className="TemiControlBtn">
                <input type="file" onChange={(e)=>setFile(e.target.files[0])}/>
                <button onClick={submitFile}>送出</button>
            </div>
            {loading ?
                <div className="loading_holder">
                    <pre>
                    <h1 className="loding_text">Loading...</h1>
                    </pre>
                    <div className="loading_anime"></div>
                </div>
                
                :
                <div className="loading_done">
                    <div className="sub">書籍資料將顯示於此</div>
                    <h1>書單資料</h1>
                    <table className="table_details">
                        <thead>
                            <tr>
                                <th className="table_solid">序號</th>
                                <th className="table_solid">書名</th>
                                <th className="table_solid">櫃位號</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                queue.map((e,index)=>{
                                    return(
                                        <tr key={"tr_"+index}>
                                            <td className="table_solid" key={"td_"+index}>{index+1}</td>
                                            <td className="table_solid" key={"td_"+e.name}>{e.name}</td>
                                            <td className="table_solid" key={"td_"+e.bookshelf}>{e.bookshelf}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <button className="btn_go" onClick={goto}>確認開始導航</button>
                </div>
            }
        </>
    )
}