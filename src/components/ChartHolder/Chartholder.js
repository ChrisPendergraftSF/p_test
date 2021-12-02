import React,  {useCallback, useEffect, useState  } from 'react';
import {useDispatch, useSelector} from "react-redux";
import DataTable from "react-data-table-component";
import  { setSelectedDevice } from "../../redux/reducers/selecteddevice";
import {processCollectionByManufacturer, processCollectionByModel} from "../../data/dataUtils";
import { PieChart, Pie, Cell, ScatterChart, Scatter, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const ChartHolder =  function(){
    const [filteredData, setFilteredData] = useState(undefined);
    const [dataByModel, setDataByModel] = useState(undefined);
    const [dataByManufacturer, setDataByManufacturer] = useState(undefined);
    const data = useSelector((state) => state.applicationdata.applicationdata);
    const columns = [{selector: row => row.addr, name:'Address', sortable: true },{ selector: row => row.manufacturer, name:'Manufacturer', sortable: true },{ selector: row => row.model, name:'Model', sortable: true },{selector: row => row.firmware, name:'Firmware', sortable: true }, {selector: row => row.behind_version_number, name:'FW Risk', sortable: true },  {selector: row => row.created_at, name:'Created', sortable: true },  {selector: row => row.last_seen, name:'Last Seen', sortable: true }, {selector: row => row.pass_risk, name:'PASS Risk', sortable: true }];

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

                srch = ((_d.addr.toLowerCase().indexOf(statusType.toLowerCase()) !== -1 ) || (_d.pass_risk.toLowerCase().indexOf(statusType.toLowerCase()) !== -1 ) || (_d.manufacturer.toLowerCase().indexOf(statusType.toLowerCase()) !== -1)  || (_d.model.toLowerCase().indexOf(statusType.toLowerCase()) !== -1 || _d.firmware.toLowerCase().indexOf(statusType.toLowerCase()) !== -1));


                return srch;
            });

        }
       setFilteredData(result);
       setDataByModel(processCollectionByModel(result));
       setDataByManufacturer(processCollectionByManufacturer(result));
    },[setFilteredData, data, statusType]);

    const processRisk = (d ) => {
        const ret = [];
        d.forEach((val, index)=>{

            val.availableFirmware.forEach((item, _ind ) =>{
                if(item === val.firmware){
                    const coef = 100/val.availableFirmware.length;
                    val.risk = Math.floor((( val.availableFirmware.length  - (_ind+1) ) * coef ));
                    if(val.created_at === val.last_seen){
                        val.pass_risk  = 'HIGH';
                    }else{
                        val.pass_risk  = 'LOW';
                    }

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
            let test2 = processCollectionByModel(test);
            let test3 = processCollectionByManufacturer(test);
            console.log('model', test2);
            console.log('manufacturer', test3);
            setDataByModel(test2);
            setDataByManufacturer(test3);

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

    let renderLabel = function(entry) {
        return entry.name;
    }
    const getColor = (_value) =>{
        //value from 0 to 1

        let value  = (100 - _value);
        console.log(value);

        function perc2color(perc,min,max) {
            let base = (max - min);

            if (base === 0) { perc = 100; }
            else {
                perc = (perc - min) / base * 100;
            }
            let r, g, b = 0;
            if (perc < 50) {
                r = 255;
                g = Math.round(5.1 * perc);
            }
            else {
                g = 255;
                r = Math.round(510 - 5.10 * perc);
            }
            let h = r * 0x10000 + g * 0x100 + b * 0x1;
            return '#' + ('000000' + h.toString(16)).slice(-6);
        }
        let hzx = perc2color(value, 0, 100);

        return  hzx;
    }

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
               <div className="flex-list">
                   <div className="dash_item" >
                       <span className="dash_title">FW Risk by Device Model</span>
                   <PieChart width={550} height={400}>
                       <Pie data={dataByModel}
                            cx={250}
                            cy={140}
                            innerRadius={70}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={3}
                            dataKey={'size'}
                            fontSize={10}
                            color='#ffffff'
                            label={renderLabel}
                       >
                           {data.map((entry, index) => (
                               <Cell key={`cell-${index}`} fill={getColor(entry.risk)}  />
                           ))}
                       </Pie>
                   </PieChart>
                   </div>
                   <div  className="dash_item" >
                      <span className="dash_title">FW Risk by Device Manufacturer</span>
                   <PieChart width={500} height={500}>
                       <Pie data={dataByManufacturer}
                            cx={250}
                            cy={140}
                            innerRadius={70}
                            outerRadius={80}

                            paddingAngle={5}
                            dataKey={'size'}
                            label={renderLabel}
                       >
                           {data.map((entry, index) => (
                               <Cell key={`cell-${index}`}  fill={getColor(entry.risk)}   />
                           ))}
                       </Pie>
                   </PieChart>
                   </div>



               </div>
               <div className="flex-list">
                   <div className="dash_item" >
                       <div className="dash_title"> Device Count & Risk By Model</div>
                       <div>
                           <BarChart
                               width={500}
                               height={300}
                               cy={140}
                               data={dataByModel}
                               margin={{
                                   top: 5,
                                   right: 30,
                                   left: 20,
                                   bottom: 0,
                               }}
                           >
                               <CartesianGrid strokeDasharray="3 3" />
                               <XAxis dataKey='name' />
                               <YAxis dataKey={'risk'} />
                               <Tooltip />
                               <Legend dataKey={'name'}  />
                               <Bar dataKey={'size'} fill="#FFBB28" >

                               </Bar>
                               <Bar dataKey={'risk'} fill="#FF0000" >

                               </Bar>

                           </BarChart>
                       </div>
                   </div>
                   <div className="dash_item" >
                       <div className="dash_title"> Device Count & Risk By Manufacturer</div>
                       <div>
                           <BarChart
                               width={500}
                               height={300}
                               cy={140}
                               data={dataByManufacturer}
                               margin={{
                                   top: 5,
                                   right: 30,
                                   left: 20,
                                   bottom: 0,
                               }}
                           >
                               <CartesianGrid strokeDasharray="3 3" />
                               <XAxis dataKey='name' />
                               <YAxis dataKey={'size'} />
                               <Tooltip />
                               <Legend dataKey={'name'}  />
                               <Bar dataKey={'size'} fill="#FFBB28" >

                               </Bar>
                               <Bar dataKey={'risk'} fill="#FF0000" >

                               </Bar>

                           </BarChart>
                       </div>
                   </div>
               </div>
               <div className="flex-list">
                   <div className="dash_item_2x" >
                       <div className="dash_title"> Devices Added Over Time</div>
                       <ScatterChart
                           width={1050}
                           height={400}
                           margin={{
                               top: 20,
                               right: 20,
                               bottom: 20,
                               left: 20,
                           }}
                       >
                           <CartesianGrid />
                           <XAxis type="category" dataKey={'created_at'} name="Created" unit=" Date" />
                           <YAxis type="number" dataKey={'risk'} name="Risk" unit=" risk" />
                           <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                           <Scatter name="A school" data={filteredData.sort((a, b) => a.created_at > b.created_at ? 1 : -1)} fill="#8884d8" >
                               {data.map((entry, index) => (
                                   <Cell key={`cell-${index}`}  fill="#ffcc00"   />
                               ))}
                           </Scatter>
                       </ScatterChart>
                   </div>
               </div>


           </div> }
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
               <div><span className="title_detail">DEFAULT PASS RISK:</span><br/> {selectedDevice.pass_risk}</div>
               <div><span className="title_detail">Created:</span><br/> {selectedDevice.created_at}</div>

               <div><span className="title_detail">Last Seen:</span> <br/>{selectedDevice.last_seen}</div>
               <hr/>
               </div>
           }
       </div>
       </div>
    )

};



export default ChartHolder;
