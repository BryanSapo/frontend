import React, { useState } from "react";
import './TemiControlBtn.css'
export default function TemiControlBtn(prop){
    var s=prop.locations
    s=s.replace('[','')
    s=s.replace(']','')
    s=s.split(',')
    const [locations,setLocations]=useState(s);
    const [location,setLocation]=useState(s[0]);
    const [words,setWords]=useState("");
    const [newLocation,setNewLocation]=useState("");
    const [func,setFunc]=useState(0);
    const [x,setX]=useState(0);
    const [y,setY]=useState(0);
    const [temiName,setTemiName]=useState(65);

    const click=(e)=>{
        // console.log(prop.id)
        if(String(e.target.value).includes(';')){
            var command=String(e.target.value).split(";")[0]
            var args = String(e.target.value).split(";")[1]+";"+String(e.target.value).split(";")[2]
        }else{
            var command=(e.target.value)
        }
        
        // console.log(command)
        const data = new FormData();
        data.append("command", command);
        data.append("id", prop.id);
        
        switch(command){
            case "setName":
                data.append("args",String.fromCharCode(temiName));
                setTemiName(temiName+1);
                break
            case "Go":
                data.append("args", location);
                break
            case "Speak":
                if(words!=""){
                    data.append("args", words);
                }else{
                    alert("不可以說空白！")
                    return
                }
                break
            case "Save":
                if(newLocation!=""){
                    data.append("args", newLocation);
                }else{
                    alert("不可以把新地點存為空白！")
                }
                break;
            case "Delete":
                const yes=window.confirm("確定要刪除"+location)
                if(yes){
                    data.append("args",location)
                }else{
                    return
                }
                break;
            case "GoPos":
                data.append("args", x+";"+y);
                break;
            case "Tune":
                data.append("args",args);
                break
            case "Reload":
                data.append("args","reload");
                break

        }
        const requestOptions = {
            method: 'POST',
            // headers: { 'Content-Type': 'application/json' },
            body: data
        };
        fetch('/DoSomething', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
            // .then(response => console.log(response.json()))
    }
    return(
        <div className="TemiControlBtn">
            <form action="/" method="post">
                <table>
                    <tbody>
                        <tr>
                            <td><button type="button" value={"Reload"} onClick={click}>reload</button></td>
                        </tr>
                        <tr>
                            <td><button type="button" value={"setName"} onClick={click}>setName</button></td>
                        </tr>
                        <tr>
                            <td className="left">
                                <p>ID:</p>
                            </td>
                            <td className="right">
                                <input  className={"input_temi"} type="text" name="id" placeholder="id" defaultValue={prop.id} onClick={(e)=>{navigator.clipboard.writeText(e.target.value);}} readOnly/>
                            </td>
                        </tr>
                        <tr>
                            <td className="left">
                                <p>IP:</p>
                            </td>
                            <td className="right">
                                <input className={"input_temi"} type="text" name="ip" placeholder="ip" defaultValue={prop.ip} readOnly/>
                            </td>
                        </tr>
                        <tr>
                            <td className="left">
                                <p>功能:</p>
                            </td>
                            <td className="right">
                                <select className="input_temi" onChange={(e)=>{setFunc(e.target.value)}} defaultValue={0}>
                                    <option value={0}>前往地點</option>
                                    <option value={4}>前往座標</option>
                                    <option value={1}>說話</option>
                                    <option value={2}>刪除地點</option>
                                    <option value={3}>新增地點</option>
                                    <option value={5}>座標移動</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td className="left">
                                <p>參數:</p>
                            </td>
                            <td className="right">
                                {func==0||func==2 ?
                                <select className="input_temi" defaultValue={0} onChangeCapture={(e)=>{setLocation(e.target.value)}}>
                                    <option disabled>請選擇要操作的地點</option>
                                    {   
                                        locations.map((e)=>{
                                            // console.log(typeof e)
                                            return(
                                                <option key={e}>{e}</option>
                                            )
                                        })
                                    }
                                </select>:null
                                }
                                {func==1 ? <input className="input_temi" type="text" placeholder="Temi要說什麼"onChange={(e)=>{setWords(e.target.value)}}/>:null}
                                {func==3 ? <input className="input_temi" type="text" placeholder="Temi要記住的新位置名稱"onChange={(e)=>{setNewLocation(e.target.value)}}/>:null}
                                {func==4 ? <><input className="input_temi" type="text" placeholder="X座標"  onChange={(e)=>{setX(e.target.value)}}/>
                                <input className="input_temi" type="text" placeholder="Y座標" onChange={(e)=>{setY(e.target.value)}}/></>:null}
                            </td>
                        </tr>
                        <tr>
                            <td className="left">
                                <p>狀態:</p>
                            </td>
                            <td className="right">
                                <input className={"input_temi"} type="text" name="status" placeholder="status" defaultValue={prop.status} readOnly/>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                {func==0 ? <button className="submit_action" type="button" id={prop.id} value={"Go"} onClick={click}>GO</button>:null}
                                {func==1 ? <button className="submit_action" type="button" id={prop.id} value={"Speak"} onClick={click}>Speak</button>:null}
                                {func==3 ? <button className="submit_action" type="button" id={prop.id} value={"Save"} onClick={click}>Save</button>:null}
                                {func==2 ? <button className="submit_action" type="button" id={prop.id} value={"Delete"} onClick={click}>Delete</button>:null}
                                {func==4 ? <button className="submit_action" type="button" id={prop.id} value={"GoPos"} onClick={click}>GO</button>:null}
                            </td>
                        </tr>
                        {func==5 ? <><tr>
                            <td>調整x座標:</td>
                            <td>
                                <button type="button" className="xy-controller" value={"Tune;x;+"} onClick={click}>+x</button>
                                <button type="button" className="xy-controller" value={"Tune;x;-"} onClick={click}>-x</button>
                            </td>
                        </tr>
                        <tr>
                            <td>調整y座標:</td>
                            <td>
                                <button type="button" className="xy-controller" value={"Tune;y;+"} onClick={click}>+y</button>
                                <button type="button" className="xy-controller" value={"Tune;y;-"} onClick={click}>-y</button>
                            </td>
                        </tr>
                        <tr>
                            <td>調整面朝方向:</td>
                            <td>
                                <button type="button" className="xy-controller" value={"Tune;yaw;+"} onClick={click}>+yaw</button>
                                <button type="button" className="xy-controller" value={"Tune;yaw;-"} onClick={click}>-yaw</button>
                            </td>
                        </tr></>:null}
                        
                    </tbody>
                </table>
            </form>
        </div>
    )
}