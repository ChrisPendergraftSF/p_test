import React,  {useCallback, useEffect, useState  } from 'react';
import {useDispatch, useSelector} from "react-redux";
import DataTable from "react-data-table-component";
import  { setSelectedDevice } from "../../redux/reducers/selecteddevice";


const ChartHolder =  function(){
    const [filteredData, setFilteredData] = useState(undefined)
    const data = useSelector((state) => state.applicationdata.applicationdata);
    const columns = [{selector: row => row.addr, name:'Address', sortable: true },{ selector: row => row.manufacturer, name:'Manufacturer', sortable: true },{ selector: row => row.model, name:'Model', sortable: true },{selector: row => row.firmware, name:'Firmware', sortable: true }, {selector: row => row.behind_version_number, name:'Risk', sortable: true },  {selector: row => row.created_at, name:'Created', sortable: true },  {selector: row => row.last_seen, name:'Last Seen', sortable: true }];

    const statusType = useSelector((state) => state.statustype.statustype);
    const selectedDevice = useSelector((state) => state.selecteddevice.selecteddevice);
    const customStyles = {
        rows: {
            style: {
                cursor: 'pointer',// override the row height
            },
        },
        headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
                backgroundImage: 'linear-gradient( #254265, #536881)',
                color: '#ececec',
            },
        },
        cells: {
            style: {
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px',
            },
        },
        pagination: {
            style: {
                backgroundImage: 'linear-gradient(#536881, #254265)',
                color: '#ececec',
            },
        },
    };


    const dispatch = useDispatch();

    const handleStatusFilter = useCallback(()=>{

        let result = data;
        if (statusType!==undefined) {
            result = result.filter((_d) => {
                let srch = [];

                srch = ((_d.addr.toLowerCase().indexOf(statusType.toLowerCase()) !== -1 ) || (_d.manufacturer.toLowerCase().indexOf(statusType.toLowerCase()) !== -1)  || (_d.model.toLowerCase().indexOf(statusType.toLowerCase()) !== -1 || _d.firmware.toLowerCase().indexOf(statusType.toLowerCase()) !== -1));


                return srch;
            });

        }
       setFilteredData(result);
    },[setFilteredData, data, statusType]);

    const processRisk = (d ) => {
        const ret = [];
        d.forEach((val, index)=>{

            val.availableFirmware.forEach((item, _ind ) =>{
                if(item === val.firmware){
                    const coef = 100/val.availableFirmware.length;
                    val.risk = Math.floor((( val.availableFirmware.length  - (_ind+1) ) * coef ));
                    val.behind_version_number = 'behind: '+ ( val.availableFirmware.length  - (_ind+1)) +' version(s) ';
                    ret.push(val);
                }

            });

        })

        return ret;
    }
    useEffect(()=>{

       handleStatusFilter();

    },[ handleStatusFilter, statusType])

    useEffect(()=>{
        if(data && filteredData===undefined){

            let test = processRisk(data);

            setFilteredData( test );

        }

    },[setFilteredData,filteredData, handleStatusFilter, data]);

    const handleDetail = (event) => {
        console.log('sssss', event);
        dispatch(setSelectedDevice(event));

    };

    const conditionalRowStyles = [
        {
            when: row => row.risk >= 0,
            style: {
                backgroundImage: 'linear-gradient( #555555, #1a7013)',
                borderBottom: 'solid .001rem #808080',
                color: '#ececec'
            },
        },
        {
            when: row => row.risk > 1,
            style: {
                backgroundImage: 'linear-gradient( #555555, #63c52c)',
                borderBottom: 'solid .001rem #808080',
                color: '#ececec'
            },
        },
        {
            when: row => row.risk > 10,
            style: {
                backgroundImage: 'linear-gradient( #555555, #abd236)',
                borderBottom: 'solid .001rem #808080',
                color: '#ececec'
            },
        },
        {
            when: row => row.risk > 20,
            style: {
                backgroundImage: 'linear-gradient( #555555, #ccd033)',
                borderBottom: 'solid .001rem #808080',
                color: '#ececec'
            },
        },
        {
            when: row => row.risk > 30,
            style: {
                backgroundImage: 'linear-gradient( #555555, #d78b00)',
                borderBottom: 'solid .001rem #808080',
                color: '#ececec'
            }
        },
        {
            when: row => row.risk > 40,
            style: {
                backgroundImage: 'linear-gradient( #555555, #e16403)',
                borderBottom: 'solid .001rem #808080',
                color: '#ececec'
            }
        },
        {
            when: row => row.risk > 50,
            style: {
                backgroundImage: 'linear-gradient( #555555, #c95c02)',
                borderBottom: 'solid .001rem #808080',
                color: '#ececec'
            },
        },
        {
            when: row => row.risk > 60,
            style: {
                backgroundImage: 'linear-gradient( #555555, #d74b00)',
                borderBottom: 'solid .001rem #808080',
                color: '#ececec'
            },
        },
        {
            when: row => row.risk > 70,
            style: {
                backgroundImage: 'linear-gradient( #555555, #d52108)',
                borderBottom: 'solid .001rem #808080',
                color: '#ececec'
            },
        }
    ];
    return(
       <div className="App">
           <div className="holder">
           { filteredData && <div className="table_holder" >
               <DataTable  columns={columns}
                           data={filteredData}
                           responsive={true}
                           onRowClicked={handleDetail}
                           customStyles={customStyles}
                           conditionalRowStyles={conditionalRowStyles}
                           pagination={true}



               />

           </div>


           }
           {selectedDevice && <div className="detail_holder">
             <span className="title_detail"> <h3> Selected Device</h3></span>
               <hr/>
               <div><span className="title_detail">Address: </span> {selectedDevice.addr}</div>
               <div><span className="title_detail">Manufacturer:</span> {selectedDevice.manufacturer}</div>
               <div><span className="title_detail">Model:</span> {selectedDevice.model}</div>
               <hr/>
               <div><span className="title_detail">Firmware:</span> {selectedDevice.firmware}</div>
               <div><span className="title_detail">Versions Behind Risk:</span> {selectedDevice.risk}%</div>
               <div>{selectedDevice.behind_version_number}</div>

                   <ul className='vertList'>
                       { selectedDevice.availableFirmware && selectedDevice.availableFirmware.map(item => (
                           <li key={'item'+item} className="fw_item"  >
                               {item}{item===selectedDevice.firmware ? <span> &larr; installed </span>:<div></div>}
                           </li>
                       ))}

                      </ul>
               <hr/>
               <div><span className="title_detail">Created:</span><br/> {selectedDevice.created_at}</div>
               <hr/>
               <div><span className="title_detail">Last Seen:</span> <br/>{selectedDevice.last_seen}</div>
               </div>
           }
       </div>
       </div>
    )

};



export default ChartHolder;
