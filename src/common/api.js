let baseurl = "./src/mock/data/";
let baseurl1 = "http://192.168.1.105";

import axios from "axios";

export let getMenu = async () => {
    let response = await axios(baseurl+"menu.json");
    return response.data
}

export let getList = async () => {
    let response = await axios(baseurl+"list.json");
    return response.data
}
 
//传参请求
export let getDetail = async (id) => {
    let response = await axios(baseurl+"menu.json?"+id);
    return response.data
}
//表单回显
export let getForm = async (id) => {
    let response = await axios(baseurl+"form.json?"+id);
    return response.data
}
//查询方法
export let getSearch = async (params) => {
    let data =await  axios(baseurl+"table.json");
    // let data =await  axios(baseurl1+':8080/purchase-web-1.0.0/testdatas',params,{ headers: {
    //     'X-Requested-With': 'XMLHttpRequest',
    //         'Access-Control-Allow-Origin':'*',
    //         "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
    //         'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}});
    return data.data;
}
export let sendForm = async (value) => {
    let response = await axios({
        method: 'post',
        headers: {
            // 'X-Requested-With': 'XMLHttpRequest',
            'Access-Control-Allow-Origin':'*',
            'Content-Type' : 'application/json'},
        url: baseurl1+':8080/purchase-web-1.0.0/testdatas',
        // url: baseurl+'res.json',
        data: value
    });
    return response.data
}