export const filterColletionByModel = (data, model) => {

    let srch = [];
    data = data.filter((_d) => {


        srch =  ( _d.model.toLowerCase().indexOf(model.toLowerCase()) !== -1 );

        return srch;
    }

)

    return data;
};
export const filterCollectionByManufacturer = (data, manufacturer) => {

    let srch = [];
    data = data.filter((_d) => {


            srch =  ( _d.manufacturer.toLowerCase().indexOf(manufacturer.toLowerCase()) !== -1 );

            return srch;
        }

    )

    return data;
};
export const processRiskByManufacturer = (data, manufacturer) => {
    let count = 0;
    let risk = 0;
    let result  = filterCollectionByManufacturer(data, manufacturer).map((item) =>{
        count = count + item.risk;
    })
    risk =  count/result.length;
    const ret = {risk: risk, collection:result};
    return ret;
};
export const processRiskByModel = (data, model) => {

    let count =0;
    let risk;
    let local = filterColletionByModel(data, model);
    let result  = local.map((item) =>{
        count = count + item.risk;
    })
    risk =  count/result.length;
    const ret = {risk: risk, collection:local};
    return ret;
};
export const processCollectionByModel = (_data) => {
    let rez = [];
    let helper = [];
    _data.forEach((item, index)=>{

        const obj = {}
        obj.model = item.model;
        obj.name = item.model;
        obj.data = {};
        let isItThere = helper.findIndex(function (_item) {
            return _item.model === item.model ;
        });

        if (isItThere === -1){
            obj.data = processRiskByModel(_data, item.model);
            obj.children = obj.data.collection;
            obj.size  = obj.data.collection.length;
            obj.risk  = obj.data.risk;
            helper.push(obj);

        } else {
             //do nothing the collection was created
        }
    });



    return helper;

};
export const processCollectionByManufacturer = (_data) => {
    let rez = [];
    let helper = [];
    _data.forEach((item, index)=>{

        const obj = {}
        obj.manufacturer = item.manufacturer;
        obj.name = item.manufacturer;
        obj.data = {};
        let isItThere = helper.findIndex(function (_item) {
            return _item.manufacturer === item.manufacturer ;
        });

        if (isItThere === -1){
            obj.data = processRiskByManufacturer(_data, item.manufacturer);
            obj.children = obj.data.collection;
            obj.size  = obj.data.collection.length;
            obj.risk  = obj.data.risk;
            helper.push(obj);

        } else {
            //do nothing the collection was created
        }
    });



    return helper;

};
