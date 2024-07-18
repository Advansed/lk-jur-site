import React, { useEffect, useState } from "react"
import { Store } from "./Store"
import "./Profile.css"
import { IonButton, IonCard, IonIcon, IonInput, IonModal } from "@ionic/react"
import { AddressSuggestions, FioSuggestions } from "react-dadata"
import { arrowBackCircleOutline, listOutline } from "ionicons/icons"
import MaskedInput from "../mask/reactTextMask"
import { Filess } from "./Files"
import Select from "react-tailwindcss-select";
import SignatureCanvas from 'react-signature-canvas'   

export function Profile(): JSX.Element {
    const [ info, setInfo ] = useState<any>( Store.getState().profile )
    const [ mode ] = useState<any>( new Object() )
    const [ page, setPage ] = useState( 1 )


    Store.subscribe({num: 41, type: "profile", func: ()=>{
        setInfo( Store.getState().profile )
    }})

    useEffect(()=>{
        setInfo( Store.getState().profile )
        return ()=>{
            Store.unSubscribe( 41 )
        }
    },[])


    async function Save(){
        mode.token = Store.getState().login.token
        console.log( info )
        mode.Файлы = undefined
        for(const [ key ] of Object.entries(info)){
            if(  key === "Файлы" ) {
                info.Файлы.Файлы.forEach(elem => {
                    if( elem.Модифицирован ) {
                        if( mode.Файлы === undefined){ mode.Файлы = new Object(); mode.Файлы.Файлы = [] }
                        mode.Файлы.Файлы.push( elem )
                    }
                });
                continue
            }
            if( typeof info[ key ] === 'object' ) {
                for(const [ req ] of Object.entries(info[ key ])){
                    if(info[ key ][ req ][ 4 ] === true){
                        console.log( info[ key ][ req ] )
                        if( mode[ key ] === undefined ) mode[ key ] = new Object()
                        mode[ key ][ req ] = info[ key ][ req ]
                    }
                }
            }
        }

        console.log( mode )
//        const res = await getData("jur_profile1", mode )
 //       console.log(res)
    }

    function Pages( props:{ info, page }){
        const [ info, setInfo ] = useState( props.info )
        let elem = <></>

        for(const [ key ] of Object.entries(info)){
            if( info[key].Страница === props.page ) {
                switch( key ){
                    case "Страниц"      : break;
                    case "ФИО"          : elem = <> { elem } <FIO       info = { info.ФИО }/> </>; break;
                    case "Файлы"        : elem = <> { elem } 
                            <div>
                                {/* <div className='ml-1 mr-1 mt-1 t-underline flex fl-space pb-05'> 
                                    <div><b> { "Файлы" } </b></div>
                                </div> */}
                                <Filess    info = { info.Файлы.Файлы }/>
                            </div> </>; break;
                    default     : {
                        {
                            elem = <> 
                                { elem } 
                                <div className='ml-1 mr-1 mt-1 t-underline flex fl-space pb-05'> 
                                    <div><b> { info[key].Описание } </b></div>
                                </div>
                            </>
                            for(const [ req ] of Object.entries(info[ key ])){
                                if(req === "Страница") continue
                                if(req === "Описание") continue
                                switch( info[key][req][1]){
                                    case "textarea"     : elem = <> { elem } <TextArea  info = { info[key][req] }  /> </>; break;
                                    case "text"         : elem = <> { elem } <Text      info = { info[key][req] }  /> </>; break;
                                    case "password"     : elem = <> { elem } <Password  info = { info[key][req] }  /> </>; break;
                                    case "label"        : elem = <> { elem } <Label     info = { info[key][req] }  /> </>; break;
                                    case "labelArea"    : elem = <> { elem } <LabelArea info = { info[key][req] }  /> </>; break;
                                    case "mask"         : elem = <> { elem } <Mask      info = { info[key][req] }  /> </>; break;
                                    case "date"         : elem = <> { elem } <Date      info = { info[key][req] }  /> </>; break;
                                    case "box"          : elem = <> { elem } <Box       info = { info[key][req] }  /> </>; break;
                                    case "address"      : elem = <> { elem } <Address   info = { info[key][req] }  /> </>; break;
                                    case "fio"          : elem = <> { elem } <FIO       info = { info[key][req] }  /> </>; break;
                                    default             : elem = <> { elem } </>
                                }
                            }                        
                        }
                    }
                }
                
        }
        }
        elem = <>
            { elem }
            <div className="flex fl-space">
                <div>
                    <IonButton
                        className={  "ml-1 mr-1 mt-2" }
                        mode="ios"
                        color="primary"
                        expand="block"
                        onClick={()=>{
                            if( info.Страниц > page)
                                setPage( page + 1 )
                            else setPage( page - 1 )
                        }}
                        >
                            {
                                info.Страниц > page ? "Далее" : "Назад"
                            }
                    </IonButton>
                </div>
                <IonButton
                    className="ml-1 mr-1 mt-2"
                    mode="ios"
                    color="primary"
                    expand="block"
                    onClick={()=>{
                            Save()
                    }}>
                        {
                            "Сохранить"
                        }
                </IonButton>
            </div>
        </>
        return elem;
    }

    let elem = <></>

    if( info !== undefined ){
        elem  = <>
            <div className="p-page ml-auto mr-auto">
            <IonCard className="pr-card bg-1">
                <Pages info = { info } page = { page }/>
            </IonCard>
            </div>
        </>
    }
    return elem
}


