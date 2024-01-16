import React, { useEffect, useState } from "react"
import { Store, getData } from "./Store"
import "./Profile.css"
import { IonButton, IonCard, IonChip, IonIcon, IonInput, IonLoading, IonModal } from "@ionic/react"
import { FioSuggestions } from "react-dadata"
import { createOutline, saveOutline } from "ionicons/icons"
import MaskedInput from "../mask/reactTextMask"
import { Files, toPDF } from "./Files"
import Select from "react-tailwindcss-select";

const options = [
    { value: "Плита1", label: "Газовая плита двухгорелочная" },
    { value: "Butterfly", label: "🦋 Butterfly" },
    { value: "Honeybee", label: "🐝 Honeybee masd fds msdfsd sdfsd sdfsdfsdfde" }
];

export function     Profile():JSX.Element {
    const [ info, setInfo ] = useState<any>()

    useEffect(()=>{
        setInfo( Store.getState().profile )
    },[])

    Store.subscribe({num: 21, type: "profile", func: ()=>{
        setInfo( Store.getState().profile )
      }})

    
    function Person():JSX.Element {
        const [ edit, setEdit ] = useState(false)
        const [ mode, setMode ] = useState(false)
        const [ load, setLoad ] = useState(false);

        async function Save(){

            setLoad( true )
            const res = await getData("jur_profile", {
                token:            Store.getState().login.token,
                Фамилия:          info.КонтактныеЛица.Фамилия,
                Имя:              info.КонтактныеЛица.Имя,
                Отчество:         info.КонтактныеЛица.Отчество,
                МобильныйТелефон: info.КонтактныеЛица.МобильныйТелефон,
                РабочийТелефон:   info.КонтактныеЛица.РабочийТелефон,
            })
            if(!res.error) {
                Store.dispatch({type: "profile", profile: res.data[0]})
                setEdit(false);
            } 
            setLoad(false)
        }
        
        const elem = <>
            <IonCard className='bg-1 pb-1 pr-card'
            >
            <IonLoading isOpen={ load } message="Подождите..." />
            <div className='ml-1 mr-1 mt-1 t-underline flex fl-space pb-05'> 
                <div>Контактное лицо</div>
                <IonButton
                    fill="clear"
                    onClick={()=>{ if( mode ) Save() }}
                >
                    <IonIcon icon = { edit ? createOutline : saveOutline } color={ mode ? "warning" : "light" } className='w-2 h-2' />
                </IonButton>
            </div>
            <div className={ edit ? "ml-1 mr-1 t-underline cl-blue" : "hidden"}>
                <FioSuggestions  token="50bfb3453a528d091723900fdae5ca5a30369832"
                    value={{ 
                        value: info?.КонтактныеЛица?.Фамилия + " " + info?.КонтактныеЛица?.Имя + " " + info?.КонтактныеЛица?.Отчество, 
                        unrestricted_value: info?.КонтактныеЛица?.Фамилия + " " + info?.КонтактныеЛица?.Имя + " " + info?.КонтактныеЛица?.Отчество,
                        data: {
                            surname:      info?.КонтактныеЛица?.Фамилия,
                            name:         info?.КонтактныеЛица?.Имя,
                            patronymic:   info?.КонтактныеЛица?.Отчество,
                            gender:       "MALE",
                            source:       null,
                            qc:           "0"
                        }
                    }}
                        onChange={(e)=>{
                        setMode(true)
                        info.КонтактныеЛица.Фамилия   = e?.data.surname;  
                        info.КонтактныеЛица.Имя       = e?.data.name;  
                        info.КонтактныеЛица.Отчество  = e?.data.patronymic;  
                        setEdit(false)
                    }}/>
            </div>
            <div  onClick={()=>{ setEdit(!edit) }} >
                <div className='flex fl-space ml-2 mt-1 mr-1'>
                    <div> Фамилия </div>
                    <div> { info?.КонтактныеЛица?.Фамилия }</div>
                </div>
                <div className='flex fl-space ml-2 mt-1 mr-1'>
                    <div> Имя  </div>
                    <div> { info?.КонтактныеЛица?.Имя }</div>
                </div>
                <div className='flex fl-space ml-2 mt-1 mr-1'>
                    <div> Отчество </div>
                    <div> { info?.КонтактныеЛица?.Отчество }</div>
                </div>
            </div>
            <div className='flex fl-space ml-2 mt-1 mr-1'>
                <div> Мобильный </div>
                {/* <div> { info?.КонтактныеЛица?.МобильныйТелефон }</div> */}
                <div className='pr-input pr-1'>
                    <MaskedInput
                    mask={[ '7','(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-',/\d/, /\d/]}
                    className="m-input "
                    value={ info?.КонтактныеЛица?.МобильныйТелефон }
                    autoComplete="off"
                    placeholder="7(___) ___-__-__"
                    id='1'
                    type='text'
                    onChange={(e: any) => {
                        info.КонтактныеЛица.МобильныйТелефон = e.target.value    
                        setInfo( info );
                        setMode( true )
                    }}
                    />                
                </div>
            </div>
            <div className='flex fl-space ml-2 mt-1 mr-1'>
                <div> Рабочий  </div>
                <div className='pr-input a-right pr-1'>
                    <MaskedInput
                        mask={[ '7','(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-',/\d/, /\d/]}
                        className="m-input "
                        value={ info?.КонтактныеЛица?.РабочийТелефон }
                        autoComplete="off"
                        placeholder="7(____) __-__-__"
                        id='2'
                        type='text'
                        onChange={(e: any) => {
                        info.КонтактныеЛица.РабочийТелефон = e.target.value    
                        setInfo( info );
                        setMode(true) 
                        }}
                    />
                </div>
            </div>
            </IonCard>
        </>
        return elem
    }

    function Login():JSX.Element {
        const [edit, setEdit] = useState(false)
        const [ load, setLoad] = useState(false);

        async function Save(){

        setLoad( true )
        const param = {
            token:  Store.getState().login.token,
            элПочта:        info.элПочта,
            Логин:          info.Логин,
            Пароль:         info.Пароль,
        }
        const res = await getData("jur_profile", param )
        console.log(res)
        if(!res.error) {
            Store.dispatch({type: "profile", profile: res.data[0]})
            setEdit(false);
        }
        setLoad(false)
        }

        const elem  = <>
        <IonLoading isOpen={ load } message="Подождите..."/>
        <IonCard className='bg-1 pb-1 pr-card'>
            <div className='ml-1 mr-1 mt-1 t-underline flex fl-space pb-05'> 
                <div>Логин</div>
                <IonButton
                    fill="clear"
                    onClick={()=>{ if( edit ) Save(); }}
                >
                    <IonIcon icon = { saveOutline } color={ edit ? "warning" : "light" } className='w-2 h-2' />
                </IonButton>
            </div>
            <div className='flex fl-space ml-2 mt-1 mr-1'>
                <div> элПочта </div>
                <div className='pr-input a-right pr-1'>
                <IonInput
                    class='pr-input-1'
                    value={ info?.элПочта }
                    placeholder="1234-WW-12"
                    onIonInput={(e: any) => {
                    info.элПочта = e.target.value    
                    setInfo( info );
                    setEdit(true)
                    }}
                />
                </div>
            </div>
            <div className='flex fl-space ml-2 mt-1 mr-1'>
                <div> Логин </div>
                <div className='pr-input a-right pr-1'>
                <IonInput
                    class='pr-input-1'
                    value={ info?.Логин }
                    placeholder="1234-WW-12"
                    onIonInput={(e: any) => {
                    info.Логин = e.target.value    
                    setInfo( info );
                    setEdit(true)
                    }}
                />
                </div>
            </div>
            <div className='flex fl-space ml-2 mt-1 mr-1'>
                <div> Пароль  </div>
                <div className='pr-input a-right pr-1'>
                <IonInput
                    class='pr-input-1'
                    value={ info?.Пароль }
                    placeholder="Пароль"
                    type='password'
                    onIonInput={(e: any) => {
                    info.Пароль = e.target.value    
                    setInfo( info );
                    setEdit(true)
                    }}
                />
                </div>
            </div>
        </IonCard>    
        </>

        return elem
    }

    function Page():JSX.Element {
        const[ edit,    setEdit ]   = useState( false ) 
        const[ load,    setLoad ]   = useState( false)
        const[ index,   setIndex ]  = useState( 0 )
    
        async function Save(){

            setLoad( true )

            if(info.Файлы.Устав.length > 1) {
                const pdf = await toPDF( info?.Файлы.Устав, "Устав.pdf" );
                info.Файлы.Устав = [ { dataUrl: pdf, format: "pdf" } ]
            } 
    
            if(info.Файлы.СвидГр.length > 1) {
                const pdf = await toPDF( info?.Файлы.СвидГр, "СвидГр.pdf" );
                info.Файлы.СвидГр = [ { dataUrl: pdf, format: "pdf" } ]
            } 
    
            if(info.Файлы.Карточка.length > 1) {
                const pdf = await toPDF( info?.Файлы.Карточка, "Карточка.pdf" );
                info.Файлы.Карточка = [ { dataUrl: pdf, format: "pdf" } ]
            } 
    
            if(info.Файлы.ЕГРЮЛ.length > 1) {
                const pdf = await toPDF( info?.Файлы.ЕГРЮЛ, "ЕГРЮЛ.pdf" );
                info.Файлы.ЕГРЮЛ =  [ { dataUrl: pdf, format: "pdf" } ]
            } 

            const param = {
                token: Store.getState().login.token,
                Устав:      info.Файлы.Устав,
                Карточка:   info.Файлы.Карточка,
                СвидГр:     info.Файлы.СвидГр,
                ЕГРЮЛ:      info.Файлы.ЕГРЮЛ,
            }
    
            const res = await getData("jur_profile", param)
            if(!res.error) setEdit( false ) 
            setLoad(false);
    
        }

    
        if(info === undefined || info === "") return <></>
        else {
            const elem = <>
                <IonCard className='bg-1 pb-1 pr-card'>
                    <IonLoading isOpen = { load } message= "Подождите" />

                    <div className="flex fl-space">
                        <div className=" ml-1 mt-1">
                            <IonChip color="light" className={ index === 0 ? "a-chip" : "" }  onClick={()=> setIndex( 0 )}> 1 </IonChip>
                            <IonChip color="light" className={ index === 1 ? "a-chip" : "" }  onClick={()=> setIndex( 1 )}> 2 </IonChip>
                            <IonChip color="light" className={ index === 2 ? "a-chip" : "" }  onClick={()=> setIndex( 2 )}> 3 </IonChip>
                        </div>
                        <IonButton
                            className="mt-1 mr-1"
                            fill="clear"
                            onClick={()=>{ if( edit ) Save(); }}
                        >
                            <IonIcon icon = { saveOutline } color={ edit ? "warning" : "light" } className='w-2 h-2' />
                        </IonButton>
                    </div>

                    <div className="ml-1 mt-1 ">
                        {
                            index === 0
                                ? <Files info = { info.Файлы.Устав }    name = { "Устав" }      check = { false }  title = { info?.ИНН.length > 10 ? "Копия паспорта" : "Устав" }/>
                            : index === 1
                                ? <Files info = { info.Файлы.Карточка } name = { "Карточка" }   check = { false }  title = { info?.ИНН.length > 10 ? "Карточка ИП" : "Карточка ЮЛ" }/>
                            : index === 2
                                ? <Files info = { info.Файлы.ЕГРЮЛ }    name = { "ЕГРЮЛ" }      check = { false }  title = { "ЕГРЮЛ" }/>
                            : <></>
                        }
                    </div>
                    <div className='ml-1 mr-1 mt-1 flex fl-space pb-05'> 
                        <div></div>
                    </div>
                </IonCard>
            </>
            return elem
        }
    }

    let  elem = <></>

    elem = <>

        <IonCard className='bg-1 pb-1 pr-card'>
            <div className='ml-1 mr-1 mt-1 t-underline'> Организация </div>
            <div className='flex fl-space ml-2 mt-1 mr-1'>
                <div> Наименование </div>
                <div className='a-right'> { info?.Наименование }</div>
            </div>
            <div className='flex fl-space ml-2 mt-1 mr-1'>
                <div> ИНН </div>
                <div> { info?.ИНН }</div>
            </div>
            <div className='flex fl-space ml-2 mt-1 mr-1'>
                <div> КПП </div>
                <div> { info?.КПП }</div>
            </div>
            <div className='flex fl-space ml-2 mt-1 mr-1'>
                <div> Куратор </div>
                <div className='a-right'> { info?.Куратор }</div>
            </div>
        </IonCard>

        <Person />

        <Login /> 

        <Page />


    </>
    return elem
}