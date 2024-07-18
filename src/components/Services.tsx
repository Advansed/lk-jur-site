import { IonAlert, IonButton, IonCard, IonIcon, IonInput, IonLoading, IonModal, IonText } from "@ionic/react"
import { cameraOutline, documentAttachOutline, documentTextOutline, gitMergeOutline,  
        gitBranchOutline, chevronDownOutline, chevronUpOutline, calculatorOutline, buildOutline, callOutline, addCircleOutline, removeCircleOutline, arrowBackCircleOutline, 
        trashBinOutline, peopleOutline, businessOutline, waterOutline, shuffleOutline, trashOutline, bagAddOutline, bagHandleOutline, listOutline, closeCircleOutline, checkmarkCircleOutline 
    } from "ionicons/icons"
import React, { useEffect, useState } from "react"
import { Store, getData } from "./Store"
import { AddressSuggestions, FioSuggestions } from "react-dadata"
import MaskedInput from "../mask/reactTextMask"
//import "./react-dadata.css"
import "./Services.css"
import { Files, Filess } from "./Files"
import Select from "react-tailwindcss-select";
import SignatureCanvas from 'react-signature-canvas'   



const icons = {

    gitMergeOutline:        gitMergeOutline,
    buildOutline:           buildOutline,
    documentTextOutline:    documentTextOutline,
    callOutline:            callOutline,
    gitBranchOutline:       gitBranchOutline,
    documentAttachOutline:  documentAttachOutline,
    trashOutline:           trashOutline,
    peopleOutline:          peopleOutline,
    businessOutline:        businessOutline,
    waterOutline:           waterOutline,
    shuffleOutline:         shuffleOutline,
    trashBinOutline:        trashBinOutline,
    bagAddOutline:          bagAddOutline,
    bagHandleOutline:       bagHandleOutline,
}

