import React, {useEffect} from 'react'
import { BrowserRouter, Routes, Route,useParams,useSearchParams,useNavigate  } from "react-router-dom";

const Home = () => {
  const [searchParams] = useSearchParams();
  console.log(searchParams.get("setpass"))

  const navigate = useNavigate();


  useEffect(() => {
    if(searchParams.get("setpass")){
      navigate('/setpassword')
    }

  },[])


  return (
    <div>Home</div>
  )
}

export default Home