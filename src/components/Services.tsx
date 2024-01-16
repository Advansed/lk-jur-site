import { IonButton, IonCard, IonChip, IonIcon, IonInput, IonLabel, IonLoading, IonModal, IonSegment, IonSegmentButton, IonSelect, IonSelectOption, IonText } from "@ionic/react"
import { cameraOutline, documentAttachOutline, documentOutline, documentTextOutline, gitMergeOutline, arrowForwardOutline, 
        gitBranchOutline, personAddOutline, playSkipBackCircleOutline, chevronDownOutline, chevronUpOutline, calculatorOutline } from "ionicons/icons"
import React, { useEffect, useState } from "react"
import { Store, getData, getHistory } from "./Store"
import { AddressSuggestions, FioSuggestions, PartySuggestions } from "react-dadata"
import MaskedInput from "../mask/reactTextMask"
//import "./react-dadata.css"
import "./Services.css"
import { Files } from "./Files"

export function Services():JSX.Element {
    const [ info,   setInfo] = useState<any>()
    const [ value,  setValue] = useState( false )

    Store.subscribe({num: 32, type: "back", func: ()=>{
        Store.dispatch({type: "route", route: "back"})
    } })

    useEffect(()=>{
        const pr = Store.getState().profile        
        setInfo( pr );

    },[])

    Store.subscribe({num: 31, type: "profile", func: ()=>{
        const pr = Store.getState().profile
        setInfo( pr );
    } })

    let elem = <></>
    if(info?.ИНН?.length > 10){
        elem = <>

            <IonCard className= "bg-1 pl-1 pr-1 pt-1 pb-1 s-card s-point"
                onClick={()=>{ Store.dispatch({type: "route", route: "/page/service1_2"})}}
            >
                <div className="flex" >
                    <div>
                        <IonIcon icon = { gitMergeOutline } className = "w-2 h-2"/>
                    </div>
                    <div className="fs-13 ml-1">
                        Услуга технологического присоединения    
                    </div>
                </div>
            </IonCard>
            <IonCard className= "bg-1 pl-1 pr-1 pt-1 pb-1 s-card s-point"
                onClick={()=>{ Store.dispatch({type: "route", route: "/tab2/service4"})}}
            >
                <div className="flex">
                    <div>
                        <IonIcon icon = { documentTextOutline } className = "w-2 h-2"/>
                    </div>
                    <div className="fs-13 ml-1">
                        Услуга заключения договора поставки газа
                    </div>
                </div>
            </IonCard>     
            <IonCard className= "bg-1 pl-1 pr-1 pt-1 pb-1 s-card" >
                <div className="flex">
                    <div>
                        <IonIcon icon = { documentTextOutline } className = "w-2 h-2"/>
                    </div>
                    <div className="fs-13 ml-1">
                        Услуга заключения договора поставки газа
                    </div>
                </div>
                {
                    value ?
                        <div>
                            <div className="flex ml-2 mt-2 s-point"
                                onClick={()=>{ Store.dispatch({type: "route", route: "/page/service4_1"})}}
                            >
                                <div>
                                    <IonIcon icon = { gitMergeOutline } className = "w-2 h-2"/>
                                </div>
                                <div className="fs-13 ml-1">
                                    Заключение договора при первичной газификации
                                </div>
                            </div>
                            <div className="flex ml-2 mt-2 s-point"
                                onClick={()=>{ Store.dispatch({type: "route", route: "/page/service4_2"})}}
                            >
                                <div>
                                    <IonIcon icon = { gitBranchOutline } className = "w-2 h-2"/>
                                </div>
                                <div className="fs-13 ml-1">
                                    Заключение договора при проведении пуско-наладочных работ
                                </div>
                            </div>
                            <div className="flex ml-2 mt-2 s-point"
                                onClick={()=>{ Store.dispatch({type: "route", route: "/page/service4_3"})}}
                            >
                                <div>
                                    <IonIcon icon = { documentAttachOutline } className = "w-2 h-2"/>
                                </div>
                                <div className="fs-13 ml-1">
                                    Продление действующего договора поставки газа или перезаключение для бюджетных учреждений
                                </div>
                            </div>
                            <div className="flex ml-2 mt-2 s-point"
                                onClick={()=>{ Store.dispatch({type: "route", route: "/page/service4_4"})}}
                            >
                                <div>
                                    <IonIcon icon = { personAddOutline } className = "w-2 h-2"/>
                                </div>
                                <div className="fs-13 ml-1">
                                    Заключение договора при смене собственника
                                </div>
                            </div>
                            <div className="flex ml-2 mt-2 s-point"
                                onClick={()=>{ Store.dispatch({type: "route", route: "/page/service4_5"})}}
                            >
                                <div>
                                    <IonIcon icon = { documentTextOutline } className = "w-2 h-2"/>
                                </div>
                                <div className="fs-13 ml-1">
                                    Заключение договора при техническом перевооружении (переустройство)
                                </div>
                            </div>
                        </div>
                    :   <></>
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
            <IonCard className= "bg-1 pl-1 pr-1 pt-1 pb-1 s-card s-point"
                onClick={()=>{ Store.dispatch({type: "route", route: "/page/service1_1"})}}
            >
                <div className="flex" >
                    <div>
                        <IonIcon icon = { gitMergeOutline } className = "w-2 h-2"/>
                    </div>
                    <div className="fs-13 ml-1">
                        Услуга технологического присоединения    
                    </div>
                </div>
            </IonCard>
            <IonCard className= "bg-1 pl-1 pr-1 pt-1 pb-1 s-card s-point"
                onClick={()=>{ Store.dispatch({type: "route", route: "/page/service2"})}}
            >
                <div className="flex">
                    <div>
                        <IonIcon icon = { documentAttachOutline } className = "w-2 h-2"/>
                    </div>
                    <div className="fs-13 ml-1">
                        Восстановление/переоформление документов для Юр. лиц
                    </div>
                </div>
            </IonCard>
            <IonCard className= "bg-1 pl-1 pr-1 pt-1 pb-1 s-card s-point"
                onClick={()=>{ Store.dispatch({type: "route", route: "/page/service3"})}}
            >
                <div className="flex">
                    <div>
                        <IonIcon icon = { documentOutline } className = "w-2 h-2"/>
                    </div>
                    <div className="fs-13 ml-1">
                        Предоставление информации о ходе работ для Юр. лиц
                    </div>
                </div>
            </IonCard>
            <IonCard className= "bg-1 pl-1 pr-1 pt-1 pb-1 s-card" >
                <div className="flex">
                    <div>
                        <IonIcon icon = { documentTextOutline } className = "w-2 h-2"/>
                    </div>
                    <div className="fs-13 ml-1">
                        Услуга заключения договора поставки газа
                    </div>
                </div>
                {
                    value ?
                        <div>
                            <div className="flex ml-2 mt-2 s-point"
                                onClick={()=>{ Store.dispatch({type: "route", route: "/page/service4_1"})}}
                            >
                                <div>
                                    <IonIcon icon = { gitMergeOutline } className = "w-2 h-2"/>
                                </div>
                                <div className="fs-13 ml-1">
                                    Заключение договора при первичной газификации
                                </div>
                            </div>
                            <div className="flex ml-2 mt-2 s-point"
                                onClick={()=>{ Store.dispatch({type: "route", route: "/page/service4_2"})}}
                            >
                                <div>
                                    <IonIcon icon = { gitBranchOutline } className = "w-2 h-2"/>
                                </div>
                                <div className="fs-13 ml-1">
                                    Заключение договора при проведении пуско-наладочных работ
                                </div>
                            </div>
                            <div className="flex ml-2 mt-2 s-point"
                                onClick={()=>{ Store.dispatch({type: "route", route: "/page/service4_3"})}}
                            >
                                <div>
                                    <IonIcon icon = { documentAttachOutline } className = "w-2 h-2"/>
                                </div>
                                <div className="fs-13 ml-1">
                                    Продление действующего договора поставки газа или перезаключение для бюджетных учреждений
                                </div>
                            </div>
                            <div className="flex ml-2 mt-2 s-point"
                                onClick={()=>{ Store.dispatch({type: "route", route: "/page/service4_4"})}}
                            >
                                <div>
                                    <IonIcon icon = { personAddOutline } className = "w-2 h-2"/>
                                </div>
                                <div className="fs-13 ml-1">
                                    Заключение договора при смене собственника
                                </div>
                            </div>
                            <div className="flex ml-2 mt-2 s-point"
                                onClick={()=>{ Store.dispatch({type: "route", route: "/page/service4_5"})}}
                            >
                                <div>
                                    <IonIcon icon = { documentTextOutline } className = "w-2 h-2"/>
                                </div>
                                <div className="fs-13 ml-1">
                                    Заключение договора при техническом перевооружении (переустройство)
                                </div>
                            </div>
                        </div>
                    :   <></>
                }
                <div className="flex fl-space s-point"
                    onClick={()=> setValue( !value) }
                >
                    <div className="t-underline w-100"></div>
                    <IonIcon icon = {  value ? chevronUpOutline : chevronDownOutline } className="w-15 h-15"/>
                </div>
            </IonCard>        
        </>
    }
    return elem
}

export function Service1():JSX.Element {
    const [ info, setInfo] = useState<any>()

    useEffect(()=>{
        const pr = Store.getState().profile        
        setInfo( pr );

    },[])

    Store.subscribe({num: 31, type: "profile", func: ()=>{
        const pr = Store.getState().profile
        setInfo( pr );
    } })


    const elem = <>
        { 
            info !== undefined 
                ? info.ИНН?.length > 10
                    ? <Service1_2 />
                    : <Service1_1 />
                : <></>
        }    
    </>

    return elem
}

export function Service1_1():JSX.Element {
    const [ info,       setInfo] = useState( Store.getState().service1_1 );
    const [ jurAddress, setJurAddress ] = useState<any>()
    const [ upd,        setUpd] = useState(0)
    const [ page,       setPage ] = useState( 0 )
    const [ load,       setLoad ] = useState( false )
    const [ messages,    setMessages ] = useState<any>([])

    useEffect(()=>{
        console.log("serice_1")
        const pr = Store.getState().profile
        const info = Store.getState().service1_1;

        info.token = Store.getState().login.token;
        if( info.ПолноеНаименование === "") info.ПолноеНаименование = pr?.Наименование === undefined ? "" : pr?.Наименование
        if( info.КраткоеНаименование === "") info.КраткоеНаименование = pr?.Наименование === undefined ? "" : pr?.Наименование

        if( info.ИНН === "") info.ИНН = pr?.ИНН === undefined ? "" : pr?.ИНН
        if( info.КонтактныйТелефон === "") info.КонтактныйТелефон = pr?.КонтактныеЛица?.МобильныйТелефон === "" 
            ? pr?.КонтактныеЛица?.РабочийТелефон
            : pr?.КонтактныеЛица?.МобильныйТелефон
           
        if(pr.Устав?.length > 0) info.Файлы.Устав = pr.Устав

        if(pr.СвидГр?.length > 0) info.Файлы.СвидГРЮЛ = pr.СвидГр

            setInfo( info );

        setUpd(upd + 1)
    
    },[])

    function test( page ){
        let test = true
        let jarr:any = []
        if( page === 0 ){
            if(info.ИНН === "") { jarr = [...jarr, "Заполните ИНН"]; test = false }
            if(info.КонтактныйТелефон === "") { jarr = [...jarr, "Заполните контактный телефон"]; test = false } 
            if(info.элПочта === "") { jarr = [...jarr, "Заполните эл. почту"]; test = false }
        }
        if( page === 1 ){
            if(info?.ОбъектГазификации?.Адрес === "") { jarr = [...jarr, "Заполните адрес объекта"]; test = false }
            if(info?.ОбъектГазификации?.ВариантПодключения === "") { jarr = [...jarr, "Выберите вариант подключения газа "]; test = false } 
            if(info?.ОбъектГазификации?.ХарактерПотребленияГаза === "") { jarr = [...jarr, "Выберите характер потребления газа"]; test = false }
            if(info?.ОбъектГазификации?.НомериДатаИТУ === "") { jarr = [...jarr, "Заполните номер и дату выдачи полученных ранее ТУ"]; test = false }
            if(info?.ОбъектГазификации?.СрокиССиВОбъекта  === "") { jarr = [...jarr, "Заполните сроки проектирования"]; test = false }
        }
        if( page === 2 ){
            if(info?.Файлы?.ПравоСобств.length === 0) { jarr = [...jarr, "Прикрепите копию документа, подтверждающего право собственности или иное предусмотренное законом основание на объект капитального строительства и (или) земельный участок"]; test = false }
            if(info?.Файлы?.СитуацПлан.length === 0) { jarr = [...jarr, "Прикепите топографическую карту участка"]; test = false }
            if(info?.Файлы?.ПравоНаПом.length === 0) { jarr = [...jarr, "Прикрепите документы, подтверждающие право собственности заявителя в отношении помещений"]; test = false }
        }
        setMessages( jarr )
        return test
    }

    async function Save(){
        setLoad( true )
        const res = await getData("jur_apps", info )
        setLoad( false )

        getHistory()
    }

    function PageButtons():JSX.Element {
        return <>
            <div className="ml-1 mt-1 mr-1 flex fl-space">
                <div>
                    <IonButton
                        className={ page === 0 ? "hidden" : "" }
                        onClick={()=>{ 
                            setMessages([])
                            setPage( page - 1)}
                        }
                    >
                        Назад
                    </IonButton>
                </div>                
                <div>
                    <IonButton
                        className={ page === 3 ? "hidden" : "" }
                        onClick={()=>{ 
                            setMessages([])
                            if( page < 2) {
                                if( test(page) )
                                    setPage( page + 1)
                            } else Save()
                        }}
                    >
                       { page === 2 ? "Отправить" : "Далее" } 
                    </IonButton>
                </div>                
            </div>
        
        </>
    }
    
    function Page1():JSX.Element {
        const [ edit, setEdit ] = useState( false )
        const elem = <>
            <IonCard className='bg-1 pb-1 s-card'>

                <div className={ edit ? "ml-1 mr-1 mt-1 t-underline s-input" : "hidden"}>
                    <PartySuggestions  token="50bfb3453a528d091723900fdae5ca5a30369832"
                        filterLocations={[{kladr_id: "14000001"}]}
                        onChange={(e)=>{
                            info.ПолноеНаименование     = e?.data.name.full_with_opf
                            info.КраткоеНаименование    = e?.data.name.short_with_opf
                            info.ИНН = e?.data.inn
                                    
                            info.ЮридическийАдрес = e?.data.address.value

                            setJurAddress( e?.data.address )

                            setInfo( info )
                            setEdit(false)
                                    
                        }}
                    />
                </div>

                    {/* Организация  */}

                <div className='ml-1 mr-1 mt-1 t-underline flex fl-space pb-05'> 
                    <div>Организация</div>
                </div>
                <div  onClick={()=>{ setEdit(!edit) }}  className="s-point">
                    <div className='flex fl-space ml-2 mt-1 mr-1'>
                        <div> Полное Наименование </div>
                        <div className="a-right"> { info?.ПолноеНаименование }</div>
                    </div>
                    <div className='flex fl-space ml-2 mt-1 mr-1'>
                        <div> Краткое наименование  </div>
                        <div className="a-right"> { info?.КраткоеНаименование }</div>
                    </div>
                    <div className='flex fl-space ml-2 mt-1 mr-1'>
                        <div> ИНН </div>
                        <div> { info?.ИНН }</div>
                    </div>
                </div>

                    {/* Контактная информация */}

                <div className='ml-1 mr-1 mt-1 t-underline flex fl-space pb-05'> 
                    <div>Контактная информация</div>
                </div>
                <div className='ml-2 mt-1 mr-1'>
                    <div> Почтовый адрес</div>
                    <div className='s-input a-right mt-05 fs-07'>
                        <AddressSuggestions token="50bfb3453a528d091723900fdae5ca5a30369832" 
                            value={ info?.ПочтовыйАдрес  } 
                            filterLocations={[{region: "Саха /Якутия/"}]}
                            filterRestrictValue
                            onChange={(e)=>{
                                info.ПочтовыйАдрес = e?.value
                                setInfo( info )
                            }} 
                        />
                    </div>
                </div>
                <div className='ml-2 mt-1 mr-1'>
                    <div> Юридический адрес</div>
                    <div className='s-input a-right mt-05'>
                        <AddressSuggestions token="50bfb3453a528d091723900fdae5ca5a30369832" 
                            value={ jurAddress  } 
                            filterLocations={[{region: "Саха /Якутия/"}]}
                            filterRestrictValue
                            onChange={(e)=>{
                                info.ЮридическийАдрес = e?.value
                                setInfo( info )
                            }} 
                        />
                    </div>
                </div>
                <div className='flex fl-space ml-2 mt-1 mr-1'>
                    <div> Телефон </div>
                    <div className='lk-input a-right pr-1 s-input'>
                        <MaskedInput
                            className='m-input a-right'
                            mask={['+', /\d/, '(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                            value={ info.КонтактныйТелефон }
                               // placeholder="+7(000)000-00-00"
                            onInput={(e: any) => {
                                info.КонтактныйТелефон = (e.target.value as string).substring(0, 16)   
                                setInfo( info );
                            }}
                        />
                    </div>
                </div>
                <div className='flex fl-space ml-2 mt-1 mr-1'>
                    <div> Доп. телефон </div>
                    <div className='lk-input a-right pr-1 s-input'>
                        <MaskedInput
                            className='m-input a-right'
                            mask={['+', /\d/, '(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                            value={ info.ДопТелефон }
                               // placeholder="+7(000)000-00-00"
                            onInput={(e: any) => {
                                info.ДопТелефон = (e.target.value as string).substring(0, 16)   
                                setInfo( info );
                            }}
                        />
                    </div>
                </div>
                <div className='flex fl-space ml-2 mt-1 mr-1'>
                    <div> email </div>
                    <div className='lk-input a-right pr-1 s-input'>
                        <IonInput
                            class='lk-input-1'
                            value={ info?.элПочта }
                            placeholder="эл. почта"
                            onIonInput={(e: any) => {
                                info.элПочта = e.target.value    
                                setInfo( info );
                            }}
                        />
                        </div>
                </div>

                { 
                    messages.map((e, ind) =>{
                        return <p className="cl-red ml-2" key= { ind }>{ e } </p>
                    })
                }

                <PageButtons />

            </IonCard>
        
        </>

        return elem
    }

    function Page2():JSX.Element {
        const [ value, setValue ] = useState( "менее 7 м3/ч" )
        const [ upd, setUpd] = useState( 0 )

        function MCHRG(){
            const [ modal, setModal ] = useState<any>()
            const [ upd1, setUpd1 ]  = useState(0)
    
            function Counted(){
                    const qkof = {
                      100: "0.839",
                      200: "0.722",
                      300: "0.662",
                      400: "0.622",
                      500: "0.593",
                      600: "0.57",
                      700: "0.552",
                      800: "0.536",
                      900: "0.523",
                      1000: "0.511",
                      1100: "0.5",
                      1200: "0.491",
                      1300: "0.483",
                      1400: "0.475",
                      1500: "0.468",
                      1600: "0.462",
                      1700: "0.456",
                      1800: "0.45",
                      1900: "0.445",
                      2000: "0.44",
                      2100: "0.436",
                      2200: "0.431",
                      2300: "0.427",
                      2400: "0.423",
                      2500: "0.42",
                      2600: "0.416",
                      2700: "0.413",
                      2800: "0.41",
                      2900: "0.407",
                      3000: "0.404",
                      3100: "0.4",
                      3200: "0.398",
                      3300: "0.395",
                      3400: "0.393",
                      3500: "0.39",
                      3600: "0.388",
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
                                value={ info?.МЧРГ?.План }
                                placeholder="Величина МЧРГ"
                                onIonInput={(e: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
                                    info.МЧРГ.План = e.target.value   
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
                    info?.МЧРГ?.План >= 7
                        ? <Files info = { info?.МЧРГ?.Файлы } name = "ПланМЧРГ" check = { true } title = "Расчет максимального часового расхода газа"/>
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
                                    info.МЧРГ.План = modal.МЧРГ
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

        const elem = <>
            <IonCard className='bg-1 pb-1 s-card'>
                <div className='ml-1 mr-1 mt-1 t-underline flex fl-space pb-05'> 
                        <div>Объект газификации</div>
                    </div>
                  <div >
                    <div className='flex fl-space ml-2 mt-1 mr-1'>
                        <div> Наименование </div>
                        <div className="s-select w-40">
                            <IonSelect placeholder="Выберите объект"  className='s-select w-100'
                                value={ info?.ОбъектГазификации?.Наименование }
                                interface="popover"
                                onIonChange={(e)=>{
                                    info.ОбъектГазификации.Наименование = e.detail.value
                                    setInfo(info);
                                }}
                            >
                                <IonSelectOption class="w-90" value="Жилой дом"> Жилой дом</IonSelectOption>
                                <IonSelectOption class="w-90" value="Гараж"> Гараж</IonSelectOption>
                                <IonSelectOption class="w-90" value="Баня"> Баня</IonSelectOption>
                                <IonSelectOption class="w-90" value="Другое"> Другое</IonSelectOption>
                            </IonSelect>
                        </div>
                    </div>
                    <div className='ml-2 mt-1 mr-1'>
                        <div className=""> Адрес  </div>
                        <div className="w-100 cl-prim mt-05"> 
                            <AddressSuggestions token="50bfb3453a528d091723900fdae5ca5a30369832" 
                                value={ info?.ОбъектГазификации?.Адрес } 
                                filterLocations={[{region: "Саха /Якутия/"}]}
                                onChange={(e)=>{
                                    info.ОбъектГазификации.Адрес = e?.value
                                }} 
                            />
                        </div>
                    </div>
                    <div className='ml-2 mt-1 mr-1'>
                        <div> Вариант подключения</div>
                        <div className="lk-input mt-05">
                            <IonSelect placeholder="Выберите вариант подключения"  className='s-select w-100'
                                value={ info?.ОбъектГазификации?.ВариантПодключения }
                                interface="popover"
                                onIonChange={(e)=>{
                                    info.ОбъектГазификации.ВариантПодключения = e.detail.value
                                    setInfo(info);
                                }}
                            >
                                <IonSelectOption class="w-90" value="Увеличение объема потребления газа"> Увеличение объема потребления газа </IonSelectOption>
                                <IonSelectOption class="w-90" value="Необходимость подключения к сети газораспределения"> Необходимость подключения к сети газораспределения</IonSelectOption>
                            </IonSelect>
                        </div>
                    </div>
                    <div className='ml-2 mt-1 mr-1'>
                        <div> Характер потребления газа </div>
                        <div className="s-select mt-05">
                            <IonSelect placeholder="Выберите характер потребления"  className='s-select'
                                value={ info?.ОбъектГазификации?.ХарактерПотребленияГаза }
                                interface="popover"
                                onIonChange={(e)=>{
                                    info.ОбъектГазификации.ХарактерПотребленияГаза = e.detail.value
                                    setInfo(info);
                                }}
                            >
                                <IonSelectOption class="w-90" value="Другое"> Другое</IonSelectOption>
                                <IonSelectOption class="w-90" value="Отопление и пищеприготовление"> Отопление и пищеприготовление </IonSelectOption>
                                <IonSelectOption class="w-90" value="Отопление"> Отопление </IonSelectOption>
                                <IonSelectOption class="w-90" value="Пищеприготовление"> Пищеприготовление </IonSelectOption>
                            </IonSelect>
                        </div>
                    </div>
                    <div className=' ml-2 mt-1 mr-1'>
                        <div> Номер и дата выдачи полученных ранее технических условий, срок действия которых на момент подачи заявки о подключении (технологическом присоединении) не истек </div>
                        <div className='s-input a-right pr-1 mt-1'>
                            <IonInput
                                className='s-input-1'
                                value={ info?.ОбъектГазификации?.НомериДатаИТУ }
                                placeholder="Номер и дата"
                                onIonInput={(e: any) => {
                                    info.ОбъектГазификации.НомериДатаИТУ = e.target.value    
                                    setInfo( info );
                                }}
                            />
                        </div>
                    </div>
                    <div className=' ml-2 mt-1 mr-1'>
                        <div> Сроки проектирования, строительства и ввода в эксплуатацию объекта капитального строительства (в том числе по этапам и очередям) </div>
                        <div className='s-input a-right pr-1 mt-1'>
                            <IonInput
                                className='s-input-1'
                                value={ info?.ОбъектГазификации?.СрокиССиВОбъекта }
                                placeholder="Сроки проектирования"
                                onIonInput={(e: any) => {
                                    info.ОбъектГазификации.СрокиССиВОбъекта = e.target.value    
                                    setInfo( info );
                                }}
                            />
                        </div>
                    </div>
                  </div>

                  <div className='ml-1 mr-1 mt-1 t-underline flex fl-space pb-05'> 
                    <div>МЧРГ</div>
                  </div>
                  <div color="dark">
                    <MCHRG />
                  </div>

                { 
                    messages.map((e, ind) =>{
                        return <p className="cl-red ml-2" key= { ind }>{ e } </p>
                    })
                }                
                
                <PageButtons />

            </IonCard>
        
        </>

        return elem
    }

    function Page3():JSX.Element {
        const [ index, setIndex ] = useState( 0 )

        const elem = <>
            <IonCard className='bg-1 pb-1 s-card'>
                <div className=" ml-1 mt-1">
                    <IonChip color="light" className={ index === 0 ? "a-chip" : "" }  onClick={()=> setIndex( 0 )}> 1 </IonChip>
                    <IonChip color="light" className={ index === 1 ? "a-chip" : "" }  onClick={()=> setIndex( 1 )}> 2 </IonChip>
                    <IonChip color="light" className={ index === 2 ? "a-chip" : "" }  onClick={()=> setIndex( 2 )}> 3 </IonChip>
                    <IonChip color="light" className={ index === 3 ? "a-chip" : "" }  onClick={()=> setIndex( 3 )}> 4 </IonChip>
                    <IonChip color="light" className={ index === 4 ? "a-chip" : "" }  onClick={()=> setIndex( 4 )}> 5 </IonChip>
                    <IonChip color="light" className={ index === 5 ? "a-chip" : "" }  onClick={()=> setIndex( 5 )}> 6 </IonChip>
                    <IonChip color="light" className={ index === 6 ? "a-chip" : "" }  onClick={()=> setIndex( 6 )}> 7 </IonChip>
                    <IonChip color="light" className={ index === 7 ? "a-chip" : "" }  onClick={()=> setIndex( 7 )}> 8 </IonChip>
                    <IonChip color="light" className={ index === 8 ? "a-chip" : "" }  onClick={()=> setIndex( 8 )}> 9 </IonChip>
                    <IonChip color="light" className={ index === 9 ? "a-chip" : "" }  onClick={()=> setIndex( 9 )}> 10 </IonChip>
                    <IonChip color="light" className={ index === 10 ? "a-chip" : "" }  onClick={()=> setIndex( 10 )}> 11 </IonChip>
                </div>

                { 
                    index === 0
                        ? <Files info = { info.Файлы.СвиднУвНО } name = { "СвиднУвНО" }   check = {false} title = "Свидетельство на учет в налоговом органе"/>
                    : index === 1
                        ? <Files info = { info.Файлы.ПолнРуков } name = { "ПолнРуков" }   check = {false} title = "Документ, подтверждающий полномочия руководителя юридического лица (протокол, решение)"/>
                    : index === 2
                        ? <Files info = { info.Файлы.ПравоНаЗем } name = { "ПравоНаЗем" }  check = {false} title = "Копии правоустанавливающих документов на земельный участок (свидетельство, выписка ЕГРН, договор аренды и т.п.)"/> 
                    : index === 3
                        ? <Files info = { info.Файлы.ТопоКарта } name = { "ТопоКарта" }   check = {false} title = "Топографическая карта участка в масштабе 1 к 500 (не прилагается, если заказчик - физическое лицо, осуществляющее создание (реконструкцию) объекта индивидуального жилищного строительства)"/>
                    : index === 4
                        ? <Files info = { info.Файлы.ПравоСобств } name = { "ПравоСобств" } check = {true}  title = "Копия документа, подтверждающего право собственности или иное предусмотренное законом основание на объект капитального строительства и (или) земельный участок, на котором расположены (будут располагаться) объекты капитального строительства заявителя            ДогоПольз:                          [], //Для некоммерческих объединений (Заверенная копия договора о пользовании объектами инфраструктуры и др. имуществом общего пользования)"/>
                    : index === 5
                        ? <Files info = { info.Файлы.СитуацПлан } name = { "СитуацПлан" }  check = {true} title = "Ситуационный план расположения земельного участка с привязкой к территории населенного пункта (формат А4)"/>
                    : index === 6
                        ? <Files info = { info.Файлы.ПравоНаПом } name = { "ПравоНаПом" }  check = {true} title = "Документы, подтверждающие право собственности заявителя в отношении помещений, газоснабжение которых необходимо обеспечить, или иные основания пользования этими помещениями (выписка из ЕГРН, договор социального найма, договор аренды и т.д.; все страницы)"/>
                    : index === 7
                        ? <Files info = { info.Файлы.СоглАбон } name = { "СоглАбон" }    check = {false} title = "Согласие осн-го абонента на подключение к сетям газораспределения и (или) газопотребления осн-го абонента, а также строител-во газопровода на з/у осн-го абонента, если подключение осуществляется на з/у, правообладателем которого является осн-ой абонент"/>
                    : index === 8
                        ? <Files info = { info.Файлы.АдрСправка } name = { "АдрСправка" }  check = {false} title = "Адресная справка (требуется в случае если внесены изменения в адрес объекта)"/>
                    : index === 9
                        ? <Files info = { info.Файлы.ДогПользОб } name = { "ДогПользОб" }  check = {false} title = "Заверенная в установленном порядке копия договора о пользовании объектами инфраструктуры и другим имуществом общего пользования НКО"/>
                    : index === 10
                        ? <Files info = { info.Файлы.ПланТерр } name = { "ПланТерр" }    check = {false} title = "Копия разработанной и утвержденной в соответствии с законодательством Российской Федерации документации по планировке территории"/>
                    : <></>                
                }
                { 
                    messages.map((e, ind) =>{
                        return <p className="cl-red ml-2" key= { ind }>{ e } </p>
                    })
                }                
                
                <PageButtons />
                
            </IonCard>
        </>

        return elem
    }

    const elem = <>
        <IonLoading isOpen = { load } message={ "Подождите..." }/>
        {
            page === 0 
                ? <Page1 />
            : page === 1
                ? <Page2 />
            : page === 2
                ? <Page3 />
            : <></>
        }
    </>

    return elem
}

export function Service1_2():JSX.Element {
    const [ info,       setInfo]        = useState( Store.getState().service1_2 );
    const [ page,       setPage ]       = useState( 0 ); 
    const [ load,       setLoad]        = useState( false )
    const [ messages,   setMessages ]   = useState<any>([])
    const [ upd,        setUpd]         = useState( 0 )

    useEffect(()=>{
        console.log("service_2")
        const pr = Store.getState().profile
        const info = Store.getState().service1_2;

        info.token = Store.getState().login.token;

        if( info.Фамилия === "") info.Фамилия = pr?.КонтактныеЛица?.Фамилия === undefined ? "" : pr?.КонтактныеЛица?.Фамилия
        if( info.Имя === "") info.Имя = pr?.КонтактныеЛица?.Имя === undefined ? "" : pr?.КонтактныеЛица?.Имя
        if( info.Отчество === "") info.Отчество = pr?.КонтактныеЛица?.Отчество === undefined ? "" : pr?.КонтактныеЛица?.Отчество

        if( info.ИНН === "") info.ИНН = pr?.ИНН === undefined ? "" : pr?.ИНН
        if( info.КонтактныйТелефон === "") info.КонтактныйТелефон = pr?.КонтактныеЛица?.МобильныйТелефон === "" 
            ? pr?.КонтактныеЛица?.РабочийТелефон
            : pr?.КонтактныеЛица?.МобильныйТелефон

        setInfo( info );

        setUpd( upd + 1);
    
    },[])

    function test( page ){
        let test = true
        let jarr:any = []
        if( page === 0 ){
            if(info.Фамилия === "") { jarr = [...jarr, "Заполните Фамилию"]; test = false }
            if(info.Имя === "") { jarr = [...jarr, "Заполните имя"]; test = false }
            if(info.Отчество === "") { jarr = [...jarr, "Заполните отчество"]; test = false }
            if(info.ИНН === "") { jarr = [...jarr, "Заполните ИНН"]; test = false }
            if(info.КонтактныйТелефон === "") { jarr = [...jarr, "Заполните контактный телефон"]; test = false } 
            if(info.элПочта === "") { jarr = [...jarr, "Заполните эл. почту"]; test = false }
            if(info.Паспорт.Серия === "") { jarr = [...jarr, "Заполните серия паспорта"]; test = false }
            if(info.Паспорт.Номер === "") { jarr = [...jarr, "Заполните номер паспорта"]; test = false }
            if(info.Паспорт.КемВыдан === "") { jarr = [...jarr, "Заполните поле кем выдан"]; test = false }
            if(info.Паспорт.КогдаВыдан === "") { jarr = [...jarr, "Заполните поле когда выдан"]; test = false }
            if(info.элПочта === "") { jarr = [...jarr, "Заполните эл. почту"]; test = false }
        }
        if( page === 1 ){
            if(info?.ОбъектГазификации?.Адрес === "") { jarr = [...jarr, "Заполните адрес объекта"]; test = false }
            if(info?.ОбъектГазификации?.ВариантПодключения === "") { jarr = [...jarr, "Выберите вариант подключения газа "]; test = false } 
            if(info?.ОбъектГазификации?.ХарактерПотребленияГаза === "") { jarr = [...jarr, "Выберите характер потребления газа"]; test = false }
            if(info?.ОбъектГазификации?.НомериДатаИТУ === "") { jarr = [...jarr, "Заполните номер и дату выдачи полученных ранее ТУ"]; test = false }
            if(info?.ОбъектГазификации?.СрокиССиВОбъекта  === "") { jarr = [...jarr, "Заполните сроки проектирования"]; test = false }
        }
        if( page === 2 ){
            if(info?.Файлы?.ПравоСобств.length === 0) { jarr = [...jarr, "Прикрепите копию документа, подтверждающего право собственности или иное предусмотренное законом основание на объект капитального строительства и (или) земельный участок"]; test = false }
        }
        if( page === 3 ){
            if(info?.Файлы?.ОснДокУдЛичность.length === 0) { jarr = [...jarr, "Копия основного документа, удостоверяющий личность (паспорт гражданина вторая, третья страницы с персональными данными гражданина, страницы с отметкой о регистрации)"]; test = false }
            if(info?.Файлы?.СитуацПлан.length === 0) { jarr = [...jarr, "Прикепите топографическую карту участка"]; test = false }
            if(info?.Файлы?.ДокПравоСобствПом.length === 0) { jarr = [...jarr, "Прикрепите документы, подтверждающие право собственности заявителя в отношении помещений"]; test = false }
        }
        setMessages( jarr )
        return test
    }

    async function Save(){
        setLoad( true )
        const res = await getData("jur_apps", info )
        console.log(res)
        setLoad( false )

        getHistory()
    }

    function PageButtons():JSX.Element {
        return <>
            <div className="ml-1 mt-1 mr-1 flex fl-space">
                <div>
                    <IonButton
                        className={ page === 0 ? "hidden" : "" }
                        onClick={()=>{ 
                            setMessages([])
                            setPage( page - 1)}
                        }
                    >
                        Назад
                    </IonButton>
                </div>                
                <div>
                    <IonButton
                        className={ page === 3 ? "hidden" : "" }
                        onClick={()=>{ 
                            setMessages([])
                            console.log(page)
                            if( page < 2) {
                                if( test(page) )
                                    setPage( page + 1)
                            } else Save()
                        }}
                    >
                       { page === 2 ? "Отправить" : "Далее" } 
                    </IonButton>
                </div>                
            </div>
        
        </>
    }
    

    function Page1():JSX.Element {
        const [ edit, setEdit ] = useState( false )
        const elem = <>
            <IonCard className='bg-1 pb-1 s-card'>

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
                <div className='ml-1 mr-1 mt-1 t-underline flex fl-space pb-05'> 
                    <div>Контактное лицо</div>
                </div>
                <div  onClick={()=>{ setEdit(!edit) }}  className="s-point">
                    <div className='flex fl-space ml-2 mt-1 mr-1'>
                        <div> Фамилия </div>
                        <div> { info?.Фамилия }</div>
                    </div>
                    <div className='flex fl-space ml-2 mt-1 mr-1'>
                        <div> Имя  </div>
                        <div> { info?.Имя }</div>
                    </div>
                    <div className='flex fl-space ml-2 mt-1 mr-1'>
                        <div> Отчество </div>
                        <div> { info?.Отчество }</div>
                    </div>
                </div>
    
                <div className='ml-1 mr-1 mt-1 t-underline flex fl-space pb-05'> 
                        <div>Контактная информация</div>
                    </div>
                    <div className='flex fl-space ml-2 mt-1 mr-1'>
                        <div> ИНН </div>
                        <div className='s-input a-right pr-1'>
                        <IonInput
                            class='s-input-1'
                            value={ info?.ИНН }
                            placeholder="ИНН"
                            onIonInput={(e: any) => {
                                info.ИНН = e.target.value    
                                setInfo( info );
                            }}
                        />
                        </div>
                    </div>
                    <div className='flex fl-space ml-2 mt-1 mr-1'>
                        <div> Телефон </div>
                        <div className='s-input a-right pr-1'>
                        <IonInput
                            class='s-input-1'
                            value={ info?.КонтактныйТелефон }
                            placeholder="телефон"
                            onIonInput={(e: any) => {
                                info.КонтактныйТелефон = e.target.value    
                                setInfo( info );
                            }}
                        />
                        </div>
                    </div>
                    <div className='flex fl-space ml-2 mt-1 mr-1'>
                        <div> email </div>
                        <div className='s-input a-right pr-1'>
                        <IonInput
                            class='s-input-1'
                            value={ info?.элПочта }
                            placeholder="эл. почта"
                            onIonInput={(e: any) => {
                                info.элПочта = e.target.value    
                                setInfo( info );
                            }}
                        />
                        </div>
                    </div>
                    <div className='ml-1 mr-1 mt-1 t-underline flex fl-space pb-05'> 
                        <div>Паспорт</div>
                    </div>
                    <div className='flex ml-2 mt-1 mr-1'>
                        <div className="flex fl-space w-50">
                            <div> Серия </div>
                            <div className='s-input a-right pr-1 w-30'>
                                <IonInput
                                    class='s-input-1'
                                    value={ info.Паспорт.Серия }
                                    placeholder="Серия"
                                    onIonInput={(e: any) => {
                                        info.Паспорт.Серия = e.target.value    
                                        setInfo( info );
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex fl-space w-50">
                            <div className="ml-1"> Номер </div>
                            <div className='s-input a-right pr-1 w-30'>
                            <IonInput
                                class='s-input-1'
                                value={ info.Паспорт.Номер }
                                placeholder="Номер"
                                onIonInput={(e: any) => {
                                    info.Паспорт.Номер = e.target.value    
                                    setInfo( info );
                                }}
                            />
                            </div>
                        </div>
                    </div>
                    <div className='ml-2 mt-1 mr-1'>
                        <div> Место регистрации </div>
                        <div className='s-input a-right mt-1'>
                            <AddressSuggestions token="50bfb3453a528d091723900fdae5ca5a30369832" 
                                value={ info?.Паспорт?.МестоРегистрации  } 
                                filterLocations={[{region: "Саха /Якутия/"}]}
                                filterRestrictValue
                                onChange={(e)=>{
                                    info.Паспорт.МестоРегистрации = e?.value
                                    setInfo( info )
                                }} 
                            />
                        </div>
                    </div>

                    <div className='ml-2 mt-1 mr-1'>
                        <div > Кем выдан </div>
                        <div className='s-input a-right pr-1 mt-1'>
                            <IonInput
                                className='s-input-1'
                                value={ info.Паспорт.КемВыдан }
                                placeholder="кем выдан"
                                onIonInput={(e: any) => {
                                    info.Паспорт.КемВыдан = e.target.value    
                                    setInfo( info );
                                }}
                            />
                        </div>
                    </div>
                    <div className='flex fl-space ml-2 mt-1 mr-1'>
                        <div> Когда выдан </div>
                        <div className='s-input a-right pr-1'>
                        <MaskedInput
                            className='m-input a-right'
                            mask={[ /\d/, /\d/, '.', /\d/, /\d/,'.', /\d/, /\d/, /\d/, /\d/]}
                            value={ info.Паспорт.КогдаВыдан }
                            placeholder="__.__.____"
                            onInput={(e: any) => {
                                info.Паспорт.КогдаВыдан = e.target.value    
                                setInfo( info );
                            }}
                        />
                        </div>
                    </div>

                { 
                    messages.map((e, ind) =>{
                        return <p className="cl-red ml-2" key= { ind }>{ e } </p>
                    })
                }

                <PageButtons />
            </IonCard>       
        </>

        return elem
    }

    function Page2():JSX.Element {
        const [ value, setValue ] = useState( "менее 7 м3/ч" )
        const [ upd, setUpd] = useState( 0 )

        function MCHRG(){
            const [ modal, setModal ] = useState<any>()
            const [ upd1, setUpd1 ]  = useState(0)
    
            function Counted(){
                    const qkof = {
                      100: "0.839",
                      200: "0.722",
                      300: "0.662",
                      400: "0.622",
                      500: "0.593",
                      600: "0.57",
                      700: "0.552",
                      800: "0.536",
                      900: "0.523",
                      1000: "0.511",
                      1100: "0.5",
                      1200: "0.491",
                      1300: "0.483",
                      1400: "0.475",
                      1500: "0.468",
                      1600: "0.462",
                      1700: "0.456",
                      1800: "0.45",
                      1900: "0.445",
                      2000: "0.44",
                      2100: "0.436",
                      2200: "0.431",
                      2300: "0.427",
                      2400: "0.423",
                      2500: "0.42",
                      2600: "0.416",
                      2700: "0.413",
                      2800: "0.41",
                      2900: "0.407",
                      3000: "0.404",
                      3100: "0.4",
                      3200: "0.398",
                      3300: "0.395",
                      3400: "0.393",
                      3500: "0.39",
                      3600: "0.388",
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
                                value={ info?.МЧРГ?.План }
                                placeholder="Величина МЧРГ"
                                onIonInput={(e: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
                                    info.МЧРГ.План = e.target.value   
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
                    info?.МЧРГ?.План >= 7
                        ? <Files info = { info?.МЧРГ?.Файлы } name = "ПланМЧРГ" check = { true } title = "Расчет максимального часового расхода газа"/>
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
                                    info.МЧРГ.План = modal.МЧРГ
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

        const elem = <>
            <IonCard className='bg-1 pb-1 s-card'>
                <div className='ml-1 mr-1 mt-1 t-underline flex fl-space pb-05'> 
                        <div>Объект газификации</div>
                    </div>
                  <div >
                    <div className='flex fl-space ml-2 mt-1 mr-1'>
                        <div> Наименование </div>
                        <div className="s-select w-40">
                            <IonSelect placeholder="Выберите объект"  className='s-select w-100'
                                value={ info?.ОбъектГазификации?.Наименование }
                                interface="popover"
                                onIonChange={(e)=>{
                                    info.ОбъектГазификации.Наименование = e.detail.value
                                    setInfo(info);
                                }}
                            >
                                <IonSelectOption class="w-90" value="Жилой дом"> Жилой дом</IonSelectOption>
                                <IonSelectOption class="w-90" value="Гараж"> Гараж</IonSelectOption>
                                <IonSelectOption class="w-90" value="Баня"> Баня</IonSelectOption>
                                <IonSelectOption class="w-90" value="Другое"> Другое</IonSelectOption>
                            </IonSelect>
                        </div>
                    </div>
                    <div className='ml-2 mt-1 mr-1'>
                        <div className=""> Адрес  </div>
                        <div className="w-100 cl-prim mt-05"> 
                            <AddressSuggestions token="50bfb3453a528d091723900fdae5ca5a30369832" 
                                value={ info?.ОбъектГазификации?.Адрес } 
                                filterLocations={[{region: "Саха /Якутия/"}]}
                                onChange={(e)=>{
                                    info.ОбъектГазификации.Адрес = e?.value
                                }} 
                            />
                        </div>
                    </div>
                    <div className='ml-2 mt-1 mr-1'>
                        <div> Вариант подключения</div>
                        <div className="lk-input mt-05">
                            <IonSelect placeholder="Выберите вариант подключения"  className='s-select w-100'
                                value={ info?.ОбъектГазификации?.ВариантПодключения }
                                interface="popover"
                                onIonChange={(e)=>{
                                    info.ОбъектГазификации.ВариантПодключения = e.detail.value
                                    setInfo(info);
                                }}
                            >
                                <IonSelectOption class="w-90" value="Увеличение объема потребления газа"> Увеличение объема потребления газа </IonSelectOption>
                                <IonSelectOption class="w-90" value="Необходимость подключения к сети газораспределения"> Необходимость подключения к сети газораспределения</IonSelectOption>
                            </IonSelect>
                        </div>
                    </div>
                    <div className='ml-2 mt-1 mr-1'>
                        <div> Характер потребления газа </div>
                        <div className="s-select mt-05">
                            <IonSelect placeholder="Выберите характер потребления"  className='s-select'
                                value={ info?.ОбъектГазификации?.ХарактерПотребленияГаза }
                                interface="popover"
                                onIonChange={(e)=>{
                                    info.ОбъектГазификации.ХарактерПотребленияГаза = e.detail.value
                                    setInfo(info);
                                }}
                            >
                                <IonSelectOption class="w-90" value="Другое"> Другое</IonSelectOption>
                                <IonSelectOption class="w-90" value="Отопление и пищеприготовление"> Отопление и пищеприготовление </IonSelectOption>
                                <IonSelectOption class="w-90" value="Отопление"> Отопление </IonSelectOption>
                                <IonSelectOption class="w-90" value="Пищеприготовление"> Пищеприготовление </IonSelectOption>
                            </IonSelect>
                        </div>
                    </div>
                    <div className=' ml-2 mt-1 mr-1'>
                        <div> Номер и дата выдачи полученных ранее технических условий, срок действия которых на момент подачи заявки о подключении (технологическом присоединении) не истек </div>
                        <div className='s-input a-right pr-1 mt-1'>
                            <IonInput
                                className='s-input-1'
                                value={ info?.ОбъектГазификации?.НомериДатаИТУ }
                                placeholder="Номер и дата"
                                onIonInput={(e: any) => {
                                    info.ОбъектГазификации.НомериДатаИТУ = e.target.value    
                                    setInfo( info );
                                }}
                            />
                        </div>
                    </div>
                    <div className=' ml-2 mt-1 mr-1'>
                        <div> Сроки проектирования, строительства и ввода в эксплуатацию объекта капитального строительства (в том числе по этапам и очередям) </div>
                        <div className='s-input a-right pr-1 mt-1'>
                            <IonInput
                                className='s-input-1'
                                value={ info?.ОбъектГазификации?.СрокиССиВОбъекта }
                                placeholder="Сроки проектирования"
                                onIonInput={(e: any) => {
                                    info.ОбъектГазификации.СрокиССиВОбъекта = e.target.value    
                                    setInfo( info );
                                }}
                            />
                        </div>
                    </div>
                  </div>

                  <div className='ml-1 mr-1 mt-1 t-underline flex fl-space pb-05'> 
                    <div>МЧРГ</div>
                    <div color="dark">
                        <MCHRG />
                    </div>
                  </div>

                { 
                    messages.map((e, ind) =>{
                        return <p className="cl-red ml-2" key= { ind }>{ e } </p>
                    })
                }                
                
                <PageButtons />

            </IonCard>
        
        </>

        return elem
    }

    function Page3():JSX.Element {
        const [ index, setIndex ] = useState( 0 )

        const elem = <>
            <IonCard className='bg-1 pb-1 s-card'>                
                <div className=" ml-1 mt-1">
                    <IonChip color="light" className={ index === 0 ? "a-chip" : "" }  onClick={()=> setIndex( 0 )}> 1 </IonChip>
                    <IonChip color="light" className={ index === 1 ? "a-chip" : "" }  onClick={()=> setIndex( 1 )}> 2 </IonChip>
                    <IonChip color="light" className={ index === 2 ? "a-chip" : "" }  onClick={()=> setIndex( 2 )}> 3 </IonChip>
                    <IonChip color="light" className={ index === 3 ? "a-chip" : "" }  onClick={()=> setIndex( 3 )}> 4 </IonChip>
                    <IonChip color="light" className={ index === 4 ? "a-chip" : "" }  onClick={()=> setIndex( 4 )}> 5 </IonChip>
                    <IonChip color="light" className={ index === 5 ? "a-chip" : "" }  onClick={()=> setIndex( 5 )}> 6 </IonChip>
                    <IonChip color="light" className={ index === 6 ? "a-chip" : "" }  onClick={()=> setIndex( 6 )}> 7 </IonChip>
                    <IonChip color="light" className={ index === 7 ? "a-chip" : "" }  onClick={()=> setIndex( 7 )}> 8 </IonChip>
                    <IonChip color="light" className={ index === 8 ? "a-chip" : "" }  onClick={()=> setIndex( 8 )}> 9 </IonChip>
                </div>

                {
                    index === 0
                        ? <Files info = { info.Файлы.ПравоУстДокументы }    name = { "ПравоУстДокументы" }   check = {false} title = "Копии правоустанавливающих документов на земельный участок (свидетельство, выписка ЕГРН, договор аренды и т.п.)"/>
                    : index === 1
                        ? <Files info = { info.Файлы.ТопоКарта }            name = { "ТопоКарта" }           check = {false} title = "Топографическая карта участка в масштабе 1 к 500 (не прилагается, если заказчик - физическое лицо, осуществляющее создание (реконструкцию) объекта индивидуального жилищного строительства)"/>
                    : index === 2
                        ? <Files info = { info.Файлы.ПравоСобств }          name = { "ПравоСобств" }         check = {true} title = "Копия документа, подтверждающего право собственности или иное предусмотренное законом основание на объект капитального строительства и (или) земельный участок, на котором расположены (будут располагаться) объекты капитального строительства заявителя"/>
                    : index === 3
                        ? <Files info = { info.Файлы.СвидОПУвНО }           name = { "СвидОПУвНО" }          check = {false} title = "Заверенная копия свидетельства о постановке на учет в налоговом органе"/>
                    : index === 4
                        ? <Files info = { info.Файлы.СвидоГРвкИП }          name = { "СвидоГРвкИП" }         check = {false} title = "Заверенная копия свидетельства о государственной регистрации в качестве индивидуального предпринимателя"/>
                    : index === 5
                        ? <Files info = { info.Файлы.ОснДокУдЛичность }     name = { "ОснДокУдЛичность" }    check = {true} title = "Копия основного документа, удостоверяющий личность (паспорт гражданина вторая, третья страницы с персональными данными гражданина, страницы с отметкой о регистрации)"/>
                    : index === 6
                        ? <Files info = { info.Файлы.СитуацПлан }           name = { "СитуацПлан" }          check = {true} title = "Ситуационный план расположения земельного участка с привязкой к территории населенного пункта (формат А4)"/>
                    : index === 7
                        ? <Files info = { info.Файлы.ДокПравоСобствПом }    name = { "ДокПравоСобствПом" }   check = {true}  title = "Документы, подтверждающие право собственности заявителя в отношении помещений, газоснабжение которых необходимо обеспечить, или иные основания пользования этими помещениями (выписка из ЕГРН, договор социального найма, договор аренды и т.д.; все страницы)"/>
                    : index === 8
                        ? <Files info = { info.Файлы.СогласиеНаПодкл }      name = { "СогласиеНаПодкл" }     check = {false} title = "Согласие осн-го абонента на подключение к сетям газораспределения и (или) газопотребления осн-го абонента, а также строител-во газопровода на з/у осн-го абонента, если подключение осуществляется на з/у, правообладателем которого является осн-ой абонент"/>
                    : <></>
                }

                { 
                    messages.map((e, ind) =>{
                        return <p className="cl-red ml-2" key= { ind }>{ e } </p>
                    })
                }                
                
                <PageButtons />
                
            </IonCard>
        </>

        return elem
    }

   
    const elem = <>
        <IonLoading isOpen = { load } message={ "Подождите..." }/>
        {
            page === 0 
                ? <Page1 />
            : page === 1
                ? <Page2 />
            : page === 2
                ? <Page3 />
            : <></>
        }
    </>

    return elem
}

export function Service2():JSX.Element {
    const [ info, setInfo] = useState( Store.getState().service2 );
    const [ load, setLoad] = useState( false)
    const [ page, setPage] = useState( 0 )
    const [ messages,   setMessages ]   = useState<any>([])
    const [ upd,        setUpd]         = useState( 0 )

    useEffect(()=>{
        const pr = Store.getState().profile
        const info = Store.getState().service2;

        info.token = Store.getState().login.token;
        if( info.ПолноеНаименование === "") info.ПолноеНаименование = pr?.Наименование === undefined ? "" : pr?.Наименование
        if( info.КраткоеНаименование === "") info.КраткоеНаименование = pr?.Наименование === undefined ? "" : pr?.Наименование

        if( info.ИНН === "") info.ИНН = pr?.ИНН === undefined ? "" : pr?.ИНН
        if( info.КонтактныйТелефон === "") info.КонтактныйТелефон = pr?.КонтактныеЛица?.МобильныйТелефон === "" 
            ? pr?.КонтактныеЛица?.РабочийТелефон
            : pr?.КонтактныеЛица?.МобильныйТелефон
           
        setInfo( info );

        setUpd(upd + 1)
    
    },[])

    function test( page ){
        let test = true
        let jarr:any = []
        if( page === 0 ){
            if(info.ИНН === "") { jarr = [...jarr, "Заполните ИНН"]; test = false }
            if(info.КонтактныйТелефон === "") { jarr = [...jarr, "Заполните контактный телефон"]; test = false } 
            if(info.элПочта === "") { jarr = [...jarr, "Заполните эл. почту"]; test = false }
        }
        if( page === 1 ){
            if(info?.ОбъектГазификации?.Адрес === "") { jarr = [...jarr, "Заполните адрес объекта"]; test = false }
            if(info?.ОбъектГазификации?.ВариантПодключения === "") { jarr = [...jarr, "Выберите вариант подключения газа "]; test = false } 
            if(info?.ОбъектГазификации?.ХарактерПотребленияГаза === "") { jarr = [...jarr, "Выберите характер потребления газа"]; test = false }
            if(info?.ОбъектГазификации?.НомериДатаИТУ === "") { jarr = [...jarr, "Заполните номер и дату выдачи полученных ранее ТУ"]; test = false }
            if(info?.ОбъектГазификации?.СрокиССиВОбъекта  === "") { jarr = [...jarr, "Заполните сроки проектирования"]; test = false }
        }
        if( page === 3 ){
            if(info?.Файлы?.ПравоСобств.length === 0) { jarr = [...jarr, "Прикрепите копию документа, подтверждающего право собственности или иное предусмотренное законом основание на объект капитального строительства и (или) земельный участок"]; test = false }
            if(info?.Файлы?.СитуацПлан.length === 0) { jarr = [...jarr, "Прикепите топографическую карту участка"]; test = false }
            if(info?.Файлы?.ПравоНаПом.length === 0) { jarr = [...jarr, "Прикрепите документы, подтверждающие право собственности заявителя в отношении помещений"]; test = false }
        }
        setMessages( jarr )
        return test
    }

    async function Save(){
        setLoad( true )
        const res = await getData("jur_apps", info )
        console.log(res)
        setLoad( false )

        getHistory()
    }

    function PageButtons():JSX.Element {
        return <>
            <div className="ml-1 mt-1 mr-1 flex fl-space">
                <div>
                    <IonButton
                        className={ page === 0 ? "hidden" : "" }
                        onClick={()=>{ 
                            setMessages([])
                            setPage( page - 1)}
                        }
                    >
                        Назад
                    </IonButton>
                </div>                
                <div>
                    <IonButton
                        className={ page === 3 ? "hidden" : "" }
                        onClick={()=>{ 
                            setMessages([])
                            console.log(page)
                            if( page < 2) {
                                if( test(page) )
                                    setPage( page + 1)
                            } else Save()
                        }}
                    >
                       { page === 2 ? "Отправить" : "Далее" } 
                    </IonButton>
                </div>                
            </div>
        
        </>
    }

    
    function Page1():JSX.Element {
        const [ edit, setEdit ] = useState( false )
        const [ jurAddress, setJurAddress] = useState<any>()
        
        const elem = <>
            <IonCard className='bg-1 pb-1 s-card'>

                <div className={ edit ? "ml-1 mr-1 mt-1 t-underline s-input" : "hidden"}>
                    <PartySuggestions  token="50bfb3453a528d091723900fdae5ca5a30369832"
                        filterLocations={[{kladr_id: "14000001"}]}
                        onChange={(e)=>{
                            info.ПолноеНаименование     = e?.data.name.full_with_opf
                            info.КраткоеНаименование    = e?.data.name.short_with_opf
                            info.ИНН = e?.data.inn
                                    
                            info.ЮридическийАдрес = e?.data.address.value

                            setJurAddress( e?.data.address )

                            setInfo( info )
                            setEdit(false)
                                    
                        }}
                    />
                </div>

                    {/* Организация  */}

                <div className='ml-1 mr-1 mt-1 t-underline flex fl-space pb-05'> 
                    <div>Организация</div>
                </div>
                <div  onClick={()=>{ setEdit(!edit) }}  className="s-point">
                    <div className='flex fl-space ml-2 mt-1 mr-1'>
                        <div> Полное Наименование </div>
                        <div className="a-right"> { info?.ПолноеНаименование }</div>
                    </div>
                    <div className='flex fl-space ml-2 mt-1 mr-1'>
                        <div> Краткое наименование  </div>
                        <div className="a-right"> { info?.КраткоеНаименование }</div>
                    </div>
                    <div className='flex fl-space ml-2 mt-1 mr-1'>
                        <div> ИНН </div>
                        <div> { info?.ИНН }</div>
                    </div>
                </div>

                    {/* Контактная информация */}

                <div className='ml-1 mr-1 mt-1 t-underline flex fl-space pb-05'> 
                    <div>Контактная информация</div>
                </div>
                <div className='ml-2 mt-1 mr-1'>
                    <div> Почтовый адрес</div>
                    <div className='s-input a-right mt-05 fs-07'>
                        <AddressSuggestions token="50bfb3453a528d091723900fdae5ca5a30369832" 
                            value={ info?.ПочтовыйАдрес  } 
                            filterLocations={[{region: "Саха /Якутия/"}]}
                            filterRestrictValue
                            onChange={(e)=>{
                                info.ПочтовыйАдрес = e?.value
                                setInfo( info )
                            }} 
                        />
                    </div>
                </div>
                <div className='ml-2 mt-1 mr-1'>
                    <div> Юридический адрес</div>
                    <div className='s-input a-right mt-05'>
                        <AddressSuggestions token="50bfb3453a528d091723900fdae5ca5a30369832" 
                            value={ jurAddress  } 
                            filterLocations={[{region: "Саха /Якутия/"}]}
                            filterRestrictValue
                            onChange={(e)=>{
                                info.ЮридическийАдрес = e?.value
                                setInfo( info )
                            }} 
                        />
                    </div>
                </div>
                <div className='flex fl-space ml-2 mt-1 mr-1'>
                    <div> Телефон </div>
                    <div className='lk-input a-right pr-1 s-input'>
                        <MaskedInput
                            className='m-input a-right'
                            mask={['+', /\d/, '(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                            value={ info.КонтактныйТелефон }
                               // placeholder="+7(000)000-00-00"
                            onInput={(e: any) => {
                                info.КонтактныйТелефон = (e.target.value as string).substring(0, 16)   
                                setInfo( info );
                            }}
                        />
                    </div>
                </div>
                <div className='flex fl-space ml-2 mt-1 mr-1'>
                    <div> Доп. телефон </div>
                    <div className='lk-input a-right pr-1 s-input'>
                        <MaskedInput
                            className='m-input a-right'
                            mask={['+', /\d/, '(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                            value={ info.ДопТелефон }
                               // placeholder="+7(000)000-00-00"
                            onInput={(e: any) => {
                                info.ДопТелефон = (e.target.value as string).substring(0, 16)   
                                setInfo( info );
                            }}
                        />
                    </div>
                </div>
                <div className='flex fl-space ml-2 mt-1 mr-1'>
                    <div> email </div>
                    <div className='lk-input a-right pr-1 s-input'>
                        <IonInput
                            class='lk-input-1'
                            value={ info?.элПочта }
                            placeholder="эл. почта"
                            onIonInput={(e: any) => {
                                info.элПочта = e.target.value    
                                setInfo( info );
                            }}
                        />
                        </div>
                </div>

                { 
                    messages.map((e, ind) =>{
                        return <p className="cl-red ml-2" key= { ind }>{ e } </p>
                    })
                }

                <PageButtons />

            </IonCard>
        
        </>

        return elem
    }

    function Page2():JSX.Element {
        const [ value, setValue ] = useState( "менее 7 м3/ч" )
        const [ upd, setUpd] = useState( 0 )

        const elem = <>
            <IonCard className='bg-1 pb-1 s-card'>
                <div className='ml-1 mr-1 mt-1 t-underline flex fl-space pb-05'> 
                    <div>Объект газификации</div>
                </div>
                <div >
                    <div className='flex fl-space ml-2 mt-1 mr-1'>
                        <div> Номер договора о подключении (тех. прис.) </div>
                        <div className="s-input pr-1">
                            <IonInput
                                class='s-input-1 a-right'
                                value={ info.ОбъектГазификации.НомерДоговора }
                                placeholder="Номер договора"
                                onIonInput={(e: any) => {
                                    info.ОбъектГазификации.НомерДоговора = e.target.value    
                                    setInfo( info );
                                }}
                            />
                        </div>
                    </div>
                    <div className='flex fl-space ml-2 mt-1 mr-1'>
                        <div> Дата договора о подключении (тех. прис.) </div>
                        <div className='s-input a-right pr-1'>
                        <MaskedInput
                            className='m-input a-right'
                            mask={[ /\d/, /\d/, /\d/, /\d/, '.', /\d/, /\d/,'.', /\d/, /\d/]}
                            value={ info.ОбъектГазификации.ДатаДоговора }
                            placeholder="____.__.__"
                            onInput={(e: any) => {
                                info.ОбъектГазификации.ДатаДоговора = e.target.value    
                                setInfo( info );
                            }}
                        />
                        </div>
                    </div>  
                </div>
       
                { 
                    messages.map((e, ind) =>{
                        return <p className="cl-red ml-2" key= { ind }>{ e } </p>
                    })
                }                
                
                <PageButtons />

            </IonCard>
        
        </>

        return elem
    }

    function Page3():JSX.Element {
        const [index, setIndex] = useState( 0 )

        const elem = <>
            <IonCard className='bg-1 pb-1 s-card'>
                <div className=" ml-1 mt-1">
                    <IonChip color="light" className={ index === 0 ? "a-chip" : "" }  onClick={()=> setIndex( 0 )}> 1 </IonChip>
                    <IonChip color="light" className={ index === 1 ? "a-chip" : "" }  onClick={()=> setIndex( 1 )}> 2 </IonChip>
                    <IonChip color="light" className={ index === 2 ? "a-chip" : "" }  onClick={()=> setIndex( 2 )}> 3 </IonChip>
                    <IonChip color="light" className={ index === 3 ? "a-chip" : "" }  onClick={()=> setIndex( 3 )}> 4 </IonChip>
                    <IonChip color="light" className={ index === 4 ? "a-chip" : "" }  onClick={()=> setIndex( 4 )}> 5 </IonChip>
                    <IonChip color="light" className={ index === 5 ? "a-chip" : "" }  onClick={()=> setIndex( 5 )}> 6 </IonChip>
                    <IonChip color="light" className={ index === 6 ? "a-chip" : "" }  onClick={()=> setIndex( 6 )}> 7 </IonChip>
                </div>
                {
                    index === 0
                        ? <Files info = { info.Файлы.СвидГРЮЛ }     name = { "СвидГРЮЛ" }    check = {false} title = "Свидетельство о Государственной регистрации Юридического Лица"/>
                    : index === 1
                        ? <Files info = { info.Файлы.ПравоСобсв }   name = { "ПравоСобсв" }  check = {false} title = "Копия документа, подтверждающего право собственности или иное предусмотренное законом основание на объект капитального строительства"/>
                    : index === 2
                        ? <Files info = { info.Файлы.ТУ }           name = { "ТУ" }          check = {false} title = "Технические условия на подключение (технологическое присоединение) объектов капитального строительства к сетям газораспределения (при наличии)"/>
                    : index === 3
                        ? <Files info = { info.Файлы.АктОПодкл }    name = { "АктОПодкл" }   check = {false} title = "Акт о подключении (технологическом присоединении) (при наличии)"/>
                    : index === 4
                        ? <Files info = { info.Файлы.Договор }      name = { "Договор" }     check = {false} title = "Копия договора поставки газа (при наличии)"/>
                    : index === 5
                        ? <Files info = { info.Файлы.ИнДокум }      name = { "ИнДокум" }     check = {false} title = "Копии иных документов, подтверждающих факт подключения объекта капитального строительства к сетям газораспределения (в том числе оформленных на предыдущего собственника объекта капитального строительства) в случае отсутствия акта о подключении"/>
                    : index === 6
                        ? <Files info = { info.Файлы.РазделПД }     name = { "РазделПД" }    check = {false} title = "Копии разделов проектной документации, предусматривающих технические решения, обеспечивающие выполнение технических условий ( при наличии)"/>
                    : <></>
                }

                { 
                    messages.map((e, ind) =>{
                        return <p className="cl-red ml-2" key= { ind }>{ e } </p>
                    })
                }                
                
                <PageButtons />
                
            </IonCard>
        </>

        return elem
    }

   
    const elem = <>
    <IonLoading isOpen = { load } message={ "Подождите..." }/>
    {
        page === 0 
            ? <Page1 />
        : page === 1
             ? <Page2 />
        : page === 2
             ? <Page3 />
        : <></>
    }
    </>

    return elem;
}

export function Service3():JSX.Element {
    const [ info, setInfo] = useState( Store.getState().service2 );
    const [ load, setLoad] = useState( false)
    const [ page, setPage] = useState( 0 )
    const [ messages,   setMessages ]   = useState<any>([])
    const [ upd,        setUpd]         = useState( 0 )

    useEffect(()=>{
        const pr = Store.getState().profile
        const info = Store.getState().service3;

        info.token = Store.getState().login.token;
        if( info.ПолноеНаименование === "") info.ПолноеНаименование = pr?.Наименование === undefined ? "" : pr?.Наименование
        if( info.КраткоеНаименование === "") info.КраткоеНаименование = pr?.Наименование === undefined ? "" : pr?.Наименование

        if( info.ИНН === "") info.ИНН = pr?.ИНН === undefined ? "" : pr?.ИНН
        if( info.КонтактныйТелефон === "") info.КонтактныйТелефон = pr?.КонтактныеЛица?.МобильныйТелефон === "" 
            ? pr?.КонтактныеЛица?.РабочийТелефон
            : pr?.КонтактныеЛица?.МобильныйТелефон
           
        setInfo( info );

        setUpd(upd + 1)
    
    },[])

    function test( page ){
        let test = true
        let jarr:any = []
        if( page === 0 ){
            if(info.ИНН === "") { jarr = [...jarr, "Заполните ИНН"]; test = false }
            if(info.КонтактныйТелефон === "") { jarr = [...jarr, "Заполните контактный телефон"]; test = false } 
            if(info.элПочта === "") { jarr = [...jarr, "Заполните эл. почту"]; test = false }
        }
        if( page === 1 ){
            if(info?.ОбъектГазификации?.Адрес === "") { jarr = [...jarr, "Заполните адрес объекта"]; test = false }
            if(info?.ОбъектГазификации?.ВариантПодключения === "") { jarr = [...jarr, "Выберите вариант подключения газа "]; test = false } 
            if(info?.ОбъектГазификации?.ХарактерПотребленияГаза === "") { jarr = [...jarr, "Выберите характер потребления газа"]; test = false }
            if(info?.ОбъектГазификации?.НомериДатаИТУ === "") { jarr = [...jarr, "Заполните номер и дату выдачи полученных ранее ТУ"]; test = false }
            if(info?.ОбъектГазификации?.СрокиССиВОбъекта  === "") { jarr = [...jarr, "Заполните сроки проектирования"]; test = false }
        }
        if( page === 2 ){
            if(info?.Файлы?.ПравоСобсв.length === 0) { jarr = [...jarr, "Прикрепите документы, подтверждающие право собственности заявителя в отношении помещений"]; test = false }
        }
        setMessages( jarr )
        return test
    }

    async function Save(){
        setLoad( true )
        const res = await getData("jur_apps", info )
        console.log(res)
        setLoad( false )

        getHistory()
    }

    function PageButtons():JSX.Element {
        return <>
            <div className="ml-1 mt-1 mr-1 flex fl-space">
                <div>
                    <IonButton
                        className={ page === 0 ? "hidden" : "" }
                        onClick={()=>{ 
                            setMessages([])
                            setPage( page - 1)}
                        }
                    >
                        Назад
                    </IonButton>
                </div>                
                <div>
                    <IonButton
                        className={ page === 3 ? "hidden" : "" }
                        onClick={()=>{ 
                            setMessages([])
                            console.log(page)
                            if( page < 2) {
                                if( test(page) )
                                    setPage( page + 1)
                            } else Save()
                        }}
                    >
                       { page === 2 ? "Отправить" : "Далее" } 
                    </IonButton>
                </div>                
            </div>
        
        </>
    }

    
    function Page1():JSX.Element {
        const [ edit, setEdit ] = useState( false )
        const [ jurAddress, setJurAddress] = useState<any>()
        
        const elem = <>
            <IonCard className='bg-1 pb-1 s-card'>

                <div className={ edit ? "ml-1 mr-1 mt-1 t-underline s-input" : "hidden"}>
                    <PartySuggestions  token="50bfb3453a528d091723900fdae5ca5a30369832"
                        filterLocations={[{kladr_id: "14000001"}]}
                        onChange={(e)=>{
                            info.ПолноеНаименование     = e?.data.name.full_with_opf
                            info.КраткоеНаименование    = e?.data.name.short_with_opf
                            info.ИНН = e?.data.inn
                                    
                            info.ЮридическийАдрес = e?.data.address.value

                            setJurAddress( e?.data.address )

                            setInfo( info )
                            setEdit(false)
                                    
                        }}
                    />
                </div>

                    {/* Организация  */}

                <div className='ml-1 mr-1 mt-1 t-underline flex fl-space pb-05'> 
                    <div>Организация</div>
                </div>
                <div  onClick={()=>{ setEdit(!edit) }}  className="s-point">
                    <div className='flex fl-space ml-2 mt-1 mr-1'>
                        <div> Полное Наименование </div>
                        <div className="a-right"> { info?.ПолноеНаименование }</div>
                    </div>
                    <div className='flex fl-space ml-2 mt-1 mr-1'>
                        <div> Краткое наименование  </div>
                        <div className="a-right"> { info?.КраткоеНаименование }</div>
                    </div>
                    <div className='flex fl-space ml-2 mt-1 mr-1'>
                        <div> ИНН </div>
                        <div> { info?.ИНН }</div>
                    </div>
                </div>

                    {/* Контактная информация */}

                <div className='ml-1 mr-1 mt-1 t-underline flex fl-space pb-05'> 
                    <div>Контактная информация</div>
                </div>
                <div className='ml-2 mt-1 mr-1'>
                    <div> Почтовый адрес</div>
                    <div className='s-input a-right mt-05 fs-07'>
                        <AddressSuggestions token="50bfb3453a528d091723900fdae5ca5a30369832" 
                            value={ info?.ПочтовыйАдрес  } 
                            filterLocations={[{region: "Саха /Якутия/"}]}
                            filterRestrictValue
                            onChange={(e)=>{
                                info.ПочтовыйАдрес = e?.value
                                setInfo( info )
                            }} 
                        />
                    </div>
                </div>
                <div className='ml-2 mt-1 mr-1'>
                    <div> Юридический адрес</div>
                    <div className='s-input a-right mt-05'>
                        <AddressSuggestions token="50bfb3453a528d091723900fdae5ca5a30369832" 
                            value={ jurAddress  } 
                            filterLocations={[{region: "Саха /Якутия/"}]}
                            filterRestrictValue
                            onChange={(e)=>{
                                info.ЮридическийАдрес = e?.value
                                setInfo( info )
                            }} 
                        />
                    </div>
                </div>
                <div className='flex fl-space ml-2 mt-1 mr-1'>
                    <div> Телефон </div>
                    <div className='lk-input a-right pr-1 s-input'>
                        <MaskedInput
                            className='m-input a-right'
                            mask={['+', /\d/, '(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                            value={ info.КонтактныйТелефон }
                               // placeholder="+7(000)000-00-00"
                            onInput={(e: any) => {
                                info.КонтактныйТелефон = (e.target.value as string).substring(0, 16)   
                                setInfo( info );
                            }}
                        />
                    </div>
                </div>
                <div className='flex fl-space ml-2 mt-1 mr-1'>
                    <div> Доп. телефон </div>
                    <div className='lk-input a-right pr-1 s-input'>
                        <MaskedInput
                            className='m-input a-right'
                            mask={['+', /\d/, '(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                            value={ info.ДопТелефон }
                               // placeholder="+7(000)000-00-00"
                            onInput={(e: any) => {
                                info.ДопТелефон = (e.target.value as string).substring(0, 16)   
                                setInfo( info );
                            }}
                        />
                    </div>
                </div>
                <div className='flex fl-space ml-2 mt-1 mr-1'>
                    <div> email </div>
                    <div className='lk-input a-right pr-1 s-input'>
                        <IonInput
                            class='lk-input-1'
                            value={ info?.элПочта }
                            placeholder="эл. почта"
                            onIonInput={(e: any) => {
                                info.элПочта = e.target.value    
                                setInfo( info );
                            }}
                        />
                        </div>
                </div>

                { 
                    messages.map((e, ind) =>{
                        return <p className="cl-red ml-2" key= { ind }>{ e } </p>
                    })
                }

                <PageButtons />

            </IonCard>
        
        </>

        return elem
    }

    function Page2():JSX.Element {
        const [ value, setValue ] = useState( "менее 7 м3/ч" )
        const [ upd, setUpd] = useState( 0 )

        const elem = <>
            <IonCard className='bg-1 pb-1 s-card'>
                <div className='ml-1 mr-1 mt-1 t-underline flex fl-space pb-05'> 
                    <div>Объект газификации</div>
                </div>
                <div >
                    <div className='flex fl-space ml-2 mt-1 mr-1'>
                        <div> Номер договора о подключении (тех. прис.) </div>
                        <div className="s-input pr-1">
                            <IonInput
                                class='s-input-1 a-right'
                                value={ info.ОбъектГазификации.НомерДоговора }
                                placeholder="Номер договора"
                                onIonInput={(e: any) => {
                                    info.ОбъектГазификации.НомерДоговора = e.target.value    
                                    setInfo( info );
                                }}
                            />
                        </div>
                    </div>
                    <div className='flex fl-space ml-2 mt-1 mr-1'>
                        <div> Дата договора о подключении (тех. прис.) </div>
                        <div className='s-input a-right pr-1'>
                        <MaskedInput
                            className='m-input a-right'
                            mask={[ /\d/, /\d/, /\d/, /\d/, '.', /\d/, /\d/,'.', /\d/, /\d/]}
                            value={ info.ОбъектГазификации.ДатаДоговора }
                            placeholder="____.__.__"
                            onInput={(e: any) => {
                                info.ОбъектГазификации.ДатаДоговора = e.target.value    
                                setInfo( info );
                            }}
                        />
                        </div>
                    </div>  
                </div>
       
                { 
                    messages.map((e, ind) =>{
                        return <p className="cl-red ml-2" key= { ind }>{ e } </p>
                    })
                }                
                
                <PageButtons />

            </IonCard>
        
        </>

        return elem
    }

    function Page3():JSX.Element {
        const [index, setIndex] = useState( 0 )

        const elem = <>
            <IonCard className='bg-1 pb-1 s-card'>
                <div className=" ml-1 mt-1">
                    <IonChip color="light" className={ index === 0 ? "a-chip" : "" }  onClick={()=> setIndex( 0 )}> 1 </IonChip>
                    <IonChip color="light" className={ index === 1 ? "a-chip" : "" }  onClick={()=> setIndex( 1 )}> 2 </IonChip>
                </div>
                {
                    index === 0
                        ? <Files info = { info.Файлы.СвидГРЮЛ } name = { "СвидГРЮЛ" }    check = {false} title = "Свидетельство о Государственной регистрации Юридического Лица"/>
                    : index === 1
                        ? <Files info =  { info.Файлы.СвидГРЮЛ } name = { "ПравоСобсв" }  check = {true} title = "Копия документа, подтверждающего право собственности или иное предусмотренное законом основание на объект капитального строительства"/>
                    : <></>
                }

                { 
                    messages.map((e, ind) =>{
                        return <p className="cl-red ml-2" key= { ind }>{ e } </p>
                    })
                }                
                
                <PageButtons />
                
            </IonCard>
        </>

        return elem
    }

    const elem = <>
    <IonLoading isOpen = { load } message={ "Подождите..." }/>
    {
        page === 0 
            ? <Page1 />
        : page === 1
             ? <Page2 />
        : page === 2
             ? <Page3 />
        : <></>
    }
    </>

    return elem;
}

export function Service4_1():JSX.Element {
    const [ info,       setInfo] = useState( Store.getState().service4_1 );
    const [ load,       setLoad] = useState( false)
    const [ page,       setPage] = useState( 0 )
    const [ messages,   setMessages ]   = useState<any>([])
    const [ upd,        setUpd]         = useState( 0 )

    async function loading(){
        const pr = Store.getState().profile
        const info = Store.getState().service4_1;

        info.token = Store.getState().login.token;
        if( info.ПолноеНаименование === "") info.ПолноеНаименование = pr?.Наименование === undefined ? "" : pr?.Наименование
        if( info.КраткоеНаименование === "") info.КраткоеНаименование = pr?.Наименование === undefined ? "" : pr?.Наименование

        if( info.ИНН === "") info.ИНН = pr?.ИНН === undefined ? "" : pr?.ИНН
        if( info.КонтактныйТелефон === "") info.КонтактныйТелефон = pr?.КонтактныеЛица?.МобильныйТелефон === "" 
            ? pr?.КонтактныеЛица?.РабочийТелефон
            : pr?.КонтактныеЛица?.МобильныйТелефон

        const res = await getData("jur_details", {
            Service: 0
        }) 

        if(!res.error){
            res.data.forEach(elem => {
                info.Файлы[ elem.name ] = [{ dataUrl: elem.file, format: "pdf", sample: true} ] 
            });
            
        }
        setInfo( info )

        setUpd( upd + 1)        
    }

    useEffect(()=>{
        loading()
    
    },[])

    function test( page ){
        let test = true
        let jarr:any = []
        if( page === 0 ){
            if(info.ИНН === "") { jarr = [...jarr, "Заполните ИНН"]; test = false }
            if(info.КонтактныйТелефон === "") { jarr = [...jarr, "Заполните контактный телефон"]; test = false } 
            if(info.элПочта === "") { jarr = [...jarr, "Заполните эл. почту"]; test = false }
        }
        if( page === 1 ){
            if(info?.ОбъектГазификации?.Адрес === "") { jarr = [...jarr, "Заполните адрес объекта"]; test = false }
            if(info?.ОбъектГазификации?.Объект === "") { jarr = [...jarr, "Заполните объект газификации "]; test = false } 
        }
        if( page === 2 ){
           // if(info?.Файлы?.ПравоСобсв.length === 0) { jarr = [...jarr, "Прикрепите документы, подтверждающие право собственности заявителя в отношении помещений"]; test = false }
        }
        setMessages( jarr )
        return test
    }

    async function Save(){
        setLoad( true )
        info.Файлы.Заявление.shift();
        info.Файлы.Приказ.shift();
        const res = await getData("jur_apps", info )
        console.log(res)
        setLoad( false )

        getHistory()
    }

    function PageButtons():JSX.Element {
        return <>
            <div className="ml-1 mt-1 mr-1 flex fl-space">
                <div>
                    <IonButton
                        className={ page === 0 ? "hidden" : "" }
                        onClick={()=>{ 
                            setMessages([])
                            setPage( page - 1)}
                        }
                    >
                        Назад
                    </IonButton>
                </div>                
                <div>
                    <IonButton
                        className={ page === 3 ? "hidden" : "" }
                        onClick={()=>{ 
                            setMessages([])
                            console.log(page)
                            if( page < 2) {
                                if( test(page) )
                                    setPage( page + 1)
                            } else Save()
                        }}
                    >
                       { page === 2 ? "Отправить" : "Далее" } 
                    </IonButton>
                </div>                
            </div>
        
        </>
    }

    function Page1():JSX.Element {
        const [ edit, setEdit ] = useState( false )
        const [ jurAddress, setJurAddress] = useState<any>()
        
        const elem = <>
            <IonCard className='bg-1 pb-1 s-card'>

                <div className={ edit ? "ml-1 mr-1 mt-1 t-underline s-input" : "hidden"}>
                    <PartySuggestions  token="50bfb3453a528d091723900fdae5ca5a30369832"
                        filterLocations={[{kladr_id: "14000001"}]}
                        onChange={(e)=>{
                            info.ПолноеНаименование     = e?.data.name.full_with_opf
                            info.КраткоеНаименование    = e?.data.name.short_with_opf
                            info.ИНН = e?.data.inn
                                    
                            info.ЮридическийАдрес = e?.data.address.value

                            setJurAddress( e?.data.address )

                            setInfo( info )
                            setEdit(false)
                                    
                        }}
                    />
                </div>

                    {/* Организация  */}

                <div className='ml-1 mr-1 mt-1 t-underline flex fl-space pb-05'> 
                    <div>Организация</div>
                </div>
                <div  onClick={()=>{ setEdit(!edit) }}  className="s-point">
                    <div className='flex fl-space ml-2 mt-1 mr-1'>
                        <div> Полное Наименование </div>
                        <div className="a-right"> { info?.ПолноеНаименование }</div>
                    </div>
                    <div className='flex fl-space ml-2 mt-1 mr-1'>
                        <div> Краткое наименование  </div>
                        <div className="a-right"> { info?.КраткоеНаименование }</div>
                    </div>
                    <div className='flex fl-space ml-2 mt-1 mr-1'>
                        <div> ИНН </div>
                        <div> { info?.ИНН }</div>
                    </div>
                </div>

                    {/* Контактная информация */}

                <div className='ml-1 mr-1 mt-1 t-underline flex fl-space pb-05'> 
                    <div>Контактная информация</div>
                </div>
                <div className='ml-2 mt-1 mr-1'>
                    <div> Почтовый адрес</div>
                    <div className='s-input a-right mt-05 fs-07'>
                        <AddressSuggestions token="50bfb3453a528d091723900fdae5ca5a30369832" 
                            value={ info?.ПочтовыйАдрес  } 
                            filterLocations={[{region: "Саха /Якутия/"}]}
                            filterRestrictValue
                            onChange={(e)=>{
                                info.ПочтовыйАдрес = e
                                setInfo( info )
                            }} 
                        />
                    </div>
                </div>
                <div className='ml-2 mt-1 mr-1'>
                    <div> Юридический адрес</div>
                    <div className='s-input a-right mt-05'>
                        <AddressSuggestions token="50bfb3453a528d091723900fdae5ca5a30369832" 
                            value={ info?.ЮридическийАдрес  } 
                            filterLocations={[{region: "Саха /Якутия/"}]}
                            filterRestrictValue
                            onChange={(e)=>{
                                info.ЮридическийАдрес = e
                                setInfo( info )
                            }} 
                        />
                    </div>
                </div>
                <div className='flex fl-space ml-2 mt-1 mr-1'>
                    <div> Телефон </div>
                    <div className='lk-input a-right pr-1 s-input'>
                        <MaskedInput
                            className='m-input a-right'
                            mask={['+', /\d/, '(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                            value={ info.КонтактныйТелефон }
                               // placeholder="+7(000)000-00-00"
                            onInput={(e: any) => {
                                info.КонтактныйТелефон = (e.target.value as string).substring(0, 16)   
                                setInfo( info );
                            }}
                        />
                    </div>
                </div>
                <div className='flex fl-space ml-2 mt-1 mr-1'>
                    <div> Доп. телефон </div>
                    <div className='lk-input a-right pr-1 s-input'>
                        <MaskedInput
                            className='m-input a-right'
                            mask={['+', /\d/, '(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                            value={ info.ДопТелефон }
                               // placeholder="+7(000)000-00-00"
                            onInput={(e: any) => {
                                info.ДопТелефон = (e.target.value as string).substring(0, 16)   
                                setInfo( info );
                            }}
                        />
                    </div>
                </div>
                <div className='flex fl-space ml-2 mt-1 mr-1'>
                    <div> email </div>
                    <div className='lk-input a-right pr-1 s-input'>
                        <IonInput
                            class='lk-input-1'
                            value={ info?.элПочта }
                            placeholder="эл. почта"
                            onIonInput={(e: any) => {
                                info.элПочта = e.target.value    
                                setInfo( info );
                            }}
                        />
                        </div>
                </div>

                { 
                    messages.map((e, ind) =>{
                        return <p className="cl-red ml-2" key= { ind }>{ e } </p>
                    })
                }

                <PageButtons />

            </IonCard>
        
        </>

        return elem
    }

    function Page2():JSX.Element {
        const [ value, setValue ] = useState( "менее 7 м3/ч" )
        const [ upd, setUpd] = useState( 0 )

        const elem = <>
            <IonCard className='bg-1 pb-1 s-card'>
                <div className='ml-1 mr-1 mt-1 t-underline flex fl-space pb-05'> 
                    <div>Объект газификации</div>
                </div>
                <div className="pb-4">
                    <div className='flex fl-space ml-2 mt-1 mr-1'>
                        <div> Объект </div>
                        <div className="s-select w-40">
                            <IonSelect placeholder="Выберите объект"  className='s-select w-100'
                                value={ info?.ОбъектГазификации?.Объект }
                                interface="popover"
                                onIonChange={(e)=>{
                                    info.ОбъектГазификации.Объект = e.detail.value
                                    setInfo(info);
                                }}
                            >
                                <IonSelectOption class="w-90" value="Жилой дом"> Гараж</IonSelectOption>
                                <IonSelectOption class="w-90" value="Гараж"> Склад</IonSelectOption>
                                <IonSelectOption class="w-90" value="Баня"> Магазин</IonSelectOption>
                                <IonSelectOption class="w-90" value="Другое"> Другое</IonSelectOption>
                            </IonSelect>
                        </div>
                    </div>
                    <div className='ml-2 mt-1 mr-1'>
                        <div> Адрес </div>
                        <div className='s-input a-right mt-05 fs-07'>
                            <AddressSuggestions token="50bfb3453a528d091723900fdae5ca5a30369832" 
                                value={ info?.ОбъектГазификации.Адрес  } 
                                filterLocations={[{region: "Саха /Якутия/"}]}
                                filterRestrictValue
                                onChange={(e)=>{
                                    info.ОбъектГазификации.Адрес = e
                                    setInfo( info )
                                }} 
                            />
                        </div>
                    </div>  
                </div>
                                
                <div className="pb-4"></div>                
                { 
                    messages.map((e, ind) =>{
                        return <p className="cl-red ml-2" key= { ind }>{ e } </p>
                    })
                }    
                            
                
                <PageButtons />

            </IonCard>
        
        </>

        return elem
    }

    function Page3():JSX.Element {
        const [index, setIndex] = useState( 0 )

        const elem = <>
            <IonCard className='bg-1 pb-1 s-card'>
                <div className=" ml-1 mt-1">
                    <IonChip color="light" className={ index === 0 ? "a-chip" : "" }  onClick={()=> setIndex( 0 )}> 1 </IonChip>
                    <IonChip color="light" className={ index === 1 ? "a-chip" : "" }  onClick={()=> setIndex( 1 )}> 2 </IonChip>
                    <IonChip color="light" className={ index === 2 ? "a-chip" : "" }  onClick={()=> setIndex( 2 )}> 3 </IonChip>
                    <IonChip color="light" className={ index === 3 ? "a-chip" : "" }  onClick={()=> setIndex( 3 )}> 4 </IonChip>
                    <IonChip color="light" className={ index === 4 ? "a-chip" : "" }  onClick={()=> setIndex( 4 )}> 5 </IonChip>
                    <IonChip color="light" className={ index === 5 ? "a-chip" : "" }  onClick={()=> setIndex( 5 )}> 6 </IonChip>
                    <IonChip color="light" className={ index === 6 ? "a-chip" : "" }  onClick={()=> setIndex( 6 )}> 7 </IonChip>
                    <IonChip color="light" className={ index === 7 ? "a-chip" : "" }  onClick={()=> setIndex( 7 )}> 8 </IonChip>
                    <IonChip color="light" className={ index === 8 ? "a-chip" : "" }  onClick={()=> setIndex( 8 )}> 9 </IonChip>
                    <IonChip color="light" className={ index === 9 ? "a-chip" : "" }  onClick={()=> setIndex( 9 )}> 10 </IonChip>
                    <IonChip color="light" className={ index === 10 ? "a-chip" : "" }  onClick={()=> setIndex( 10 )}> 11 </IonChip>
                </div>
                {
                    index === 0
                        ? <Files info = { info.Файлы.Заявление }    name = { "Заявление" }   check = {true} title = "Заявление на заключение договора на фирменном бланке предприятия предполагаемый период и количество точек подключения запрашиваемый к поставке объем газа на весь предполагаемый период действия договора (или годовой объем газа) с разбивкой по месяцам"/>
                    : index === 1
                        ? <Files info = { info.Файлы.СвидГРЮЛ }     name = { "СвидГРЮЛ" }    check = {true} title = "Свидетельство о государственной регистрации юридического лица"/>
                    : index === 2
                        ? <Files info = { info.Файлы.ПолнЛиц }      name = { "ПолнЛиц" }     check = {true} title = "Документ, подтверждающий полномочия лиц на подписание договора от имени потребителя"/>
                    : index === 3
                        ? <Files info = { info.Файлы.Карточка }     name = { "Карточка" }    check = {true} title = "Карточка предприятия (юр. адрес, конт.тел. эл. почта, р/с, ОКВЭД)"/>
                    : index === 4
                        ? <Files info = { info.Файлы.Выписка }      name = { "Выписка" }     check = {true} title = "Выписка ЕГРЮЛ"/>
                    : index === 5
                        ? <Files info = { info.Файлы.ТехПаспорта }  name = { "ТехПаспорта" } check = {true} title = "Документы, подтверждающие принадлежность газоиспользующего оборудования (объектов газоснабжения) заявителю на праве собственности или на ином законном основании, и технические паспорта на указанное оборудование"/>
                    : index === 6
                        ? <Files info = { info.Файлы.Приказ }       name = { "Приказ" }      check = {true} title = "Приказ о назначении лица, ответственного за безопасную эксплуатацию газового хозяйства, копии удостоверений"/>
                    : index === 7
                        ? <Files info = { info.Файлы.АктОПодкл }    name = { "АктОПодкл" }   check = {true} title = "Копия акта о подключении (технологическом присоединении), содержащего информацию о разграничении имущественной принадлежности и эксплуатационной ответственности сторон, или акта об осуществлении технологического присоединения строящегося и реконструируемого газопровода, предназначенного для транспортировки газа от магистрального газопровода до объекта капитального строительства, или газопровода, предназначенного для транспортировки газа от месторождений природного газа до магистрального газопровода, либо акта о готовности сетей газопотребления и газоиспользующего оборудования объекта капитального строительства к подключению (технологическому присоединению) (в случае если заявка направляется до завершения мероприятий по подключению)"/>
                    : index === 8
                        ? <Files info = { info.Файлы.УстБрони }     name = { "УстБрони" }    check = {false} title = "Копия документа, подтверждающего установление брони газопотребления"/>
                    : index === 9
                        ? <Files info = { info.Файлы.ДогНаТО }      name = { "ДогНаТО" }     check = {true} title = "Копия договора на техническое обслуживание газового оборудования"/>
                    : index === 10
                        ? <Files info = { info.Файлы.АктРазд }      name = { "АктРазд" }     check = {true} title = "Копия акта раздела границ обслуживания к договору на техническое обслуживание"/>
                    : <></>
            
                }

                { 
                    messages.map((e, ind) =>{

                        return <p className="cl-red ml-2" key= { ind }>{ e } </p>

                    })
                }                
                
                <PageButtons />
                
            </IonCard>
        </>

        return elem
    }

    const elem = <>
    <IonLoading isOpen = { load } message={ "Подождите..." }/>
    {
        page === 0 
            ? <Page1 />
        : page === 1
             ? <Page2 />
        : page === 2
             ? <Page3 />
        : <></>
    }
    </>

    return elem;
}

export function Service4_2():JSX.Element {
    const [ info,       setInfo] = useState( Store.getState().service4_2 );
    const [ load,       setLoad] = useState( false)
    const [ page,       setPage] = useState( 0 )
    const [ messages,   setMessages ]   = useState<any>([])
    const [ upd,        setUpd]         = useState( 0 )

    async function loading(){
        const pr = Store.getState().profile
        const info = Store.getState().service4_2;

        info.token = Store.getState().login.token;
        if( info.ПолноеНаименование === "") info.ПолноеНаименование = pr?.Наименование === undefined ? "" : pr?.Наименование
        if( info.КраткоеНаименование === "") info.КраткоеНаименование = pr?.Наименование === undefined ? "" : pr?.Наименование

        if( info.ИНН === "") info.ИНН = pr?.ИНН === undefined ? "" : pr?.ИНН
        if( info.КонтактныйТелефон === "") info.КонтактныйТелефон = pr?.КонтактныеЛица?.МобильныйТелефон === "" 
            ? pr?.КонтактныеЛица?.РабочийТелефон
            : pr?.КонтактныеЛица?.МобильныйТелефон

        const res = await getData("jur_details", {
            Service: 1
        }) 

        if(!res.error){
            res.data.forEach(elem => {
                info.Файлы[ elem.name ] = [{ dataUrl: elem.file, format: "pdf", sample: true} ] 
            });
            
        }
        setInfo( info )

        setUpd( upd + 1)        
    }

    useEffect(()=>{
        loading()
    
    },[])

    function test( page ){
        let test = true
        let jarr:any = []
        if( page === 0 ){
            if(info.ИНН === "") { jarr = [...jarr, "Заполните ИНН"]; test = false }
            if(info.КонтактныйТелефон === "") { jarr = [...jarr, "Заполните контактный телефон"]; test = false } 
            if(info.элПочта === "") { jarr = [...jarr, "Заполните эл. почту"]; test = false }
        }
        if( page === 1 ){
            if(info?.ОбъектГазификации?.Адрес === "") { jarr = [...jarr, "Заполните адрес объекта"]; test = false }
            if(info?.ОбъектГазификации?.Объект === "") { jarr = [...jarr, "Заполните объект газификации "]; test = false } 
        }
        if( page === 2 ){
           // if(info?.Файлы?.ПравоСобсв.length === 0) { jarr = [...jarr, "Прикрепите документы, подтверждающие право собственности заявителя в отношении помещений"]; test = false }
        }
        setMessages( jarr )
        return test
    }

    async function Save(){
        setLoad( true )
        info.Файлы.Заявление.shift();
        info.Файлы.Приказ.shift();
        const res = await getData("jur_apps", info )
        console.log(res)
        setLoad( false )

        getHistory()
    }

    function PageButtons():JSX.Element {
        return <>
            <div className="ml-1 mt-1 mr-1 flex fl-space">
                <div>
                    <IonButton
                        className={ page === 0 ? "hidden" : "" }
                        onClick={()=>{ 
                            setMessages([])
                            setPage( page - 1)}
                        }
                    >
                        Назад
                    </IonButton>
                </div>                
                <div>
                    <IonButton
                        className={ page === 3 ? "hidden" : "" }
                        onClick={()=>{ 
                            setMessages([])
                            console.log(page)
                            if( page < 2) {
                                if( test(page) )
                                    setPage( page + 1)
                            } else Save()
                        }}
                    >
                       { page === 2 ? "Отправить" : "Далее" } 
                    </IonButton>
                </div>                
            </div>
        
        </>
    }

    
    function Page1():JSX.Element {
        const [ edit, setEdit ] = useState( false )
        const [ jurAddress, setJurAddress] = useState<any>()
        
        const elem = <>
            <IonCard className='bg-1 pb-1 s-card'>

                <div className={ edit ? "ml-1 mr-1 mt-1 t-underline s-input" : "hidden"}>
                    <PartySuggestions  token="50bfb3453a528d091723900fdae5ca5a30369832"
                        filterLocations={[{kladr_id: "14000001"}]}
                        onChange={(e)=>{
                            info.ПолноеНаименование     = e?.data.name.full_with_opf
                            info.КраткоеНаименование    = e?.data.name.short_with_opf
                            info.ИНН = e?.data.inn
                                    
                            info.ЮридическийАдрес = e?.data.address.value

                            setJurAddress( e?.data.address )

                            setInfo( info )
                            setEdit(false)
                                    
                        }}
                    />
                </div>

                    {/* Организация  */}

                <div className='ml-1 mr-1 mt-1 t-underline flex fl-space pb-05'> 
                    <div>Организация</div>
                </div>
                <div  onClick={()=>{ setEdit(!edit) }}  className="s-point">
                    <div className='flex fl-space ml-2 mt-1 mr-1'>
                        <div> Полное Наименование </div>
                        <div className="a-right"> { info?.ПолноеНаименование }</div>
                    </div>
                    <div className='flex fl-space ml-2 mt-1 mr-1'>
                        <div> Краткое наименование  </div>
                        <div className="a-right"> { info?.КраткоеНаименование }</div>
                    </div>
                    <div className='flex fl-space ml-2 mt-1 mr-1'>
                        <div> ИНН </div>
                        <div> { info?.ИНН }</div>
                    </div>
                </div>

                    {/* Контактная информация */}

                <div className='ml-1 mr-1 mt-1 t-underline flex fl-space pb-05'> 
                    <div>Контактная информация</div>
                </div>
                <div className='ml-2 mt-1 mr-1'>
                    <div> Почтовый адрес</div>
                    <div className='s-input a-right mt-05 fs-07'>
                        <AddressSuggestions token="50bfb3453a528d091723900fdae5ca5a30369832" 
                            value={ info?.ПочтовыйАдрес  } 
                            filterLocations={[{region: "Саха /Якутия/"}]}
                            filterRestrictValue
                            onChange={(e)=>{
                                info.ПочтовыйАдрес = e
                                setInfo( info )
                            }} 
                        />
                    </div>
                </div>
                <div className='ml-2 mt-1 mr-1'>
                    <div> Юридический адрес</div>
                    <div className='s-input a-right mt-05'>
                        <AddressSuggestions token="50bfb3453a528d091723900fdae5ca5a30369832" 
                            value={ jurAddress  } 
                            filterLocations={[{region: "Саха /Якутия/"}]}
                            filterRestrictValue
                            onChange={(e)=>{
                                info.ЮридическийАдрес = e
                                setInfo( info )
                            }} 
                        />
                    </div>
                </div>
                <div className='flex fl-space ml-2 mt-1 mr-1'>
                    <div> Телефон </div>
                    <div className='lk-input a-right pr-1 s-input'>
                        <MaskedInput
                            className='m-input a-right'
                            mask={['+', /\d/, '(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                            value={ info.КонтактныйТелефон }
                               // placeholder="+7(000)000-00-00"
                            onInput={(e: any) => {
                                info.КонтактныйТелефон = (e.target.value as string).substring(0, 16)   
                                setInfo( info );
                            }}
                        />
                    </div>
                </div>
                <div className='flex fl-space ml-2 mt-1 mr-1'>
                    <div> Доп. телефон </div>
                    <div className='lk-input a-right pr-1 s-input'>
                        <MaskedInput
                            className='m-input a-right'
                            mask={['+', /\d/, '(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                            value={ info.ДопТелефон }
                               // placeholder="+7(000)000-00-00"
                            onInput={(e: any) => {
                                info.ДопТелефон = (e.target.value as string).substring(0, 16)   
                                setInfo( info );
                            }}
                        />
                    </div>
                </div>
                <div className='flex fl-space ml-2 mt-1 mr-1'>
                    <div> email </div>
                    <div className='lk-input a-right pr-1 s-input'>
                        <IonInput
                            class='lk-input-1'
                            value={ info?.элПочта }
                            placeholder="эл. почта"
                            onIonInput={(e: any) => {
                                info.элПочта = e.target.value    
                                setInfo( info );
                            }}
                        />
                        </div>
                </div>

                { 
                    messages.map((e, ind) =>{
                        return <p className="cl-red ml-2" key= { ind }>{ e } </p>
                    })
                }

                <PageButtons />

            </IonCard>
        
        </>

        return elem
    }

    function Page2():JSX.Element {
        const [ value, setValue ] = useState( "менее 7 м3/ч" )
        const [ upd, setUpd] = useState( 0 )

        const elem = <>
            <IonCard className='bg-1 pb-1 s-card'>
                <div className='ml-1 mr-1 mt-1 t-underline flex fl-space pb-05'> 
                    <div>Объект газификации</div>
                </div>
                <div className="pb-4">
                    <div className='flex fl-space ml-2 mt-1 mr-1'>
                        <div> Объект </div>
                        <div className="s-select w-40">
                            <IonSelect placeholder="Выберите объект"  className='s-select w-100'
                                value={ info?.ОбъектГазификации?.Объект }
                                interface="popover"
                                onIonChange={(e)=>{
                                    info.ОбъектГазификации.Объект = e.detail.value
                                    setInfo(info);
                                }}
                            >
                                <IonSelectOption class="w-90" value="Жилой дом"> Гараж</IonSelectOption>
                                <IonSelectOption class="w-90" value="Гараж"> Склад</IonSelectOption>
                                <IonSelectOption class="w-90" value="Баня"> Магазин</IonSelectOption>
                                <IonSelectOption class="w-90" value="Другое"> Другое</IonSelectOption>
                            </IonSelect>
                        </div>
                    </div>
                    <div className='ml-2 mt-1 mr-1'>
                        <div> Адрес </div>
                        <div className='s-input a-right mt-05 fs-07'>
                            <AddressSuggestions token="50bfb3453a528d091723900fdae5ca5a30369832" 
                                value={ info?.ОбъектГазификации.Адрес  } 
                                filterLocations={[{region: "Саха /Якутия/"}]}
                                filterRestrictValue
                                onChange={(e)=>{
                                    info.ОбъектГазификации.Адрес = e
                                    setInfo( info )
                                }} 
                            />
                        </div>
                    </div>  
                </div>
                                
                <div className="pb-4"></div>                
                { 
                    messages.map((e, ind) =>{
                        return <p className="cl-red ml-2" key= { ind }>{ e } </p>
                    })
                }    
                            
                
                <PageButtons />

            </IonCard>
        
        </>

        return elem
    }

    function Page3():JSX.Element {
        const [index, setIndex] = useState( 0 )

        const elem = <>
            <IonCard className='bg-1 pb-1 s-card'>
                <div className=" ml-1 mt-1">
                    <IonChip color="light" className={ index === 0 ? "a-chip" : "" }  onClick={()=> setIndex( 0 )}> 1 </IonChip>
                    <IonChip color="light" className={ index === 1 ? "a-chip" : "" }  onClick={()=> setIndex( 1 )}> 2 </IonChip>
                    <IonChip color="light" className={ index === 2 ? "a-chip" : "" }  onClick={()=> setIndex( 2 )}> 3 </IonChip>
                    <IonChip color="light" className={ index === 3 ? "a-chip" : "" }  onClick={()=> setIndex( 3 )}> 4 </IonChip>
                    <IonChip color="light" className={ index === 4 ? "a-chip" : "" }  onClick={()=> setIndex( 4 )}> 5 </IonChip>
                    <IonChip color="light" className={ index === 5 ? "a-chip" : "" }  onClick={()=> setIndex( 5 )}> 6 </IonChip>
                    <IonChip color="light" className={ index === 6 ? "a-chip" : "" }  onClick={()=> setIndex( 6 )}> 7 </IonChip>
                    <IonChip color="light" className={ index === 7 ? "a-chip" : "" }  onClick={()=> setIndex( 7 )}> 8 </IonChip>
                    <IonChip color="light" className={ index === 8 ? "a-chip" : "" }  onClick={()=> setIndex( 8 )}> 9 </IonChip>
                    <IonChip color="light" className={ index === 9 ? "a-chip" : "" }  onClick={()=> setIndex( 9 )}> 10 </IonChip>
                    <IonChip color="light" className={ index === 10 ? "a-chip" : "" }  onClick={()=> setIndex( 10 )}> 11 </IonChip>
                    <IonChip color="light" className={ index === 11 ? "a-chip" : "" }  onClick={()=> setIndex( 11 )}> 12 </IonChip>
                    <IonChip color="light" className={ index === 12 ? "a-chip" : "" }  onClick={()=> setIndex( 12 )}> 13 </IonChip>
                </div>
                {
                    index === 0
                        ? <Files info = { info.Файлы.Заявление }    name = { "Заявление" }   check = {true} title = "Заявление на заключение договора на фирменном бланке предприятия предполагаемый период и количество точек подключения запрашиваемый к поставке объем газа на весь предполагаемый период действия договора (или годовой объем газа) с разбивкой по месяцам"/>
                    : index === 1
                        ? <Files info = { info.Файлы.СвидГРЮЛ }     name = { "СвидГРЮЛ" }    check = {true} title = "Свидетельство о государственной регистрации юридического лица"/>
                    : index === 2
                        ? <Files info = { info.Файлы.ПолнЛиц }      name = { "ПолнЛиц" }     check = {true} title = "Документ, подтверждающий полномочия лиц на подписание договора от имени потребителя"/>
                    : index === 3
                        ? <Files info = { info.Файлы.Карточка }     name = { "Карточка" }    check = {true} title = "Карточка предприятия (юр. адрес, конт.тел. эл. почта, р/с, ОКВЭД)"/>
                    : index === 4
                        ? <Files info = { info.Файлы.Выписка }      name = { "Выписка" }     check = {true} title = "Выписка ЕГРЮЛ"/>
                    : index === 5
                        ? <Files info = { info.Файлы.ТехПаспорта }  name = { "ТехПаспорта" } check = {true} title = "Документы, подтверждающие принадлежность газоиспользующего оборудования (объектов газоснабжения) заявителю на праве собственности или на ином законном основании, и технические паспорта на указанное оборудование"/>
                    : index === 6
                        ? <Files info = { info.Файлы.Приказ }       name = { "Приказ" }      check = {true} title = "Приказ о назначении лица, ответственного за безопасную эксплуатацию газового хозяйства, копии удостоверений.  При отстутствии удостоверений заполните заявление на инструктаж с шаблона"/>
                    : index === 7
                        ? <Files info = { info.Файлы.АктОПодкл }    name = { "АктОПодкл" }   check = {true} title = "Копия акта о подключении (технологическом присоединении), содержащего информацию о разграничении имущественной принадлежности и эксплуатационной ответственности сторон, или акта об осуществлении технологического присоединения строящегося и реконструируемого газопровода, предназначенного для транспортировки газа от магистрального газопровода до объекта капитального строительства, или газопровода, предназначенного для транспортировки газа от месторождений природного газа до магистрального газопровода, либо акта о готовности сетей газопотребления и газоиспользующего оборудования объекта капитального строительства к подключению (технологическому присоединению) (в случае если заявка направляется до завершения мероприятий по подключению)"/>
                    : index === 8
                        ? <Files info = { info.Файлы.ДогНаТО }      name = { "ДогНаТО" }     check = {true} title = "Копия договора на техническое обслуживание газового оборудования"/>
                    : index === 9
                        ? <Files info = { info.Файлы.АктРазд }      name = { "АктРазд" }     check = {true} title = "Копия акта раздела границ обслуживания к договору на техническое обслуживание"/>
                    : index === 10
                        ? <Files info = { info.Файлы.СвидРегОб }    name = { "СвидРегОб" }   check = {true} title = "Свидетельств установленного образца о регистрации этих объектов в государственном реестре. Для производственных объектов, подключенных к газовым сетям под давлением свыше 0,005Мпа."/>
                    : index === 11
                        ? <Files info = { info.Файлы.ЧастиГСВ }     name = { "ЧастиГСВ" }    check = {true} title = "Копия проекта части ГСВ"/>
                    : index === 12
                        ? <Files info = { info.Файлы.ДогНаПуск }    name = { "ДогНаПуск" }   check = {true} title = "Копия договора на пусконаладку оборудования и подводящего газопровода со специализированной организацией "/>
                    : <></>    
                }

                { 
                    messages.map((e, ind) =>{

                        return <p className="cl-red ml-2" key= { ind }>{ e } </p>

                    })
                }                
                
                <PageButtons />
                
            </IonCard>
        </>

        return elem
    }

    const elem = <>
    <IonLoading isOpen = { load } message={ "Подождите..." }/>
    {
        page === 0 
            ? <Page1 />
        : page === 1
             ? <Page2 />
        : page === 2
             ? <Page3 />
        : <></>
    }
    </>

    return elem;
}

export function Service4_3():JSX.Element {
    const [ info,       setInfo] = useState( Store.getState().service4_3 );
    const [ load,       setLoad] = useState( false)
    const [ page,       setPage] = useState( 0 )
    const [ messages,   setMessages ]   = useState<any>([])
    const [ upd,        setUpd]         = useState( 0 )

    async function loading(){
        const pr = Store.getState().profile
        const info = Store.getState().service4_3;

        info.token = Store.getState().login.token;
        if( info.ПолноеНаименование === "") info.ПолноеНаименование = pr?.Наименование === undefined ? "" : pr?.Наименование
        if( info.КраткоеНаименование === "") info.КраткоеНаименование = pr?.Наименование === undefined ? "" : pr?.Наименование

        if( info.ИНН === "") info.ИНН = pr?.ИНН === undefined ? "" : pr?.ИНН
        if( info.КонтактныйТелефон === "") info.КонтактныйТелефон = pr?.КонтактныеЛица?.МобильныйТелефон === "" 
            ? pr?.КонтактныеЛица?.РабочийТелефон
            : pr?.КонтактныеЛица?.МобильныйТелефон

        const res = await getData("jur_details", {
            Service: 2
        }) 

        if(!res.error){
            res.data.forEach(elem => {
                info.Файлы[ elem.name ] = [{ dataUrl: elem.file, format: "pdf", sample: true} ] 
            });
            
        }
        setInfo( info )

        setUpd( upd + 1)        
    }

    useEffect(()=>{
        loading()
    
    },[])

    function test( page ){
        let test = true
        let jarr:any = []
        if( page === 0 ){
            if(info.ИНН === "") { jarr = [...jarr, "Заполните ИНН"]; test = false }
            if(info.КонтактныйТелефон === "") { jarr = [...jarr, "Заполните контактный телефон"]; test = false } 
            if(info.элПочта === "") { jarr = [...jarr, "Заполните эл. почту"]; test = false }
        }
        if( page === 1 ){
            if(info?.ОбъектГазификации?.Адрес === "") { jarr = [...jarr, "Заполните адрес объекта"]; test = false }
            if(info?.ОбъектГазификации?.Объект === "") { jarr = [...jarr, "Заполните объект газификации "]; test = false } 
        }
        if( page === 2 ){
           // if(info?.Файлы?.ПравоСобсв.length === 0) { jarr = [...jarr, "Прикрепите документы, подтверждающие право собственности заявителя в отношении помещений"]; test = false }
        }
        setMessages( jarr )
        return test
    }

    async function Save(){
        setLoad( true )
        info.Файлы.Заявление.shift();
        info.Файлы.Приказ.shift();
        const res = await getData("jur_apps", info )
        console.log(res)
        setLoad( false )

        getHistory()
    }

    function PageButtons():JSX.Element {
        return <>
            <div className="ml-1 mt-1 mr-1 flex fl-space">
                <div>
                    <IonButton
                        className={ page === 0 ? "hidden" : "" }
                        onClick={()=>{ 
                            setMessages([])
                            setPage( page - 1)}
                        }
                    >
                        Назад
                    </IonButton>
                </div>                
                <div>
                    <IonButton
                        className={ page === 3 ? "hidden" : "" }
                        onClick={()=>{ 
                            setMessages([])
                            console.log(page)
                            if( page < 2) {
                                if( test(page) )
                                    setPage( page + 1)
                            } else Save()
                        }}
                    >
                       { page === 2 ? "Отправить" : "Далее" } 
                    </IonButton>
                </div>                
            </div>
        
        </>
    }

    function Page1():JSX.Element {
        const [ edit, setEdit ] = useState( false )
        const [ jurAddress, setJurAddress] = useState<any>()
        
        const elem = <>
            <IonCard className='bg-1 pb-1 s-card'>

                <div className={ edit ? "ml-1 mr-1 mt-1 t-underline s-input" : "hidden"}>
                    <PartySuggestions  token="50bfb3453a528d091723900fdae5ca5a30369832"
                        filterLocations={[{kladr_id: "14000001"}]}
                        onChange={(e)=>{
                            info.ПолноеНаименование     = e?.data.name.full_with_opf
                            info.КраткоеНаименование    = e?.data.name.short_with_opf
                            info.ИНН = e?.data.inn
                                    
                            info.ЮридическийАдрес = e?.data.address.value

                            setJurAddress( e?.data.address )

                            setInfo( info )
                            setEdit(false)
                                    
                        }}
                    />
                </div>

                    {/* Организация  */}

                <div className='ml-1 mr-1 mt-1 t-underline flex fl-space pb-05'> 
                    <div>Организация</div>
                </div>
                <div  onClick={()=>{ setEdit(!edit) }}  className="s-point">
                    <div className='flex fl-space ml-2 mt-1 mr-1'>
                        <div> Полное Наименование </div>
                        <div className="a-right"> { info?.ПолноеНаименование }</div>
                    </div>
                    <div className='flex fl-space ml-2 mt-1 mr-1'>
                        <div> Краткое наименование  </div>
                        <div className="a-right"> { info?.КраткоеНаименование }</div>
                    </div>
                    <div className='flex fl-space ml-2 mt-1 mr-1'>
                        <div> ИНН </div>
                        <div> { info?.ИНН }</div>
                    </div>
                </div>

                    {/* Контактная информация */}

                <div className='ml-1 mr-1 mt-1 t-underline flex fl-space pb-05'> 
                    <div>Контактная информация</div>
                </div>
                <div className='ml-2 mt-1 mr-1'>
                    <div> Почтовый адрес</div>
                    <div className='s-input a-right mt-05 fs-07'>
                        <AddressSuggestions token="50bfb3453a528d091723900fdae5ca5a30369832" 
                            value={ info?.ПочтовыйАдрес  } 
                            filterLocations={[{region: "Саха /Якутия/"}]}
                            filterRestrictValue
                            onChange={(e)=>{
                                info.ПочтовыйАдрес = e
                                setInfo( info )
                            }} 
                        />
                    </div>
                </div>
                <div className='ml-2 mt-1 mr-1'>
                    <div> Юридический адрес</div>
                    <div className='s-input a-right mt-05'>
                        <AddressSuggestions token="50bfb3453a528d091723900fdae5ca5a30369832" 
                            value={ jurAddress  } 
                            filterLocations={[{region: "Саха /Якутия/"}]}
                            filterRestrictValue
                            onChange={(e)=>{
                                info.ЮридическийАдрес = e
                                setInfo( info )
                            }} 
                        />
                    </div>
                </div>
                <div className='flex fl-space ml-2 mt-1 mr-1'>
                    <div> Телефон </div>
                    <div className='lk-input a-right pr-1 s-input'>
                        <MaskedInput
                            className='m-input a-right'
                            mask={['+', /\d/, '(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                            value={ info.КонтактныйТелефон }
                               // placeholder="+7(000)000-00-00"
                            onInput={(e: any) => {
                                info.КонтактныйТелефон = (e.target.value as string).substring(0, 16)   
                                setInfo( info );
                            }}
                        />
                    </div>
                </div>
                <div className='flex fl-space ml-2 mt-1 mr-1'>
                    <div> Доп. телефон </div>
                    <div className='lk-input a-right pr-1 s-input'>
                        <MaskedInput
                            className='m-input a-right'
                            mask={['+', /\d/, '(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                            value={ info.ДопТелефон }
                               // placeholder="+7(000)000-00-00"
                            onInput={(e: any) => {
                                info.ДопТелефон = (e.target.value as string).substring(0, 16)   
                                setInfo( info );
                            }}
                        />
                    </div>
                </div>
                <div className='flex fl-space ml-2 mt-1 mr-1'>
                    <div> email </div>
                    <div className='lk-input a-right pr-1 s-input'>
                        <IonInput
                            class='lk-input-1'
                            value={ info?.элПочта }
                            placeholder="эл. почта"
                            onIonInput={(e: any) => {
                                info.элПочта = e.target.value    
                                setInfo( info );
                            }}
                        />
                        </div>
                </div>

                { 
                    messages.map((e, ind) =>{
                        return <p className="cl-red ml-2" key= { ind }>{ e } </p>
                    })
                }

                <PageButtons />

            </IonCard>
        
        </>

        return elem
    }

    function Page2():JSX.Element {
        const [ value, setValue ] = useState( "менее 7 м3/ч" )
        const [ upd, setUpd] = useState( 0 )

        const elem = <>
            <IonCard className='bg-1 pb-1 s-card'>
                <div className='ml-1 mr-1 mt-1 t-underline flex fl-space pb-05'> 
                    <div>Объект газификации</div>
                </div>
                <div className="pb-4">
                    <div className='flex fl-space ml-2 mt-1 mr-1'>
                        <div> Объект </div>
                        <div className="s-select w-40">
                            <IonSelect placeholder="Выберите объект"  className='s-select w-100'
                                value={ info?.ОбъектГазификации?.Объект }
                                interface="popover"
                                onIonChange={(e)=>{
                                    info.ОбъектГазификации.Объект = e.detail.value
                                    setInfo(info);
                                }}
                            >
                                <IonSelectOption class="w-90" value="Жилой дом"> Гараж</IonSelectOption>
                                <IonSelectOption class="w-90" value="Гараж"> Склад</IonSelectOption>
                                <IonSelectOption class="w-90" value="Баня"> Магазин</IonSelectOption>
                                <IonSelectOption class="w-90" value="Другое"> Другое</IonSelectOption>
                            </IonSelect>
                        </div>
                    </div>
                    <div className='ml-2 mt-1 mr-1'>
                        <div> Адрес </div>
                        <div className='s-input a-right mt-05 fs-07'>
                            <AddressSuggestions token="50bfb3453a528d091723900fdae5ca5a30369832" 
                                value={ info?.ОбъектГазификации.Адрес  } 
                                filterLocations={[{region: "Саха /Якутия/"}]}
                                filterRestrictValue
                                onChange={(e)=>{
                                    info.ОбъектГазификации.Адрес = e
                                    setInfo( info )
                                }} 
                            />
                        </div>
                    </div>  
                </div>
                                
                <div className="pb-4"></div>                
                { 
                    messages.map((e, ind) =>{
                        return <p className="cl-red ml-2" key= { ind }>{ e } </p>
                    })
                }    
                            
                
                <PageButtons />

            </IonCard>
        
        </>

        return elem
    }

    function Page3():JSX.Element {
        const [index, setIndex] = useState( 0 )

        const elem = <>
            <IonCard className='bg-1 pb-1 s-card'>
                <div className=" ml-1 mt-1">
                    <IonChip color="light" className={ index === 0 ? "a-chip" : "" }  onClick={()=> setIndex( 0 )}> 1 </IonChip>
                    <IonChip color="light" className={ index === 1 ? "a-chip" : "" }  onClick={()=> setIndex( 1 )}> 2 </IonChip>
                    <IonChip color="light" className={ index === 2 ? "a-chip" : "" }  onClick={()=> setIndex( 2 )}> 3 </IonChip>
                    <IonChip color="light" className={ index === 3 ? "a-chip" : "" }  onClick={()=> setIndex( 3 )}> 4 </IonChip>
                    <IonChip color="light" className={ index === 4 ? "a-chip" : "" }  onClick={()=> setIndex( 4 )}> 5 </IonChip>
                    <IonChip color="light" className={ index === 5 ? "a-chip" : "" }  onClick={()=> setIndex( 5 )}> 6 </IonChip>
                    <IonChip color="light" className={ index === 6 ? "a-chip" : "" }  onClick={()=> setIndex( 6 )}> 7 </IonChip>
                </div>
                {
                    index === 0
                        ? <Files info = { info.Файлы.Заявление }    name = { "Заявление" }   check = {true} title = "Заявление на заключение договора на фирменном бланке предприятия предполагаемый период и количество точек подключения запрашиваемый к поставке объем газа на весь предполагаемый период действия договора (или годовой объем газа) с разбивкой по месяцам"/>
                    : index === 1
                        ? <Files info = { info.Файлы.ТехПаспорта }  name = { "ТехПаспорта" } check = {true} title = "Документы, подтверждающие принадлежность газоиспользующего оборудования (объектов газоснабжения) заявителю на праве собственности или на ином законном основании, и технические паспорта на указанное оборудование"/>
                    : index === 2
                        ? <Files info = { info.Файлы.Выписка }      name = { "Выписка" }     check = {true} title = "Выписка ЕГРЮЛ"/>
                    : index === 3
                        ? <Files info = { info.Файлы.Приказ }       name = { "Приказ" }      check = {true} title = "Приказ о назначении лица, ответственного за безопасную эксплуатацию газового хозяйства, копии удостоверений.  При отстутствии удостоверений заполните заявление на инструктаж с шаблона"/>
                    : index === 4
                        ? <Files info = { info.Файлы.ДогНаТО }      name = { "ДогНаТО" }     check = {true} title = "Копия договора на техническое обслуживание газового оборудования"/>
                    : index === 5
                        ? <Files info = { info.Файлы.АктРазд }      name = { "АктРазд" }     check = {true} title = "Копия акта раздела границ обслуживания к договору на техническое обслуживание"/>
                    : index === 6
                        ? <Files info = { info.Файлы.ПолнЛиц }      name = { "ПолнЛиц" }     check = {true} title = "Документ, подтверждающий полномочия лиц на подписание договора от имени потребителя"/>
                    : <></>    
                }

                { 
                    messages.map((e, ind) =>{

                        return <p className="cl-red ml-2" key= { ind }>{ e } </p>

                    })
                }                
                
                <PageButtons />
                
            </IonCard>
        </>

        return elem
    }

    const elem = <>
    <IonLoading isOpen = { load } message={ "Подождите..." }/>
    {
        page === 0 
            ? <Page1 />
        : page === 1
             ? <Page2 />
        : page === 2
             ? <Page3 />
        : <></>
    }
    </>

    return elem;
}

export function Service4_4():JSX.Element {
    const [ info,       setInfo] = useState( Store.getState().service4_4 );
    const [ load,       setLoad] = useState( false)
    const [ page,       setPage] = useState( 0 )
    const [ messages,   setMessages ]   = useState<any>([])
    const [ upd,        setUpd]         = useState( 0 )

    async function loading(){
        const pr = Store.getState().profile
        const info = Store.getState().service4_4;

        info.token = Store.getState().login.token;
        if( info.ПолноеНаименование === "") info.ПолноеНаименование = pr?.Наименование === undefined ? "" : pr?.Наименование
        if( info.КраткоеНаименование === "") info.КраткоеНаименование = pr?.Наименование === undefined ? "" : pr?.Наименование

        if( info.ИНН === "") info.ИНН = pr?.ИНН === undefined ? "" : pr?.ИНН
        if( info.КонтактныйТелефон === "") info.КонтактныйТелефон = pr?.КонтактныеЛица?.МобильныйТелефон === "" 
            ? pr?.КонтактныеЛица?.РабочийТелефон
            : pr?.КонтактныеЛица?.МобильныйТелефон

        const res = await getData("jur_details", {
            Service: 3
        }) 

        if(!res.error){
            res.data.forEach(elem => {
                info.Файлы[ elem.name ] = [{ dataUrl: elem.file, format: "pdf", sample: true} ] 
            });
            
        }
        setInfo( info )

        setUpd( upd + 1)        
    }

    useEffect(()=>{
        loading()
    
    },[])

    function test( page ){
        let test = true
        let jarr:any = []
        if( page === 0 ){
            if(info.ИНН === "") { jarr = [...jarr, "Заполните ИНН"]; test = false }
            if(info.КонтактныйТелефон === "") { jarr = [...jarr, "Заполните контактный телефон"]; test = false } 
            if(info.элПочта === "") { jarr = [...jarr, "Заполните эл. почту"]; test = false }
        }
        if( page === 1 ){
            if(info?.ОбъектГазификации?.Адрес === "") { jarr = [...jarr, "Заполните адрес объекта"]; test = false }
            if(info?.ОбъектГазификации?.Объект === "") { jarr = [...jarr, "Заполните объект газификации "]; test = false } 
        }
        if( page === 2 ){
           // if(info?.Файлы?.ПравоСобсв.length === 0) { jarr = [...jarr, "Прикрепите документы, подтверждающие право собственности заявителя в отношении помещений"]; test = false }
        }
        setMessages( jarr )
        return test
    }

    async function Save(){
        setLoad( true )
        info.Файлы.Заявление.shift();
        info.Файлы.Приказ.shift();
        const res = await getData("jur_apps", info )
        console.log(res)
        setLoad( false )

        getHistory()
    }

    function PageButtons():JSX.Element {
        return <>
            <div className="ml-1 mt-1 mr-1 flex fl-space">
                <div>
                    <IonButton
                        className={ page === 0 ? "hidden" : "" }
                        onClick={()=>{ 
                            setMessages([])
                            setPage( page - 1)}
                        }
                    >
                        Назад
                    </IonButton>
                </div>                
                <div>
                    <IonButton
                        className={ page === 3 ? "hidden" : "" }
                        onClick={()=>{ 
                            setMessages([])
                            console.log(page)
                            if( page < 2) {
                                if( test(page) )
                                    setPage( page + 1)
                            } else Save()
                        }}
                    >
                       { page === 2 ? "Отправить" : "Далее" } 
                    </IonButton>
                </div>                
            </div>
        
        </>
    }
    
    function Page1():JSX.Element {
        const [ edit, setEdit ] = useState( false )
        const [ jurAddress, setJurAddress] = useState<any>()
        
        const elem = <>
            <IonCard className='bg-1 pb-1 s-card'>

                <div className={ edit ? "ml-1 mr-1 mt-1 t-underline s-input" : "hidden"}>
                    <PartySuggestions  token="50bfb3453a528d091723900fdae5ca5a30369832"
                        filterLocations={[{kladr_id: "14000001"}]}
                        onChange={(e)=>{
                            info.ПолноеНаименование     = e?.data.name.full_with_opf
                            info.КраткоеНаименование    = e?.data.name.short_with_opf
                            info.ИНН = e?.data.inn
                                    
                            info.ЮридическийАдрес = e?.data.address.value

                            setJurAddress( e?.data.address )

                            setInfo( info )
                            setEdit(false)
                                    
                        }}
                    />
                </div>

                    {/* Организация  */}

                <div className='ml-1 mr-1 mt-1 t-underline flex fl-space pb-05'> 
                    <div>Организация</div>
                </div>
                <div  onClick={()=>{ setEdit(!edit) }}  className="s-point">
                    <div className='flex fl-space ml-2 mt-1 mr-1'>
                        <div> Полное Наименование </div>
                        <div className="a-right"> { info?.ПолноеНаименование }</div>
                    </div>
                    <div className='flex fl-space ml-2 mt-1 mr-1'>
                        <div> Краткое наименование  </div>
                        <div className="a-right"> { info?.КраткоеНаименование }</div>
                    </div>
                    <div className='flex fl-space ml-2 mt-1 mr-1'>
                        <div> ИНН </div>
                        <div> { info?.ИНН }</div>
                    </div>
                </div>

                    {/* Контактная информация */}

                <div className='ml-1 mr-1 mt-1 t-underline flex fl-space pb-05'> 
                    <div>Контактная информация</div>
                </div>
                <div className='ml-2 mt-1 mr-1'>
                    <div> Почтовый адрес</div>
                    <div className='s-input a-right mt-05 fs-07'>
                        <AddressSuggestions token="50bfb3453a528d091723900fdae5ca5a30369832" 
                            value={ info?.ПочтовыйАдрес  } 
                            filterLocations={[{region: "Саха /Якутия/"}]}
                            filterRestrictValue
                            onChange={(e)=>{
                                info.ПочтовыйАдрес = e
                                setInfo( info )
                            }} 
                        />
                    </div>
                </div>
                <div className='ml-2 mt-1 mr-1'>
                    <div> Юридический адрес</div>
                    <div className='s-input a-right mt-05'>
                        <AddressSuggestions token="50bfb3453a528d091723900fdae5ca5a30369832" 
                            value={ jurAddress  } 
                            filterLocations={[{region: "Саха /Якутия/"}]}
                            filterRestrictValue
                            onChange={(e)=>{
                                info.ЮридическийАдрес = e
                                setInfo( info )
                            }} 
                        />
                    </div>
                </div>
                <div className='flex fl-space ml-2 mt-1 mr-1'>
                    <div> Телефон </div>
                    <div className='lk-input a-right pr-1 s-input'>
                        <MaskedInput
                            className='m-input a-right'
                            mask={['+', /\d/, '(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                            value={ info.КонтактныйТелефон }
                               // placeholder="+7(000)000-00-00"
                            onInput={(e: any) => {
                                info.КонтактныйТелефон = (e.target.value as string).substring(0, 16)   
                                setInfo( info );
                            }}
                        />
                    </div>
                </div>
                <div className='flex fl-space ml-2 mt-1 mr-1'>
                    <div> Доп. телефон </div>
                    <div className='lk-input a-right pr-1 s-input'>
                        <MaskedInput
                            className='m-input a-right'
                            mask={['+', /\d/, '(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                            value={ info.ДопТелефон }
                               // placeholder="+7(000)000-00-00"
                            onInput={(e: any) => {
                                info.ДопТелефон = (e.target.value as string).substring(0, 16)   
                                setInfo( info );
                            }}
                        />
                    </div>
                </div>
                <div className='flex fl-space ml-2 mt-1 mr-1'>
                    <div> email </div>
                    <div className='lk-input a-right pr-1 s-input'>
                        <IonInput
                            class='lk-input-1'
                            value={ info?.элПочта }
                            placeholder="эл. почта"
                            onIonInput={(e: any) => {
                                info.элПочта = e.target.value    
                                setInfo( info );
                            }}
                        />
                        </div>
                </div>

                { 
                    messages.map((e, ind) =>{
                        return <p className="cl-red ml-2" key= { ind }>{ e } </p>
                    })
                }

                <PageButtons />

            </IonCard>
        
        </>

        return elem
    }

    function Page2():JSX.Element {
        const [ value, setValue ] = useState( "менее 7 м3/ч" )
        const [ upd, setUpd] = useState( 0 )

        const elem = <>
            <IonCard className='bg-1 pb-1 s-card'>
                <div className='ml-1 mr-1 mt-1 t-underline flex fl-space pb-05'> 
                    <div>Объект газификации</div>
                </div>
                <div className="pb-4">
                    <div className='flex fl-space ml-2 mt-1 mr-1'>
                        <div> Объект </div>
                        <div className="s-select w-40">
                            <IonSelect placeholder="Выберите объект"  className='s-select w-100'
                                value={ info?.ОбъектГазификации?.Объект }
                                interface="popover"
                                onIonChange={(e)=>{
                                    info.ОбъектГазификации.Объект = e.detail.value
                                    setInfo(info);
                                }}
                            >
                                <IonSelectOption class="w-90" value="Жилой дом"> Гараж</IonSelectOption>
                                <IonSelectOption class="w-90" value="Гараж"> Склад</IonSelectOption>
                                <IonSelectOption class="w-90" value="Баня"> Магазин</IonSelectOption>
                                <IonSelectOption class="w-90" value="Другое"> Другое</IonSelectOption>
                            </IonSelect>
                        </div>
                    </div>
                    <div className='ml-2 mt-1 mr-1'>
                        <div> Адрес </div>
                        <div className='s-input a-right mt-05 fs-07'>
                            <AddressSuggestions token="50bfb3453a528d091723900fdae5ca5a30369832" 
                                value={ info?.ОбъектГазификации.Адрес  } 
                                filterLocations={[{region: "Саха /Якутия/"}]}
                                filterRestrictValue
                                onChange={(e)=>{
                                    info.ОбъектГазификации.Адрес = e
                                    setInfo( info )
                                }} 
                            />
                        </div>
                    </div>  
                </div>
                                
                <div className="pb-4"></div>                
                { 
                    messages.map((e, ind) =>{
                        return <p className="cl-red ml-2" key= { ind }>{ e } </p>
                    })
                }    
                            
                
                <PageButtons />

            </IonCard>
        
        </>

        return elem
    }

    function Page3():JSX.Element {
        const [index, setIndex] = useState( 0 )

        const elem = <>
            <IonCard className='bg-1 pb-1 s-card'>
                <div className=" ml-1 mt-1">
                    <IonChip color="light" className={ index === 0 ? "a-chip" : "" }  onClick={()=> setIndex( 0 )}> 1 </IonChip>
                    <IonChip color="light" className={ index === 1 ? "a-chip" : "" }  onClick={()=> setIndex( 1 )}> 2 </IonChip>
                    <IonChip color="light" className={ index === 2 ? "a-chip" : "" }  onClick={()=> setIndex( 2 )}> 3 </IonChip>
                    <IonChip color="light" className={ index === 3 ? "a-chip" : "" }  onClick={()=> setIndex( 3 )}> 4 </IonChip>
                    <IonChip color="light" className={ index === 4 ? "a-chip" : "" }  onClick={()=> setIndex( 4 )}> 5 </IonChip>
                    <IonChip color="light" className={ index === 5 ? "a-chip" : "" }  onClick={()=> setIndex( 5 )}> 6 </IonChip>
                    <IonChip color="light" className={ index === 6 ? "a-chip" : "" }  onClick={()=> setIndex( 6 )}> 7 </IonChip>
                    <IonChip color="light" className={ index === 7 ? "a-chip" : "" }  onClick={()=> setIndex( 7 )}> 8 </IonChip>
                    <IonChip color="light" className={ index === 8 ? "a-chip" : "" }  onClick={()=> setIndex( 8 )}> 9 </IonChip>
                    <IonChip color="light" className={ index === 9 ? "a-chip" : "" }  onClick={()=> setIndex( 9 )}> 10 </IonChip>
                    <IonChip color="light" className={ index === 10 ? "a-chip" : "" }  onClick={()=> setIndex( 10 )}> 11 </IonChip>
                    <IonChip color="light" className={ index === 11 ? "a-chip" : "" }  onClick={()=> setIndex( 11 )}> 12 </IonChip>
                    <IonChip color="light" className={ index === 12 ? "a-chip" : "" }  onClick={()=> setIndex( 12 )}> 13 </IonChip>
                </div>
                {
                    index === 0
                        ? <Files info = { info.Файлы.Заявление }    name = { "Заявление" }   check = {true} title = "Заявление на заключение договора на фирменном бланке предприятия предполагаемый период и количество точек подключения запрашиваемый к поставке объем газа на весь предполагаемый период действия договора (или годовой объем газа) с разбивкой по месяцам"/>
                    : index === 1
                        ? <Files info = { info.Файлы.СвидГРЮЛ }     name = { "СвидГРЮЛ" }    check = {true} title = "Свидетельство о государственной регистрации юридического лица"/>
                    : index === 2
                        ? <Files info = { info.Файлы.ПолнЛиц }      name = { "ПолнЛиц" }     check = {true} title = "Документ, подтверждающий полномочия лиц на подписание договора от имени потребителя"/>
                    : index === 3
                        ? <Files info = { info.Файлы.Карточка }     name = { "Карточка" }    check = {true} title = "Карточка предприятия (юр. адрес, конт.тел. эл. почта, р/с, ОКВЭД)"/>
                    : index === 4
                        ? <Files info = { info.Файлы.Выписка }      name = { "Выписка" }     check = {true} title = "Выписка ЕГРЮЛ"/>
                    : index === 5
                        ? <Files info = { info.Файлы.ТехПаспорта }  name = { "ТехПаспорта" } check = {true} title = "Документы, подтверждающие принадлежность газоиспользующего оборудования (объектов газоснабжения) заявителю на праве собственности или на ином законном основании, и технические паспорта на указанное оборудование"/>
                    : index === 6
                        ? <Files info = { info.Файлы.Приказ }       name = { "Приказ" }      check = {true} title = "Приказ о назначении лица, ответственного за безопасную эксплуатацию газового хозяйства, копии удостоверений.  При отстутствии удостоверений заполните заявление на инструктаж с шаблона"/>
                    : index === 7
                        ? <Files info = { info.Файлы.АктОПодкл }    name = { "АктОПодкл" }   check = {true} title = "Копия акта о подключении (технологическом присоединении), содержащего информацию о разграничении имущественной принадлежности и эксплуатационной ответственности сторон, или акта об осуществлении технологического присоединения строящегося и реконструируемого газопровода, предназначенного для транспортировки газа от магистрального газопровода до объекта капитального строительства, или газопровода, предназначенного для транспортировки газа от месторождений природного газа до магистрального газопровода, либо акта о готовности сетей газопотребления и газоиспользующего оборудования объекта капитального строительства к подключению (технологическому присоединению) (в случае если заявка направляется до завершения мероприятий по подключению)"/>
                    : index === 8
                        ? <Files info = { info.Файлы.АктОРазгр }    name = { "АктОРазгр" }   check = {true} title = "Копия акта разграничения балансовой имущественной принадлежности. (при отсутствии копии документа указанного в п.9 обязателен)"/>
                    : index === 9
                        ? <Files info = { info.Файлы.УстБрони }     name = { "УстБрони" }   check = {true} title = "Копия документа, подтверждающего установление брони газопотребления"/>
                    : index === 10
                        ? <Files info = { info.Файлы.ДогНаТО }      name = { "ДогНаТО" }     check = {true} title = "Копия договора на техническое обслуживание газового оборудования"/>
                    : index === 11
                        ? <Files info = { info.Файлы.АктРазд }      name = { "АктРазд" }     check = {true} title = "Копия акта раздела границ обслуживания к договору на техническое обслуживание"/>
                    : index === 12
                        ? <Files info = { info.Файлы.АктФикс }      name = { "АктФикс" }   check = {true} title = "Копия акта фиксации показаний по узлу учета газа между Потребителями"/>
                    : <></>    
                }

                { 
                    messages.map((e, ind) =>{

                        return <p className="cl-red ml-2" key= { ind }>{ e } </p>

                    })
                }                
                
                <PageButtons />
                
            </IonCard>
        </>

        return elem
    }

    const elem = <>
    <IonLoading isOpen = { load } message={ "Подождите..." }/>
    {
        page === 0 
            ? <Page1 />
        : page === 1
             ? <Page2 />
        : page === 2
             ? <Page3 />
        : <></>
    }
    </>

    return elem;
}

export function Service4_5():JSX.Element {
    const [ info,       setInfo] = useState( Store.getState().service4_5 );
    const [ load,       setLoad] = useState( false)
    const [ page,       setPage] = useState( 0 )
    const [ messages,   setMessages ]   = useState<any>([])
    const [ upd,        setUpd]         = useState( 0 )

    async function loading(){
        const pr = Store.getState().profile
        const info = Store.getState().service4_5;

        info.token = Store.getState().login.token;
        if( info.ПолноеНаименование === "") info.ПолноеНаименование = pr?.Наименование === undefined ? "" : pr?.Наименование
        if( info.КраткоеНаименование === "") info.КраткоеНаименование = pr?.Наименование === undefined ? "" : pr?.Наименование

        if( info.ИНН === "") info.ИНН = pr?.ИНН === undefined ? "" : pr?.ИНН
        if( info.КонтактныйТелефон === "") info.КонтактныйТелефон = pr?.КонтактныеЛица?.МобильныйТелефон === "" 
            ? pr?.КонтактныеЛица?.РабочийТелефон
            : pr?.КонтактныеЛица?.МобильныйТелефон

        const res = await getData("jur_details", {
            Service: 3
        }) 

        if(!res.error){
            res.data.forEach(elem => {
                info.Файлы[ elem.name ] = [{ dataUrl: elem.file, format: "pdf", sample: true} ] 
            });
            
        }
        setInfo( info )

        setUpd( upd + 1)        
    }

    useEffect(()=>{
        loading()
    
    },[])

    function test( page ){
        let test = true
        let jarr:any = []
        if( page === 0 ){
            if(info.ИНН === "") { jarr = [...jarr, "Заполните ИНН"]; test = false }
            if(info.КонтактныйТелефон === "") { jarr = [...jarr, "Заполните контактный телефон"]; test = false } 
            if(info.элПочта === "") { jarr = [...jarr, "Заполните эл. почту"]; test = false }
        }
        if( page === 1 ){
            if(info?.ОбъектГазификации?.Адрес === "") { jarr = [...jarr, "Заполните адрес объекта"]; test = false }
            if(info?.ОбъектГазификации?.Объект === "") { jarr = [...jarr, "Заполните объект газификации "]; test = false } 
        }
        if( page === 2 ){
           // if(info?.Файлы?.ПравоСобсв.length === 0) { jarr = [...jarr, "Прикрепите документы, подтверждающие право собственности заявителя в отношении помещений"]; test = false }
        }
        setMessages( jarr )
        return test
    }

    async function Save(){
        setLoad( true )
        info.Файлы.Заявление.shift();
        info.Файлы.Приказ.shift();
        const res = await getData("jur_apps", info )
        console.log(res)
        setLoad( false )

        getHistory()
    }

    function PageButtons():JSX.Element {
        return <>
            <div className="ml-1 mt-1 mr-1 flex fl-space">
                <div>
                    <IonButton
                        className={ page === 0 ? "hidden" : "" }
                        onClick={()=>{ 
                            setMessages([])
                            setPage( page - 1)}
                        }
                    >
                        Назад
                    </IonButton>
                </div>                
                <div>
                    <IonButton
                        className={ page === 3 ? "hidden" : "" }
                        onClick={()=>{ 
                            setMessages([])
                            console.log(page)
                            if( page < 2) {
                                if( test(page) )
                                    setPage( page + 1)
                            } else Save()
                        }}
                    >
                       { page === 2 ? "Отправить" : "Далее" } 
                    </IonButton>
                </div>                
            </div>
        
        </>
    }

    function Page1():JSX.Element {
        const [ edit, setEdit ] = useState( false )
        const [ jurAddress, setJurAddress] = useState<any>()
        
        const elem = <>
            <IonCard className='bg-1 pb-1 s-card'>

                <div className={ edit ? "ml-1 mr-1 mt-1 t-underline s-input" : "hidden"}>
                    <PartySuggestions  token="50bfb3453a528d091723900fdae5ca5a30369832"
                        filterLocations={[{kladr_id: "14000001"}]}
                        onChange={(e)=>{
                            info.ПолноеНаименование     = e?.data.name.full_with_opf
                            info.КраткоеНаименование    = e?.data.name.short_with_opf
                            info.ИНН = e?.data.inn
                                    
                            info.ЮридическийАдрес = e?.data.address.value

                            setJurAddress( e?.data.address )

                            setInfo( info )
                            setEdit(false)
                                    
                        }}
                    />
                </div>

                    {/* Организация  */}

                <div className='ml-1 mr-1 mt-1 t-underline flex fl-space pb-05'> 
                    <div>Организация</div>
                </div>
                <div  onClick={()=>{ setEdit(!edit) }}  className="s-point">
                    <div className='flex fl-space ml-2 mt-1 mr-1'>
                        <div> Полное Наименование </div>
                        <div className="a-right"> { info?.ПолноеНаименование }</div>
                    </div>
                    <div className='flex fl-space ml-2 mt-1 mr-1'>
                        <div> Краткое наименование  </div>
                        <div className="a-right"> { info?.КраткоеНаименование }</div>
                    </div>
                    <div className='flex fl-space ml-2 mt-1 mr-1'>
                        <div> ИНН </div>
                        <div> { info?.ИНН }</div>
                    </div>
                </div>

                    {/* Контактная информация */}

                <div className='ml-1 mr-1 mt-1 t-underline flex fl-space pb-05'> 
                    <div>Контактная информация</div>
                </div>
                <div className='ml-2 mt-1 mr-1'>
                    <div> Почтовый адрес</div>
                    <div className='s-input a-right mt-05 fs-07'>
                        <AddressSuggestions token="50bfb3453a528d091723900fdae5ca5a30369832" 
                            value={ info?.ПочтовыйАдрес  } 
                            filterLocations={[{region: "Саха /Якутия/"}]}
                            filterRestrictValue
                            onChange={(e)=>{
                                info.ПочтовыйАдрес = e
                                setInfo( info )
                            }} 
                        />
                    </div>
                </div>
                <div className='ml-2 mt-1 mr-1'>
                    <div> Юридический адрес</div>
                    <div className='s-input a-right mt-05'>
                        <AddressSuggestions token="50bfb3453a528d091723900fdae5ca5a30369832" 
                            value={ jurAddress  } 
                            filterLocations={[{region: "Саха /Якутия/"}]}
                            filterRestrictValue
                            onChange={(e)=>{
                                info.ЮридическийАдрес = e
                                setInfo( info )
                            }} 
                        />
                    </div>
                </div>
                <div className='flex fl-space ml-2 mt-1 mr-1'>
                    <div> Телефон </div>
                    <div className='lk-input a-right pr-1 s-input'>
                        <MaskedInput
                            className='m-input a-right'
                            mask={['+', /\d/, '(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                            value={ info.КонтактныйТелефон }
                               // placeholder="+7(000)000-00-00"
                            onInput={(e: any) => {
                                info.КонтактныйТелефон = (e.target.value as string).substring(0, 16)   
                                setInfo( info );
                            }}
                        />
                    </div>
                </div>
                <div className='flex fl-space ml-2 mt-1 mr-1'>
                    <div> Доп. телефон </div>
                    <div className='lk-input a-right pr-1 s-input'>
                        <MaskedInput
                            className='m-input a-right'
                            mask={['+', /\d/, '(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                            value={ info.ДопТелефон }
                               // placeholder="+7(000)000-00-00"
                            onInput={(e: any) => {
                                info.ДопТелефон = (e.target.value as string).substring(0, 16)   
                                setInfo( info );
                            }}
                        />
                    </div>
                </div>
                <div className='flex fl-space ml-2 mt-1 mr-1'>
                    <div> email </div>
                    <div className='lk-input a-right pr-1 s-input'>
                        <IonInput
                            class='lk-input-1'
                            value={ info?.элПочта }
                            placeholder="эл. почта"
                            onIonInput={(e: any) => {
                                info.элПочта = e.target.value    
                                setInfo( info );
                            }}
                        />
                        </div>
                </div>

                { 
                    messages.map((e, ind) =>{
                        return <p className="cl-red ml-2" key= { ind }>{ e } </p>
                    })
                }

                <PageButtons />

            </IonCard>
        
        </>

        return elem
    }

    function Page2():JSX.Element {
        const [ value, setValue ] = useState( "менее 7 м3/ч" )
        const [ upd, setUpd] = useState( 0 )

        const elem = <>
            <IonCard className='bg-1 pb-1 s-card'>
                <div className='ml-1 mr-1 mt-1 t-underline flex fl-space pb-05'> 
                    <div>Объект газификации</div>
                </div>
                <div className="pb-4">
                    <div className='flex fl-space ml-2 mt-1 mr-1'>
                        <div> Объект </div>
                        <div className="s-select w-40">
                            <IonSelect placeholder="Выберите объект"  className='s-select w-100'
                                value={ info?.ОбъектГазификации?.Объект }
                                interface="popover"
                                onIonChange={(e)=>{
                                    info.ОбъектГазификации.Объект = e.detail.value
                                    setInfo(info);
                                }}
                            >
                                <IonSelectOption class="w-90" value="Жилой дом"> Гараж</IonSelectOption>
                                <IonSelectOption class="w-90" value="Гараж"> Склад</IonSelectOption>
                                <IonSelectOption class="w-90" value="Баня"> Магазин</IonSelectOption>
                                <IonSelectOption class="w-90" value="Другое"> Другое</IonSelectOption>
                            </IonSelect>
                        </div>
                    </div>
                    <div className='ml-2 mt-1 mr-1'>
                        <div> Адрес </div>
                        <div className='s-input a-right mt-05 fs-07'>
                            <AddressSuggestions token="50bfb3453a528d091723900fdae5ca5a30369832" 
                                value={ info?.ОбъектГазификации.Адрес  } 
                                filterLocations={[{region: "Саха /Якутия/"}]}
                                filterRestrictValue
                                onChange={(e)=>{
                                    info.ОбъектГазификации.Адрес = e
                                    setInfo( info )
                                }} 
                            />
                        </div>
                    </div>  
                </div>
                                
                <div className="pb-4"></div>                
                { 
                    messages.map((e, ind) =>{
                        return <p className="cl-red ml-2" key= { ind }>{ e } </p>
                    })
                }    
                            
                
                <PageButtons />

            </IonCard>
        
        </>

        return elem
    }

    function Page3():JSX.Element {
        const [index, setIndex] = useState( 0 )

        const elem = <>
            <IonCard className='bg-1 pb-1 s-card'>
                <div className=" ml-1 mt-1">
                    <IonChip color="light" className={ index === 0 ? "a-chip" : "" }  onClick={()=> setIndex( 0 )}> 1 </IonChip>
                    <IonChip color="light" className={ index === 1 ? "a-chip" : "" }  onClick={()=> setIndex( 1 )}> 2 </IonChip>
                    <IonChip color="light" className={ index === 2 ? "a-chip" : "" }  onClick={()=> setIndex( 2 )}> 3 </IonChip>
                    <IonChip color="light" className={ index === 3 ? "a-chip" : "" }  onClick={()=> setIndex( 3 )}> 4 </IonChip>
                    <IonChip color="light" className={ index === 4 ? "a-chip" : "" }  onClick={()=> setIndex( 4 )}> 5 </IonChip>
                    <IonChip color="light" className={ index === 5 ? "a-chip" : "" }  onClick={()=> setIndex( 5 )}> 6 </IonChip>
                    <IonChip color="light" className={ index === 6 ? "a-chip" : "" }  onClick={()=> setIndex( 6 )}> 7 </IonChip>
                    <IonChip color="light" className={ index === 7 ? "a-chip" : "" }  onClick={()=> setIndex( 7 )}> 8 </IonChip>
                    <IonChip color="light" className={ index === 8 ? "a-chip" : "" }  onClick={()=> setIndex( 8 )}> 9 </IonChip>
                    <IonChip color="light" className={ index === 9 ? "a-chip" : "" }  onClick={()=> setIndex( 9 )}> 10 </IonChip>
                    <IonChip color="light" className={ index === 10 ? "a-chip" : "" }  onClick={()=> setIndex( 10 )}> 11 </IonChip>
                    <IonChip color="light" className={ index === 11 ? "a-chip" : "" }  onClick={()=> setIndex( 11 )}> 12 </IonChip>
                </div>
                {
                    index === 0
                        ? <Files info = { info.Файлы.Заявление }    name = { "Заявление" }   check = {true} title = "Заявление на заключение договора на фирменном бланке предприятия предполагаемый период и количество точек подключения запрашиваемый к поставке объем газа на весь предполагаемый период действия договора (или годовой объем газа) с разбивкой по месяцам"/>
                    : index === 1
                        ? <Files info = { info.Файлы.СвидГРЮЛ }     name = { "СвидГРЮЛ" }    check = {true} title = "Свидетельство о государственной регистрации юридического лица"/>
                    : index === 2
                        ? <Files info = { info.Файлы.ПолнЛиц }      name = { "ПолнЛиц" }     check = {true} title = "Документ, подтверждающий полномочия лиц на подписание договора от имени потребителя"/>
                    : index === 3
                        ? <Files info = { info.Файлы.Карточка }     name = { "Карточка" }    check = {true} title = "Карточка предприятия (юр. адрес, конт.тел. эл. почта, р/с, ОКВЭД)"/>
                    : index === 4
                        ? <Files info = { info.Файлы.Выписка }      name = { "Выписка" }     check = {true} title = "Выписка ЕГРЮЛ"/>
                    : index === 5
                        ? <Files info = { info.Файлы.ТехПаспорта }  name = { "ТехПаспорта" } check = {true} title = "Документы, подтверждающие принадлежность газоиспользующего оборудования (объектов газоснабжения) заявителю на праве собственности или на ином законном основании, и технические паспорта на указанное оборудование"/>
                    : index === 6
                        ? <Files info = { info.Файлы.Приказ }       name = { "Приказ" }      check = {true} title = "Приказ о назначении лица, ответственного за безопасную эксплуатацию газового хозяйства, копии удостоверений.  При отстутствии удостоверений заполните заявление на инструктаж с шаблона"/>
                    : index === 7
                        ? <Files info = { info.Файлы.АктОПодкл }    name = { "АктОПодкл" }   check = {true} title = "Копия акта о подключении (технологическом присоединении), содержащего информацию о разграничении имущественной принадлежности и эксплуатационной ответственности сторон, или акта об осуществлении технологического присоединения строящегося и реконструируемого газопровода, предназначенного для транспортировки газа от магистрального газопровода до объекта капитального строительства, или газопровода, предназначенного для транспортировки газа от месторождений природного газа до магистрального газопровода, либо акта о готовности сетей газопотребления и газоиспользующего оборудования объекта капитального строительства к подключению (технологическому присоединению) (в случае если заявка направляется до завершения мероприятий по подключению)"/>
                    : index === 8
                        ? <Files info = { info.Файлы.АктОРазгр }    name = { "АктОРазгр" }   check = {true} title = "Копия акта разграничения балансовой имущественной принадлежности. (при отсутствии копии документа указанного в п.9 обязателен)"/>
                    : index === 9
                        ? <Files info = { info.Файлы.УстБрони }     name = { "УстБрони" }   check = {true} title = "Копия документа, подтверждающего установление брони газопотребления"/>
                    : index === 10
                        ? <Files info = { info.Файлы.ДогНаТО }      name = { "ДогНаТО" }     check = {true} title = "Копия договора на техническое обслуживание газового оборудования"/>
                    : index === 11
                        ? <Files info = { info.Файлы.АктРазд }      name = { "АктРазд" }     check = {true} title = "Копия акта раздела границ обслуживания к договору на техническое обслуживание"/>
                    : <></>    
                }

                { 
                    messages.map((e, ind) =>{

                        return <p className="cl-red ml-2" key= { ind }>{ e } </p>

                    })
                }                
                
                <PageButtons />
                
            </IonCard>
        </>

        return elem
    }

    const elem = <>
    <IonLoading isOpen = { load } message={ "Подождите..." }/>
    {
        page === 0 
            ? <Page1 />
        : page === 1
             ? <Page2 />
        : page === 2
             ? <Page3 />
        : <></>
    }
    </>

    return elem;
}

