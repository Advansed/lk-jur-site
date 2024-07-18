import { IonButton, IonCard } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { Store, getData } from "./Store";

export function DelAccount(){
    const [ info ] = useState()

    useEffect(()=>{
        console.log(Store.getState().profile)
    },[])
    const elem = <>
        <div className="ml-auto mr-auto p-page">
        <IonCard className="s-card ml-auto mr-auto pb-1 pr-1">
            <div className="ml-1 mt-1"><b>Удаление аккаунта</b></div>
            <div className="flex fl-space ml-1 mt-1">
                <div><h4>{ Store.getState().profile.Организация.Наименование[0]}</h4></div>
            </div>
            <div className="flex fl-space ml-1 mt-1 ">
                <div>ИНН</div>
                <div>{ Store.getState().profile.Организация.ИНН[0]}</div>
            </div>
            <div className="flex fl-space ml-1 mt-1">
                <div>КПП</div>
                <div>{ Store.getState().profile.Организация.КПП[0]}</div>
            </div>
            <div className="ml-1 mt-2">
                <IonButton
                    expand="block"
                    mode = "ios"
                    onClick = {()=>{
                        async function del(){
                            await getData("delAccount", {
                                token: Store.getState().login.token
                            })
    
                            Store.dispatch({type: "auth", auth: false})
                        }
                        del()
                       
                    }}
                >
                   Удалить     
                </IonButton>
            </div>
        </IonCard>
        </div>
    </>

    return elem

}