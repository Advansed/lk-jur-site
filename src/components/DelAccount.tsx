import { IonButton, IonCard } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { Store, getData } from "./Store";
import { useProfileStore } from "./Profile/profileStore";
import { useLoginStore } from "./Login/loginStore";
import { useAgreementsStore } from "./Agreements/agreementsStore";
import { useAppsStore } from "./Apps/appsStore";
import { useServicesStore } from "./Services/servicesStore";
import { useActSverkiStore } from "./ActSverki/actSverkiStore";
import { useContactsStore } from "./Contacts/contactsStore";
import { useInfoStore } from "./Info/infoStore";

export function DelAccount(){
    const [ info ] = useState()

    useEffect(()=>{
        console.log(useProfileStore.getState().profile)
    },[])
    const elem = <>
        <div className="ml-auto mr-auto p-page">
        <IonCard className="s-card ml-auto mr-auto pb-1 pr-1">
            <div className="ml-1 mt-1"><b>Удаление аккаунта</b></div>
            <div className="flex fl-space ml-1 mt-1">
                <div><h4>{ useProfileStore.getState().profile?.Организация?.Наименование?.[0]}</h4></div>
            </div>
            <div className="flex fl-space ml-1 mt-1 ">
                <div>ИНН</div>
                <div>{ useProfileStore.getState().profile?.Организация?.ИНН?.[0]}</div>
            </div>
            <div className="flex fl-space ml-1 mt-1">
                <div>КПП</div>
                <div>{ useProfileStore.getState().profile?.Организация?.КПП?.[0]}</div>
            </div>
            <div className="ml-1 mt-2">
                <IonButton
                    expand="block"
                    mode = "ios"
                    onClick = {()=>{
                        async function del(){
                            await getData("delAccount", {
                                token: useLoginStore.getState().login?.token || Store.getState().login?.token
                            })
    
                            useLoginStore.getState().logout()
                            useAgreementsStore.getState().reset()
                            useAppsStore.getState().reset()
                            useServicesStore.getState().reset()
                            useProfileStore.getState().reset()
                            useActSverkiStore.getState().reset()
                            useContactsStore.getState().reset()
                            useInfoStore.getState().reset()
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