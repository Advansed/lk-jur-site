import { IonButton, IonCard, IonCol, IonIcon, IonInput, IonModal, IonRow, isPlatform } from "@ionic/react"
import React, { useEffect, useState } from "react"
import { Store, getData } from "./Store";
import { checkmarkCircleOutline, chevronDownOutline, chevronUpOutline, removeCircleOutline, removeOutline } from "ionicons/icons";
import { MobilePDFReader } from 'react-read-pdf';

import "./Info.css"
import { PDFDoc } from "./Files";


export function Info() {
    const [ page, setPage ] = useState(0)

    Store.subscribe({ num: 101, type: "back", func: ()=>{
        console.log( "back")
        if( page > 0 ) setPage( 0 )
        else Store.dispatch({ type: "route", route: "back"})
      
    }})

    useEffect(()=>{
        console.log( "effect1")
        return ()=>{
            Store.unSubscribe( 101 )
        }
    },[])

    const elem = <>

        <IonCard className="bg-1 pb-1"
            onClick={()=>{ setPage(1)}}
        >
            <div className="ml-2 mt-1 fs-12 "> <b>1. Информация</b> </div>       
        </IonCard>

        <IonCard className="bg-1 pb-1"
            onClick={()=>{ setPage(2)}}
        >
            <div className="ml-2 mt-1 fs-12 "> <b>2. Порядок заключения договоров</b> </div>       
        </IonCard>

        <IonCard className="bg-1 pb-1"
            onClick={()=>{ setPage(3)}}
        >
            <div className="ml-2 mt-1 fs-12 "> <b>3. Способ оплаты</b> </div>       
        </IonCard>

        <IonCard className="bg-1 pb-1"
            onClick={()=>{ setPage(4)}}
        >
            <div className="ml-2 mt-1 fs-12 "> <b>4. Тарифы на природный газ</b> </div>       
        </IonCard>

    </>
    return <>
        <div className="p-page ml-auto mr-auto">
        {
              page === 0 ? <> { elem } </>
            : page === 1 ? <Info1 />
            : page === 2 ? <Info2 />
            : page === 3 ? <Info3 />
            : page === 4 ? <Info4 />
            : <></>
        }
        </div>
    </>
}


function Info1() {  

    const elem = <>
        <IonCard className="bg-2 pb-1">
            <div className="ml-2 mt-1 fs-3 a-center"> <b>Информация</b> </div>   
            <div className="ml-2 mr-1 fs-12">
                <p className="fs-12"> <b>Уважаемые клиенты!</b> </p>
                <p> Управление по сбытовой деятельности АО «Сахатранснефтегаз» в работе с юридическими лицами перешел на электронный документооборот с целью повышения оперативности и качества клиентского обслуживания 
                    с юридическими лицами и индивидуальными предпринимателями. Новый формат взаимоотношений существенно повысит оперативность обмена первичными финансовыми документами, а также избавит потребителей от 
                    необходимости ежемесячного посещения клиентских офисов для получения документов на бумажном носителе или несения почтовых расходов.
                    Применение электронного документооборота урегулировано Федеральным законом от 06.04.2011 г. №63-ФЗ «Об электронной подписи», статьей 169 Налогового Кодекса РФ, Приказом Министерства финансов от 10.11.2015 г. №174н.
                    Выставление и получение электронных документов может осуществляться через одного или нескольких операторов электронного документооборота с применением роуминга. В настоящее время со стороны АО 
                    «Сахатранснефтегаз» привлечен в качестве оператора электронного документооборота:
                </p>
                <div className="ml-4 flex">
                    <div className="borders bg-2 pb-1 pl-1 pt-1 pr-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="38" viewBox="0 0 88 38" width="88">
                            <path 
                                d       = "M27.935 4.046h-9.002v14.693H9.681V4.046H0V.043h29.935v4.003zM88 18.696H75.113l-4.5-4.547-4.565 4.61H47.535l-1.295-2.724h-9.511l-1.295 2.725h-9.575L36.665.064h9.681l9.405 16.411.573-.503 7.6-6.707L53.629.064h11.868L70.57 4.78 75.686 0h11.868L77.045 9.203l7.707 6.707L88 18.697zm-43.607-6.602-2.866-6.057-2.866 6.058h5.732z" 
                                fill    = "#000"
                            >
                            </path> 
                            <path 
                                clipRule = "evenodd" 
                                d        = "M0 38V21.087h88v16.915H0zm18.789-10.165H26.644v-.775h-.063v-.273c0-1.781-3.27-3.27-10.977-3.27h-.063c-7.707 0-11.083 1.447-11.083 3.27v5.031c0 2.326 3.482 3.668 11.083 3.668 7.643 0 11.018-1.342 11.018-3.668v-.839h-7.813v.839c0 .565-.276 1.048-.785 1.278-.573.273-1.401.545-2.59.545-1.19 0-1.975-.272-2.484-.545-.446-.21-.722-.712-.722-1.215v-4.989c0-.566.34-1.048.786-1.279.615-.272 1.464-.44 2.526-.44 1.061 0 1.91.105 2.526.44.51.273.786.734.786 1.279v.943zm31.803 3.94V27.06h.021v-.273c0-1.781-3.27-3.27-10.976-3.27h-.063c-7.707 0-11.083 1.447-11.083 3.27v5.052c0 2.326 3.482 3.668 11.083 3.668 7.642 0 11.018-1.342 11.018-3.668v-.063zm25.54-5.093v8.322h7.282V24.02H72.396l-4.438 6.874-4.437-6.874H52.503v10.983h7.367v-8.322l5.18 8.322h5.902l5.18-8.322zM39.45 25.237c1.061 0 1.91.104 2.526.44.446.23.786.733.743 1.257v4.947c0 .566-.276 1.048-.785 1.278-.573.273-1.401.545-2.59.545-1.19 0-1.975-.272-2.484-.545-.446-.21-.722-.712-.722-1.215v-4.989c0-.566.34-1.048.785-1.278.616-.273 1.465-.44 2.527-.44z" 
                                fill="#005EB2" 
                                fillRule="evenodd"
                            >
                            </path>
                        </svg>
                    </div>
                </div>
                <p>
                    Компания АО Сахатранснефтегаз уже оценила все преимущества обмена электронными документами и приглашает потребителей газа присоединиться. Электронные документы имеют юридическую силу оригиналов, 
                    их не обязательно печатать, они принимаются налоговыми органами и судами.
                </p>
                <p className="fs-12"> <b> Перейдя на обмен электронными документами, мы: </b> </p>
                <img src="assets/infoServices.png" alt="infoServices" className="i-img1" />

                <p className="fs-12"> <b> Для осуществления электронного документооборота (ЭДО) необходимо: </b> </p>
                <p>
                    направить приглашение на наш идентификационный номер оператора <a href="https://taxcom.ru/">https://taxcom.ru/ </a> (ООО «Такском») :
                </p>

                <div className=" in-input1 bg-2 cl-black">
                    <b>2AL-D72AL-D7D264F9-DC5C-4753-A730-DA6FB0883121-00000</b>
                </div>
            </div>
        </IonCard>
    </>

    return elem
}

