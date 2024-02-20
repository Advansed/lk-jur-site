import { IonButton, IonCard, IonChip, IonIcon, IonLoading, IonModal } from "@ionic/react"
import React, { useEffect, useState } from "react"
import { Store, getData } from "./Store"
import "./Apps.css"
import { arrowForwardOutline, cameraOutline, playSkipBackCircleOutline, saveOutline } from "ionicons/icons"
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import jsPDF from "jspdf"
import { Filess } from "./Files"

defineCustomElements(window)

async function    takePicture() {
    const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Prompt
      });
      let arr = image.dataUrl?.split(";")
      if(arr !== undefined) {
          arr = arr[0].split("/")
          image.format = arr[1]
      }
      return image
  
}


async function toPDF( pages, name ) {
    const doc = new jsPDF('p', 'mm', 'a4');
    
    for(let i = 0; i < pages.length; i++){
        const img = new Image();
        img.src = pages[i].dataUrl;
        await img.decode();
        let wt = img.width;
        let ht = img.height; 

        let k = 1
        if(wt > 1000) k = 1000 / wt
        if(ht > 1000 && (1000 / ht) < k) k = 1000 / ht


        wt = Math.floor(wt * k)
        ht = Math.floor(ht * k)

        const canvas = document.createElement("canvas");
            
        const ctx = canvas.getContext("2d");

        canvas.width = wt;
        canvas.height = ht;
            
        ctx?.drawImage(img, 0, 0, wt, ht);

            // Show resized image in preview element
        const dataurl = canvas.toDataURL( 'image/jpeg' );
            
        k = wt /210
        if( ht / 297 > k ) k = ht / 297

        if(i > 0) doc.addPage();

        doc.addImage( dataurl, "jpeg", 0, 0, Math.floor(wt / k), Math.floor(ht / k) );

    }

    return doc.output("datauristring",{ filename: name})
}


