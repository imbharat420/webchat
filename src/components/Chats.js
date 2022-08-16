import React,{useState,useEffect} from "react"
import {useHistory} from "react-router-dom"
import {ChatEngine} from "react-chat-engine"
import {auth} from "../firebase"
import {useAuth} from "../contexts/AuthContext";
import axios from "axios"


import Loading from "./Loading"


const Chats = ()=>{
	const history = useHistory();
	// const didMountRef = useRef(false)
	const [loading ,setLoading] = useState(true);
	const {user} = useAuth()
	const handleLogout = ()=>{
		auth.signOut();
		history.push("/")
	}


	const getFile = async (url)=>{
		 let response = await fetch(url);
	    let data = await response.blob();
		return new File([data],"test.jpg",{type:"image/jpeg"});
	}



	useEffect(()=>{
		if(!user && loading == true){
			history.push("/")
			return;
		}
		axios.get('https://api.chatengine.io/users/me/',{
			headers:{
				'project-id':"69fafe1d-f2b7-49e0-8528-d74e84c8af43",
				'user-name':user.email,
				'user-secret':user.uid
			}
		})
		.then(()=> setLoading(false))
		.catch(err=>{
			console.log(err);
			let formdata = new FormData()
			formdata.append('email',user.email) 
			formdata.append('username',user.email) 
			formdata.append('secret',user.uid) 
			getFile(user.photoURL)
				.then((avatar)=>{
					formdata.append('avatar',avatar,avatar.name)
					console.log(formdata)
					axios.post(
						'https://api.chatengine.io/users/',
						formdata,
						{
							headers:{
								"origin":"*",
								'private-key':"e1529202-0061-433b-9bc7-93eaa77aebed"
						    }
					    }
					)
					.then(()=> setLoading(false))
					.catch(error=> console.log("error getFile",error.response))
				})
		})
	},[user,history])



	if(!user || loading) return <Loading/>;
	return(
		<div className="chat-page">
			<div className="nav-bar">
				<div className="logo-tab">ChatBox</div>
				<div onClick={()=>handleLogout()} className="logout-tab">
					Logout , {user.email}
				</div>
			</div>

		<ChatEngine
			height='calc(100vh - 66px)'
			userName={user.email}
			userSecret={user.uid}
			projectID='69fafe1d-f2b7-49e0-8528-d74e84c8af43'
		/>
		</div>
	)
}

export default Chats


	