export function Services(){
    const [ info,   setInfo ]   = useState<any>()
    const [ order,  setOrder ]  = useState<any>()
    const [ page,   setPage ]   = useState( 0 )
    const [ index,  setIndex ]  = useState( 0 )
    const [ load,   setLoad ]   = useState( false )
    const [ alert,  setAlert ]  = useState<any>()
    const [ messages ] = useState<any>([])

    
    let elem = <></>

    Store.subscribe({num: 31, type: "back", func: ()=>{
        if( page > 0 ) {
            if( page === 10) setPage( 0 )
            else setPage( page - 1 )
        }
        else Store.dispatch({ type: "route", route: "back"})
    }})

    Store.subscribe({num: 32, type: "services", func: ()=>{
        setInfo( Store.getState().services )
    }})

    useEffect(()=>{

        setInfo( Store.getState().services )

        console.log( Store.getState().services )
        
        return ()=>{
            Store.unSubscribe( 31 )
            Store.unSubscribe( 32 )
        }
    },[])


    async function Save()   {

        function Check(){
            messages.length  = 0;
            for(const [ key ] of Object.entries(order)){
                if(key === "Заявка") continue
                if(key === "Описание") continue
                if(key === "Страниц") continue
                    switch( key ){
                        case "ФИО"          : if( order[key].Фамилия[0] === "" ) messages.push("Заполните ФИО"); break;
                        case "МЧРГ"         : if( order[key].ВеличинаМЧРГ[0] === 0 ) messages.push("Заполните МЧРГ"); break;
                        case "Файлы"        : order[key].Файлы.forEach(elem => { 
                            if(elem.Проверка && elem.Файлы.length === 0) messages.push("Прикрепите файл: " + elem.Описание)
                        }); break;
                        default     : {
                            for(const [ req ] of Object.entries(order[ key ])){
                                if(req === "Страница") continue
                                if(req === "Описание") continue
                                if(order[key][req][0] === "" || order[key][req][0] === 0 || order[key][req][0] === undefined){
                                    messages.push( "Заполните " + order[key][req][2] )
                                    console.log( [req] )
                                    console.log( order[key][req] )
                                }
                                    
                            }                        
                        }
                    }
            }
        }

        setLoad(true)
        Check();
        if(messages.length > 0 ) {
           setAlert( messages )
        } else {
           order.token = Store.getState().login.token
           const res = await getData("jur_service", order )
           Store.dispatch({ type: "route", route: "services"})
        }
        setLoad(false)
    }

    function Item(props: { info }){
        const [ info ] = useState( props.info )
        const [ value, setValue ] = useState( false )

        let elem = <></>
        if( info.childs !== undefined ) {
            for(const child of info.childs){
                elem = <>
                    { elem }
                    <div className="flex ml-2 mt-2 s-point"
                        onClick={()=>{ setOrder( child.order ); setPage( page + 1)}}
                    >
                        <div>
                            <IonIcon icon = { icons[child.icon] } className = "w-2 h-2"/>
                        </div>
                        <div className="fs-13 ml-1">
                            { child.text }
                        </div>
                    </div>
                </>
            }

            elem = <>
                <IonCard className= "bg-1 pl-1 pr-1 pt-1 pb-1 s-card" >
                    <div className="flex">
                        <div>
                            <IonIcon icon = { icons[info.icon] } className = "w-2 h-2"/>
                        </div>
                        <div className="fs-13 ml-1">
                            { info.text }
                        </div>
                    </div>
                    {
                        value ? elem : <></>
                    }
                    <div className="flex fl-space s-point"
                        onClick={()=> setValue( !value) }
                    >
                        <div className="t-underline w-100"></div>
                        <IonIcon icon = {  value ? chevronUpOutline : chevronDownOutline } className="w-15 h-15"/>
                    </div>
                </IonCard>        
            
            </>
        } else {
            elem = <>
                <IonCard className="pt-2 pb-2 s-card">
                    <div className="flex"
                        onClick={()=>{
                            setOrder( info.order )
                            setPage( page + 1)
                        }}
                    >
                        <IonIcon icon = { icons[info.icon] }  className="h-2 w-20" />
                        <IonText className="fs-12 w-80"><b>{ info.text }</b> </IonText>
                    </div>
                </IonCard>
            </>
        }

        return elem
    }

    if(info !== undefined)
        for(let i = 0; i < info.length; i++) {
            elem = <>
                { elem }
                <Item info = { info[i] }/>
            </>
        }

    elem = <>
        { elem }
    </>

    elem = <>
        <IonLoading message={ "Подождите..." } isOpen = { load }/>
        <div className="p-page ml-auto mr-auto">
        {
              page === 0 ? elem 
            : <>
                <div className="cl-prim ml-1"><h3><b>{ order?.Описание }</b></h3></div>
                <IonCard className="pb-1 s-card">
                    <Service  info = { order } page = { page } />    
                    <IonButton
                        className="ml-1 mr-1 mt-2"
                        mode="ios"
                        color="primary"
                        expand="block"
                        onClick={()=>{
                            console.log( order )
                            if( order.Страниц > page)
                                setPage( page + 1 )
                            else 
                                Save()
                        }}
                    >
                        {
                            order.Страниц > page ? "Далее" : "Отправить заявку"
                        }
                    </IonButton>
                </IonCard>
            </>
                
        }
        </div>
        <IonModal
            className="s-modal"
            isOpen = { alert !== undefined }
            onDidDismiss={ () => setAlert( undefined )}
        >
            <div className="mr-auto ml-auto mt-1">
                <div>
                    {  
                        alert?.map((el)=>{
                            const elem = <>
                                <div className="flex fs-11 mt-1 fl-left">
                                    <IonIcon icon={ closeCircleOutline } className= { "h-15 w-15 cl-red w-10" }></IonIcon> 
                                    <div className={ "w-90 cl-prim ml-1"}> 
                                        { el }
                                    </div>
                                </div>
                            </>
                            return elem
                        }) 
                    }
                </div>
                <div>
                    <IonButton
                        className="mt-1"
                        expand="block"
                        onClick={()=>{
                            setAlert( undefined );
                        }}
                    >Закрыть</IonButton>
                </div>
            </div>
        </IonModal>
        </>

    return elem

}

