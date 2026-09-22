import React, { useEffect, useState } from "react"
import { useProfileStore } from "../Profile/profileStore"
import { IonButton, IonCard, IonContent, IonIcon, IonImg, IonInput, IonLoading, IonModal, IonPopover, isPlatform } from "@ionic/react"
import { chevronDown, chevronForward, mailUnreadOutline, newspaperOutline } from "ionicons/icons";
import { PDFDoc } from "../Files";
import {
    useActSverki,
    loadActsverkiImage,
    loadDocAct,
    loadDocSf,
    loadInvoiceImage,
    sendInvoiceMail,
} from "./useActSverki"

export function ActSverki():JSX.Element {
    const { invoices, docs, actsverki } = useActSverki()
    const[ load, setLoad ] = useState( false) 
    const [ modal, setModal ] = useState<any>()
    const [ localAct, setLocalAct ] = useState( actsverki )

    useEffect(() => {
        setLocalAct(actsverki)
    }, [actsverki])

    async function loadAct(){
        if( !localAct ){
            setLoad( true)
            const data = await loadActsverkiImage()
            if(data) {
                setLocalAct(data)
                setModal({ image: data, name: "АктСверки", title: "Акт сверки"})
            }
            setLoad( false )    
        } else {
            setModal({ image: localAct, name: "АктСверки", title: "Акт сверки"})
        }
    }

    async function loadAct1( doc ){
        if( doc.act === undefined ){
            setLoad( true)
            const data = await loadDocAct(doc.ГУИД)
            if(data) {
                doc.act = data
                setModal({ image: doc.act, name: "АктВыпРабот", title: "Акт выполненных работ"})
            }
            setLoad( false )    
        } else {
            setModal({ image: doc.act, name: "АктСверки", title: "Акт сверки"})
        }
    }

    async function loadAct2( doc ){
        if( doc.sf === undefined ){
            setLoad( true)
            const data = await loadDocSf(doc.ГУИД)
            if(data) {
                doc.sf = data
                setModal({ image: doc.sf, name: "СчетФактура", title: "Счет-фактура"})
            }
            setLoad( false )    
        } else {
            setModal({ image: doc.sf, name: "СчетФактура", title: "Счет-фактура"})
        }
    }

    const elem = <>
        <IonLoading isOpen={ load } message= "Подождите..."/>
        
        <div className="mr-auto ml-auto p-page">
            <div className="w-95 h-80">
                <div className="flex fl-space ml-1 mt-1">
                    <IonButton
                        color={ "tertiary" }
                        onClick={()=>{
                            loadAct()
                        }}
                    >
                        Aкт сверки
                    </IonButton>
                </div>
            </div>
        </div>

        <Invoices invoices = { invoices || [] }/>

        <Docs info = { docs } func1={ loadAct1 } func2 = { loadAct2 } />

       <IonModal
            className="a-modal"
            isOpen = { modal !== undefined }
            onDidDismiss={ () => setModal( undefined )}
        >
            <div className="w-100 h-100">
                {  
                    isPlatform("ios")
                        ? <PDFDoc url = { modal?.image } name = { modal?.name } title = { modal?.title }/>
                        :  isPlatform("android")
                            ? <PDFDoc url = { modal?.image } name = { modal?.name } title = { modal?.title }/>
                            : <iframe title="pdf" src = { modal?.image } className="w-100 h-100"/>
                }
            </div>
        </IonModal>
    </>

    return elem
}

function Docs(props:{ info, func1, func2 }){
    const [ expand, setExpand ] = useState( false )
    const info = props.info

    let items = <></>

    if( info !== undefined && info !== null ){
        for( let i = 0; i < info.length; i++){
            let dogs = <></>
            for(let j = 0; j < info[i].Документы.length;j++){
                const doc = info[i].Документы[j]
                dogs = <>
                    { dogs }
                    <Doc info = { doc } func1 = { props.func1 } func2 = { props.func2 }/>
                </>
            }
            items = <>
                { items }
                <div className="ml-1 mt-1 cl-prim">
                    <div className="mr-1 flex fl-space"
                        onClick={()=>{ setExpand(!expand) }}
                    >
                        <div> <b>{ info[i].Договор }</b></div>    
                        <IonIcon icon = { expand ? chevronDown : chevronForward }/>
                    </div>
                    
                    {   
                     expand 
                        ? dogs 
                        : <></>
                    }
                </div>
            </>
        }
    }
    return items
}


