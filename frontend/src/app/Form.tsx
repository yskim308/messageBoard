export default function Form() {
  return (
    <div>
      <form action="submit">
        <input type="text" placeholder="username" required />
        <input type="text" placeholder="message content" />
      </form>
    </div>
  );
}
