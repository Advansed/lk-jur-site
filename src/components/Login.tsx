import React, { useEffect, useState } from "react"
import { Store, getData, version } from "./Store"
import "./Login.css"
import { IonAlert, IonButton, IonCard, IonCheckbox, IonChip, IonInput, IonLabel, IonLoading, IonModal, isPlatform } from "@ionic/react"
import { PartySuggestions  } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import { Files, toPDF } from "./Files";

export function Login( ):JSX.Element {
    const [ reg,        setReg]     = useState( Store.getState().reg )
    
    Store.subscribe({ num: 61, type: "reg", func: ()=>{
        setReg( Store.getState().reg ) 
    }})

    useEffect(()=>{
        setReg( Store.getState().reg ) 
        return ()=>{
            Store.unSubscribe( 61 )
        }
    },[])



    if(reg)
        return <Registration />            
    else
        return <Authorization />

}

export function Registration():JSX.Element {
    const [ info, setInfo ] = useState<any>({

        Контрагент:                 "",
        ИНН:                        "",
        Наименование:               "",
        КонтактныйТелефон:          "",
        элПочта:                    "",
        Фамилия:                    "",
        Имя:                        "",
        Отчество:                   "",

        Файлы: {
            Устав:                      [],
            Карточка:                   [], 
        },

        Согласие:                false, 
    })
    const [ alert,      setAlert ]      = useState( false )
    const [ page,       setPage ]       = useState( 0 )
    const [ upd,        setUpd ]        = useState( 0 )
    const [ modal,      setModal ]      = useState<any>()
    const [ load,       setLoad ]       = useState( false)

    const [ messages,   setMessages ] = useState<any>([])

    async function Save(){

        setLoad( true )

         if(info.Файлы.Устав.length > 1) {
             const pdf = await toPDF( info.Файлы.Устав, "Устав.pdf" );
             info.Файлы.Устав = [ pdf ]
         } 


        if(info.Файлы.Карточка.length > 1) {
            const pdf = await toPDF( info.Файлы.Карточка, "Карточка.pdf" );
            info.Файлы.Карточка = [ pdf ]
        } 



        const res = await getData("jur_registration", info)
        if(!res.error){
            setAlert( true )
            
        } else {
            setMessages([ res.message])

        }

        setLoad(false);

    }
    
    function test(){
        console.log("test " + page)
        console.log( info )
        let jarr: any = []
        if(page === 0) {
            if(info.ИНН === "") jarr = [...jarr, "Заполните ИНН"]
            if(info.КонтактныйТелефон === "") jarr = [...jarr, "Заполните контактный телефон"]
            if(info.элПочта === "") jarr = [...jarr, "Заполните электронную почту"]
            if(!info.Согласие ) jarr = [...jarr, "Нужно согласие на обработку персональных данных"]

            if( jarr.length > 0 ) {
                setMessages( jarr)
                return false
            } 
        }  else {
            if(info.ИНН.length > 10) {
                if(info.Файлы.Устав.length === 0) jarr = [...jarr, "Прикрепите копия паспорта"]
                if(info.Файлы.Карточка.length === 0) jarr = [...jarr, "Прикрепите карточку ИП (юр. адрес, конт.тел. эл. почта, р/с, ОКВЭД)"]
            } else {
                if(info.Файлы.Устав.length === 0) jarr = [...jarr, "Прикрепите устав предприятия"]
                if(info.Файлы.Карточка.length === 0) jarr = [...jarr, "Прикрепите карточку ЮЛ (юр. адрес, конт.тел. эл. почта, р/с, ОКВЭД)"]
            }
            if( jarr.length > 0 ) {
                setMessages( jarr)
                console.log( jarr )
                return false
            } 
        } 
        return true      
    }

    function Page1():JSX.Element {
        let elem = <></>

        elem = <>
            <IonCard className="l-card-1 pb-1">
                <div className="ml-2 mt-1 mr-2">
                    <IonLabel> <b>Введите свой ИНН</b> </IonLabel>
                    <div className="cl-prim">
                        <PartySuggestions 
                            token="23de02cd2b41dbb9951f8991a41b808f4398ec6e"
                            value={ info.Контрагент }
                            onChange={(e)=>{
                                console.log(e)
                                info.Контрагент = e
                                info.ИНН = e?.data.inn   
                                info.Наименование = e?.value

                                if((e as any)?.data?.fio !== undefined){
                                    info.Имя        = (e as any)?.data.fio.name
                                    info.Фамилия    = (e as any)?.data.fio.surname
                                    info.Отчество   = (e as any)?.data.fio.patronymic

                                }

                                setInfo( info )
                                setUpd( upd + 1) 
                            }}  
                        />
                    </div>
                </div>
                <div className="ml-2 mt-1 mr-2">
                    <IonLabel>Контактная информация</IonLabel>
                    <div className="borders-wp pl-1 ml-1 mt-1 bg-2">
                        <IonInput
                            type="text"
                            value={ info.КонтактныйТелефон }
                            placeholder="Контактный телефон"
                            onIonChange={(e)=>{
                                info.КонтактныйТелефон = e.target.value
                            }}
                        />
                    </div>
                    <div className="borders-wp mt-1 pl-1 ml-1 bg-2">
                        <IonInput
                            type="text"
                            value = { info.элПочта }
                            placeholder="e-mail"
                            onIonChange={(e)=>{
                                info.элПочта = e.target.value
                            }}
                        />
                    </div>
                </div>
                <div className="ml-2 mr-1 pt-1">
                    <IonCheckbox
                        justify="start"
                        labelPlacement="end"
                        mode="ios"
                        className="l-checkbox"
                        value={ info.terms }
                        onIonChange={(e)=>{
                            info.Согласие = e.detail.checked
                        }}
                    >
                        <span className="wrap">Согласен(-на) на обработку персональных данных</span>
                    </IonCheckbox>
                </div>

                { 
                    messages.map((e, ind) =>{
                        return <p className="cl-red ml-2" key= { ind }>{ e } </p>
                    })
                }

                <div className="flex fl-space mr-1 ml-1 mt-1">
                    <div>
                        <IonButton
                            className={ page === 0 ? "hidden" : ""}
                            onClick={()=>{
                                 setPage(page - 1)
                            }}
                        >
                            Назад
                        </IonButton>
                    </div>
                    <div>
                        <IonButton
                            className={ page === 2 ? "hidden" : ""}
                            onClick={()=>{
                                if( test() ) {  
                                    setPage(page + 1)
                                    setMessages( [] )
                                }
                            }}
                        >
                            Далее
                        </IonButton>
                    </div>
                </div>

            </IonCard>       
        </>

        return elem
    }
    
    function Page2():JSX.Element {
        const [ index, setIndex] = useState(0)
        let elem = <></>

        elem = <>
            <IonCard className="l-card-1 pb-1">
                <div className=" ml-1 mt-1">
                    <IonChip color="light" className={ index === 0 ? "a-chip" : "" }  onClick={()=> setIndex( 0 )}> 1 </IonChip>
                    <IonChip color="light" className={ index === 1 ? "a-chip" : "" }  onClick={()=> setIndex( 1 )}> 2 </IonChip>
                </div>

                <div className="ml-1 mt-1">
                    {
                        index === 0
                            ? <Files info = { { Имя: "Устав", Описание: info?.ИНН?.length > 10 ? "Копия паспорта" : "Доверенность либо приказ (письменное уполномочие права на официальное представление от имени организации)", Обязателен: false, Файлы: info.Файлы["Устав"]}}/>
                        : index === 1
                            ? <Files info = { { Имя: "Карточка", Описание: info?.ИНН?.length > 10 ? "Карточка ИП (юр. адрес, конт.тел. эл. почта, р/с, ОКВЭД)" : "Карточка ЮЛ (юр. адрес, конт.тел. эл. почта, р/с, ОКВЭД)", Обязателен: false, Файлы: info.Файлы["Карточка"]}}/>
                        : <></>
                    }
                </div>
                { 
                    messages.map((e, ind) =>{
                        return <p className="cl-red ml-2" key= { ind }>{ e } </p>
                    })
                }

                <div className="flex fl-space mr-1 ml-1 mt-1">
                    <div>
                        <IonButton
                            className={ page === 0 ? "hidden" : ""}
                            onClick={()=>{
                                if( index === 1)
                                    setIndex(0)
                                else setPage(page - 1)
                            }}
                        >
                            Назад
                        </IonButton>
                    </div>
                    <div>
                        <IonButton
                            className={ page === 2 ? "hidden" : ""}
                            onClick={()=>{
                                if( page === 0) {
                                    if( test() ) {  
                                        setPage(page + 1)
                                        setMessages( [] )
                                    }
                                } else {
                                    if(index < 1 ) setIndex( 1 )
                                    else 
                                        if( test() ){
                                            Save()
                                            setMessages( [] )
                                        }
                                }
                            }}
                        >
                            { 
                                page === 1 
                                    ? index === 1 
                                        ? "Отправить" 
                                        : "Далее"
                                    : "Далее" 
                                
                            }  
                        </IonButton>
                    </div>
                </div>

            </IonCard>       
        </>

        return elem
    }
    
    function Page3():JSX.Element {
        let elem = <></>

        elem = <>
            <IonCard className="l-card pb-1">

                { 
                    messages.map((e, ind) =>{
                        return <p className="cl-red ml-2" key= { ind }>{ e } </p>
                    })
                }

                <div className="flex fl-space mr-1 ml-1">
                    <div>
                        <IonButton
                            className={ page === 0 ? "hidden" : ""}
                            onClick={()=>{
                                 setPage(page - 1)
                            }}
                        >
                            Назад
                        </IonButton>
                    </div>
                    <div>
                        <IonButton
                            className={ page === 2 ? "hidden" : ""}
                            onClick={()=>{
                                if( test() ) {  
                                    setPage(page + 1)
                                    setMessages( [] )
                                }
                            }}
                        >
                            Далее
                        </IonButton>
                    </div>
                </div>

            </IonCard>       
        </>

        return elem
    }
    
    const elem = <>
        <IonLoading message = "Подождите" isOpen = { load } />
        <div className={ isPlatform("ios") ? "l-content mt-3" : "l-content" }>
            <div className="p-page mr-auto ml-auto">
            <IonCard className="l-card-1 mt-2 pb-1">
                <div className="flex ml-1 mt-1 fs-bold"> У вас уже есть аккаунт? 
                    <span className="t-underline ml-1 cl-yellow"
                        onClick={()=>{ 
                            Store.dispatch({ type: "reg", reg: false})
                        }}
                    >
                        Авторизуйтесь
                    </span>
                    <div className="l-icon ml-1">
                        <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.9999 3.00409H3.4099L4.7099 1.71409C4.8982 1.52579 5.00399 1.27039 5.00399 1.00409C5.00399 0.73779 4.8982 0.482395 4.7099 0.294092C4.52159 0.105788 4.2662 1.9841e-09 3.9999 0C3.73359 -1.9841e-09 3.4782 0.105788 3.2899 0.294092L0.289896 3.29409C0.198856 3.3892 0.127491 3.50134 0.0798963 3.62409C-0.0201217 3.86755 -0.0201217 4.14063 0.0798963 4.38409C0.127491 4.50684 0.198856 4.61899 0.289896 4.71409L3.2899 7.71409C3.38286 7.80782 3.49346 7.88221 3.61532 7.93298C3.73718 7.98375 3.86788 8.00989 3.9999 8.00989C4.13191 8.00989 4.26261 7.98375 4.38447 7.93298C4.50633 7.88221 4.61693 7.80782 4.7099 7.71409C4.80363 7.62113 4.87802 7.51053 4.92879 7.38867C4.97956 7.26681 5.00569 7.1361 5.00569 7.00409C5.00569 6.87208 4.97956 6.74137 4.92879 6.61951C4.87802 6.49766 4.80363 6.38705 4.7099 6.29409L3.4099 5.00409H12.9999C13.2651 5.00409 13.5195 5.10945 13.707 5.29699C13.8945 5.48452 13.9999 5.73888 13.9999 6.00409V11.0041C13.9999 11.2693 14.1053 11.5237 14.2928 11.7112C14.4803 11.8987 14.7347 12.0041 14.9999 12.0041C15.2651 12.0041 15.5195 11.8987 15.707 11.7112C15.8945 11.5237 15.9999 11.2693 15.9999 11.0041V6.00409C15.9999 5.20844 15.6838 4.44538 15.1212 3.88277C14.5586 3.32016 13.7955 3.00409 12.9999 3.00409Z" 
                            className="l-icon_font_mute"></path>
                        </svg>
                    </div>            
                </div>
                <div className="flex fl-center">
                    <img src="assets/logo2.1c3a9d80.svg" alt="" className="mt-2 ml-auto mr-auto"/>
                </div>
                <div className="a-center fs-bold mt-1">Регистрация</div>
            </IonCard>

            {
                page === 0 
                    ? <Page1 />
                : info.ИНН > 10 
                    ? <Page2 />
                    : <Page3 />
            }
            </div>
        </div>    

        <IonAlert
            isOpen = { alert }
            onDidDismiss={ ()=> setAlert(false) }
            header="Успех"
//            subHeader="Important message"
            message= "Заявка на создание личного кабинета принята. Ожидайте статус заявки в эл. почте"
            buttons={[
                {
                    text: 'OK',
                    role: 'confirm',
                    handler: () => {
                        Store.dispatch({ type: "reg", reg: false})
                    }
                        
                },
            ]}
        ></IonAlert>

        <IonModal
            className="w-100 h-100"
            isOpen = { modal !== undefined }
            onDidDismiss={ () => setModal( undefined )}
        >
            <div className="w-100 h-100">
                { modal?.format === "pdf" 
                    ? <iframe title="pdf" src = { modal?.dataUrl } className="w-100 h-100"/>
                    : <img src={ modal?.dataUrl } alt = "" />
                }
            </div>
        </IonModal>
    </>

    return elem
}

