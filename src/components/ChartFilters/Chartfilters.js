import React, { useState} from 'react';
import {useDispatch} from "react-redux";



const ChartFilters =  function(){
    const dispatch  = useDispatch();
    const  [selectedStatus, setSelectedStatus] = useState();


    const clearFilters = () => {

        dispatch({type:'SET_STATUS_TYPE', payload:undefined } );

        setSelectedStatus('');




    }

    const setStatusFilter = (q) => {
        if(q!=='zed'){
            dispatch({type:'SET_STATUS_TYPE', payload:q } );
            setSelectedStatus(q);
        }else{
            dispatch({type:'SET_STATUS_TYPE', payload:undefined } );
            setSelectedStatus('zed');
        }

    }



    return(
        <div className="controlList">
           <div className="title"> <h5> Device Explorer</h5></div>
            <div  className="search">  <input value={selectedStatus} className="form-control m5" onChange={event => setStatusFilter(event.target.value)} placeholder="search" ></input></div>
            <div  className="clear"> <button className="btn btn-success" onClick={event => clearFilters()} >Clear</button></div>

        </div>
    )


}

export default ChartFilters;