function Service(props: { info, page }){
    const [ info ] = useState( props.info  )
    const [ upd, setUpd] = useState( 0 )


    useEffect(()=>{
        for(const [ key ] of Object.entries(info)){
            if(key === "Заявка") continue
            if(key === "Описание") continue
            if(key === "Страниц") continue
            for(const [ req ] of Object.entries(info[ key ])){
                switch( req) {
                    case "Фамилия":                 info[key][req]      = Store.getState().profile.surname; break;    
                    case "Имя":                     info[key][req]      = Store.getState().profile.name; break;    
                    case "Отчество":                info[key][req]      = Store.getState().profile.lastname; break;    
                    case "ПаспортСерия":            info[key][req][0]   = Store.getState().profile.passport.serial; break;    
                    case "ПаспортНомер":            info[key][req][0]   = Store.getState().profile.passport.number; break;    
                    case "ПаспортДатаВыдачи":       info[key][req][0]   = Store.getState().profile.passport.issuedDate; break;    
                    case "Доп6":                    info[key][req][0]   = Store.getState().profile.passport.codePodr; break;    
                    case "ПаспортКемВыдан":         info[key][req][0]   = Store.getState().profile.passport.issuedBy; break;    
                    case "СНИЛС":                   info[key][req][0]   = Store.getState().profile.snils; break;    
                    case "Доп1":                    info[key][req][0]   = Store.getState().profile.email; break;    
                    case "КонтактныйТелефон":       info[key][req][0]   = Store.getState().login.phone; break;    
                }        
            }
        }
        setUpd( upd + 1)
    },[])

    let elem = <></>
    switch(info.Документ) {
        case "А_ЗаявлениеЭлектронное": {
            for(const [ key ] of Object.entries(info)){
                if(key === "Заявка") continue
                if(key === "Описание") continue
                if(key === "Страниц") continue
                if(info[key].Страница === props.page ) {
                    switch( key ){
                        case "ФИО"          : elem = <> { elem } <FIO       info = { info.ФИО }/> </>; break;
                        case "МЧРГ"         : elem = <> { elem } <MCHRG     info = { info.МЧРГ }/> </>; break;
                        case "Файлы"        : elem = <> { elem } <Filess    info = { info.Файлы.Файлы }/> </>; break;
                        case "Помещения"    : elem = <> { elem } <Rooms     info = { info.Помещения }/> </>; break;
                        case "Оборудования" : elem = <> { elem } <Equips    info = { info.Оборудования }/> </>; break;
                        case "ПриборыУчета" : elem = <> { elem } <Meters    info = { info.ПриборыУчета }/> </>; break;
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
                                    switch( info[key][req][1] ){
                                        case "textarea" : elem = <> { elem } <TextArea  info = {{ info: info[key], title: info[key][req][2], name: req }}  /> </>; break;
                                        case "text"     : elem = <> { elem } <Text      info = {{ info: info[key], title: info[key][req][2], name: req }}  /> </>; break;
                                        case "date"     : elem = <> { elem } <Date      info = {{ info: info[key], title: info[key][req][2], name: req }}  /> </>; break;
                                        case "box"      : elem = <> { elem } <Box       info = {{ info: info[key], title: info[key][req][2], name: req, choice: info[key][req][3] }}  /> </>; break;
                                        case "lics"     : elem = <> { elem } <Box       info = {{ info: info[key], title: info[key][req][2], name: req, choice: Store.getState().profile.lics }}  /> </>; break;
                                        case "address"  : elem = <> { elem } <Address   info = {{ info: info[key], title: info[key][req][2], name: req }}  /> </>; break;
                                        default         : elem = <> { elem } </>
                                    }
                                }                        
                            }
                        }
                    }
                    
                }
            }
    
        } break
        
        default: break
    }


    return elem
}

