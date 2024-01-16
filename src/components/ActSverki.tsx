import React, { useEffect, useState } from "react"
import { Store, getData } from "./Store"
import { IonButton, IonIcon, IonImg, IonInput, IonLoading, IonModal, IonText, isPlatform } from "@ionic/react"
import { MobilePDFReader } from 'react-read-pdf';
import { arrowForwardOutline, mailUnreadOutline, sendOutline } from "ionicons/icons";
import { setMode } from "@ionic/pwa-elements/dist/types/stencil-public-runtime";

export function ActSverki():JSX.Element {
    const[  info, setInfo] = useState({
        token: Store.getState().login.token,
        email: Store.getState().profile.элПочта,
        image: "",
    })
    const[ load, setLoad ] = useState( false) 
    const [ modal, setModal ] = useState( false)
    const [ upd, setUpd ] = useState( 0 )

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
    }
    const elem = <>
        <IonLoading isOpen={ load } message= "Подождите..."/>
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
                            <img  src = { "assets/pdf.png" } alt="" className="w-4 h-4 ml-1 mt-1 s-point"
                                onClick = {()=>{ setModal( true ) }}
                            />
                            <div className="flex fl-space ml-1 mt-2 borders-wp">
                                <IonInput
                                    className="ml-1"
                                    placeholder="email"
                                    value={ info.email }
                                    onIonChange={(e)=>{
                                        info.email = e.detail.value
                                        setInfo( info )
                                    }}
                                />    
                                <IonIcon icon = { mailUnreadOutline } className="ml-1 w-3 h-3 p-cursor" color="tertiary" 
                                    onClick={()=>{
                                        sendMail()
                                    }}
                                />  
                            </div>
                        </div>
                    </>
            }

        </div>
        <IonModal
            className="w-100 h-100"
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