function Info2() {

    function Items1() {
        const [ ex, setEx ] = useState( false )

        const elem = <>
            <div 
                className="ml-2 mr-1"
            >   
               <div className="flex fl-space"
                    onClick={()=>{setEx(!ex)}}
                >
                    <p className="fs-12"> <b>Договор поставки газа</b> </p>
                    <IonIcon icon = { ex ? chevronUpOutline : chevronDownOutline } />
                </div>
                {
                    ex 
                        ? <>
                            <p className="fs-12"> 
                                Правила поставки газа в Российской Федерации утвержденные постановлением Правительства РФ от 05.02.1998 №162 определяют отношения между поставщиками и покупателями газа, в том числе газотранспортными организациями и 
                                газораспределительными организациями, и обязательны для всех юридических лиц, участвующих в отношениях поставки газа через трубопроводные сети. Поставка газа производится на основании договора между поставщиком и 
                                покупателем, заключаемого в соответствии с требованиями Гражданского кодекса Российской Федерации, федеральных законов, настоящих Правил и иных нормативных правовых актов
                            </p>
                        </>
                        : <></>
                }
            </div>
        </>

        return elem

    }

    function Items2() {
        const [ ex, setEx ] = useState( false )

        const elem = <>
            <div 
                className="ml-2 mr-1 fs-12"
            >   
               <div className="flex fl-space"
                    onClick={()=>{setEx(!ex)}}
                >
                    <p className="w-90"> <b>Заявление, на заключение Договора поставки газа можно подать четырьмя способами</b> </p>
                    <IonIcon icon = { ex ? chevronUpOutline : chevronDownOutline } />
                </div>
                {
                    ex 
                        ? <>
                            <div className="ml-1">
                                <div>
                                    Электронная почта:
                                </div>
                                <div className="ml-1 w-90">
                                    <IonButton
                                        expand="block"
                                        mode="ios"
                                        href="mailto:usd@aostng.ru"
                                    >
                                        usd@aostng.ru
                                    </IonButton>
                                </div>
                            </div>
                            <div className="ml-1 mt-1">
                                <div>
                                    Сайт:
                                </div>
                                <div className="ml-1 w-90">
                                    <IonButton
                                        expand="block"
                                        mode ="ios"
                                        onClick={()=>{
                                            window.open("https://aostng.ru/service/chart5/")
                                        }}
                                    >
                                        Перейти на сайт
                                    </IonButton>
                                </div>
                            </div>
                            <div className="ml-1 mt-1">
                                <div>
                                    Очный прием через Единое окно:
                                </div>
                                <div className="ml-1 w-90">
                                    <IonButton
                                        expand="block"
                                        mode="ios"
                                        onClick={()=>{
                                            window.open("https://aostng.ru/prereg.php")
                                        }}
                                    >
                                        Запись на прием
                                    </IonButton>
                                </div>
                            </div>
                            <div className="ml-1 mt-1">
                                <div>
                                    Личный кабинет:
                                </div>
                                <div className="ml-1 w-90">
                                    <IonButton
                                        expand="block"
                                        mode="ios"
                                        onClick={()=>{
                                            Store.dispatch({type: "route", route: "services"})
                                        }}
                                    >
                                        Перейти в услуги
                                    </IonButton>
                                </div>
                            </div>
                        </>
                        : <></>
                }
            </div>
        </>

        return elem

    }

    function Items3() {
        const [ ex, setEx ] = useState( false )

        const elem = <>
            <div 
                className="ml-2 mr-1 "
            >   
               <div className="flex fl-space"
                    onClick={()=>{setEx(!ex)}}
                >
                    <p className="fs-12 w-90"> <b>Заключить новый договор (контракт) на поставку газа (если ранее не потребляли газ и нет действующего договора)</b> </p>
                    <IonIcon icon = { ex ? chevronUpOutline : chevronDownOutline } />
                </div>
                {
                    ex 
                        ? <>
                            <p className="ml-1 fs-12">
                                <b>Необходимо предоставить следующие документы:</b>
                            </p>

                            <div className="fs-12">

                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Письмо о заключении нового договора поставки газа по форме. (ссылка на бланк заявления на заключение договора поставки газа для юридических лиц, приложение №1)
                                    </p>
                                </div>

                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Копии документов, подтверждающие право собственности на газопотребляющий земельный участок
                                    </p>
                                </div>

                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Копии документов, подтверждающие право собственности на газопотребляющий объект:
                                    </p>
                                </div>
                                <div className="ml-1">
                                    <div className="flex">
                                        <div className="in-w1">
                                            <IonIcon icon = { removeCircleOutline }  className="w-15 h-15"/>
                                        </div>
                                        <p className="in-w2">
                                            Выписка из Единого государственного реестра недвижимости об объекте недвижимости (здание\сооружение) (договор на размещение нестационарного объекта)
                                        </p>
                                    </div>
                                    <div className="flex">
                                        <div className="in-w1">
                                            <IonIcon icon = { removeCircleOutline }  className="w-15 h-15"/>
                                        </div>
                                        <p className="in-w2">
                                            Договор аренды (с копией Выписки из Единого государственного реестра недвижимости об объекте недвижимости)
                                        </p>
                                    </div>
                                    <div className="flex">
                                        <div className="in-w1">
                                            <IonIcon icon = { removeCircleOutline }  className="w-15 h-15"/>
                                        </div>
                                        <p className="in-w2">
                                            Разрешение на строительство (свыше 1,5 тыс.кв.м или общественные)   
                                        </p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        {
                                        'Копия акта о подключении (технологическом присоединении), или акта о готовности сетей газопотребления и газоиспользующего оборудования объекта капитального строительства к подключению ' +
                                        '(технологическому присоединению) (в случае, если заявка направляется до завершения мероприятий по подключению (технологическому присоединению), или акта о присоединении объекта к газораспределительным сетям, ' +
                                        'по которым может осуществляться подача газа заявителю. Если подключение (технологическое присоединение) указанного объекта осуществлено до вступления в силу постановления Правительства Российской Федерации ' +
                                        'от 13 февраля 2006 г. N 83 "Об утверждении Правил определения и предоставления технических условий подключения объекта капитального строительства к сетям инженерно-технического обеспечения и Правил подключения ' +
                                        'объекта капитального строительства к сетям инженерно-технического обеспечения", указанные документы прилагаются к заявке на приобретение газа при их наличии'
                                        }
                                    </p>
                                </div>

                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        В случае, если договор на техническое обслуживание и ремонта газового оборудования со сторонней организацией: 
                                    </p>
                                </div>
                                <div className="ml-1">
                                    <div className="flex">
                                        <div className="in-w1">
                                            <IonIcon icon = { removeCircleOutline }  className="w-15 h-15"/>
                                        </div>
                                        <p className="in-w2">
                                            Копия договора на техническое обслуживание и ремонт газового оборудования
                                        </p>
                                    </div>
                                    <div className="flex">
                                        <div className="in-w1">
                                            <IonIcon icon = { removeCircleOutline }  className="w-15 h-15"/>
                                        </div>
                                        <p className="in-w2">
                                            Копия акта раздела границ обслуживания к Договору АДОиТО
                                        </p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Если это объект ОПО, требуется копия Договора АДОиТО согласованная с профессиональным аварийно-спасательным формированием. (ПЛАС – план локализации и ликвидации аварийных ситуаций), 
                                        ОПО- опасный производственный объект, на среднем или высоком давлении
                                    </p>
                                </div>

                                <p> <b>Дополнительные документы:</b> </p>

                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Копия свидетельства «О постановке на учёт в налоговом органе» (ИНН/КПП)
                                    </p>    
                                </div>
                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Копия свидетельства «О государственной регистрации юридического лица» (ОГРН)
                                    </p>
                                </div>
                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Копии документов, подтверждающего полномочия лица, подписывающего договор (решение собрания участников общества, приказ о назначении руководителя, доверенность, устав)
                                    </p>
                                </div>
                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Карточка ИП или предприятия (юр. адрес, конт.тел. эл. почта, р/с, ОКВЭД)
                                    </p>
                                </div>
                            </div>
                        </>
                        : <></>
                }
            </div>
        </>

        return elem

    }

    function Items4() {
        const [ ex, setEx ] = useState( false )

        const elem = <>
            <div 
                className="ml-1 mr-1"
            >   
               <div className="flex fl-space"
                    onClick={()=>{setEx(!ex)}}
                >
                    <p className="ml-1 fs-12 w-90"> <b>Исключение объекта из действующего договора поставки газа</b> </p>
                    <IonIcon icon = { ex ? chevronUpOutline : chevronDownOutline } />
                </div>
                <div className="fs-12">
                {
                    ex 
                        ? <>
                            <p className="ml-1">
                                <b>В зависимости от ситуации, необходимо предоставить следующие документы:</b>
                            </p>

                            <p className="ml-2">Если объект ликвидируется:</p>
                            <div className="ml-1">
                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Письмо с указанием причины исключения объекта подтверждающими документами при необходимости
                                    </p>
                                </div>
                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Копия акта об установлении заглушки, выданный АО «Сахатранснефтегаз»
                                    </p>
                                </div>
                            </div>
                                    
                            <p className="ml-2">Если объект передается другой организации:</p>
                            <div className="ml-1">
                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Письмо об исключении объекта из действующего Договора (контракта) поставки газа для передачи другой организации. (смена собственника)
                                    </p>
                                </div>
                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Договор купли-продажи (акт приема-передачи здания/котельной/оборудования или иной документ по передаче объекта)
                                    </p>
                                </div>
                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Копию акта фиксации показаний между Потребителями
                                    </p>
                                </div>
                            </div>

                        </>
                        : <></>
                }
                </div>
            </div>
        </>

        return elem

    }

    function Items5() {
        const [ ex, setEx ] = useState( false )

        const elem = <>
            <div 
                className="ml-1 mr-1 fs-12"
            >   
               <div className="flex fl-space"
                    onClick={()=>{setEx(!ex)}}
                >
                    <p className="ml-1 w-90"> <b>Включение в действующий договор поставки газа с другого договора</b> </p>
                    <IonIcon icon = { ex ? chevronUpOutline : chevronDownOutline } />
                </div>
                {
                    ex 
                        ? <>
                            <p className="ml-1"><b>Необходимо предоставить следующие документы:</b></p>
                            <div className="ml-1">
                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Заявление на заключение договора поставки газа от Потребителя по форме: (ссылка на бланк заявления на заключение договора поставки газа для юридических лиц, приложение №1)
                                    </p>
                                </div>
                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Копия акта приема-передачи оборудования или иной документ по передаче объекта
                                    </p>
                                </div>
                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Копии документов, подтверждающие право собственности на газопотребляющий земельный участок
                                    </p>
                                </div>
                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Копии документов, подтверждающие право собственности на газопотребляющий объект
                                    </p>
                                </div>
                                <div className="ml-1">
                                    <div className="flex">
                                        <div className="in-w1">
                                            <IonIcon icon = { removeCircleOutline }  className="w-15 h-15"/>
                                        </div>
                                        <p className="in-w2">
                                            Выписка из Единого государственного реестра недвижимости об объекте недвижимости (здание\сооружение) (договор на размещение нестационарного объекта)
                                        </p>
                                    </div>
                                    <div className="flex">
                                        <div className="in-w1">
                                            <IonIcon icon = { removeCircleOutline }  className="w-15 h-15"/>
                                        </div>
                                        <p className="in-w2">
                                            Договор аренды (с копией Выписки из Единого государственного реестра недвижимости об объекте недвижимости)
                                        </p>
                                    </div>
                                    <div className="flex">
                                        <div className="in-w1">
                                            <IonIcon icon = { removeCircleOutline }  className="w-15 h-15"/>
                                        </div>
                                        <p className="in-w2">
                                            Разрешение на строительство (свыше 1,5 тыс.кв.м или общественные)
                                        </p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        В случае, если договор на техническое обслуживание и ремонта газового оборудования со сторонней организацией:
                                    </p>
                                </div>
                                <div className="ml-1">
                                    <div className="flex">
                                        <div className="in-w1">
                                            <IonIcon icon = { removeCircleOutline }  className="w-15 h-15"/>
                                        </div>
                                        <p className="in-w2">
                                            Копия договора на техническое обслуживание и ремонт газового оборудования
                                        </p>
                                    </div>
                                    <div className="flex">
                                        <div className="in-w1">
                                            <IonIcon icon = { removeCircleOutline }  className="w-15 h-15"/>
                                        </div>
                                        <p className="in-w2">
                                            Копия акта раздела границ обслуживания к Договору АДОиТО
                                        </p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Если это объект ОПО, требуется копия Договора АДОиТО согласованная с профессиональным аварийно-спасательным формированием. (ПЛАС – план локализации и ликвидации аварийных ситуаций), ОПО - опасный производственный объект, на среднем или высоком давлении
                                    </p>
                                </div>
                            </div>
                            
                            <p className="ml-1"> <b>Дополнительные документы:</b> </p>
                            <div className="ml-1">
                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        {'1 Копия свидетельства "О постановке на учёт в налоговом органе" (ИНН/КПП)'} 
                                    </p>
                                </div>
                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        {'2 Копия свидетельства "О государственной регистрации юридического лица" (ОГРН)'}
                                    </p>
                                </div>
                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Копии документов, подтверждающего полномочия лица, подписывающего договор (решение собрания участников общества, приказ о назначении руководителя, доверенность, устав)
                                    </p>
                                </div>
                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Карточка ИП или предприятия (юр. адрес, конт.тел. эл. почта, р/с, ОКВЭД)
                                    </p>
                                </div>
                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Документ, удостоверяющий личность (подходит только для индивидуальных предпринимателей)
                                    </p>
                                </div>
                            </div>
                        </>
                        : <></>
                }
            </div>
        </>

        return elem

    }

    function Items6() {
        const [ ex, setEx ] = useState( false )

        const elem = <>
            <div 
                className="ml-1 mr-1 fs-12"
            >   
               <div className="flex fl-space"
                    onClick={()=>{setEx(!ex)}}
                >
                    <p className="ml-1 w-90"> <b>Как увеличить объемы для бюджетных организаций</b> </p>
                    <IonIcon icon = { ex ? chevronUpOutline : chevronDownOutline } />
                </div>
                {
                    ex 
                        ? <>
                            <p className="ml-1">
                                <b>Рассматривается увеличение объемов, только по имеющимся объектам в Договоре. Необходимо предоставить следующие документы:</b>
                            </p>

                            <div className="ml-1">
                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Письмо об изменении плановых объемов с указанием суммы выделенных дополнительных денег 
                                    </p>
                                </div>

                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Заявка на поставку газа по выделенным денежным средствам
                                    </p>
                                </div>

                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        В случае, если договор на техническое обслуживание и ремонта газового оборудования со сторонней организацией: 
                                    </p>
                                </div>
                                <div className="ml-1">
                                    <div className="flex">
                                        <div className="in-w1">
                                            <IonIcon icon = { removeCircleOutline }  className="w-15 h-15"/>
                                        </div>
                                        <p className="in-w2">
                                            Копия договора на техническое обслуживание и ремонт газового оборудования
                                        </p>
                                    </div>
                                    <div className="flex">
                                        <div className="in-w1">
                                            <IonIcon icon = { removeCircleOutline }  className="w-15 h-15"/>
                                        </div>
                                        <p className="in-w2">
                                            Копия акта раздела границ обслуживания к Договору АДОиТО
                                        </p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Карточка предприятия (юр. адрес, конт.тел. эл. почта, р/с, ОКВЭД)
                                    </p>
                                </div>
                            </div>
                        </>
                        : <></>
                }
            </div>
        </>

        return elem

    }

    function Items7() {
        const [ ex, setEx ] = useState( false )

        const elem = <>
            <div 
                className="ml-1 mr-1 fs-12"
            >   
               <div className="flex fl-space"
                    onClick={()=>{setEx(!ex)}}
                >
                    <p className="ml-1 w-90"> <b>Уменьшение объемов в зависимости от выделенного размера бюджетного финансирования</b> </p>
                    <IonIcon icon = { ex ? chevronUpOutline : chevronDownOutline } />
                </div>
                {
                    ex 
                        ? <>
                            <p className="ml-1">
                                <b>Рассматривается уменьшение объемов, только по имеющимся объектам в Договоре. Необходимо предоставить следующие документы:</b>
                            </p>

                            <div className="ml-1">
                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Письмо об изменении плановых объемов с указанием суммы выделенных денег
                                    </p>
                                </div>

                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Заявка на поставку газа по выделенным денежным средствам.
                                    </p>
                                </div>

                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        В случае, если договор на техническое обслуживание и ремонта газового оборудования со сторонней организацией: 
                                    </p>
                                </div>
                                <div className="ml-1">
                                    <div className="flex">
                                        <div className="in-w1">
                                            <IonIcon icon = { removeCircleOutline }  className="w-15 h-15"/>
                                        </div>
                                        <p className="in-w2">
                                            Копия договора на техническое обслуживание и ремонт газового оборудования
                                        </p>
                                    </div>
                                    <div className="flex">
                                        <div className="in-w1">
                                            <IonIcon icon = { removeCircleOutline }  className="w-15 h-15"/>
                                        </div>
                                        <p className="in-w2">
                                            Копия акта раздела границ обслуживания к Договору АДОиТО
                                        </p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Карточка предприятия (юр. адрес, конт.тел. эл. почта, р/с, ОКВЭД)
                                    </p>
                                </div>
                            </div>
                        </>
                        : <></>
                }
            </div>
        </>

        return elem

    }

    function Items8() {
        const [ ex, setEx ] = useState( false )

        const elem = <>
            <div 
                className="ml-1 mr-1 fs-12"
            >   
               <div className="flex fl-space"
                    onClick={()=>{setEx(!ex)}}
                >
                    <p className="ml-1 w-90"> <b>Перезаключение контракта или договора поставки газа с бюджетными организациями на следующий календарный год</b> </p>
                    <IonIcon icon = { ex ? chevronUpOutline : chevronDownOutline } />
                </div>
                {
                    ex 
                        ? <>
                            <p className="ml-1">
                                <b>Необходимо предоставить следующие документы:</b>
                            </p>

                            <div className="ml-1">
                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Заявка на поставку газа по выделенным денежным средствам (ссылка на бланк заявления на заключение договора поставки газа для юридических лиц, приложение №1)
                                    </p>
                                </div>

                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Лимиты бюджетных обязательств, утвержденные главным распределителем бюджетных средств в натуральном и стоимостном выражении (в случае, если сумма не прописывается в заявлении)
                                    </p>
                                </div>

                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Копии документов, подтверждающие право собственности на газопотребляющий объект:
                                    </p>
                                </div>
                                <div className="ml-1">
                                    <div className="flex">
                                        <div className="in-w1">
                                            <IonIcon icon = { removeCircleOutline }  className="w-15 h-15"/>
                                        </div>
                                        <p className="in-w2">
                                            Выписка из Единого государственного реестра недвижимости об объекте недвижимости (здание\сооружение) (договор на размещение нестационарного объекта)
                                        </p>
                                    </div>
                                    <div className="flex">
                                        <div className="in-w1">
                                            <IonIcon icon = { removeCircleOutline }  className="w-15 h-15"/>
                                        </div>
                                        <p className="in-w2">
                                            Договор аренды (с копией Выписки из Единого государственного реестра недвижимости об объекте недвижимости)
                                        </p>
                                    </div>
                                    <div className="flex">
                                        <div className="in-w1">
                                            <IonIcon icon = { removeCircleOutline }  className="w-15 h-15"/>
                                        </div>
                                        <p className="in-w2">
                                            Разрешение на строительство (свыше 1,5 тыс.кв.м или общественные)
                                        </p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        В случае, если договор на техническое обслуживание и ремонта газового оборудования со сторонней организацией:
                                    </p>
                                </div>
                                <div className="ml-1">
                                    <div className="flex">
                                        <div className="in-w1">
                                            <IonIcon icon = { removeCircleOutline }  className="w-15 h-15"/>
                                        </div>
                                        <p className="in-w2">
                                            Копия договора на техническое обслуживание и ремонт газового оборудования
                                        </p>
                                    </div>
                                    <div className="flex">
                                        <div className="in-w1">
                                            <IonIcon icon = { removeCircleOutline }  className="w-15 h-15"/>
                                        </div>
                                        <p className="in-w2">
                                            Копия акта раздела границ обслуживания к Договору АДОиТО
                                        </p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Если это объект ОПО, требуется копия Договора АДОиТО согласованная с профессиональным аварийно-спасательным формированием. (ПЛАС – план локализации и ликвидации аварийных ситуаций), ОПО - опасный производственный объект, на среднем или высоком давлении
                                    </p>
                                </div>
                            </div>
                            <p className="ml-1">
                                <b>Дополнительные документы:</b>
                            </p>
                            <div className="ml-1">
                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Копии документов, подтверждающего полномочия лица, подписывающего договор (решение собрания участников общества, приказ о назначении руководителя, доверенность, устав)
                                    </p>
                                </div>

                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Карточка ИП или предприятия (юр. адрес, конт.тел. эл. почта, р/с, ОКВЭД)
                                    </p>
                                </div>
                            </div>
                        </>
                        : <></>
                }
            </div>
        </>

        return elem

    }

    function Items9() {
        const [ ex, setEx ] = useState( false )

        const elem = <>
            <div 
                className="ml-1 mr-1 fs-12"
            >   
               <div className="flex fl-space"
                    onClick={()=>{setEx(!ex)}}
                >
                    <p className="ml-1 w-90"> <b>Как заключить договор поставки газа во время проведения ПНР</b> </p>
                    <IonIcon icon = { ex ? chevronUpOutline : chevronDownOutline } />
                </div>
                {
                    ex 
                        ? <>
                            <p className="ml-1">
                                <b>Необходимо предоставить следующие документы:</b>
                            </p>

                            <div className="ml-1">
                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Письмо о заключении договора поставки газа во время проведения ПНР по форме. (ссылка на бланк заявления на заключение договора поставки газа для юридических лиц, приложение №1) 
                                    </p>
                                </div>

                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Копии документов, подтверждающие право собственности на газопотребляющий земельный участок 
                                    </p>
                                </div>

                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Копии документов, подтверждающие право собственности на газопотребляющий объект: 
                                    </p>
                                </div>

                                <div className="ml-1">
                                    <div className="flex">
                                        <div className="in-w1">
                                            <IonIcon icon = { removeCircleOutline }  className="w-15 h-15"/>
                                        </div>
                                        <p className="in-w2">
                                            Выписка из Единого государственного реестра недвижимости об объекте недвижимости (здание\сооружение) (договор на размещение нестационарного объекта)
                                        </p>
                                    </div>
                                    <div className="flex">
                                        <div className="in-w1">
                                            <IonIcon icon = { removeCircleOutline }  className="w-15 h-15"/>
                                        </div>
                                        <p className="in-w2">
                                            Договор аренды (с копией Выписки из Единого государственного реестра недвижимости об объекте недвижимости)
                                        </p>
                                    </div>
                                    <div className="flex">
                                        <div className="in-w1">
                                            <IonIcon icon = { removeCircleOutline }  className="w-15 h-15"/>
                                        </div>
                                        <p className="in-w2">
                                            Разрешение на строительство (свыше 1,5 тыс.кв.м или общественные)
                                        </p>
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        {
                                        'Копия акта о подключении (технологическом присоединении), или акта о готовности сетей газопотребления и газоиспользующего оборудования объекта капитального строительства к подключению (технологическому присоединению) ' +
                                        '(в случае, если заявка направляется до завершения мероприятий по подключению (технологическому присоединению), или акта о присоединении объекта к газораспределительным сетям, по которым может осуществляться подача газа заявителю. ' +
                                        'Если подключение (технологическое присоединение) указанного объекта осуществлено до вступления в силу постановления Правительства Российской Федерации от 13 февраля 2006 г. N 83 "Об утверждении Правил определения и предоставления ' +
                                        'технических условий подключения объекта капитального строительства к сетям инженерно-технического обеспечения и Правил подключения объекта капитального строительства к сетям инженерно-технического обеспечения", указанные документы ' +
                                        'прилагаются к заявке на приобретение газа при их наличии'
                                        }
                                    </p>
                                </div>
                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        В случае, если договор на техническое обслуживание и ремонта газового оборудования со сторонней организацией:  
                                    </p>
                                </div>
                                <div className="ml-1">
                                    <div className="flex">
                                        <div className="in-w1">
                                            <IonIcon icon = { removeCircleOutline }  className="w-15 h-15"/>
                                        </div>
                                        <p className="in-w2">
                                            Копия договора на техническое обслуживание и ремонт газового оборудования
                                        </p>
                                    </div>
                                    <div className="flex">
                                        <div className="in-w1">
                                            <IonIcon icon = { removeCircleOutline }  className="w-15 h-15"/>
                                        </div>
                                        <p className="in-w2">
                                            Копия акта раздела границ обслуживания к Договору АДОиТО
                                        </p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Если это объект ОПО, требуется копия Договора АДОиТО согласованная с профессиональным аварийно-спасательным формированием. (ПЛАС – план локализации и ликвидации аварийных ситуаций), ОПО- опасный производственный объект, на среднем или высоком давлении
                                    </p>
                                </div>
                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Копия Договора на пуско-наладку оборудования и подводящего газопровода со специализированной организацией, осуществляющей деятельность по эксплуатации, сервисному и техническому обслуживанию газоиспользующего оборудования, с приложением 
                                        Плана-графика мероприятий по проведению пуско-наладочных работ и комплексного опробования газового оборудования, согласованного с Ленским управлением Ростехнадзор
                                    </p>
                                </div>
                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Копия проекта части ГСВ
                                    </p>
                                </div>
                            </div>
                            <p className="ml-1">
                                <b>Дополнительный документы:</b>
                            </p>
                            <div className="ml-1">
                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        {'Копия свидетельства «О постановке на учёт в налоговом органе» (ИНН/КПП)'}
                                    </p>
                                </div>

                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        {'Копия свидетельства «О государственной регистрации юридического лица» (ОГРН)'} 
                                    </p>
                                </div>

                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Копии документов, подтверждающего полномочия лица, подписывающего договор (решение собрания участников общества, приказ о назначении руководителя, доверенность, устав) 
                                    </p>
                                </div>

                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Карточка ИП или предприятия (юр. адрес, конт.тел. эл. почта, р/с, ОКВЭД) 
                                    </p>
                                </div>
                            </div>
                        </>
                        : <></>
                }
            </div>
        </>

        return elem

    }

    function Items10() {
        const [ ex, setEx ] = useState( false )

        const elem = <>
            <div 
                className="ml-1 mr-1 fs-12"
            >   
               <div className="flex fl-space"
                    onClick={()=>{setEx(!ex)}}
                >
                    <p className="ml-1 w-90"> <b>Заключение договора поставки газа для УК, ТСЖ и крышных котельных</b> </p>
                    <IonIcon icon = { ex ? chevronUpOutline : chevronDownOutline } />
                </div>
                {
                    ex 
                        ? <>
                            <p className="ml-1">
                                <b>Необходимо предоставить следующие документы:</b>
                            </p>

                            <div className="ml-1">
                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Письмо о заключении договора поставки газа по форме. (ссылка на бланк заявления на заключение договора поставки газа для юридических лиц, приложение №1) 
                                    </p>
                                </div>

                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Протокол общего собрания собственников 
                                    </p>
                                </div>

                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Лицензия управления государственного строительного и жилищного надзора РС(Я) 
                                    </p>
                                </div>
                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Если это объект ОПО, требуется копия Договора АДОиТО согласованная с профессиональным аварийно-спасательным формированием. (ПЛАС – план локализации и ликвидации аварийных ситуаций), ОПО- опасный производственный объект, на среднем или высоком давлении 
                                    </p>
                                </div>
                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        В случае, если договор на техническое обслуживание и ремонта газового оборудования со сторонней организацией 
                                    </p>
                                </div>
                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Копия договора на техническое обслуживание и ремонт газового оборудования 
                                    </p>
                                </div>
                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Копия акта раздела границ обслуживания к Договору АДОиТО 
                                    </p>
                                </div>
                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Документы, подтверждающие, что доля поставки тепловой энергии в адрес бюджетных учреждений, деятельность которых финансируется из соответствующего бюджета на основе сметы доходов и расходов, казенных предприятий, товариществ собственников жилья, 
                                        жилищно-строительных, жилищных и иных специализированных потребительских кооперативов, управляющих организаций или индивидуальных предпринимателей, осуществляющих управление многоквартирными домами, в общем объеме поставляемых 
                                        покупателем товаров и оказываемых услуг составляет более 75 процентов (представляются субъектами теплоснабжения с указанной долей поставляемой тепловой энергии). 
                                    </p>
                                </div>
                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Документ, подтверждающий установление брони газопотребления 
                                    </p>
                                </div>
                            </div>
                            <p className="ml-1">
                                <b>Дополнительный документы:</b>
                            </p>
                            <div className="ml-1">
                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        {'Копия свидетельства «О постановке на учёт в налоговом органе» (ИНН/КПП)'}
                                    </p>
                                </div>

                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        {'Копия свидетельства «О государственной регистрации юридического лица» (ОГРН)'} 
                                    </p>
                                </div>

                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Копии документов, подтверждающего полномочия лица, подписывающего договор (решение собрания участников общества, приказ о назначении руководителя, доверенность, устав) 
                                    </p>
                                </div>

                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Карточка ИП или предприятия (юр. адрес, конт.тел. эл. почта, р/с, ОКВЭД) 
                                    </p>
                                </div>
                            </div>
                        </>
                        : <></>
                }
            </div>
        </>

        return elem

    }

    function Items11() {
        const [ ex, setEx ] = useState( false )

        const elem = <>
            <div 
                className="ml-1 mr-1 fs-12"
            >   
                <div className="flex fl-space"
                    onClick={()=>{setEx(!ex)}}
                >
                    <p className="ml-1 w-90"> <b>Заключение договора поставки газа с ресурсоснабжающими организациями</b> </p>
                    <IonIcon icon = { ex ? chevronUpOutline : chevronDownOutline } />
                </div>
                {
                    ex 
                        ? <>
                            <p className="ml-1">
                                <b>Необходимо предоставить следующие документы:</b>
                            </p>

                            <div className="ml-1">
                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Письмо о заключении нового договора поставки газа по форме. (ссылка на бланк заявления на заключение договора поставки газа для юридических лиц, приложение №1) 
                                    </p>
                                </div>

                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Копии документов, подтверждающие право собственности на газопотребляющий земельный участок 
                                    </p>
                                </div>

                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Копии документов, подтверждающие право собственности на газопотребляющий объект: 
                                    </p>
                                </div>
                                <div className="ml-1">
                                    <div className="flex">
                                        <div className="in-w1">
                                            <IonIcon icon = { removeCircleOutline }  className="w-15 h-15"/>
                                        </div>
                                        <p className="in-w2">
                                            Выписка из Единого государственного реестра недвижимости об объекте недвижимости (здание\сооружение) (договор на размещение нестационарного объекта)
                                        </p>
                                    </div>
                                    <div className="flex">
                                        <div className="in-w1">
                                            <IonIcon icon = { removeCircleOutline }  className="w-15 h-15"/>
                                        </div>
                                        <p className="in-w2">
                                            3.2 Договор аренды (с копией Выписки из Единого государственного реестра недвижимости об объекте недвижимости)
                                        </p>
                                    </div>
                                    <div className="flex">
                                        <div className="in-w1">
                                            <IonIcon icon = { removeCircleOutline }  className="w-15 h-15"/>
                                        </div>
                                        <p className="in-w2">
                                            Разрешение на строительство (свыше 1,5 тыс.кв.м или общественные)
                                        </p>
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        {
                                            '4 Копия акта о подключении (технологическом присоединении), или акта о готовности сетей газопотребления и газоиспользующего оборудования объекта капитального строительства к подключению (технологическому присоединению) ' +
                                            '(в случае, если заявка направляется до завершения мероприятий по подключению (технологическому присоединению), или акта о присоединении объекта к газораспределительным сетям, по которым может осуществляться подача газа заявителю. ' +
                                            'Если подключение (технологическое присоединение) указанного объекта осуществлено до вступления в силу постановления Правительства Российской Федерации от 13 февраля 2006 г. N 83 ' +
                                            '"Об утверждении Правил определения и предоставления технических условий подключения объекта капитального строительства к сетям инженерно-технического обеспечения и Правил подключения объекта капитального строительства к сетям ' +
                                            'инженерно-технического обеспечения", указанные документы прилагаются к заявке на приобретение газа при их наличии'
                                        }
                                    </p>
                                </div>
                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        В случае, если договор на техническое обслуживание и ремонта газового оборудования со сторонней организацией:
                                    </p>
                                </div>
                                <div className="ml-1">
                                    <div className="flex">
                                        <div className="in-w1">
                                            <IonIcon icon = { removeCircleOutline }  className="w-15 h-15"/>
                                        </div>
                                        <p className="in-w2">
                                            Копия договора на техническое обслуживание и ремонт газового оборудования
                                        </p>
                                    </div>
                                    <div className="flex">
                                        <div className="in-w1">
                                            <IonIcon icon = { removeCircleOutline }  className="w-15 h-15"/>
                                        </div>
                                        <p className="in-w2">
                                            Копия акта раздела границ обслуживания к Договору АДОиТО
                                        </p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Если это объект ОПО, требуется копия Договора АДОиТО согласованная с профессиональным аварийно-спасательным формированием. (ПЛАС – план локализации и ликвидации аварийных ситуаций), ОПО- опасный производственный объект, на среднем или высоком давлении
                                    </p>
                                </div>
                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Копия акта фиксации показаний между Потребителями 
                                    </p>
                                </div>
                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Документы, подтверждающие, что доля поставки тепловой энергии в адрес бюджетных учреждений, деятельность которых финансируется из соответствующего бюджета на основе сметы доходов и расходов, казенных предприятий, товариществ собственников жилья, 
                                        жилищно-строительных, жилищных и иных специализированных потребительских кооперативов, управляющих организаций или индивидуальных предпринимателей, осуществляющих управление многоквартирными домами, в общем объеме поставляемых покупателем товаров 
                                        и оказываемых услуг составляет более 75 процентов (представляются субъектами теплоснабжения с указанной долей поставляемой тепловой энергии) 
                                    </p>
                                </div>
                            </div>
                            <p className="ml-1">
                                <b>Дополнительный документы:</b>
                            </p>
                            <div className="ml-1">
                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        {'Копия свидетельства «О постановке на учёт в налоговом органе» (ИНН/КПП)'}
                                    </p>
                                </div>

                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        {'Копия свидетельства «О государственной регистрации юридического лица» (ОГРН)'} 
                                    </p>
                                </div>

                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Копии документов, подтверждающего полномочия лица, подписывающего договор (решение собрания участников общества, приказ о назначении руководителя, доверенность, устав) 
                                    </p>
                                </div>

                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Карточка ИП или предприятия (юр. адрес, конт.тел. эл. почта, р/с, ОКВЭД) 
                                    </p>
                                </div>
                            </div>
                        </>
                        : <></>
                }
            </div>
        </>

        return elem

    }

    function Items12() {
        const [ ex, setEx ] = useState( false )

        const elem = <>
            <div 
                className="ml-2 mr-1 fs-12"
            >   
                <div className="flex fl-space"
                    onClick={()=>{setEx(!ex)}}
                >
                    <p className="w-90"> <b>Изменение ИНН у Потребителя</b> </p>
                    <IonIcon icon = { ex ? chevronUpOutline : chevronDownOutline } />
                </div>
                {
                    ex 
                        ? <>
                            <div className="flex">
                                <div className="in-w1">
                                    <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                </div>
                                <p className="in-w2">
                                    В случае изменения у Потребителя ИНН, необходимо расторжение существующего договора и заключение договора с новым потребителем с новым ИНН
                                </p>
                            </div>

                        </>
                        : <></>
                }
            </div>
        </>

        return elem

    }

    function Items13() {
        const [ ex, setEx ] = useState( false )

        const elem = <>
            <div 
                className="ml-1 mr-1 fs-12"
            >   
                <div className="flex fl-space"
                    onClick={()=>{setEx(!ex)}}
                >
                    <p className="ml-1 w-90"> <b>Изменение наименования и реквизитов у контрагента:</b> </p>
                    <IonIcon icon = { ex ? chevronUpOutline : chevronDownOutline } />
                </div>
                {
                    ex 
                        ? <>
                            <p className="ml-1">
                                <b>Необходимо предоставить следующие документы:</b>
                            </p>
                            <div className="ml-1">
                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Письмо с указанием причин изменения реквизитов на фирменном бланке 
                                    </p>
                                </div>
                                <div className="flex">
                                    <div className="in-w1">
                                        <IonIcon icon = { checkmarkCircleOutline }  className="w-15 h-15"/>
                                    </div>
                                    <p className="in-w2">
                                        Подтверждающие документы (копия свидетельств ИНН, ОГРН, приказ о назначении директора)
                                    </p>
                                </div>
                            </div>

                        </>
                        : <></>
                }
            </div>
        </>

        return elem

    }
    
    function Template1(){
        const [ info, setInfo ] = useState<any>()
        const [ modal, setModal] = useState( false)

        async function Load() {
            const res = await getData("jur_template1", {})
            setInfo( res.data )
            setModal( true)
        }

        const elem = <>
            <div className="ml-4 mr-2 fs-12">
                <IonButton
                    mode = "ios"
                    expand="block"
                    onClick={()=>{
                        Load()
                        
                    }}
                >
                    Скачать шаблон
                </IonButton>
            </div>

            <IonModal
                className="a-modal"
                isOpen = { modal }
                onDidDismiss={ () => setModal( false )}
            >
                <div className="w-100 h-100">
                    <PDFDoc url={ info } name = { "template1" } title = { "Шаблон заявления" }/> 
                </div>
            </IonModal>
        </>

        return elem
    }
    const elem = <>
        <IonCard className="bg-2 pb-1">
            <div className="ml-2 mt-1 fs-3 a-center"> <b>Порядок заключения договоров</b> </div>  

            <Items1 /> 

            <Template1 />

            <Items2 />

            <Items3 />

            <Items4 />

            <Items5 />

            <Items6 />

            <Items7 />

            <Items8 />

            <Items9 />

            <Items10 />
        
            <Items11 />
        
            <Items12 />

            <Items13 />

            <div className="ml-2 mr-1 fs-12">
                {/* <p>*Документы оформляются только при необходимости или по письменному запросу потребителя</p> */}
                <p className="cl-red"><b>Поставка газа потребителю и отбор газа потребителем без учета его объема газа не допускаются</b></p>
                <p>К узлам измерения расхода газа и средствам измерений расхода газа предъявляются определенные требования</p>
                <p>
                    При учете расхода газа к применению допускаются средства измерений утвержденного типа, прошедшие поверку в соответствии с положениями Федерального закона «Об обеспечении единства измерений» от 26.06.2008 № 102 ФЗ, 
                    а также гарантирующие соблюдение установленных законодательством Российской Федерации требований об обеспечении единства измерений.
                </p>
                <p>
                    В состав обязательных требований к средствам измерений включаются также требования к их составным частям, программному обеспечению и условиям эксплуатации средств измерений.
                </p>

                <p>Учет природного газа проводится для стандартных условий по ГОСТ 2939 63:</p>
                <div className="ml-1">
                    <p>•	температура: 20 °С (293,15 °К);</p>
                    <p>•	давление: 760 мм рт. ст. (101 325 Па);</p>
                </div>
                <p><b>Из этого следует, узлы измерения расхода газа должны быть оснащены:</b></p>
                <img src="assets/terms.png" alt="way1" className="i-img1"/>  

                <p><b>На каждом узле учета с помощью средств измерений должны определяться:</b></p>  
                <div className="ml-1">
                    <p>•	время работы узла учета</p>
                    <p>•	расход и количество газа в рабочих и нормальных условиях;</p>
                    <p>•	среднечасовая и среднесуточная температура газа</p>
                    <p>•	среднечасовое и среднесуточное давление газа.</p>
                    <p>•	время работы узла учета</p>
                </div>

                <p>
                    Учет расхода газа на объекте должен проводиться по единому расчетному узлу. 
                    Учет объема газа на объекте мощностью свыше 100 КВт производится измерительными комплексами расхода газа (узлами учета расхода), на объектах мощностью до 100 КВт – счетчиками с термокоррекцией
                </p>
                <p>
                    Измерительный комплекс расхода газа (узла учета расхода газа) на объекте должен соответствовать требованиям «Правил учета газа», утвержденные Министерством энергетики <b className="cl-red">РФ от 30.12.2013</b> г. и Правилами метрологии.
                    Определение количества газа должно проводиться для нормальных условий – t=20оС и Р=760 мм.вод.ст. При потреблении газа свыше 100 кВт узлом учета газа (УУГ) должна быть предусмотрена регистрация всех измеряемых 
                    параметров газа и возможность присоединения к ПК для анализа потребленного объема газа. УУГ при приемке в эксплуатацию должен быть аттестован, а потребитель в подтверждение этого обязан предоставить на каждый узел 
                    учета газа «Акт проверки состояния и применения средств измерений и соблюдения требований Правил метрологии». Акт составляется представителем регионального органа метрологической службы <b>ФГУ «Центр стандартизации и метрологии»</b>.
                    В соответствии с «Правилами учета газа» и «Техническими требованиями к системам и приборам учета газа», утвержденным Приказом Минпромторга России №157 от 21.02.2011 г. все счетчики газа должны быть оснащены корректорами – 
                    устройствами, присоединенными к механическому счетчику газа для автоматического приведения объема газа, измеренного при рабочих условиях, к стандартным согласно ГОСТ 2939-63.
                    Ежегодно перед началом отопительного сезона Потребитель должен предъявить измерительный комплекс (УУГ) метрологу УСД АО «Сахатранснефтегаз» для осмотра. По результатам осмотра 
                    составляется 2-х сторонний акт осмотра измерительного комплекса (УУГ) для дальнейшей эксплуатации на текущий отопительный сезон.
                </p>
                <p> <b>Акт подписывается представителем потребителя и поставщика. В акте указывается:</b></p>
                <div className="ml-1">
                    <p>•	место и дата заполнения акта</p>
                    <p>•	наименование Потребителя и Поставщика</p>
                    <p>•	Адрес и объект Потребителя</p>
                    <p>•	наименование измерительного комплекса и др. измерительных средств, включенных в состав измерительного комплекса</p>
                    <p>•	год выпуска и дата его поверки</p>
                    <p>•	состав газоиспользующего оборудования, подключенного после измерительного комплекса</p>
                    <p>•	заключение, где указывается о полном соответствии требованиям действующих нормативных актов для учета газа в коммерческих целях, иное прописывается по какой причине измерительный прибор не соответствует требованиям.</p>
                </div>
                <p>
                    В случае несоответствия узла учета газа на объекте требованиям «Правил учета газа», Правилам метрологии узел учета газа признается неисправным и объем потребленного газа рассчитывается в соответствии с п.п. 2.2 «Правил учета газа» - 
                    по мощности газопотребляющих установок на объекте, исходя из времени, в течении которого производилось потребление газа.
                </p>
            </div>
            
        
        </IonCard>
    </>

    return elem
}

