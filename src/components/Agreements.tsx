
import { IonAlert, IonButton, IonCard, IonCardHeader, IonIcon, IonImg, IonInput, IonLabel, IonLoading, IonModal, isPlatform } from "@ionic/react"
import React, { useEffect, useState } from "react"
import { Store, getData, getDogs } from "./Store"
import "./Agreements.css"
import { checkmarkCircleOutline, closeCircleOutline, listCircleOutline, saveOutline } from "ionicons/icons"
import { MobilePDFReader } from 'react-read-pdf';

interface i_counter {
    id:         string,
    value:      number,
}

interface i_object {
    id:         string
    counters:   Array<i_counter>
}

interface i_params {
    id:         string,
    objects:    Array<i_object>
}

interface i_agree {
    token:      string,
    id:         string,
    agreements: Array<i_params>
}

export function Agreements():JSX.Element {
    const [ info,       setInfo]        = useState<any>([])
    const [ invoices,   setInvoices]    = useState<any>([])
    const [ messages,   setMessages]    = useState<any>([])
    const [ load,       setLoad ]       = useState( false );    
    const [ invoice,    setInvoice ]    = useState("");

    function Item(props:{ info }):JSX.Element {
        const [ page, setPage ] = useState( true )
        const info = props.info
    
        async function Save() {

            setLoad( true)
            const param: i_agree = {
                token:      Store.getState().login.token,
                id:         info.id,
                agreements: [{ 
                    id:         info.id, 
                    objects:    info.objects.map((e)=>{
                                    return { id: e.objectId, counters: e.counters.map((c)=>{
                                        if(c.indice === undefined) return null
                                        if(c.indice === c.Indication) return null
                                        return { id: c.Id, value: c.indice }
                                    })}
                                })
                    }
                ]
            }

            param.agreements[0].objects.forEach(obj => {
                let jarr: any = []
                obj.counters.forEach((elem, ind) => {
                    if( elem !== null) jarr = [...jarr, elem ]
                });
                obj.counters = jarr;
            });

            let i = 0;
            while( param.agreements[0].objects.length > i) {
                if( param.agreements[0].objects[i].counters.length === 0)
                    param.agreements[0].objects.splice(i, 1)
                else i = i + 1;
            }

            if(param.agreements[0].objects.length > 0) { 
                const res = await getData("jur_indications", param )
                console.log(res)
                let arr: any = []
                res.forEach(contr => {
                    contr.data.forEach(elem => {
                        arr = [...arr, { error: elem.error, message: elem.message }]
                    });  
                    

                    setMessages( arr )

                    getDogs()

                }); 
            }

            setLoad(false)
        }

        function Objects(props: { info }):JSX.Element {
            const info = props.info

            function Object(props: { info }):JSX.Element {
            
                function Counter(props: { info }):JSX.Element {
                    const [ delta, setDelta ] = useState("")
                    const elem = <>
                        <div className="mt-1 ml-2">
                            <div>{ props.info.counter }</div>
                        </div>
                        {
                            props.info.srok === 0
                                ?   <>
                                        <div className="mt-1 ml-3 flex fl-space">
                                            <div className="cl-gray">{ "Срок поверки" }</div>
                                            <div>{ props.info.dateEnd }</div>
                                            <div className="w-40"></div>
                                        </div>
                                    </>
                            : props.info.srok === 1
                                ?   <>
                                        <div className="mt-1 ml-3 flex fl-space">
                                            <div className="cl-gray"> 
                                                {                                                
                                                    "Срок поверки счетчика истекает, необходимо произвести поверку или замену счетчика до " + props.info.dateEnd + " с предварительным снятием пломбы в присутствии уполномоченного представителя УСД, сдать счетчик на приемку к коммерческому учету уполномоченному представителю УСД после поверки или замены"
                                                }
                                            </div>
                                        </div>
                                    </>
                                :   <>
                                        <div className="mt-1 ml-3 flex fl-space">
                                            <div className="cl-red"> 
                                                {                                                
                                                    "Срок поверки счетчика истек " + props.info.dateEnd + ", необходимо произвести замену счетчика с предварительным снятием пломбы в присутствии уполномоченного представителя УСД, сдать счетчик на приемку к коммерческому учету уполномоченному представителю УСД после замены"
                                                }
                                            </div>
                                        </div>
                                    </>

                        }
                        {
                            props.info.srok !== 2 
                                ? <>
                                    <div className="mt-1 ml-3 flex fl-space">
                                        <div className="cl-gray">{ "Показания" }</div>
                                        <div>{ props.info.Indication }</div>
                                        <div className="w-40 flex fl-space">
                                            <div className="a-input">
                                                <IonInput
                                                    class="ml-1 a-input"
                                                    type= "number"                               
                                                    placeholder="Показание"
                                                    debounce={ 500 }
                                                    value={ props.info.indice === undefined ? props.info.Indication : props.info.indice}
                                                    onIonInput={(e)=>{
                                                        props.info.indice = e.detail.value;
                                                        props.info.indice = parseInt( e.detail.value  as string)    
                    
                                                        if((props.info.indice - props.info.Indication) < 0) setDelta("")
                                                        else if((props.info.indice - props.info.Indication) <= 100000)    
                                                            setDelta( "+" + (props.info.indice - props.info.Indication).toString())
                                                        else {
                                                            props.info.indice = props.info.Indication
                                                            setDelta("")     
                                                        }
                                                            
                        
                                                    }}
                                                    />
                                            </div>
                                            <div className="w-30 a-right">
                                                { delta }
                                            </div>
                                        </div>
                                    </div>
                                </> 
                                : <></>

                        }
                    </>
                    return elem
                }
        
                let items = <></>
                for(let i = 0; i < props.info.counters?.length; i++){
                    items = <>
                        { items }
                        <Counter info = { props.info.counters[i] }/>
                    </>
                }
                
                const elem = <>
                    <div className="mt-1 t-underline"> <b> { props.info.object + ", " + props.info.address  } </b></div>
                    <div className="mt-1 ml-1"> <b> Счетчики </b></div>
                        { items }
                </>
                return elem
            }

            let elem = <>
            </>
            for(let i = 0; i < info.objects.length; i++) {
                elem = <>
                    { elem }
                    <Object info={ info.objects[i] } />
                </>    
            }

            return elem
        }


        function Invoices(props: { invoices }):JSX.Element {
            const invoices = props.invoices;
            let elem  = <>
                <div>
                </div>
            </>

            async function getImg( id: string) {
                setLoad(true)
                const res = await getData("jur_invoice_image", {
                    token : Store.getState().login.token,
                    id: id,
                })
                console.log( id )
                if(!res.error) setInvoice( res.data )
                setLoad(false)
            }
            
            for(let i = 0; i < invoices.length; i++) {
                if( invoices[i].agreement.id === info.id)
                    elem = <>
                        { elem }
                        <div className="mt-1 t-underline flex fl-space"> <b> Выставленный счет </b> <b> { invoices[i].number} </b></div>
                        <div className="mt-1 ml-1 flex">
                            <div className="w-30 flex">
                                <IonButton
                                    className="w-60 h-60"
                                    fill = "clear"
                                    onClick={()=>{
                                        getImg( invoices[i].id )
                                    }}
                                >
                                    <IonImg src="assets\extBill.png" alt="" className="w-100 h-100"/>
                                </IonButton>
                                
                            </div>
                            <div className="w-70">
                                <div className="flex fl-space">
                                    <span>Дата</span>
                                    { invoices[i].date}
                                </div>
                                <div className="flex fl-space mt-1">
                                    <span>Сумма</span>
                                    { 
                                        new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format( invoices[i].summ  )
                                    }
                                </div>
                            </div>
                        </div>
                    </>
            }

            return elem
        }
    
    
        const elem = <>
            <IonCard className="a-card">
                <div> <h4> { info.name } </h4></div>
                <div className="flex fl-space ml-1"> 
                    <div className="cl-gray">Тип договора</div>
                    <div>{ info.type }</div>
                </div>
                <div className="flex fl-space mt-1 pb-1 ml-1"> 
                    <div className="cl-gray">
                       { info.debt < 0 ? "Аванс" : "Задолженность"}
                    </div>
                    <div className={ info.debt < 0 ? "cl-green fs-12" : "fs-12"}> 
                        <b>{ 
                            new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format( info.debt < 0 ? -info.debt : info.debt  )
                        }</b>
                    </div>
                </div>
                    {   
                        page  
                            ? <Invoices invoices = { invoices }/>
                            : <Objects info = { info }/> 
                    }
                <div className="flex fl-space mt-1">
                    <div className={ info?.objects?.length > 0 ? "" : "hidden"}>
                        <IonButton
                            onClick={()=> setPage( !page )}
                        >
                            <IonIcon  icon = { listCircleOutline } slot="icon-only"/>
                            <IonLabel class="ml-1"> { page ? "Объекты" : "Счета" } </IonLabel>
                        </IonButton>
                    </div>
                    <div>
                        <IonButton
                            className={ 
                                    info.type === "Договор на поставку газа" 
                                        ? page ? "hidden" : ""
                                        : "hidden"}
                            onClick={()=>{
                                Save()
                            }}
                        >
                            <IonIcon  icon = { saveOutline } slot="icon-only"/>
                            <IonLabel class="ml-1"> Сохранить </IonLabel>
                        </IonButton>
                    </div>
                </div>
            </IonCard>
        </>
        return elem
    }

    Store.subscribe({num: 11, type: "dogs", func: ()=>{
        setInfo( Store.getState().dogs)
    }})

    Store.subscribe({num: 12, type: "invoices", func: ()=>{
        setInvoices( Store.getState().invoices)
    }})

    useEffect(()=>{
        setInfo( Store.getState().dogs)
        setInvoices( Store.getState().invoices)
    },[])

    let items = <></>
    for( let i= 0; i < info.length; i++ ){
        items = <>
            { items }
            <Item  info = { info[i] }/>
        </>
    }

    const elem = <>
        <div>
            <IonLoading isOpen = { load } message= "Подождите"/>
            { items }  
        </div>

        <IonModal
            isOpen={ messages.length > 0}
            onDidDismiss={() => setMessages([])}            
            className="a-modal"
      >
        <div className="w-100">
            { 
                messages.map((el)=>{
                    const elem = <>
                        <div className="fs-09 ml-1 mt-1 mr-4">
                            { el.message.split(" - ")[0] }
                        </div>
                        <div className="flex fs-09 mt-1 fl-left">
                            <IonIcon icon={ el.error ? closeCircleOutline : checkmarkCircleOutline } className= { el.error ? "h-15 w-10 cl-red" : "h-15 w-10 cl-green"}></IonIcon> 
                            <div className={ el.error ? "cl-red w-90" : "cl-green w-90"}> 
                                { el.message.split(" - ")[1] }
                            </div>
                        </div>
                    </>
                    return elem
                }) 
            }
        </div>
        </IonModal>
        
        <IonModal
            isOpen={ invoice !== "" }
            onDidDismiss={() => setInvoice( "" )}            
            className="a-modal"
      >
        <div className="w-100 h-100">
                {  
                    isPlatform("ios")
                        ? <MobilePDFReader url={ invoice }/> 
                        :  isPlatform("android")
                            ? <MobilePDFReader url={ invoice }/> 
                            : <iframe title="pdf" src = { invoice } className="w-100 h-100"/>
                }
            <iframe title="pdf" src = { invoice } className="w-100 h-100"/>
        </div>
        </IonModal>
        
    </>
    return elem
}