function Doc(props:{ info, func1, func2 }){
    const  doc = props.info
    const elem = <>
        <IonCard className="bg-1 pt-1 pr-1 pb-1 a-card">
            <div>{ doc.Документ }</div>
            <div className="flex">
                <div className="w-50">
                    <IonButton
                        expand="block"
                        mode = "ios"
                        onClick={()=>{
                            props.func1( doc )                                
                        }}
                    >
                        Акт
                    </IonButton>
                </div>
                <div className="w-50">
                    <IonButton
                        expand="block"
                        mode = "ios"
                        onClick={()=>{
                            props.func2( doc )    
                        }}
                    >
                        Счет-Фактура
                    </IonButton>
                </div>
            </div>
        </IonCard>
    </>

    return elem

}

function Invoices(props: { invoices }):JSX.Element {
    const [ load, setLoad ] = useState( false )
    const [ messages, setMessages ] = useState("")
    const [ invoice, setInvoice ] = useState("")
    const [ expand, setExpand ] = useState( false )
    const invoices = props.invoices || [];
    let elem  = <></>

    function Mail(props: { id }) {
        const [ mail, setMail ] = useState( "" )

        useEffect(()=>{ setMail(useProfileStore.getState().profile?.Логин?.элПочта?.[0] || "") },[])

        async function sendMail(id){
            setLoad( true)
            const image = await loadInvoiceImage(id)
            if(image) {
                const res = await sendInvoiceMail({
                    id,
                    email: mail,
                    image,
                })
                if(!res.error)
                    setMessages( "Квитанция успешно отправлена на почту" )
                else 
                    setMessages( "Не получилось отправить квитанцию" )
            } else setMessages( "Не удалось сформировать квитанцию" )
    
            setLoad( false)
        }

        const elem = <>
            <div className="pb-1">
                <div className="flex fl-space ml-1 mr-1 borders-wp">
                    <IonInput
                        className="ml-1 cl-prim"
                        placeholder="email"
                        value={ mail }
                        onIonChange={(e)=>{
                            setMail( e.detail.value as string );
                        }}
                    />    
                    <IonIcon icon = { mailUnreadOutline } className="ml-1 w-3 h-3 p-cursor" color="tertiary" 
                        onClick={()=>{
                            sendMail( props.id )
                        }}
                    />  
                </div>
            </div>
        </>

        return elem
    }

    async function getImg( id: string) {
        setLoad(true)
        const data = await loadInvoiceImage(id)
        if(data) setInvoice( data )
        setLoad(false)
    }
            
    for(let i = 0; i < invoices.length; i++) {
        elem = <>
            { elem }
            <div className="mt-1 t-underline flex fl-space"> <b> Выставленный счет </b> <b> { invoices[i].number} </b></div>
            <div className="mt-1 ml-1 flex">
                <div className="w-40 flex">
                    <IonButton
                        className="w-80 h-80"
                        fill = "clear"
                        id      = { "trig-button" + i.toString() }
                    >
                        <IonImg src="assets/extBill.png" alt="download bill" className="a-img"/>
                    </IonButton>
                    <IonPopover
                        trigger         = { "trig-button" + i.toString() }
                        triggerAction   = 'click'
                        className="a-popover"
                    >
                        <IonContent className = "pb-1">
                            <div className='flex fl-space ml-2  mr-1 h-4'
                                onClick={()=>{
                                    getImg( invoices[i].id )
                                }}                                
                            >
                                <div>Просмотр</div>
                                <IonButton
                                    fill = "clear"
                                >
                                    <IonIcon icon = { newspaperOutline } slot='icon-only'/>
                                </IonButton>
                            </div>
                            <Mail id = { invoices[i].id }/>
                        </IonContent>
                    </IonPopover>                                
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

    return <>
        <IonLoading isOpen = { load } message={ "Подождите..."} />
        <div className=" ml-1 mr-1 mt-1">
            <div className="flex fl-space"
                onClick={()=>{
                    setExpand(!expand) 
                }}
            >
                <div className="cl-prim"> <b>Счета</b> </div>
                <IonIcon icon = { expand ? chevronDown : chevronForward } color="tertiary"/>
            </div>
            { 
                expand 
                    ? <div className="ml-1"> { elem } </div>
                    : <></>
            }

            <p>{ messages }</p>
            
        </div>
        <IonModal
            isOpen={ invoice !== "" }
            onDidDismiss={() => setInvoice( "" )}            
            className="a-modal"
        >
        
            <div className="w-100 h-100">
                {  
                    isPlatform("ios")
                        ? <PDFDoc url={ invoice } name = { "СчетНаОплату" } title = { "Счет на оплату" }/> 
                        :  isPlatform("android")
                        ? <PDFDoc url={ invoice } name = { "СчетНаОплату" } title = { "Счет на оплату" }/> 
                        : <iframe title="pdf" src = { invoice } className="w-100 h-100"/>
                }
            </div>
        </IonModal>
        
    </>
}