function Info3() {

    const elem = <>
        <IonCard className="bg-2 pb-1">
            <div className="ml-2 mt-1 fs-3 a-center"> <b>Способы оплаты за природный газ</b> </div>   
            <div className="ml-2 mr-1 fs-12">
                <p> АО «Сахатранснефтегаз» рекомендует своевременно производить оплату согласно Постановлению Правительства РФ от 04.04.2000 г. №294 в следующем порядке: </p>
                <img src="assets/PayWay1.png" alt="way1" />   
                <p>Для бюджетных организаций:</p> 
                <img src="assets/PayWay2.png" alt="way2" />   
                <p>Для УК и ТСЖ:</p>
                <img src="assets/PayWay3.png" alt="way3" />  
                <img src="assets/graph1.png" alt = "graph"  className="mt-1"/> 
                <p>сроки оплат для:</p>
                <div className="flex">
                    <img src="assets/graph2.png" alt="graph1" className="h-3 w-4"/>  
                    <div className="ml-1">
                        <div>Бюджетных организаций, УК и ТСЖ;</div>
                        <div>Прочих потребителей</div>
                    </div>
                </div>
                
                
                <p className="fs-12">Оплату за газ можно осуществить следующими способами:</p>
                <div className="ml-1">
                    <p>1. Через приложение Сбербанк Онлайн, отсканировав штрих-код:</p>
                    <div className="ml-1">
                        <img src="assets/payQR.png" alt="way3" />  
                        <p>* в строке лицевой счет введите ИНН своей организации</p>
                    </div>

                    <p>2. Перечисление денежных средств по следующим реквизитам:</p>
                    <div className="ml-1">
                        <div>{'УСД АО "Сахатранснефтегаз"'}</div>
                        <div>ИНН 1435142972 КПП 140045003</div>
                        <div>Якутское отделение №8603 ПАО Сбербанк</div>
                        <div>БИК 049805609</div>
                        <div>БИК 049805609</div>
                        <div>р/счет № 40702810776000000854</div>
                        <div>к/счет № 30101810400000000609</div>
                        <div>с указанием в назначении платежа платежного поручения – «за природный газ по договору №_______ за период _________».</div>
                    </div>

                    <p>3. Через кассы АО «Сахатранснефтегаз»:</p>
                    <div className="fs-08">                  
                        <IonRow>
                            <IonCol size="5" className="borders1">
                                г. Якутск, ул. Петра Алексеева, 64   
                            </IonCol>
                            <IonCol size="7" className="borders1">
                                <div>Понедельник-пятница: </div>
                                <div> с 08:00 до 18:00</div>
                                <div>Суббота:</div>
                                <div>с 09:00 до 17:00</div>
                                <div>Без перерыва на обед </div>
                            </IonCol>
                        </IonRow>

                        <IonRow>
                            <IonCol size="5" className="borders1">
                                с.Хатассы, ул.Аммосова, 30 (Хатасский ЭГУ)
                            </IonCol>
                            <IonCol size="7" className="borders1">
                                <div>Понедельник-пятница: </div>
                                <div> с 08:00 до 18:00</div>
                                <div>Обед: с 12:00 до 13:00</div>
                            </IonCol>
                        </IonRow>

                        <IonRow>
                            <IonCol size="5" className="borders1">
                                п.Жатай, ул.Северная, 43/1(Жатайский ЭГУ)
                            </IonCol>
                            <IonCol size="7" className="borders1">
                                <div>Понедельник-пятница: </div>
                                <div> с 08:00 до 18:00</div>
                                <div>Обед: с 12:00 до 13:00</div>
                            </IonCol>
                        </IonRow>
                        
                        <IonRow>
                            <IonCol size="5" className="borders1">
                                г.Вилюйск, ул.Ленина, 35(Вилюйский ЭГУ)
                            </IonCol>
                            <IonCol size="7" className="borders1">
                                <div>Понедельник-пятница: </div>
                                <div> с 08:00 до 18:00</div>
                                <div>Обед: с 12:00 до 13:00</div>
                            </IonCol>
                        </IonRow>
                        
                        <IonRow>
                            <IonCol size="5" className="borders1">
                                с.Верхневилюйск, ул.Дь.Аныстырова, 1 (Верхневилюйский ЭГУ)
                            </IonCol>
                            <IonCol size="7" className="borders1">
                                <div>Понедельник-пятница: </div>    
                                <div> с 08:00 до 18:00</div>
                                <div>Обед: с 12:00 до 13:00</div>
                            </IonCol>
                        </IonRow>

                        <IonRow>
                            <IonCol size="5" className="borders1">
                                с.Кобяй, ул.Терехова, 3/1(Кобяйский ЭГУ)
                            </IonCol>
                            <IonCol size="7" className="borders1">
                                <div>Понедельник-пятница: </div>
                                <div> с 08:00 до 18:00</div>
                                <div>Обед: с 12:00 до 13:00</div>
                            </IonCol>
                        </IonRow>
                        
                        <IonRow>
                            <IonCol size="5" className="borders1">
                                с.Мукучи, ул.Архипа Егорова, 2/1(Мукучинский ЭГУ)
                            </IonCol>
                            <IonCol size="7" className="borders1">
                                <div>Понедельник-пятница: </div>
                                <div> с 08:00 до 18:00</div>
                                <div>Обед: с 12:00 до 13:00</div>
                            </IonCol>
                        </IonRow>
                        
                        <IonRow>
                            <IonCol size="5" className="borders1">
                                с.Майя, ул.Советская, 5, с.Павловск, ул.Газовиков, 1(Мегино-Кангаласский ЭГУ)
                            </IonCol>
                            <IonCol size="7" className="borders1">
                                <div>Понедельник-пятница: </div>
                                <div> с 08:00 до 18:00</div>
                                <div>Обед: с 12:00 до 13:00</div>
                            </IonCol>
                        </IonRow>
                        
                        <IonRow>
                            <IonCol size="5" className="borders1">
                                г.Покровск, ул.Орджоникидзе, 76(Хангаласский ЭГУ)
                            </IonCol>
                            <IonCol size="7" className="borders1">
                                <div>Понедельник-пятница: </div>
                                <div> с 08:00 до 18:00</div>
                                <div>Обед: с 12:00 до 13:00</div>
                            </IonCol>
                        </IonRow>
                        
                        <IonRow>
                            <IonCol size="5" className="borders1">
                                с.Намцы, ул.Ц-Аммосовой, 7(Намский ЭГУ)
                            </IonCol>
                            <IonCol size="7" className="borders1">
                                <div>Понедельник-пятница: </div>
                                <div> с 08:00 до 18:00</div>
                                <div>Обед: с 12:00 до 13:00</div>
                            </IonCol>
                        </IonRow>                   
                    </div>
                </div>

                <p className="cl-red fs-12"><b>ЧТО БУДЕТ, ЕСЛИ НЕ ПЛАТИТЬ ЗА ГАЗ:</b></p>

                <img src="assets/shtraf1.png" alt="graph1" className="i-img1"/> 

                <p ><b>ПРИОСТАНОВКА ГАЗА ДО ПОЛНОЙ ОПЛАТЫ ЗАДОЛЖЕННОСТИ</b></p>

                <div>
                    <p>
                        В соответствии с подп. «е» п.2 Постановления Правительства РФ от 25.11.2016 г. №1245 полное или частичное неисполнение обязательств по оплате поставляемого газа в установленный срок, допущенное потребителем более 3 раз в течение 12 месяцев, 
                        с письменным уведомлением о предстоящем приостановлении подачи газа и его причинах, направленным по Почте России за 10 рабочих дней до дня приостановления подачи газа.
                    </p>
                </div>

                <div className="flex">
                    <img src="assets/icon1.png" alt="icon" className="h-3"/>
                    <p >
                        <b>Работы по отключению и повторному подключению газа выполняются за счет потребителя согласно тарифу</b>
                    </p>
                </div>
                
            </div>

        </IonCard>
    </>

    return elem
}

