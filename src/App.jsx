// Importing modules
import React, { useState, useEffect } from "react";
import "./App.css";
import TemiControlBtn from "./TemiControlBtn";
function App() {
	const stall={'1':{'dep':'桃園校區','name':'多媒體資源中心','p':'位於桃園校區圖書館二樓，其館藏皆不可外借使用(教師教學使用除外)。內設有16台個人PC、6台影音播放器、2台黑膠唱片播放，採半開放式，CD、CDROM、VCD及DVD須先從架上拿取至櫃檯辦理借閱，其餘資料請自行拿取使用。'},
				'2':{'dep':'桃園校區','name':'小劇院','p':'可供6至10人一同觀賞館藏視聽資料，登記使用人數須達6人以上，並開放7天前線上預約服務。借用時，請先挑選館藏視聽影片，並攜帶學生證至櫃檯辦理借用，詳細規則與權益請參考小劇院暨視聽室借用辦法。'},
				'3':{'dep':'桃園校區','name':'學習共享區','p':'學習共享區內由三種彈性多元造型座位構成約近96個席次位，並設置一台82吋和一台65吋移動式觸控螢幕、三台55吋定點式觸控式螢幕，其內建電子白板教學軟體，提供使用者互動式學習，可做簡報之預演或投影討論。'},
				'4':{'dep':'桃園校區','name':'中庭活動區','p':'每月定期舉辦各式主題書展活動或配合校慶活動舉辦特展，例如：  包創辦人絕代風華旗袍特展、包德明博士生平展、『情繫銘傳-梁丹丰畫筆走過的歲月』新書發表會暨原作畫展、學院經典書展、科技趨勢大觀園主題書展、年度好書展、圖書館週系列活動、搶救地球‧低碳生活主題書展、iCulture多元文化主題書展等。'}}
	const goto=(e)=>{
		const name=String(e.target.value);
		// console.log(name);
		var arg=String(e.target.value).split(";")[0]
		// console.log(arg);

		const data = new FormData();
        data.append("command", "Go");
        data.append("id", localStorage.getItem('navId'));
		data.append("args", 's'+arg);

		const requestOptions = {
            method: 'POST',
            // headers: { 'Content-Type': 'application/json' },
            body: data
        };
        fetch('/DoSomething', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));

	}
				return(
		<div className="outer">
			<div>
				<h1>圖書館區域</h1>
			</div>
			<div>
				{
					Object.values(stall).map((e)=>{
						return(
							<div key={'tab_h_'+e.name} className="tab_h">
								<div key={'tab_upper_'+e.name} className="tab_upper">
									<h2 key={'key_title_'+e.name} className="tab_title">{e.name}</h2>
									<p key={'tab_dep_'+e.name} className="tab_dep">{e.dep}</p>
								</div>
								<div key={'tab_lower_'+e.name} className="tab_lower">
									<p key={'tab_p'}>{e.p}</p>
									<button key={'tab_btn_'+e.name} className={`NavBtn tab_btn`} type="button" value={e.name} onClick={goto}>Go</button>
								</div>
							</div>
						)
					})
				}
			</div>
		</div>
	)
}
 
export default App;