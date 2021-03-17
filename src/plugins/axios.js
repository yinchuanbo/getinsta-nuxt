export default function ({ $axios, redirect }) {    
	$axios.interceptors.response.use(response => {      
		
		return response    
	}, err => {      
		  
		// message.error(err.message);      
		// return Promise.reject(err);    
	})
}