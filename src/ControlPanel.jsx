import React from "react";
import { useEffect,useState } from "react";
import TemiControlBtn from "./TemiControlBtn";
const ControlPanel =()=>{
    const [temis,setTemis]=useState([])
    const [status,setStatus]=useState([])
	useEffect(() => {
		// fetch("/doSomething") // -> want to clear all ws clients that is already closed.
		// Using fetch to fetch the api from
		// flask server it will be redirected to proxy
		fetch("/fake_temi").then((res) =>
			res.json().then((data) => {
				setTemis([])
				// console.log(data)
				
				if((typeof data)=='string'){
					// console.log("***")
					setStatus("Currently has no Temi Connected with...")
				}else{
					data=data['_default']
					// console.log(data)
					Object.values(data).map((e)=>{
						setTemis((oldArray)=>[...oldArray,e])

						// Object.values(e).map((e2)=>{
						// 	// console.log(e)
						// 	setTemis((oldArray)=>[...oldArray,e2])
						// })
					})
					setStatus("Currently has follwing Temi Connected with...")
				}
				// console.log(status)
			})
		);
	}, []);
    if(temis.length>0){
        return(
            <div>
                {
                    temis.map((e)=>{
                        // console.log(e.status)
                        return(<TemiControlBtn key={e.id} id={e.id} ip={e.ip} status={e.status} locations={e.location}/>)
                    })
                }
            </div>
        )
    }else{
        return(
            <div>目前沒有WebSocket連線!!!</div>
        )
    }
    
}
export default ControlPanel;