export function Authorization() {
    const [ info,       setInfo]    = useState({ login: "", password: "", email: "", version: version, mode: "android"})
    const [ upd,        setUpd]     = useState(0)
    const [ message,    setMessage] = useState<any>()
    const [ load,       setLoad]    = useState( false )
    const [ page,       setPage]    = useState( 0 )

    async function Auth() {
        setLoad( true)
        if (info?.password === "" || info?.login === "") {
            console.log( info )
            info.login = "";info.password = ""
            setInfo(info)      
            setMessage({ header: "Проверка", message: "Заполните все поля!" });
        } else {

            const  res = await getData("jur_login", info)
            console.log(res)
            if(!res.error){

                localStorage.setItem( "stngjur.phone", info.login )
                localStorage.setItem( "stngjur.pass", info.password )

                Store.dispatch({type: "login", login: res.data})    
                Store.dispatch({type: "auth", auth: true })

            } else { 

                info.login = "";info.password = ""
                setInfo(info)      
    
                setUpd(upd + 1);
            }
        }

        setLoad(false)
    }

    async function Restore() {
        setLoad( true)
        if (info?.email === "" ) {
            console.log( info )
            setMessage({ header: "Проверка", message: "Введите эл. почту" });
        } else {

            const  res = await getData("jur_restore", info)
            console.log(res)
            if(!res.error){
                info.email = ""
                setMessage( res.message )
                setPage( 2 )

            } else { 
                info.email = ""
                setMessage( res.message )
                setPage( 3 )
            }
        }

        setLoad(false)
    }

    useEffect(()=>{

        const login = localStorage.getItem("stngjur.phone") 
        const pass = localStorage.getItem("stngjur.pass") 

        if( login !== null && pass !== null){
            info.login = login; info.password = pass
            setInfo( info )
            //Auth()
        }   

    },[])

    const elem = <>
        <IonLoading isOpen= { load } message={ "Подождите..."}/>
        <div className={ isPlatform("ios") ? "l-content mt-3" : "l-content" }>
            <div className="p-page ml-auto mr-auto">
            <div className="l-card pb-1 ml-auto mr-auto">
                <div className="flex fl-center borders mt-1">
                    <div className="ml-1 mt-1 pb-1 fs-bold"> 
                        Еще нет аккаунта?
                    </div>
            
                    <b className="fs-bold a-link" onClick={ ()=> Store.dispatch({ type: "reg", reg: true }) }>Зарегистрируйтесь</b>        

                </div>
            </div>
            <div>
                <div className=" mt-1 pb-2">

                    <div className="flex fl-center">
                        <img src="assets/logo2.1c3a9d80.svg" alt="" className="mt-2 ml-auto mr-auto"/>
                    </div>

                    <div className="a-center fs-bold mt-1 cl-prim">Авторизация</div>

                </div>
            </div>
            {
                page === 0 ? <>
                    <div>
                        <div className="ml-2 mr-2 mt-2 l-bg1 pl-1 pr-1">
                            <IonInput 
                                type = "text"
                                placeholder="Логин"
                                class="cl-prim fs-bold"
                                value= { info.login }
                                onIonChange={(e)=>{
                                    info.login = e.target.value as string;
                                    setInfo(info)
                                }}
                            />
                        </div>

                        <div className=" flex ml-2 mr-2 mt-1 l-bg1 pl-1 pr-1">
                            <IonInput 
                                type = "password"
                                placeholder="Пароль"
                                class="cl-prim fs-bold"
                                value= { info.password }
                                onIonChange={(e)=>{
                                    info.password = e.target.value as string;
                                    setInfo(info)
                                }}
                            />
                        </div>

                        <p>{ message }</p>

                        <IonButton
                            className="ml-2 mr-2 mt-1 "
                            expand="block"
                            color="tertiary"
                            mode="ios"
                            onClick={()=>{
                                Auth()
                                console.log("auth")
                            }}
                        >
                            Войти
                        </IonButton>     
                        <div>
                            <IonButton className="l-textURL ion-text-wrap" fill="clear"
                                onClick={()=>{ setPage( 1 )}}
                            > Забыли пароль? 
                            </IonButton>
                        </div>
                       
                    </div>
                </>
                :page === 1 ? <>
                    <div className="cl-prim">
                        <div className=" flex ml-2 mr-2 mt-1 l-bg1 pl-1 pr-1">
                            <IonInput 
                                type = "text"
                                placeholder="Эл. почта"
                                class="cl-prim fs-bold"
                                value= { info.email }
                                onIonChange={(e)=>{
                                    info.email = e.target.value as string;
                                    setInfo(info)
                                }}
                            />
                            
                        </div>

                        <div className="flex ml-2 mr-2">

                            <IonButton
                                className="mt-1 w-50"
                                expand="block"
                                color="tertiary"
                                mode="ios"
                                onClick={()=>{
                                    setPage( 0 )
                                }}
                            >
                                Отмена
                            </IonButton>     
                            <IonButton
                                className="mt-1 w-50"
                                expand="block"
                                color="tertiary"
                                mode="ios"
                                onClick={()=>{
                                    Restore()
                                }}
                            >
                                Отправить
                            </IonButton>     
                        </div>

                    </div>
                </>
                :page === 2 ? <>
                    <div>
                        <IonCard className="bg-1 pb-1">
                            <div className="ml-1 mt-1 fs-11"> <b>Результат запроса:</b> </div>
                            <div>
                                <p className="ml-2 fs-12"> { " - " +  message }</p>  
                            </div>
                            <div>
                                <IonButton
                                    className="ml-1 mr-1 mt-1 "
                                    expand="block"
                                    color="primary"
                                    mode="ios"
                                    onClick={()=>{
                                        setPage(0)
                                    }}
                                >
                                    Закрыть
                                </IonButton>                                 
                            </div>
                        </IonCard>
                    </div>
                </>
                : <>
                    <div>
                        <IonCard className="bg-1 pb-1">
                            <div className="ml-1 mt-1 fs-11"> <b>Что то пошло не так...</b> </div>
                            <div>
                                <p className="ml-2 fs-12"> { " - " +  message }</p>  
                            </div>
                            <div>
                                <IonButton
                                    className="ml-1 mr-1 mt-1 "
                                    expand="block"
                                    color="primary"
                                    mode="ios"
                                    onClick={()=>{
                                        setPage(1)
                                    }}
                                >
                                    Закрыть
                                </IonButton>                                 
                            </div>
                        </IonCard>
                    </div>
                </>
            }
            </div>
        </div>
    </>

    return elem
}