function Info4() {

    const elem = <>
        <IonCard className="bg-2 pb-1">
            <div className="ml-2 mt-1 fs-3 a-center"> <b>Тарифы на природный газ</b> </div>   
            <div className="ml-2 mr-1 fs-12">
                <p > <b>Тарифы на природный газ для потребителей – юридических лиц, действующие с 01.07.2024 г.</b></p>
                <p>
                    {
                        'В соответствии с Приказами ФАС России №1008/24 от 13.12.2024 г. «Об утверждении оптовых цен на газ», №775/22 от 31.10.2022 г. «Об утверждении размера платы за снабженческо-сбытовые услуги, оказываемые потребителям газа ' +
                        'АО «Сахатранснефтегаз» на территории Республики Саха (Якутия) (кроме Ленского района), №1005/24 от 13.12.2024 г. «Об утверждении тарифов на услуги по транспортировке газа по газораспределительным сетям АО «Сахатранснефтегаз» ' +
                        'на территории Республики Саха (Якутия) (кроме Ленского района) и постановлением ГКЦ РС(Я) №283 от 20.12.2024 г. «Об установлении специальной надбавки к тарифам на услуги по транспортировке природного газа по газораспределительным ' +
                        'сетям АО «Сахатранснефтегаз» в Республике Саха (Якутия) (кроме Ленского района) изменена цена на газ для юридических лиц.'
                    }
                </p>
                <p> <b>Цена природного газа, добываемого ПАО «ЯТЭК», для потребителей – юридических лиц с 01.07.2025 г. составляет:</b></p>

                {/* <div className="borders1">
                    Исключающая группа (для Потребителей, указанных в столбце 9 приложения к Приказу ФАС от 28.11.2023 г. №909/23)
                </div> */}
                <IonRow>
                    <IonCol className="w-40 borders1" size="5" >
                        Годовое потребление по точкам подключения к газораспределительным сетям
                    </IonCol> 
                    <IonCol className="w-30 borders1" size="3">
                        Группа потребления
                    </IonCol> 
                    <IonCol className="w-30 borders1" size="4">
                        Цена без НДС, руб./1000 м
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol className="w-40 borders1" size="5">
                        св. 500 млн.м3
                    </IonCol> 
                    <IonCol className="w-30 borders1" size="3">
                        1 группа
                    </IonCol> 
                    <IonCol className="w-30 borders1" size="4">
                        7 404,84
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol className="w-40 borders1" size="5">
                        от 100 до 500 млн.м3
                    </IonCol> 
                    <IonCol className="w-30 borders1" size="3">
                        2 группа
                    </IonCol> 
                    <IonCol className="w-30 borders1" size="4">
                        7 408,14
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol className="w-40 borders1" size="5">
                        от 10 до 100 млн.м3
                    </IonCol> 
                    <IonCol className="w-30 borders1" size="3">
                        3 группа
                    </IonCol> 
                    <IonCol className="w-30 borders1" size="4">
                        7 647,99
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol className="w-40 borders1" size="5">
                        от 1 до 10 млн.м3
                    </IonCol> 
                    <IonCol className="w-30 borders1" size="3">
                        4 группа
                    </IonCol> 
                    <IonCol className="w-30 borders1" size="4">
                        7 941,07
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol className="w-40 borders1" size="5">
                        от 100 до 1 000 тыс.м3
                    </IonCol> 
                    <IonCol className="w-30 borders1" size="3">
                        5 группа
                    </IonCol> 
                    <IonCol className="w-30 borders1" size="4">
                       7 943,01
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol className="w-40 borders1" size="5">
                        от 10 до 100 тыс.м3
                    </IonCol> 
                    <IonCol className="w-30 borders1" size="3">
                        6 группа
                    </IonCol> 
                    <IonCol className="w-30 borders1" size="4">
                        7 950,30
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol className="w-40 borders1" size="5">
                        ниже 10 тыс.м3
                    </IonCol> 
                    <IonCol className="w-30 borders1" size="3">
                        7 группа
                    </IonCol> 
                    <IonCol className="w-30 borders1" size="4">
                        7 980,37
                    </IonCol>
                </IonRow>

                <p> <b>2. Цена природного газа, добываемого со Среднетюнгского газоконденсатного месторождения, для потребителей – юридических лиц с 01.07.2024 г. составляет:</b></p>

                <IonRow>
                    <IonCol className="w-40 borders1" size="5" >
                        Годовое потребление по точкам подключения к газораспределительным сетям
                    </IonCol> 
                    <IonCol className="w-30 borders1" size="3">
                        Группа потребления
                    </IonCol> 
                    <IonCol className="w-30 borders1" size="4">
                        Цена без НДС, руб./1000 м
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol className="w-40 borders1" size="5">
                        от 100 до 1 000 тыс.м3
                    </IonCol> 
                    <IonCol className="w-30 borders1" size="3">
                        5 группа
                    </IonCol> 
                    <IonCol className="w-30 borders1" size="4">
                        6 918,90
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol className="w-40 borders1" size="5">
                        от 10 до 100 тыс.м3
                    </IonCol> 
                    <IonCol className="w-30 borders1" size="3">
                        6 группа
                    </IonCol> 
                    <IonCol className="w-30 borders1" size="4">
                        6 926,19
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol className="w-40 borders1" size="5">
                        ниже 10 тыс.м3
                    </IonCol> 
                    <IonCol className="w-30 borders1" size="3">
                        7 группа
                    </IonCol> 
                    <IonCol className="w-30 borders1" size="4">
                        6 956,26
                    </IonCol>
                </IonRow>

            </div>

            <p className="ml-2">*Цены указаны без учета НДС и теплоты сгорания.</p>
        </IonCard>
    </>

    return elem
}