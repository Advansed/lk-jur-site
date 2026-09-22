import React from "react"
import styles from "./Main.module.css"

export function Hello(): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img
          src="assets/logo2.1c3a9d80.svg"
          alt="Логотип"
          className={styles.logo}
        />
      </div>

      <h1 className={styles.title}>Приветствие</h1>

      <div className={styles.card}>
        <p className={styles.lead}>
          Добро пожаловать уважаемый Потребитель!
        </p>
        <p className={styles.intro}>
          Теперь вы сможете экономить время и совершать следующие действия в любое время дня и ночи из любой точки мира:
        </p>
        <ul className={styles.list}>
          <li>оперативно передавать данные о фактическом потреблении газа</li>
          <li>контролировать текущую задолженность за газ</li>
          <li>контролировать сроки поверок узлов учета газа</li>
          <li>подавать заявления на заключения/перезаключения договоров на поставку газа</li>
        </ul>
      </div>
    </div>
  )
}
