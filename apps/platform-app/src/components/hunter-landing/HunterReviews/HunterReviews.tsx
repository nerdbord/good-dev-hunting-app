import profilePic1 from '@/assets/images/ProfilePicture.png'
import profilePic2 from '@/assets/images/ProfilePicture2.png'
import profilePic3 from '@/assets/images/ProfilePicture3.png'
import { ReviewStar } from '@/components/icons/ReviewStar'
import Image from 'next/image'
import styles from './HunterReviews.module.scss'

const reviews = [
  {
    name: 'Karolina Mowińska',
    role: 'Przedsiębiorca',
    text: 'Jako właściciel małej firmy doceniam prostotę platformy. Szybko znalazłem specjalistę od WordPressa, który pomógł mi rozwiązać problemy z witryną.',
    stars: 5,
    image: profilePic1,
  },
  {
    name: 'Anna Dębowska',
    role: 'CEO startupu edukacyjnego',
    text: 'W końcu ktoś pomyślał o osobach nietechnicznych!',
    stars: 4,
    image: profilePic2,
  },
  {
    name: 'Michał Zawadzki',
    role: 'Przedsiębiorca e-commerce',
    text: 'Od miesięcy szukałem kogoś, kto pomoże mi w rozwoju aplikacji mobilnej. Tradycyjne portale z ogłoszeniami były zbyt skomplikowane, a agencje IT zbyt drogie. DevHunting okazało się strzałem w dziesiątkę.',
    stars: 5,
    image: profilePic3,
  },
  {
    name: 'Tomasz Wierzbicki',
    role: 'Właściciel agencji marketingowej',
    text: 'Wreszcie miejsce, gdzie można znaleźć specjalistę IT bez zbędnych formalności.',
    stars: 4,
    image: profilePic1,
  },
  {
    name: 'Krzysztof Nowacki',
    role: 'Założyciel firmy consultingowej',
    text: 'Znalazłem świetnego programistę w 48h. Platforma jest intuicyjna i przejrzysta!',
    stars: 5,
    image: profilePic2,
  },
  {
    name: 'Barbara Lipińska',
    role: 'Właścicielka butiku online',
    text: 'Potrzebowałam programisty do małego projektu e-commerce. Przez DevHunting znalazłam odpowiednią osobę w kilka dni. Proces był prosty i przejrzysty.',
    stars: 4,
    image: profilePic3,
  },
]

export const HunterReviews = () => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>Opinie zleceniodawców</p>
      <div className={styles.reviewBox}>
        {reviews.map((review, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.stars}>
              {[...Array(review.stars)].map((_, i) => (
                <ReviewStar key={i} />
              ))}
            </div>
            <p className={styles.text}>“{review.text}”</p>
            <div className={styles.profile}>
              <Image
                src={review.image}
                alt={review.name}
                width={42}
                height={42}
                className={styles.avatar}
              />
              <div className={styles.profileData}>
                <p className={styles.name}>{review.name}</p>
                <p className={styles.role}>{review.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
