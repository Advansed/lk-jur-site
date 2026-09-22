import { IonButton, IonCard, IonIcon, IonInput, IonLabel, IonLoading, IonModal } from "@ionic/react"
import React, { useState } from "react"
import "./agreements.css"
import { checkmarkCircleOutline, closeCircleOutline, listCircleOutline, saveOutline } from "ionicons/icons"
import { useAgreements } from "./useAgreements"

export function Agreements(): JSX.Element {
    const {
        dogs: info,
        messages,
        load,
        setMessages,
        saveIndications,
    } = useAgreements()

    function Item(props: { info }): JSX.Element {
        const [page, setPage] = useState(true)
        const info = props.info

        async function Save() {
            await saveIndications({
                id: info.id,
                objects: info.objects,
            })
        }

        function Objects(props: { info }): JSX.Element {
            const info = props.info

            function Object(props: { info }): JSX.Element {

                function Counter(props: { info }): JSX.Element {
                    const [delta, setDelta] = useState("")
                    const elem = <>
                        <div className="mt-1 ml-2">
                            <div>{props.info.counter}</div>
                        </div>
                        {
                            props.info.srok === 0
                                ? <>
                                    <div className="mt-1 ml-3 flex fl-space">
                                        <div className="cl-gray">{"Срок поверки"}</div>
                                        <div>{props.info.dateEnd}</div>
                                        <div className="w-40"></div>
                                    </div>
                                </>
                                : props.info.srok === 1
                                    ? <>
                                        <div className="mt-1 ml-3 flex fl-space">
                                            <div className="cl-gray">
                                                {
                                                    "Срок поверки счетчика истекает, необходимо произвести поверку или замену счетчика до " + props.info.dateEnd + " с предварительным снятием пломбы в присутствии уполномоченного представителя УСД, сдать счетчик на приемку к коммерческому учету уполномоченному представителю УСД после поверки или замены"
                                                }
                                            </div>
                                        </div>
                                    </>
                                    : <>
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
                                        <div className="cl-gray">{"Показания"}</div>
                                        <div>{props.info.Indication}</div>
                                        <div className="w-40 flex fl-space">
                                            <div className="a-input">
                                                <IonInput
                                                    class="ml-1 a-input"
                                                    type="number"
                                                    placeholder="Показание"
                                                    debounce={500}
                                                    value={props.info.indice === undefined ? props.info.Indication : props.info.indice}
                                                    onIonInput={(e) => {
                                                        props.info.indice = e.detail.value;
                                                        props.info.indice = parseInt(e.detail.value as string)

                                                        if ((props.info.indice - props.info.Indication) < 0) setDelta("")
                                                        else if ((props.info.indice - props.info.Indication) <= 100000)
                                                            setDelta("+" + (props.info.indice - props.info.Indication).toString())
                                                        else {
                                                            props.info.indice = props.info.Indication
                                                            setDelta("")
                                                        }


                                                    }}
                                                />
                                            </div>
                                            <div className="w-30 a-right">
                                                {delta}
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
                for (let i = 0; i < props.info.counters?.length; i++) {
                    items = <>
                        {items}
                        <Counter info={props.info.counters[i]} />
                    </>
                }

                const elem = <>
                    <div className="mt-1 t-underline"> <b> {props.info.object + ", " + props.info.address} </b></div>
                    <div className="mt-1 ml-1"> <b> Счетчики </b></div>
                    {items}
                </>
                return elem
            }

            let elem = <>
            </>
            for (let i = 0; i < info.objects.length; i++) {
                elem = <>
                    {elem}
                    <Object info={info.objects[i]} />
                </>
            }

            return elem
        }


        const elem = <>
            <IonCard className="a-card">
                <div> <h4> {info.name} </h4></div>
                <div className="flex fl-space ml-1">
                    <div className="cl-gray">Тип договора</div>
                    <div>{info.type}</div>
                </div>
                <div className="flex fl-space mt-1 pb-1 ml-1">
                    <div className="cl-gray">
                        {info.debt < 0 ? "Аванс" : "Задолженность"}
                    </div>
                    <div className={info.debt < 0 ? "cl-green fs-12" : "fs-12"}>
                        <b>{
                            new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(info.debt < 0 ? -info.debt : info.debt)
                        }</b>
                    </div>
                </div>
                {
                    page
                        ? <></>
                        : <Objects info={info} />
                }
                <div className="flex fl-space mt-1">
                    <div className={info?.objects?.length > 0 ? "" : "hidden"}>
                        <IonButton
                            onClick={() => setPage(!page)}
                        >
                            <IonIcon icon={listCircleOutline} slot="icon-only" />
                            <IonLabel class="ml-1"> {page ? "Показания" : "Закрыть"} </IonLabel>
                        </IonButton>
                    </div>
                    <div>
                        <IonButton
                            className={
                                info.type === "Договор на поставку газа"
                                    ? page ? "hidden" : ""
                                    : "hidden"}
                            onClick={() => {
                                Save()
                            }}
                        >
                            <IonIcon icon={saveOutline} slot="icon-only" />
                            <IonLabel class="ml-1"> Отправить </IonLabel>
                        </IonButton>
                    </div>
                </div>
            </IonCard>
        </>
        return elem
    }

    const items = (Array.isArray(info) ? info : []).map((dog, i) => (
        <Item key={dog?.id ?? i} info={dog} />
    ))

    const elem = <>
        <div className="p-page ml-auto mr-auto">
            <div>
                <IonLoading isOpen={load} message="Подождите" />
                {items}
            </div>
        </div>
        <IonModal
            isOpen={messages.length > 0}
            onDidDismiss={() => setMessages([])}
            className="a-modal"
        >
            <div className="ml-auto mr-auto mt-2">
                {
                    messages.map((el, i) => (
                        <div key={i} className="flex fs-09 mt-1 fl-left">
                            <IonIcon icon={el.error ? closeCircleOutline : checkmarkCircleOutline} className={el.error ? "h-15 w-10 cl-red" : "h-15 w-10 cl-green"}></IonIcon>
                            <div className={"cl-prim w-90"}>
                                {el.message.split(" - ")[0]}
                            </div>
                        </div>
                    ))
                }
            </div>
        </IonModal>

    </>
    return elem
}
