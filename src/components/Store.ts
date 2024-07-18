import { combineReducers  } from 'redux'
import axios from 'axios'
import { Reducer } from 'react';

const reducers: Array<Reducer<any, any>> = []

const version = "2.0.1"

export const i_state = {

    auth:                               false,
    reg:                                false,
    route:                              "",
    login:                              "",
    dogs:                               [],
    dog1:                               "",
    dog2:                               "",
    payments:                           [],
    invoices:                           [],
    apps:                               [],
    profile:                            "",
    actsverki:                          "",
    services:                           [],
    back:                                0,
    message:                            {
        error:                          true,
        header:                         "",
        message:                        "",
    },
    index:                              0,

}

const roots: any = {};

for(const [key, value] of Object.entries(i_state)){

    reducers.push(
        function (state = i_state[key], action) {
            switch(action.type){
                case key: {
                    if(typeof(value) === "object"){
                        if(Array.isArray(value)) {
                            return action[key]
                        } else {
                            // let data: object; data = {};
                            // for(const key1 of Object.keys(value)){ 
                            //     data[key1] = action[key1] === undefined ? state[key1] : action[key1]
                            // }   
                            // return data
                            return action[key]
                        }

                    } else return action[key]
                }
                default: return state;
            }       
        }
    )

    roots[ key ] = reducers[ reducers.length - 1 ];
}


export async function   getData(method : string, params){

    const res = await axios.post(
            URL + method, params
    ).then(response => response.data)
        .then((data) => {
            if(data.error){
                Store.dispatch({ type: "message", message: { error: true, header: "Ошибка получения данных", message: data.message }})    
            }
            return data
        }).catch(error => {
          Store.dispatch({ type: "message", message: { error: true, header: "Ошибка получения данных", message: res.message }})
          return {error: true, message: error}
        })
    return res

}


export async function   getData1C(method : string, params){

    const res = await axios.post(
            URL + method, params
    ).then(response => response.data)
        .then((data) => {
            if(data.Код === 200) console.log(data) 
            return data
        }).catch(error => {
          console.log(error)
          return {error: true, message: error}
        })
    return res

}


function                create_Store(reducer, initialState) {
    const currentReducer = reducer;
    let currentState = initialState;
    let listeners: Array<any> = []
    return {
        getState() {
            return currentState;
        },
        dispatch(action) {
            currentState = currentReducer(currentState, action);
            listeners.forEach((elem)=>{
                if(elem.type === action.type){
                    elem.func();
                }
            })
            return action;
        },
        subscribe(listen: any) {
            const ind = listeners.findIndex(function(b) { 
                return b.num === listen.num; 
            });
            if(ind >= 0){
                listeners[ind] = listen;
            }else{
                listeners = [...listeners, listen]
            }
        },
        unSubscribe(index) {
            const ind = listeners.findIndex(function(b) { 
                return b.num === index; 
            });
            if(ind >= 0){
                listeners.splice(ind, 1)
            }        
        }
    };
}

const                   rootReducer = combineReducers( roots );


export const Store   =  create_Store(rootReducer, i_state)


export const URL = "https://fhd.aostng.ru/vesta/hs/API_STNG_JUR/V1/"
//export const URL = "https://fhd.aostng.ru/vesta/hs/API_STNG_JUR/V1/"


export function Phone(phone): string {
    if(phone === undefined) return ""
    if(phone === null) return ""
    let str = "+"
    for(let i = 0;i < phone.length;i++){
      const ch = phone.charCodeAt(i)
      if( ch >= 48 && ch <= 57) str = str + phone.charAt(i)
    }
    return str
}


export async function   FIO(query){
    const res = await axios.post(
        URL + "checkFIO", { fio: query }
).then(response => response.data)
    .then((data) => {
        console.log(data)
        if(data.Код === 200) console.log(data) 
        return data
    }).catch(error => {
      console.log(error)
      return {Код: 200}
    })
return res

}


export async function getDogs(){
    const info = Store.getState().login
    const res = await getData("jur_info", info )
    console.log(res)
    if(!res.error) {
        Store.dispatch({ type: "dogs", dogs: res.data })
    } else Store.dispatch({ type: "dogs", dogs: [] })

}

export async function getPayments(){
    const info = Store.getState().login
    const res = await getData("jur_payments", info )
    if(!res.error) {
        Store.dispatch({ type: "payments", payments: res.data })
    } else Store.dispatch({ type: "payments", payments: [] })

}

export async function getInvoices(){
    const info = Store.getState().login
    const res = await getData("jur_invoices", info )
    if(!res.error) {
        Store.dispatch({ type: "invoices", invoices: res.data })
    } else Store.dispatch({ type: "invoices", invoices: [] })

}

export async function getProfile(){
    const info = Store.getState().login
    const res = await getData("jur_profile1", info )
    console.log(res)
    if(!res.error) {
        Store.dispatch({ type: "profile", profile: res.data })
    } else Store.dispatch({ type: "profile", profile: [] })

}

export async function getServices(){
    const res = await getData("jur_services", {
        token: Store.getState().login.token
    })
    console.log(res)
    if(!res.error) {
        Store.dispatch({ 
            type: "services", services: res.data 
        })
    } else Store.dispatch({ 
            type: "services", services: [] 
        })
}

export async function getHistory(){
    const info = Store.getState().login
    const res = await getData("jur_history", info )
    console.log( res )
    if(!res.error) {
        Store.dispatch({ type: "apps", apps: res.data })
    } else Store.dispatch({ type: "apps", apps: [] })

}

Store.subscribe({ num: 1001, type: "login", func: ()=>{
    
    getDogs();

    getInvoices();

    getPayments();

    getProfile();

    getHistory();

    getServices();

}})

Store.subscribe({num: 1002, type: "dog1", func: ()=>{
    Store.dispatch({type: "route", route: "indice" })
}})

Store.subscribe({num: 1003, type: "dog2", func: ()=>{
    Store.dispatch({type: "route", route: "payment" })
}})


