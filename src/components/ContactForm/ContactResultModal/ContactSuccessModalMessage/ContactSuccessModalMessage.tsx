export default function ContactSuccessModalMessage({ name }: { name: string }) {
  return (
    <>
      <h4>Message sent!</h4>
      <p>
        Your message was sent, you can now relax and wait for the response from{' '}
        {name}.
      </p>
    </>
  )
}