function    Address( props: { info }){
    const info = props.info
    const [ value, setValue ] = useState<any>( { value: info[0] }  )
    const [ modal, setModal ] = useState( false )

    function ModalForm(){
        const [ address ] = useState(
            {
                area:   [ info[0] === "" ? "" : info[0].split(",")[0], "", "Улус"],
                city:   [ info[0] === "" ? "" : info[0].split(",")[1], "", "Город" ],
                settl:  [ info[0] === "" ? "" : info[0].split(",")[2], "", "Населенный пункт" ],  
                street: [ info[0] === "" ? "" : info[0].split(",")[3], "", "Улица" ],
                house:  [ info[0] === "" ? "" : info[0].split(",")[4], "", "Дом" ],
                flat:   [ info[0] === "" ? "" : info[0].split(",")[5], "", "Квартира" ],
            }
        )
        
        const elem = <>
            <IonCard className="bg-1 pb-1 m-card">
                <div className="mr-1">
                    <TextArea   info = { address.area } />
                    <TextArea   info = { address.city } />
                    <TextArea   info = { address.settl } />
                    <TextArea   info = { address.street } />
                    <Text       info = { address.house } />
                    <Text       info = { address.flat } />
                </div>
                <div>
                    <IonButton className="ml-1 mr-1 mt-1"
                        expand  = "block"
                        mode    = "ios"
                        onClick={()=>{
                            const adr = "" 
                            + (address.area[0]              === undefined ? "" : address.area[0].trim())
                            + ", " + (address.city[0]       === undefined ? "" : address.city[0].trim())
                            + ", " + (address.settl[0]      === undefined ? "" : address.settl[0].trim())
                            + ", " + (address.street[0]     === undefined ? "" : address.street[0].trim())
                            + ", " + (address.house[0]      === undefined ? "" : address.house[0].trim())
                            + ", " + (address.flat[0]       === undefined ? "" : address.flat[0].trim())
                            
                            info[0] = adr
                            setValue({ value: adr } )
                            setModal(false)
                            console.log(info)
                        }}
                    >
                        Записать
                    </IonButton>
                </div>
            </IonCard>
        </>

        return elem
    }

    const elem = <>
        <div className='ml-2 mt-1 mr-1'>
            <div className=""> <b>{ info[2] }</b>  </div>
            <div className="flex">
                <div className="flex s-input ml-1 cl-prim mt-05 w-100"> 
                    <div className="s-address">
                        <AddressSuggestions token="50bfb3453a528d091723900fdae5ca5a30369832" 
                            value={ value } 
                            filterLocations={[{ region: "Саха /Якутия/" }]}
                            onChange={(e)=>{
                                info[0] = "" 
                                    + (e?.data.area_with_type                === null ? "" : e?.data.area_with_type)
                                    + ", " + (e?.data.city_with_type         === null ? "" : e?.data.city_with_type)
                                    + ", " + (e?.data.settlement_with_type   === null ? "" : e?.data.settlement_with_type)
                                    + ", " + (e?.data.street_with_type       === null ? "" : e?.data.street_with_type)
                                    + ", " + (e?.data.house                  === null ? "" : e?.data.house)
                                    + ", " + (e?.data.flat                   === null ? "" : e?.data.flat)
                                
                                setValue({ value: info[0]})
                                console.log( info )
                        
                            }} 
                        />
                    </div>
                    <IonIcon icon= { listOutline } className="h-2 w-2"
                        onClick={()=>{
                            setModal( true )
                            console.log(info)
                        }}
                    />
                </div>
            </div>
        </div>
        <IonModal
            isOpen = { modal }
            onDidDismiss={ ()=> setModal( false )}
        >
            <ModalForm />
        </IonModal>
    </>
    return elem
}

