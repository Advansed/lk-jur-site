import { IonImg, IonText } from "@ionic/react"
import React, { useEffect, useState } from "react"

export function Hello():JSX.Element {
    const elem = <>
        <div className="p-text">
            <IonImg src = "assets/stng_logo1.svg"  class = "m-img"/>
            <p className="a-center">
                <IonText color={"tertiary"}> {"Добро пожаловать уважаемый Потребитель!"}</IonText>
            </p>
            <p className="ml-1">
                <IonText color={"tertiary"}> Теперь вы сможете экономить время и совершать следующие действия в любое время дня и ночи из любой точки мира: </IonText>
            </p>
            <p className="ml-3">
                <IonText color={"tertiary"}> - оперативано передавать данные о фактическом потреблении газа</IonText>
            </p>
            <p className="ml-3">
                <IonText color={"tertiary"}> - контролировать текущую задолженность за газ</IonText>
            </p>
            <p className="ml-3">
                <IonText color={"tertiary"}> - контролировать сроки поверок узлов учета газа</IonText>
            </p>
            <p className="ml-3">
                <IonText color={"tertiary"}> - подавать заявления на заключения/перезаключения договоров на поставку газа</IonText>
            </p>
        </div>
    </>
    return elem
}