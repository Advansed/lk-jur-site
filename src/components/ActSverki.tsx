import React, { useEffect, useState } from "react"
import { Store, getData } from "./Store"
import { IonButton, IonIcon,  IonInput, IonLoading, IonModal, isPlatform } from "@ionic/react"
import { MobilePDFReader } from 'react-read-pdf';
import { mailUnreadOutline } from "ionicons/icons";
import { PDFDoc } from "./Files";

export function ActSverki():JSX.Element {
    const[  info, setInfo] = useState({
        token: Store.getState().login.token,
        type: "Акт сверки",
        name: "ActSverki",
        email: Store.getState().profile.элПочта,
        image: "",
    })
    const[ load, setLoad ] = useState( false) 
    const [ modal, setModal ] = useState( false)
    const [ upd, setUpd ] = useState( 0 )
    const [ message, setMessage ] = useState( "" )

    async function Load(){
        setLoad( true)
        const res = await getData("jur_actsverki", {
            token: Store.getState().login.token
        })

        if(!res.error) {
            info.image = res.data
            setInfo( info )
            Store.dispatch({ type: "actsverki", actsverki: res.data })
        }
        setLoad( false )
    }

    useEffect(()=>{
        const sverk = Store.getState().actsverki
        if(sverk !== "") {
            info.image = sverk 
            setInfo( info )
        }
        setUpd( upd + 1)
    },[])

    async function sendMail(){
        console.log( info )
        const res = await getData('jur_sendMail', info )
        console.log(res)
        if(!res.error)
            setMessage( "Акт сверки успешно отправлен на почту")
    }
    const elem = <>
        <IonLoading isOpen={ load } message= "Подождите..."/>
        <div className="mr-auto ml-auto p-page">
        <div className="w-95 h-80">
            <div className="flex fl-space ml-1 mt-1">
                <IonButton
                    color={ "tertiary" }
                    onClick={()=>{
                        Load()
                    }}
                >
                    Сформировать акт сверки
                </IonButton>
            </div>
            {
                info.image === ""
                    ? <></>
                    : <>
                        <div className="ml-1 mt-1">
                            <PDFDoc url = { info.image } name = { "Квитанция" } title = { "Квитанция" }/>
                        </div>
                    </>
            }

        </div>
        </div>
        <IonModal
            className="a-modal"
            isOpen = { modal }
            onDidDismiss={ () => setModal( false )}
        >
            <div className="w-100 h-100">
                {  
                    isPlatform("ios")
                        ? <MobilePDFReader url={ info.image}/> 
                        :  isPlatform("android")
                            ? <MobilePDFReader url={ info.image }/> 
                            : <iframe title="pdf" src = { info.image } className="w-100 h-100"/>
                }
            </div>
        </IonModal>
    </>

    return elem
}