function    Text( props: { info }){
    
    const info =  props.info

    const elem = <>
        <div className='ml-2 mt-1 mr-1'>
            <div className="flex fl-space mt-1">
                <div  className="w-40"> <b>{ info[2] }</b> </div>
                <div className=' ml-1 s-input a-right pr-1 w-60'>
                    <IonInput
                        class='s-input-1'
                        value={ info[0] }
                        placeholder={ info[2] }
                        onIonInput={(e: any) => {
                            info[0] = e.target.value as string;
                            info[4] = true
                            
                        }}
                    />
                </div>
            </div>
        </div>
    </>
    return elem
}

function    Password( props: { info }){
    
    const info =  props.info

    const elem = <>
        <div className='ml-2 mt-1 mr-1'>
            <div className="flex fl-space mt-1">
                <div  className="w-40"> <b>{ info[2] }</b> </div>
                <div className=' ml-1 s-input a-right pr-1 w-60'>
                    <IonInput
                        class='s-input-1'
                        value={ info[0] }
                        placeholder={ info[2] }
                        type="password"
                        onIonInput={(e: any) => {
                            info[0] = e.target.value as string;
                            info[4] = true
                        }}
                    />
                </div>
            </div>
        </div>
    </>
    return elem
}

function    Mask( props: { info }){
    
    const info =  props.info

    const mask: any = []

    for (let i = 0; i < info[3].length; i++) {
        switch(info[3].charAt(i)){
            case '9': mask.push( /[1-9]/ ); break
            case 'd': mask.push( /\d/ ); break
            default : mask.push( info[3].charAt(i) )
        }
    }

    const elem = <>
        <div className='ml-2 mt-1 mr-1'>
            <div className="flex fl-space mt-1">
                <div  className="w-40"> <b>{ info[2] }</b> </div>
                <div className=' ml-1 s-input a-right pr-1 w-60'>
                <div className="l-input pl-1">
                    <MaskedInput
                        mask={ mask }
                        className="m-input"
                        id='1'
                        value={ info[0] }
                        placeholder = { info[2] }
                        type='text'
                        onChange={(e) => {
                            info[0] = e.target.value as string;
                            info[4] = true    
                        }}
                    />
                </div>
                </div>
            </div>
        </div>
    </>
    return elem
}

function    FIO( props: { info }){
    const [ value ] = useState<any>({
        value: props.info[0]
    })
    
    const info =  props.info

    const elem = <>
        <div className='ml-2 mt-1 mr-1'>
            <div className="mt-1">
                <div  className="w-40"> <b>{ info[2] }</b> </div>
                <div className=' ml-1 s-input a-right'>
                <FioSuggestions  token="50bfb3453a528d091723900fdae5ca5a30369832"
                    value={ value }
                    onChange={(e)=>{
                        info[0] = e?.value
                        console.log( e )    
                        info[4] = true
                    }}/>
                </div>
            </div>
        </div>
    </>
    return elem
}

function    Label( props: { info }){
    
    const info =  props.info

    const elem = <>
        <div className='ml-2 mt-1 mr-1'>
            <div className="flex fl-space mt-1">
                <div  className="w-40"> <b>{ info[2] }</b> </div>
                <div className=' ml-1 s-input a-right pr-1 w-60'>
                    <IonInput
                        class='s-input-1'
                        value={ info[0] }
                        placeholder={ info[2] }
                        readonly
                    />
                </div>
            </div>
        </div>
    </>
    return elem
}