function Text( props: { info }){
    
    const info =  props.info.info

    const elem = <>
        <div className='ml-2 mt-1 mr-1'>
            <div className="flex fl-space mt-1">
                <div  className="w-40"> <b>{ props.info.title }</b> </div>
                <div className=' ml-1 s-input a-right pr-1 w-60'>
                    <IonInput
                        class='s-input-1'
                        value={ info[ props.info.name ] === undefined ? undefined : info[ props.info.name ][0] }
                        placeholder={ props.info.title }
                        onIonInput={(e: any) => {
                            info[ props.info.name ][0] = e.target.value  
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

function TextArea( props: { info }){
    const info = props.info.info

    const elem = <>
        <div className='ml-2 mt-1 mr-1'>
            <div className="mt-1">
                <div  className=""> <b>{ props.info.title }</b> </div>
                <div className=' ml-1 s-input a-right pr-1 w-100'>
                    <IonInput
                        class='s-input-1'
                        value={ info[ props.info.name ][0] }
                        placeholder={ "" }
                        onIonInput={(e: any) => {
                            info[ props.info.name ][0] = e.target.value  
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

function Date( props: { info }) {
    const info = props.info.info
    const elem = <>
        <div className='ml-2 mt-1 mr-1'>
            <div className="flex fl-space mt-1">
                <div className="w-40"> <b>{ props.info.title }</b> </div>
                <div className=' ml-1 s-input a-right pr-1 w-60'>
                    <MaskedInput
                        className='m-input a-right'
                        mask={[ /[1-9]/, /\d/, '.', /\d/, /\d/,'.', /\d/, /\d/, /\d/, /\d/]}
                        value={ info[ props.info.name ][0] }
                        placeholder="__.__.____"
                        onInput={(e: any) => {
                            
                            info[ props.info.name ][0] = (e.target.value as string).substring(0, 10)
                            
                        }}
                    />
                </div>
            </div>
        </div>

    </>
    return elem
}

function Box(props: { info }) {
    
    const info = props.info.info

    const [ value, setValue ] = useState( info[ props.info.name ][0] === "" ? { value: "Выберите..", label: "Выберите.." } : { value: info[ props.info.name ][0], label: info[ props.info.name ][0]} )
    
    const options: any = []
    props.info.choice.forEach(elem => {
        options.push(
            { value: elem, label: elem }
        )
    });

    const handleChange = value => {
        setValue(value);
        info[ props.info.name ][0] = value.value 
        if( props.info.onChange !== undefined ) props.info.onChange( value )
    };
    let elem = <></>

    elem = <>
        <div className='ml-2 mt-1 mr-2'>
            <div className="mt-1">
                <div  className="w-90"> <b>{ props.info.title }</b> </div>
                <div className=' ml-1 s-input pl-1 pr-1'>
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

function Address( props: { info }){
    const info = props.info.info
    const [ value, setValue ] = useState<any>(
        { value: info[ props.info.name ][0] }
    )
    const [ modal, setModal ] = useState( false )

    function ModalForm(){
        const [ address ] = useState(
            {
                area:   [ info[ props.info.name ][0] === "" ? "" : info[ props.info.name ][0].split(",")[0] ],
                city:   [ info[ props.info.name ][0] === "" ? "" : info[ props.info.name ][0].split(",")[1] ],
                settl:  [ info[ props.info.name ][0] === "" ? "" : info[ props.info.name ][0].split(",")[2] ],  
                street: [ info[ props.info.name ][0] === "" ? "" : info[ props.info.name ][0].split(",")[3] ],
                house:  [ info[ props.info.name ][0] === "" ? "" : info[ props.info.name ][0].split(",")[4] ],
                flat:   [ info[ props.info.name ][0] === "" ? "" : info[ props.info.name ][0].split(",")[5] ],
            }
        )

        const elem = <>
            <IonCard className="bg-1 pb-1 m-card">
                <div className="mr-1">
                    <TextArea info = {{ info: address, title: "Улус",               name: "area"}} />
                    <TextArea info = {{ info: address, title: "Город",              name: "city"}} />
                    <TextArea info = {{ info: address, title: "Нас. пункт",         name: "settl"}} />
                    <TextArea info = {{ info: address, title: "Улица",              name: "street"}} />
                    <Text info = {{ info: address, title: "Дом",                name: "house"}} />
                    <Text info = {{ info: address, title: "Квартира",           name: "flat"}} />
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
                            
                            info[ props.info.name ][0] = adr
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
            <div className=""> <b>{ props.info.title }</b>  </div>
            <div className="flex">
                <div className="flex s-input ml-1 cl-prim mt-05 w-100"> 
                    <div className="s-address">
                        <AddressSuggestions token="50bfb3453a528d091723900fdae5ca5a30369832" 
                            value={ value } 
                            filterLocations={[{ region: "Саха /Якутия/" }]}
                            onChange={(e)=>{
                                info[ props.info.name ][0] = "" 
                                    + (e?.data.area_with_type                === null ? "" : e?.data.area_with_type)
                                    + ", " + (e?.data.city_with_type         === null ? "" : e?.data.city_with_type)
                                    + ", " + (e?.data.settlement_with_type   === null ? "" : e?.data.settlement_with_type)
                                    + ", " + (e?.data.street_with_type       === null ? "" : e?.data.street_with_type)
                                    + ", " + (e?.data.house                  === null ? "" : e?.data.house)
                                    + ", " + (e?.data.flat                   === null ? "" : e?.data.flat)
                                
                                setValue({ value: info[ props.info.name ][0]})
                                console.log( info )
                        
                            }} 
                        />
                    </div>
                    <IonIcon icon= { listOutline } className="h-2 w-2"
                        onClick={()=>{
                            setModal( true )
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

function MCHRG( props: { info}){
    const [ info ] = useState( props.info)
    const [ modal, setModal ] = useState<any>()
    const [ upd1, setUpd1 ]  = useState(0)

    function Counted(){

        const qkof = {
            100: "0.839", 200: "0.722", 300: "0.662", 400: "0.622", 500: "0.593", 600: "0.57", 700: "0.552", 800: "0.536", 900: "0.523",
            1000: "0.511", 1100: "0.5", 1200: "0.491", 1300: "0.483", 1400: "0.475", 1500: "0.468", 1600: "0.462", 1700: "0.456", 1800: "0.45",
            1900: "0.445", 2000: "0.44", 2100: "0.436", 2200: "0.431", 2300: "0.427", 2400: "0.423", 2500: "0.42", 2600: "0.416", 2700: "0.413", 
            2800: "0.41", 2900: "0.407", 3000: "0.404", 3100: "0.4", 3200: "0.398", 3300: "0.395", 3400: "0.393", 3500: "0.39", 3600: "0.388",
        };

        const V = modal?.Высота *  modal?.Площадь;
        const Vok = Math.ceil(V / 100) * 100;
          
        const Qtab = parseFloat(qkof[Vok]);
        const traz = 20 - -54;
        const Q = (Qtab * V * traz * 1.3) / 860;
        const Qhd = (Q * 860 * 1.1) / 8500;
        modal.МЧРГ = parseFloat((Qhd + 1.2).toFixed(2));
        setUpd1( upd1 + 1)

    }

    const elem = <>
        <div className=" ml-1 mr-1 t-underline mt-1"> <b>Планируемая величина максимального часового расхода газа</b> </div>
        <div>
            <div className='flex fl-space ml-2 mt-1 mr-1'>
                <div> МЧРГ </div>
                <div className="s-input a-right flex">  
                    <IonInput
                        class='s-input-1 mr-1'
                        value={ info?.ВеличинаМЧРГ }
                        placeholder="Величина МЧРГ"
                        onIonInput={(e: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
                            info.ВеличинаМЧРГ = e.target.value   
                            setUpd1(upd1 + 1) 
                        }}
                    />
                    <IonButton
                        onClick={()=> setModal({
                            Площадь:        0,
                            Высота:         0,
                            Плита:          0,
                            МЧРГ:           0,
                        })}
                    >
                        <IonIcon icon = { calculatorOutline } slot = "icon-only"/>
                    </IonButton>
                </div>
            </div>
        </div>
            {
                info?.ВеличинаМЧРГ >= 7
                    ? <Files info = { { Имя : "ПланМЧРГ", Описание: "Расчет максимального часового расхода газа", Файлы: info?.Файлы} }/>
                : <></>
            }
            <IonModal
                isOpen= { modal !== undefined }
                onDidDismiss={ ()=>setModal( undefined )}
            >   
                <div>
                    <div className=" ml-1 mr-1 t-underline mt-3"> <b>Суммарная площадь всех помещений</b> </div>
                    <div className='flex fl-space ml-2 mt-1 mr-1'>
                        <div className="w-50"> Площадь (м2)</div>
                        <div className="s-input a-right">  
                            <IonInput
                                class='s-input-1 mr-1'
                                value={ modal?.Площадь }
                                placeholder="Площадь"
                                onIonInput={(e: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
                                    modal.Площадь = (e.target.value as number)
                                    Counted()
                                    
                                }}
                            />
                        </div>
                    </div>
                    <div className=" ml-1 mr-1 t-underline mt-3"> <b>Высота здания без кровли</b> </div>
                    <div className='flex fl-space ml-2 mt-1 mr-1'>
                        <div className="w-50"> Высота (м) </div>
                        <div className="s-input a-right flex">  
                            <IonInput
                                class='s-input-1 mr-1'
                                value={ modal?.Высота }
                                placeholder="Высота"
                                onIonInput={(e: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
                                    modal.Высота = (e.target.value as number)
                                    Counted()
                                    console.log(modal)
                                }}
                            />
                        </div>
                    </div>
                    <div className=" ml-1 mr-1 t-underline mt-3"> <b>Расчетный МЧРГ</b> </div>
                    <div className='flex ml-2 mt-1 mr-1'>
                        <div className="w-50"> МЧРГ: </div>
                        <div className="">  
                            <IonText>{ isNaN(modal?.МЧРГ) ? "0.00" : modal?.МЧРГ }</IonText>
                        </div>
                    </div>
                    <div className="ml-1 mr-1 mt-1">
                        <IonButton
                            color = "tertiary"
                            expand='block'
                            mode = "ios"
                            onClick={()=>{
                                info.ВеличинаМЧРГ = modal.МЧРГ
                                setModal(undefined)
                            }}
                        >   {
                                "Установить значение"
                            }
                        </IonButton>

                    </div>
                </div>
                            
            </IonModal>
        </>
        return elem
}

function FIO(props: { info }) {
    const [ info, setInfo ] = useState<any>( props.info )
    const [ edit, setEdit ] = useState( false )

    const elem = <>


        <div className='ml-1 mr-1 mt-1 t-underline flex fl-space pb-05'> 
            <div><b>ФИО</b></div>
        </div>

        <div className={ edit ? "ml-1 mr-1 mt-1 cl-blue" : "hidden"}>
            <FioSuggestions  token="50bfb3453a528d091723900fdae5ca5a30369832"
                value={{ 
                    value: info?.Фамилия + " " + info?.Имя + " " + info?.Отчество, 
                    unrestricted_value: info?.Фамилия + " " + info?.Имя + " " + info?.Отчество,
                    data: {
                        surname:      info?.Фамилия,
                        name:         info?.Имя,
                        patronymic:   info?.Отчество,
                        gender:       "MALE",
                        source:       null,
                        qc:           "0"
                    }
                }}
                onChange={(e)=>{
                    info.Фамилия   = e?.data.surname;  
                    info.Имя       = e?.data.name;  
                    info.Отчество  = e?.data.patronymic;  
                    setInfo(info )
                    setEdit(false)
                }}/>
        </div>

        <div  onClick={()=>{ setEdit(!edit) }}  className="s-point">
            <div className='flex fl-space ml-2 mt-1 mr-1'>
                <div> <b>Фамилия </b></div>
                <div> { info?.Фамилия }</div>
            </div>
                
            <div className='flex fl-space ml-2 mt-1 mr-1'>
                <div> <b>Имя</b>  </div>
                <div> { info?.Имя }</div>
            </div>

            <div className='flex fl-space ml-2 mt-1 mr-1'>
                <div> <b>Отчество</b> </div>
                <div> { info?.Отчество }</div>
            </div>
        </div>
   </>    

    return elem
}

function Rooms(props: { info }){
    const info = props.info.Массив
    const [ value, setValue ] = useState({ value: "Тип", label: "Тип помещения"})
    const [ vol, setVol ] = useState<number>(  )
    const [ squ, setSqu ] = useState<number>(  )
    const [ upd, setUpd ] = useState( 0 )
    let elem = <></>
    elem = <>
        <div className=" ml-1 mr-1 t-underline mt-1"> <b>Газифицируемые помещения</b> </div>
    </>

    const options = [
        { value: "Квартира",    label: "Квартира"},
        { value: "Частный дом", label: "Частный дом"},
        { value: "Дача",        label: "Дача"},
        { value: "Гараж",       label: "Гараж"},
        { value: "Котельная",   label: "Котельная"},
        { value: "Склад",       label: "Склад"},
        { value: "Баня",        label: "Баня"},
        { value: "Теплица",     label: "Теплица"},
        { value: "Иное",        label: "Иное"},
    ]

    const handleChange2 = (e)=>{
        setValue( e )
    }

    for( let i = 0;i < info.length;i++){
        console.log( info[i] )
        elem = <>
            { elem }
            <div className="flex sl-space ml-2 mt-1 mr-1">
                <div className="w-50"><b>{ info[i]?.ТипПомещения }</b></div>
                <div className="w-20 a-right"><b>{ info[i]?.Площадь?.toFixed(2) + " м2" }</b></div>
                <div className="w-20 a-right"><b>{ info[i]?.Объем?.toFixed(2)  + " м3" }</b></div>
                <div>
                    <IonIcon icon = { removeCircleOutline } className="ml-1  w-2 h-2"
                        onClick={()=>{
                        info.splice(i, 1)
                        setUpd( upd + 1)
                        console.log( info )
                        }}
                    />
                </div>
            </div>
        </>
    }

    elem = <>
        { elem }
        <div className="flex fl-space mt-1 ml-1 mr-1">
            <div className="w-90">
                <div className=' ml-1 s-input pl-1 pr-1 w-60'>
                    <Select options={ options } value={ value } primaryColor="red" onChange={ handleChange2 } 
                        classNames={{
                            listItem: ( isSelected ) => (
                                `sbl-item`
                            )
                        }}
                    />
                </div>
                <div className="flex mt-1">
                    <div className='ml-1 s-input a-right pr-1'>
                        <IonInput
                            class='s-input-1'
                            value={ squ }
                            placeholder={ "Площадь м2" }
                            type= "number"
                            onIonInput={(e: any) => {
                                setSqu( parseFloat( e.detail.value ) );
                            }}
                        />
                    </div>
                    <div className='ml-1 s-input a-right pr-1'>
                        <IonInput
                            class='s-input-1'
                            value={ vol }
                            placeholder={ "Высота м3" }
                            onIonInput={(e: any) => {
                                setVol( parseFloat(e.detail.value) )
                            }}
                        />
                    </div>
                </div>
            </div>
            <IonIcon icon = { addCircleOutline } className="ml-1  w-2 h-2"
                onClick={()=>{
                  info.push({ ТипПомещения: value.value, Объем: vol,Площадь: squ} )
                  setValue( { value: "Тип", label: "Тип помещения"} );setSqu( undefined ); setVol( undefined );
                  console.log( info )
                }}
            />
        </div>
    </>

    return elem
}

function Equips(props: { info }){
    const info  = props.info.Массив
    const [ value, setValue ]   = useState({ value: "Тип", label: "Оборудование"})
    const [ tip, setTip ]       = useState<string>(  )
    const [ amount, setAmount]  = useState<number>(  )
    const [ upd, setUpd ]       = useState<number>( 0 )

    let elem = <></>
    elem = <>
        <div className=" ml-1 mr-1 t-underline mt-1"> <b>Имеющееся оборудование</b> </div>
    </>

    const options = [
        { value: "Плита",           label: "Плита" },
        { value: "Котел",           label: "Котел" },
        { value: "Конвектор",       label: "Конвектор" },
        { value: "Водонагреватель", label: "Водонагреватель" },
        { value: "Другое",          label: "Другое" },
    ]

    const handleChange = (e)=>{
        setValue( e )
    }

    for( let i = 0;i < info.length;i++){
        console.log( info[i] )
        elem = <>
            { elem }
            <div className="flex sl-space ml-2 mt-1 mr-1">
                <div className="w-70"><b>{ info[i]?.Оборудование + ":"+ info[i].Тип }</b></div>
                <div className="w-20 a-right"><b>{ info[i]?.Количество + " шт" }</b></div>
                <div>
                    <IonIcon icon = { removeCircleOutline } className="ml-1  w-2 h-2"
                        onClick={()=>{
                        info.splice(i, 1)
                        setUpd( upd + 1)
                        console.log( info )
                        }}
                    />
                </div>
            </div>
        </>
    }

    elem = <>
        { elem }
        <div className="flex mt-1 ml-1 mr-1">
            <div className="w-90">
                <div className=' ml-1 s-input pl-1 pr-1 w-60'>
                    <Select options={ options } value={ value } primaryColor="red" onChange={ handleChange } 
                        classNames={{
                            listItem: ( isSelected ) => (
                                `sbl-item`
                            )
                        }}
                    />
                </div>
                <div className="flex mt-1">
                    <div className='ml-1 s-input a-right pr-1'>
                        <IonInput
                            class='s-input-1'
                            value={ tip }
                            placeholder={ "Тип" }
                            type= "text"
                            onIonInput={(e: any) => {
                                setTip(  e.detail.value );
                            }}
                        />
                    </div>
                    <div className='ml-1 s-input a-right pr-1'>
                        <IonInput
                            class='s-input-1'
                            value={ amount }
                            placeholder={ "Колво шт" }
                            onIonInput={(e: any) => {
                                setAmount( parseInt(e.detail.value) )
                            }}
                        />
                    </div>
                </div>
            </div>
            <IonIcon icon = { addCircleOutline } className="ml-1  w-2 h-2"
                onClick={()=>{
                  info.push( { Оборудование: value.value, Тип: tip, Количество: amount} )  
                  setValue( { value: "Тип", label: "Оборудование"} );setTip( undefined ); setAmount( undefined );
                  console.log( info )
                }}
            />
        </div>
    </>

    return elem
}

function Meters(props: { info }){
    const info  = props.info.Массив
    const [ value, setValue ]   = useState<any>( new Object() )
    const [ upd, setUpd ]       = useState( 0 )

    let elem = <></>
    elem = <>
        <div className=" ml-1 mr-1 t-underline mt-1"> <b>Имеющееся оборудование</b> </div>
    </>

    for( let i = 0;i < info.length;i++){
        console.log( info[i] )
        elem = <>
            { elem }
            <div className="flex sl-space ml-2 mt-1 mr-1">
                <div className="w-40"><b>{ info[i]?.Марка + ":"+ info[i].Номер }</b></div>
                <div className="w-60 a-right"><b>{ info[i]?.Пломба + ", "  + info[i]?.Поверка }</b></div>
                <div>
                    <IonIcon icon = { removeCircleOutline } className="ml-1  w-2 h-2"
                        onClick={()=>{
                            info.splice(i, 1)
                            setUpd( upd + 1)
                        }}
                    />
                </div>
            </div>
        </>
    }

    function Date (props:{ info, name, title }){
        const info = props.info;
        const [ value, setValue ] = useState<any>()

        const elem = <>
            <MaskedInput
                className='m-input a-right'
                mask={[ /[1-9]/, /\d/, '.', /\d/, /\d/,'.', /\d/, /\d/, /\d/, /\d/]}
                value={ value }
                placeholder={ props.title}
                onInput={(e: any) => {
                            
                    info[ props.name ] = (e.target.value as string).substring(0, 10)
                    setValue ( (e.target.value as string).substring(0, 10) )
                                
                }}
            />
        </>

        return elem
    }

    elem = <>
        { elem }
        <div className="flex mt-1 ml-1 mr-1">
            <div className="w-90">
                <div className="flex mt-1">
                    <div className=' ml-1 s-input pl-1 pr-1 w-60'>
                        <IonInput
                            class='s-input-1'
                            value={ value.Марка }
                            placeholder={ "Марка, тип ПУ" }
                            type= "text"
                            onIonInput={(e: any) => {
                                value.Марка =  e.detail.value 
                            }}
                        />
                    </div>
                    <div className='ml-1 s-input a-right pr-1'>
                        <IonInput
                            class='s-input-1'
                            value={ value.Номер }
                            placeholder={ "Зав. номер ПУ" }
                            type= "text"
                            onIonInput={(e: any) => {
                                value.Номер = e.detail.value
                            }}
                        />
                    </div>
                </div>
                <div className="flex mt-1">
                    <div className='ml-1 s-input a-right pr-1 cl-prim'>
                        <Date info = { value } name = "Пломба" title = "Дата пломб. ПУ" />
                    </div>
                    <div className='ml-1 s-input a-right pr-1'>
                        <Date info = { value } name = "Поверка" title = "Срок очер. поверки" />
                    </div>
                </div>
            </div>
            <IonIcon icon = { addCircleOutline } className="ml-1  w-2 h-2"
                onClick={()=>{
                  info.push( value )  
                  setValue( new Object );
                  setUpd( upd + 1 )
                  console.log( info )
                }}
            />
        </div>
    </>

    return elem
}

function Sign(props: { info }) {
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