export function Apps():JSX.Element {
    const [ info, setInfo ] = useState<any>([])
    let elem = <></>

    Store.subscribe({num: 21, type: "apps", func: ()=>{
        setInfo( Store.getState().apps )
    }})

    useEffect(()=>{
        setInfo( Store.getState().apps )
        
        return ()=>{
            Store.unSubscribe( 21 )
        }
    },[])


    function App(props: { info }):JSX.Element{
        const [files, setFiles] = useState( false )
        const [ load, setLoad ] = useState( false )
        const [ message, setMessage ] = useState("")

        const info = props.info
        
        function set_Info_State(){
            if( props.info.type === "Заявка на тех. присоединение (ЮЛ)") {
                return {
                    ПолнРуков:                          { files: [], check: false, mod: false, title: "Документ, подтверждающий полномочия руководителя юридического лица (протокол, решение)"},
                    ПравоНаЗем:                         { files: [], check: false, mod: false, title: "Копии правоустанавливающих документов на земельный участок (свидетельство, выписка ЕГРН, договор аренды и т.п.)"},
                    ТопоКарта:                          { files: [], check: false, mod: false, title: "Топографическая карта участка в масштабе 1 к 500 (не прилагается, если заказчик - физическое лицо, осуществляющее создание (реконструкцию) объекта индивидуального жилищного строительства)"},
                    ПравоСобств:                        { files: [], check: true,  mod: false, title: "Копия документа, подтверждающего право собственности или иное предусмотренное законом основание на объект капитального строительства и (или) земельный участок, на котором расположены (будут располагаться) объекты капитального строительства заявителя"},
                    ДогоПольз:                          { files: [], check: false, mod: false, title: "Для некоммерческих объединений (Заверенная копия договора о пользовании объектами инфраструктуры и др. имуществом общего пользования)"},
                    СитуацПлан:                         { files: [], check: true,  mod: false, title: "Ситуационный план расположения земельного участка с привязкой к территории населенного пункта (формат А4)"},
                    ПравоНаПом:                         { files: [], check: true,  mod: false, title: "Документы, подтверждающие право собственности заявителя в отношении помещений, газоснабжение которых необходимо обеспечить, или иные основания пользования этими помещениями (выписка из ЕГРН, договор социального найма, договор аренды и т.д.; все страницы) *"},
                    СоглАбон:                           { files: [], check: false, mod: false, title: "Согласие осн-го абонента на подключение к сетям газораспределения и (или) газопотребления осн-го абонента, а также строител-во газопровода на з/у осн-го абонента, если подключение осуществляется на з/у, правообладателем которого является осн-ой абонент"},
                    АдрСправка:                         { files: [], check: false, mod: false, title: "Адресная справка (требуется в случае если внесены изменения в адрес объекта)"},
                    ДогПользОб:                         { files: [], check: false, mod: false, title: "Заверенная в установленном порядке копия договора о пользовании объектами инфраструктуры и другим имуществом общего пользования НКО"},
                    ПланТерр:                           { files: [], check: false, mod: false, title: "Копия разработанной и утвержденной в соответствии с законодательством Российской Федерации документации по планировке территории"},
                    Договор:                            { files: [], check: false, title: "Договор"},
                    ПодпДоговор:                        { files: [], check: false, title: "Подписанный договор файл"},
                } 
            }  
            if(props.info.type === "Заявка на тех. присоединение (ИП)"){
                return {
                    ПравоУстДокументы:                  { files: [], check: false, mod: false, title: "Копии правоустанавливающих документов на земельный участок (свидетельство, выписка ЕГРН, договор аренды и т.п.)"},
                    ТопоКарта:                          { files: [], check: false, mod: false, title: "Топографическая карта участка в масштабе 1 к 500 (не прилагается, если заказчик - физическое лицо, осуществляющее создание (реконструкцию) объекта индивидуального жилищного строительства)"},
                    ПравоСобств:                        { files: [], check: true, mod: false, title: "Копия документа, подтверждающего право собственности или иное предусмотренное законом основание на объект капитального строительства и (или) земельный участок, на котором расположены (будут располагаться) объекты капитального строительства заявителя *"},
                    СвидОПУвНО:                         { files: [], check: false, mod: false, title: "Заверенная копия свидетельства о постановке на учет в налоговом органе"},
                    СвидоГРвкИП:                        { files: [], check: false, mod: false, title: "Заверенная копия свидетельства о государственной регистрации в качестве индивидуального предпринимателя"},
                    ОснДокУдЛичность:                   { files: [], check: true, mod: false, title: "Копия основного документа, удостоверяющий личность (паспорт гражданина вторая, третья страницы с персональными данными гражданина, страницы с отметкой о регистрации) *"},
                    СитуацПлан:                         { files: [], check: true, mod: false, title: "Ситуационный план расположения земельного участка с привязкой к территории населенного пункта (формат А4) *"},
                    ДокПравоСобствПом:                  { files: [], check: true, mod: false, title: "Документы, подтверждающие право собственности заявителя в отношении помещений, газоснабжение которых необходимо обеспечить, или иные основания пользования этими помещениями (выписка из ЕГРН, договор социального найма, договор аренды и т.д.; все страницы) *"},
                    СогласиеНаПодкл:                    { files: [], check: false, mod: false, title: "Согласие осн-го абонента на подключение к сетям газораспределения и (или) газопотребления осн-го абонента, а также строител-во газопровода на з/у осн-го абонента, если подключение осуществляется на з/у, правообладателем которого является осн-ой абонент"},
                    АдрСправка:                         { files: [], check: false, mod: false, title: "Адресная справка (требуется в случае если внесены изменения в адрес объекта)"},
                    ДоговорНаПользОбИнфра:              { files: [], check: false, mod: false, title: "Заверенная в установленном порядке копия договора о пользовании объектами инфраструктуры и другим имуществом общего пользования НКО"},
                    ДокПоПланТер:                       { files: [], check: false, mod: false, title: "Копия разработанной и утвержденной в соответствии с законодательством Российской Федерации документации по планировке территории "},
                }
            } 
            
            if(props.info.type === "Заявка на создание личного кабинета (ИП)"){
                return {
                    КопияПаспорта:                      { files: [], check: false, mod: false, title: "Копия основного документа, удостоверяющий личность (паспорт гражданина вторая, третья страницы с персональными данными гражданина, страницы с отметкой о регистрации)"},
                    КарточкаИП:                         { files: [], check: false, mod: false, title: "Карточка ИП (юр. адрес, конт.тел. эл. почта, р/с, ОКВЭД)"},
                    СвидОГосРегистрации:                { files: [], check: false, mod: false, title: "Свидетельства о государственной регистрации в качестве индивидуального предпринимателя"},
                    ЕГРЮЛ:                              { files: [], check: false, mod: false, title: "Выписка ЕГРЮЛ"},
                }
            } 
            if(props.info.type === "Заявка на создание личного кабинета (ЮЛ)"){
                return {
                    Устав:                              { files: [], check: false, mod: false, title: "Устав организации"},
                    КарточкаЮЛ:                         { files: [], check: false, mod: false, title: "Карточка ЮЛ (юр. адрес, конт.тел. эл. почта, р/с, ОКВЭД)"},
                    СвидОГосРегистрации:                { files: [], check: false, mod: false, title: "Свидетельства о государственной регистрации юридического лица"},
                    ЕГРЮЛ:                              { files: [], check: false, mod: false, title: "Выписка ЕГРЮЛ"},
                }
            } 
            if(props.info.type === "Заявка восст./переоформление документов для ЮЛ"){
                return {
                    СвидГРЮЛ:                           { files: [], check: false, mod: false, title: "Свидетельство о Государственной регистрации Юридического Лица"},
                    ПравоСобсв:                         { files: [], check: false, mod: false, title: "Копия документа, подтверждающего право собственности или иное предусмотренное законом основание на объект капитального строительства"},
                    ТУ:                                 { files: [], check: false, mod: false, title: "Технические условия на подключение (технологическое присоединение) объектов капитального строительства к сетям газораспределения (при наличии)"},
                    АктОПодкл:                          { files: [], check: false, mod: false, title: "Акт о подключении (технологическом присоединении) (при наличии)"},
                    Договор:                            { files: [], check: false, mod: false, title: "Копия договора поставки газа (при наличии)"},
                    ИнДокум:                            { files: [], check: false, mod: false, title: "Копии иных документов, подтверждающих факт подключения объекта капитального строительства к сетям газораспределения (в том числе оформленных на предыдущего собственника объекта капитального строительства) в случае отсутствия акта о подключении"},
                    РазделПД:                           { files: [], check: false, mod: false, title: "Копии разделов проектной документации, предусматривающих технические решения, обеспечивающие выполнение технических условий ( при наличии)"},
                }
            } 
            if(props.info.type === "Предоставление информации о ходе работ для ЮЛ"){
                return {
                    СвидГРЮЛ:                           { files: [], check: false, mod: false, title: "Свидетельство о Государственной регистрации Юридического Лица"},
                    ПравоСобсв:                         { files: [], check: true, mod: false, title: "Копия документа, подтверждающего право собственности или иное предусмотренное законом основание на объект капитального строительства"},
                }
            } 
            return undefined
        }
        
        async function Load(){
    
            setLoad( true)
            
            if( info.Файлы === undefined){
                const jarr: any = set_Info_State()
                console.log( jarr )
                if( jarr !== undefined ){
                    const res = await getData("jur_history_files", {
                        token:  Store.getState().login.token,
                        id:    info.id,
                    })
                    if(!res.error) {
                        res.data.forEach(elem => {
                            if( jarr[ elem.name ] !== undefined )
                                jarr[  elem.name ].files = [ elem.file ]
                        });
                    }
            
                    info.Файлы = jarr;
                } else {
                    info.Файлы = {}
                }
            }
            setLoad( false )
            setFiles( true );

        }
        
    
        function Files( ):JSX.Element{
            const [ modal, setModal ] = useState<any>()
            const [ index, setIndex ] = useState( 0 )

            function Files( props : { info } ):JSX.Element {
                const [ upd,  setUpd ] = useState( 0 )
                const [ edit, setEdit ] = useState( info.Файлы[ props.info].mod )
                const [ load, setLoad ] = useState( false )
                
    
                async function getFoto(){
                    const imageUrl = await takePicture();
                    if(imageUrl.format === "pdf"){
                        info.Файлы[ props.info ].files = [ imageUrl ]
                        info.Файлы[ props.info ].mod = true
                    }
                    else
                        if( info.Файлы[ props.info ].files.length === 1 && info.Файлы[ props.info ].files[0].format === "pdf"){
                            info.Файлы[ props.info ].files = [ imageUrl ]
                            info.Файлы[ props.info ].mod = true
                        }
                        else {
                            info.Файлы[ props.info ].files = [...info.Файлы[ props.info ].files, imageUrl]
                            info.Файлы[ props.info ].mod = true
                        }
                    setUpd(upd + 1)   
                    setEdit( true )
                } 
    
                async function PDF(){
    
                    const pdf = await toPDF( info.Файлы[ props.info ].files,  props.info + ".pdf")
    
                    info.Файлы[ props.info ].files = [ { dataUrl: pdf, format: "pdf" } ]

                    setUpd( upd + 1 )
                }
                
                async function Save(){
                    setLoad( true)
                    const res = await getData("jur_history_files", {

                        token :     Store.getState().login.token,
                        id:         info.id,
                        name:       props.info,
                        files:      info.Файлы[ props.info ].files, 

                    })
                    if(!res.error) {
                        setEdit( false);
                        info.Файлы[ props.info ].mod = false;
                    }
                    setLoad( false )
                }
                const elem = <>
                    <div>
                        <IonLoading isOpen = { load } message={ "Подождите" }/>
                        <div className="flex fl-space t-underline mt-1">
                            <div className= { info.Файлы[ props.info].check ? "cl-yellow" : "" }>
                                { info.Файлы[ props.info].check ? " * " + info.Файлы[ props.info].title : info.Файлы[ props.info].title }
                            </div>
                            <div className="flex pb-1">
                                <IonIcon icon = { playSkipBackCircleOutline } color={ "light" } className="w-2 h-2 mr-1 s-point"
                                    onClick={() => { 
                                        info.Файлы[ props.info].files.pop(); setUpd( upd + 1); setEdit( true ) 
                                        info.Файлы[ props.info ].mod = true
                                    }}
                                />
                                <IonIcon icon = { saveOutline } color={ edit ? "warning" : "light" } className="w-2 h-2 s-point"
                                    onClick={() => Save()}
                                />
                            </div>
                        </div>
                        <div className={ "flex fl-wrap" }>
    
                            { info.Файлы[props.info].files.map((e, ind) =>{
                                return e.format === "pdf"
                                    ? <img key = { ind as number } src = { "assets/pdf.png" } alt="" className="w-4 h-4 ml-1 mt-1 s-point"
                                            onClick = {()=>{ setModal( e ) }}
                                    />
                                    : <img key = { ind as number } src = { e.dataUrl } alt="" className="w-4 h-4 ml-1 mt-1 s-point"
                                            onClick = {()=>{ setModal( e ) }}
                                    />
                                
                            })}
                            
                            <div className={ info.Файлы[props.info].files.length > 1 ? "s-photo-1 pr-1 ml-1 mt-1 s-point" : "hidden" }
                                    onClick={()=>{
                                        PDF()
                                    }}                        
                            >
                                <IonIcon icon = { arrowForwardOutline}  className="w-3 h-3 ml-1"/>
                                
                                <img key = { 100 } src = "assets/pdf.png" alt="pdf"  className="w-3 h-3 ml-1 s-point"
                                />
                            </div>
                            <div
                                onClick={()=>{ getFoto() }}
                                className="ml-1 mt-1 s-photo"
                            >
                                <IonIcon icon = { cameraOutline } color="warning" slot="icon-only" className="w-3 h-3 "/>
                            </div>                        
                        </div>
                    </div> 
        
                </>
    
                return elem;
    
            }
            
            let elem = <></>
            
            if( info?.Файлы !== undefined) {
                const keys = Object.keys( info.Файлы )
                for(let i = 0; i < keys.length; i++){
                    elem = <>
                        { elem }
                        <IonChip color="light" className={ index === i ? "a-chip" : "" }
                            onClick={()=> setIndex( i )}
                        >{ i + 1}</IonChip>
                        {/* <Files info = { keys[i] } /> */}
                    </>      
                }
                if(keys.length > 0)
                    elem = <>
                        { elem }
                        <Files info = { keys[ index] }/>
                        <IonModal
                            className="w-100 h-100"
                            isOpen = { modal !== undefined }
                            onDidDismiss={ () => setModal( undefined )}
                        >
                            <div className="w-100 h-100">
                                {  
                                    modal?.format === "pdf" 
                                    ? <iframe title="pdf" src = { modal?.dataUrl } className="w-100 h-100"/>
                                    : <img src={ modal?.dataUrl } alt = "" />
                                }
                            </div>
                        </IonModal>
                    </>
                else elem = <></>
            }
    
            return elem
        }
    
    
        const elem = <>
            <IonCard className="a-card">
                <div className="mt-1 t-underline"> <b> { info.type } </b></div>
                <div className="flex">
                    <div className="flex fl-space ml-1 mt-1 w-50"> 
                        <div className="cl-gray">Дата</div>
                        <div>{ info.date }</div>
                    </div>
                    <div className="flex fl-space ml-1 mt-1 w-50"> 
                        <div className="cl-gray">Номер</div>
                        <div>{ info.number }</div>
                    </div>
                </div>
                <div className="flex fl-space ml-1 mt-1"> 
                    <div className="cl-gray">Адрес</div>
                    <div>{ info.address }</div>
                </div>
                <div className="flex fl-space ml-1 mt-1"> 
                    <div className="cl-gray">Статус</div>
                    <div>{ info.status }</div>
                </div>
    
                {
                    info.files?.Файлы?.length > 0
                        ? <>
                            <Filess    info = { info.files.Файлы }/> 
                            <p className="ml-2">{ message }</p>
                            <div className="flex fl-space">
                                <div></div>
                                <div>
                                    <IonButton
                                        onClick={()=>{
                                            async function upload(){
                                                const res = await getData("jur_sfiles", {
                                                    token:  Store.getState().login.token,
                                                    id:     info.id,
                                                    files:  info.files
                                                })
                                                if(!res.error) {
                                                    setMessage(res.message);
                                                    info.files = new Object()
                                                }
                                                
                                            }
                                            upload()
                                        }}
                                    >
                                        Отправить файлы
                                    </IonButton>
                                </div>
                            </div>
                        </>
                        : <></>
                }                
                 <IonLoading isOpen = { load } message={ "Подождите" }/>
            </IonCard>    
        </>
        return elem
    }
    

    for(let i = 0; i < info.length; i++) {
        elem = <>
            { elem }
            <App info = { info[i]} />
        </>
    }

    return <>
        { elem }
    </>
}

