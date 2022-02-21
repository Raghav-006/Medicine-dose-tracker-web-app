import React,{useEffect} from 'react'
import Wrapper from '../component/Wrapper';
import axios from 'axios'


const Reports = ()=>{
  useEffect(() => {
      (
        async () => {
        const {data} = await axios.get('reports',{withCredentials:true});
          console.log(data)
    })();
  }, [])
  return (
    <Wrapper>

    </Wrapper>
  )
}

export default Reports