function    TextArea( props: { info }){
    const info = props.info

    console.log(info)
    console.log(info[0])
    const elem = <>
        <div className='ml-2 mt-1 mr-1'>
            <div className="mt-1">
                <div  className=""> <b>{ info[2] }</b> </div>
                <div className=' ml-1 s-input a-right pr-1 w-100'>
                    <IonInput
                        class='s-input-1'
                        value={ info[0] }
                        placeholder={ info[2] }
                        onIonInput={(e: any) => {
                            info[0] = e.target.value  
                            info[4] = true
                            if( props.info.onInput !== undefined ) 
                                props.info.onInput( e.target.value ) 
                        }}
                    />
                </div>
            </div>
        </div>
    </>
    return elem
}

function    LabelArea( props: { info }){
    const info = props.info

    const elem = <>
        <div className='ml-2 mt-1 mr-2'>
            <div className="mt-1">
                <div  className=""> <b>{ info[2] }</b> </div>
                <div className=' ml-1 s-input a-right pr-1 w-100'>
                    <IonInput
                        class='s-input-1'
                        value={ info[0] }
                        placeholder={ info[2] }
                        readonly
                    />
                </div>
            </div>
        </div>
    </>
    return elem
}

function    Date( props: { info }) {

    const info = props.info

    const elem = <>
        <div className='ml-2 mt-1 mr-1'>
            <div className="flex fl-space mt-1">
                <div className="w-40"> <b>{ info[2] }</b> </div>
                <div className=' ml-1 s-input a-right pr-1 w-60'>
                    <MaskedInput
                        className='m-input a-right'
                        mask={[ /[1-9]/, /\d/, '.', /\d/, /\d/,'.', /\d/, /\d/, /\d/, /\d/]}
                        value={ info[0] }
                        placeholder="__.__.____"
                        onInput={(e: any) => {
                            
                            info[0] = (e.target.value as string).substring(0, 10)
                            info[4] = true
                        }}
                    />
                </div>
            </div>
        </div>

    </>
    return elem
}

function    Box(props: { info }) {
    
    const info = props.info

    const [ value, setValue ] = useState( info[0] === "" ? { value: "Выберите..", label: "Выберите.." } : { value: info[0], label: info[0]} )
    
    const options: any = []
    props.info.choice.forEach(elem => {
        options.push(
            { value: elem, label: elem }
        )
    });

    const handleChange = value => {
        setValue(value);
        info[0] = value.value 
        info[4] = true
    };
    let elem = <></>

    elem = <>
        <div className='ml-2 mt-1 mr-1'>
            <div className="mt-1">
                <div  className="w-90"> <b>{ info[2] }</b> </div>
                <div className=' ml-1 s-input pl-1 pr-1 w-60'>
                    <Select options={ options } value={ value } primaryColor="red" onChange={ handleChange } 
                         classNames={{
                            listItem: ( isSelected ) => (
                                `sbl-item`
                            )
                        }}
                    />
                </div>
            </div>
        </div>

    </>
    return elem
}

function    Sign(props: { info }) {
    const [ sig, setSig ] = useState<any>()

    const elem = <>
        <div>
            <div className="ml-1 mt-1 flex fl-space">
                <div className="fs-14">Поставьте подпись</div>
                <div>
                    <IonIcon icon = { arrowBackCircleOutline } className="w-3 h-3 mr-1"
                        onClick={()=>{
                            sig.clear()
                        }}
                    />
                </div>
            </div>
            <SignatureCanvas 
                penColor='blue' 
                canvasProps={ {width: 500, height: 200, className: 'sigCanvas'} } 
                ref = {(ref)=>{ setSig(ref) }}
                onEnd = {()=>{
                    let pdp = false
                    props.info.Файлы.forEach(elem => {
                        if(elem.Имя === "Подпись"){  pdp = true
                            elem.Файлы = [ { dataUrl: sig.toDataURL(), format: "png" } ]
                        }
                    });
                    if( !pdp ) {
                        props.info.Файлы.push({ Имя: "Подпись", Описание: "Подпись клиента", Файлы: [ { dataUrl: sig.toDataURL(), format: "png" } ]})
                    }
                }}
            />
        </div>               

    </>

    return elem
}