import React from 'react'
import styles from './FAQSection.module.scss'
import Accordion from '../../Accordion/Accordion'

const FAQSection = () => {
  return (
    <section id="FAQ" className={styles.wrapper}>
      <div className={styles.heading}>
        <span>FAQ</span>
        <small>Let us know if&nbsp;you&nbsp;have any&nbsp;questions.</small>
      </div>
      <div className={styles.faq}>
        <Accordion title="Do I have to bla bala bla?">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse,
            explicabo labore. Temporibus repellat neque recusandae accusamus
            cupiditate hic. Nisi labore ducimus corrupti! Dolore inventore sed
            facilis fuga ea voluptatem laboriosam? Impedit reprehenderit
            similique cum quis culpa saepe, ipsa perferendis. Architecto
            praesentium debitis odio fugiat, reiciendis quaerat voluptate eum
            illo repellendus ducimus officiis aperiam rem harum quam libero
            tempore nesciunt soluta. Consequatur nam ex corrupti, debitis odit
            nobis vitae cum itaque facilis, reprehenderit at! Provident,
            assumenda libero repellat accusamus perferendis ullam esse
            consectetur neque? Eos, excepturi libero. Praesentium quisquam
            labore expedita.
          </p>
        </Accordion>
        <Accordion title="Do I have to bla bala bla?">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
            quo, adipisci natus illum vitae eos architecto labore a magnam vero
            nesciunt, voluptates, dignissimos beatae ut odio! Laborum maiores
            sunt quos? Adipisci suscipit ad dolores est consequatur vitae,
            consectetur dolorem blanditiis maiores molestias dolore nam
            voluptatibus nobis dicta dignissimos odio tenetur corporis voluptas
            laudantium magni cumque delectus. Reiciendis minus voluptatem quis.
          </p>
        </Accordion>
        <Accordion title="Do I have to bla bala bla?">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id
            expedita laboriosam dicta voluptas magnam, ducimus perferendis optio
            esse at aperiam iusto consectetur, velit totam facilis aspernatur!
            Nobis sunt necessitatibus odio!
          </p>
        </Accordion>
        <Accordion title="Do I have to bla bala bla?">test</Accordion>
      </div>
    </section>
  )
}

export default FAQSection
